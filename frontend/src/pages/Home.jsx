import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import WeatherCard from "../components/Home/WeatherCard";
import HighlightsCard from "../components/Home/HighlightsCard";
import ForecastCard from "../components/Home/ForecastCard";
import OtherPlaceCard from "../components/Home/OtherPlaceCard";
import ReviewCard from "../components/Home/ReviewsCard";
import HomeSkeleton from "../components/Home/HomeSkeleton";
import { useUI } from "../hooks/useUI";
import { getRandomCities } from "../utils/cityUtils";
import { useAuth } from "../hooks/useAuth";

import {
  getWeather,
  addFavorite,
  deleteFavorite,
  getFavorites,
} from "../services/api";

export default function Home({ city, onSelectCity }) {
  const navigate = useNavigate();
  const { showToast, showModal } = useUI();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFav, setIsFav] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [favId, setFavId] = useState(null);
  const [otherWeathers, setOtherWeathers] = useState([]);
  const { user } = useAuth();

  const fetchData = useCallback(async () => {
    if (!city) return;
    setLoading(true);
    setError(null);
    try {
      const [weatherRes] = await Promise.all([
        getWeather(city),
      ]);
      setWeather(weatherRes.data);

      if (user) {
        const favRes = await getFavorites();
        const favList = favRes.data;

        const found = favList.find((f) => f.city === city);
        if (found) {
          setIsFav(true);
          setFavId(found.id);
        } else {
          setIsFav(false);
          setFavId(null);
        }

        const weatherResults = await Promise.all(
          favList
            .filter((f) => f.city !== city)
            .slice(0, 2)
            .map((f) => getWeather(f.city))
        );

        setFavorites(weatherResults.map((res) => res.data));
      } else {
        const randomCities = getRandomCities(2, city);
        const weatherResults = await Promise.all(
          randomCities.map((c) => getWeather(c))
        );
        setOtherWeathers(weatherResults.map((res) => res.data));
      }
    } catch (err) {
      setError("Failed to fetch weather data", err);
    } finally {
      setLoading(false);
    }
  }, [city, user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFav = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      if (isFav) {
        showModal({
          title: "Remove favorite",
          message: `Remove ${weather.location.name}?`,
          onConfirm: async () => {
            await deleteFavorite(favId);
            setIsFav(false);
            setFavId(null);
            showToast("Removed from favorites");
            fetchData();
          },
        });
      } else {
        const res = await addFavorite(weather.location.name);
        setIsFav(true);
        setFavId(res.data.id);
        showToast("Added to favorites ❤️");
        fetchData();
      }
    } catch {
      console.error("Fav failed");
    }
  };

  if (loading) return <HomeSkeleton />;
  if (error) return <p className="text-red-400">{error}</p>;
  if (!weather) return null;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <WeatherCard weather={weather} isFav={isFav} onFav={handleFav} />

        <HighlightsCard
          current={weather.current}
          astro={weather.forecast.forecastday[0].astro}
        />

        <OtherPlaceCard
          places={favorites.length > 0 ? favorites : otherWeathers}
          isFav={user}
          onSelect={onSelectCity}
        />

        <ForecastCard forecast={weather.forecast} />

        <div className="md:col-span-2">
          <ReviewCard city={city} />
        </div>

      </div>
    </>
  );
}
