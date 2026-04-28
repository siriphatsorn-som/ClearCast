import { useEffect, useState } from "react";
import { getFavorites, deleteFavorite, getWeather } from "../services/api";
import { getWeatherEmoji } from "../utils/weatherCollection";
import { useUI } from "../hooks/useUI";
import { IoTrashOutline } from "react-icons/io5";
import EmptyState from "../components/EmptyState";
import FavoritesSkeleton from "../components/Home/FavoritesSkeleton";

export default function Favorites() {
  const { showToast, showModal } = useUI();
  const [favorites, setFavorites] = useState([]);
  const [weathers, setWeathers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const favRes = await getFavorites();
        const favList = favRes.data;
        setFavorites(favList);

        const weatherResults = await Promise.all(
          favList.map((f) => getWeather(f.city))
        );
        setWeathers(weatherResults.map((res) => res.data));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleDelete = (id, cityName) => {
    showModal({
      title: "Remove favorite",
      message: `Remove ${cityName} from favorites?`,
      onConfirm: async () => {
        await deleteFavorite(id);
        setFavorites((prev) => prev.filter((f) => f.id !== id));
        setWeathers((prev) => prev.filter((_, i) => favorites[i]?.id !== id));
        showToast("Removed from favorites");
      },
    });
  };

  if (loading) return <FavoritesSkeleton />;

   if (weathers.length === 0) {
    return (
      <EmptyState
        icon="heart"
        title="No favorite places yet"
        message="Search for a city and tap the heart to save it"
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-(--text-primary) font-semibold text-xl">
        Favorite Places
      </h1>

      {favorites.length === 0 ? (
        <p className="text-(--text-secondary) text-sm">
          No favorite places yet
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {weathers.map((w, index) => (
            <div
              key={favorites[index]?.id}
              className="flex items-center justify-between bg-(--bg-card) rounded-2xl p-4 border border-(--border)"
            >
              <div className="flex items-center gap-4">
                <span className="text-[48px] leading-none">
                  {getWeatherEmoji(w.current.condition.code)}
                </span>
                <div>
                  <p className="text-(--text-primary) font-medium">
                    {w.location.name} , <span className="text-(--text-secondary) text-sm">{w.location.country}</span>
                  </p>
                  <p className="text-(--text-secondary) text-xs mt-1">
                    {w.current.condition.text}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <p className="text-(--text-primary) font-semibold text-xl">
                  {w.current.temp_c}°
                  <span className="text-sm font-normal text-(--text-secondary) ml-1">
                    C
                  </span>
                </p>
                <button
                  onClick={() => handleDelete(favorites[index]?.id)}
                  className="text-red-400 hover:text-red-500 transition-colors"
                >
                  <IoTrashOutline className="text-xl" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
