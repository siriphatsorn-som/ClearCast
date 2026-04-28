import { useEffect, useState, useCallback } from "react";
import PhotoScoreCard from "../components/PhotoChallenge/PhotoScoreCard";
import PhotoCollectionCard from "../components/PhotoChallenge/PhotoCollectionCard";
import PhotoChallengeSkeleton from "../components/PhotoChallenge/PhotoChallengeSkeleton";
import { getWeather, getPhotoScore } from "../services/api";

export default function PhotoChallenge({ city }) {
  const [weather, setWeather] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchData = useCallback(async () => {
    if (!city) return;
    setLoading(true);
    setError(null);
    try {
      const [weatherRes, photoRes] = await Promise.all([
        getWeather(city),
        getPhotoScore(city),
      ]);
      setWeather(weatherRes.data);
      setPhoto(photoRes.data);
    } catch (err) {
      setError("Failed to fetch weather data", err);
    } finally {
      setLoading(false);
    }
  }, [city]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <PhotoChallengeSkeleton />;
  if (error) return <p className="text-red-400">{error}</p>;
  if (!weather || !photo) return null;

  return (
    <div className="flex flex-col gap-4 ">
      <div>
        <h1 className="text-(--text-primary) font-semibold text-xl">
          Photo Challenge
        </h1>
        <p className="text-(--text-secondary) text-sm mt-0.5">
          Capture all 8 weather conditions and complete your collection!
        </p>
      </div>

      {photo && (
        <PhotoScoreCard
          photo={photo}
          condition={weather.current.condition.text}
          location={weather.location}
        />
      )}

      <div className="md:col-span-2">
        <PhotoCollectionCard
          conditionCode={weather.current.condition.code}
          city={city}
        />
      </div>

    </div>
  );
}
