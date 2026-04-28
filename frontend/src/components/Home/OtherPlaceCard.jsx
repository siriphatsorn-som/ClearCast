import { getWeatherEmoji } from "../../utils/weatherCollection";
import { useNavigate } from "react-router-dom";

export default function OtherPlaceCard({ places = [], isFav, onSelect }) {
  const navigate = useNavigate();

  return (
    <div className="bg-(--bg-card) rounded-2xl p-6 border border-(--border)">
      <div className="flex flex-row justify-between">
        <h2 className="text-(--text-primary) font-semibold mb-3">
          {isFav ? "Your favorite places" : "Other places"}
        </h2>

        {isFav && (
          <button
            onClick={() => navigate("/favorites")}
            className="text-(--text-secondary) text-sm hover:text-(--text-primary) transition-colors"
          >
            Show all
          </button>
        )}
      </div>

      {places.length === 0 ? (
        <p className="text-(--text-secondary) text-sm">No data available</p>
      ) : (
        <div className="flex flex-col gap-3">
          {places.map((w, index) => (
            <div
              key={index}
              onClick={() => onSelect(w.location.name)}
              className="flex items-center justify-between bg-(--bg-input) rounded-xl p-3 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="flex-1">
                <p className="text-(--text-secondary) text-sm ">
                  {w.location.country}
                </p>
                <p className="text-(--text-primary) font-medium">
                  {w.location.name}
                </p>
                <p className="text-(--text-secondary) text-sm">
                  {w.current.condition.text}
                </p>
              </div>

              <div className="text-[56px] leading-none flex-1 flex justify-center items-center">
                {getWeatherEmoji(w.current.condition.code)}
              </div>

              <div className="text-right flex-1">
                <p className="text-(--text-primary) font-semibold ">
                  {w.current.temp_c}°C
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
