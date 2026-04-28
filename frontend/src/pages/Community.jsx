import { useEffect, useState } from "react";
import { getCommunity } from "../services/api";
import EmptyState from "../components/EmptyState";
import CommunitySkeleton from "../components/Community/CommunitySkeleton";
import CommunityCard from "../components/Community/CommunityCard";
import CommunityFilter from "../components/Community/CommunityFilter";

export default function Community() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState(null);

  useEffect(() => {
    const fetchEntries = async () => {
      setLoading(true);
      try {
        const res = await getCommunity(activeFilter);
        setEntries(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEntries();
  }, [activeFilter]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-(--text-primary) font-semibold text-xl">Community</h1>
        <p className="text-(--text-secondary) text-sm mt-0.5">
          Photos from photographers around the world
        </p>
      </div>

      <CommunityFilter activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

      {loading ? (
        <CommunitySkeleton />
      ) : entries.length === 0 ? (
        <EmptyState
          icon="search"
          title="No photos yet"
          message="Be the first to upload a photo!"
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {entries.map((entry, i) => (
            <CommunityCard key={i} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
}
