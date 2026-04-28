import { useRef, useState } from "react";
import { IoTrashOutline, IoPencilOutline, IoCloudUploadOutline, IoCheckmark } from "react-icons/io5";
import { FiMapPin } from "react-icons/fi";
import { getConditionKey } from "../../utils/weatherCollection";

export default function EntrySlot({ slot, entry, conditionCode, onUpload, onUpdate, onDelete, isOwner }) {
  const fileRef = useRef(null);
  const [editing, setEditing] = useState(false);
  const [note, setNote] = useState(entry?.note ?? "");
  const isCurrent = getConditionKey(conditionCode) === slot.key;

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    await onUpload(slot.key, file, slot.label);
  };

  const handleSave = async () => {
    await onUpdate(slot.key, note);
    setEditing(false);
  };

  return (
    <div className={`flex flex-col rounded-xl overflow-hidden border transition-all
      ${entry ? "border-(--border)" : "border-dashed border-(--border)"}
      ${isCurrent ? "ring-2 ring-amber-400" : ""}
    `}>
      <div className="relative aspect-square bg-(--bg-input)">
        {entry?.imageURL ? (
          <img src={entry.imageURL} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-1">
            <span className="text-3xl">{slot.emoji}</span>
            <p className="text-xs text-(--text-muted)">{slot.label}</p>
          </div>
        )}
        {isCurrent && (
          <span className="absolute top-2 left-2 text-xs bg-amber-400 text-amber-900 px-2 py-0.5 rounded-full font-medium">
            Now
          </span>
        )}
        {entry && (
          <span className="absolute top-2 right-2 bg-green-500 rounded-full p-0.5">
            <IoCheckmark className="text-white text-xs" />
          </span>
        )}
      </div>

      <div className="p-2 flex flex-col gap-1 bg-(--bg-card) h-full justify-between">
        <p className="text-(--text-primary) text-lg font-medium">{slot.emoji} {slot.label}</p>

        {entry?.city && (
          <div className="flex flex-row gap-2 items-center justify-start">
            <FiMapPin size={12} className="text-(--text-primary)" />
            <p className="text-xs text-(--text-primary) text- font-ligh">{entry.city}</p>
          </div>
        )}

        {editing ? (
          <div className="flex flex-col gap-1">
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="text-xs bg-(--bg-input) text-(--text-primary) rounded-lg px-2 py-1 outline-none"
              placeholder="Add note..."
            />
            <div className="flex gap-1 justify-end">
              <button onClick={() => setEditing(false)} className="text-xs text-(--text-secondary)">Cancel</button>
              <button onClick={handleSave} className="text-xs text-(--text-primary)">Save</button>
            </div>
          </div>
        ) : (
          entry?.note && <p className="text-(--text-secondary) text-xs italic">{entry.note}</p>
        )}

        {isOwner && (
          <div className="flex gap-1 mt-1 ">
            <button
              onClick={() => fileRef.current?.click()}
              className="flex-1 flex items-center justify-center gap-1 text-xs text-(--text-secondary) bg-(--bg-input) rounded-lg py-1 hover:opacity-80"
            >
              <IoCloudUploadOutline /> {entry ? "Replace" : "Upload"}
            </button>
            {entry && (
              <>
                <button onClick={() => setEditing(true)} className="p-1 text-(--text-secondary) bg-(--bg-input) rounded-lg hover:opacity-80">
                  <IoPencilOutline />
                </button>
                <button onClick={() => onDelete(slot.key)} className="p-1 text-red-400 bg-(--bg-input) rounded-lg hover:opacity-80">
                  <IoTrashOutline />
                </button>
              </>
            )}
          </div>
        )}
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </div>
    </div>
  );
}