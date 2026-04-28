import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useUI } from "../../hooks/useUI";
import { IoChevronForward } from "react-icons/io5";
import {
  getCollection,
  uploadEntry,
  updateEntry,
  deleteEntry,
} from "../../services/api";
import {
  WEATHER_COLLECTION,
  getConditionByKey,
} from "../../utils/weatherCollection";
import EmptyState from "../EmptyState";
import Skeleton from "../Skeleton";
import ProgressBar from "./ProgressBar";
import EntrySlot from "./EntrySlot";

export default function PhotoCollectionCard({ conditionCode, city }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showToast, showModal } = useUI();
  const [entries, setEntries] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    const fetch = async () => {
      try {
        const res = await getCollection();
        const map = {};
        res.data.forEach((e) => {
          map[e.key] = e;
        });
        setEntries(map);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [user]);

  const handleUpload = async (key, file, conditionLabel) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("conditionCode", conditionCode);
      formData.append("conditionLabel", conditionLabel);
      formData.append("conditionKey", key);
      formData.append("city", city);
      formData.append("displayName", user?.displayName ?? "");
      formData.append("photoURL", user?.photoURL ?? "");

      const res = await uploadEntry(key, formData);
      setEntries((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          key,
          imageURL: res.data.imageURL,
          city,
          conditionLabel,
          displayName: user?.displayName ?? "",
          photoURL: user?.photoURL ?? null,
        },
      }));
      showToast("Photo uploaded ✅");
    } catch {
      showToast("Upload failed", "error");
    }
  };

  const handleUpdate = async (key, note) => {
    try {
      await updateEntry(key, { note });
      setEntries((prev) => ({ ...prev, [key]: { ...prev[key], note } }));
      showToast("Note updated");
    } catch {
      showToast("Update failed", "error");
    }
  };

  const handleDelete = (key) => {
    showModal({
      title: "Remove photo",
      message: `Remove your ${getConditionByKey(key)?.label} photo?`,
      onConfirm: async () => {
        try {
          await deleteEntry(key);
          setEntries((prev) => {
            const n = { ...prev };
            delete n[key];
            return n;
          });
          showToast("Photo removed");
        } catch {
          showToast("Delete failed", "error");
        }
      },
    });
  };

  const collected = Object.keys(entries).length;

  return (
    <div className="bg-(--bg-card) rounded-2xl p-6 border border-(--border) flex flex-col gap-4">
      <div className="flex flex-row justify-between">
        <div>
        <h2 className="text-(--text-primary) font-semibold">
          Your Weather Collection
        </h2>
        <p className="text-(--text-secondary) text-xs mt-0.5">
          Capture photos in every weather condition
        </p>
      </div>

      <button
        onClick={() => navigate("/community")}
        className="flex items-center gap-1.5 px-4 py-2 w-fit rounded-full text-(--bg-primary) border border-(--border) text-sm font-medium bg-(--text-primary) hover:bg-(--text-secondary) transition-colors"
      >
        See everyone's photos
        <IoChevronForward />
      </button>
      </div>
      

      {user && (
        <ProgressBar collected={collected} total={WEATHER_COLLECTION.length} />
      )}

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square" />
          ))}
        </div>
      ) : !user ? (
        <EmptyState
          icon="search"
          title="Login to start collecting"
          message="Track your weather photography journey"
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {WEATHER_COLLECTION.map((slot) => (
            <EntrySlot
              key={slot.key}
              slot={slot}
              entry={entries[slot.key]}
              conditionCode={conditionCode}
              onUpload={handleUpload}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              isOwner={!!user}
            />
          ))}
        </div>
      )}
    </div>
  );
}
