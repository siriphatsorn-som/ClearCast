import { formatTime } from "../../utils/dateUtil";
import { WiStrongWind, WiHumidity, WiSunrise, WiSunset } from "react-icons/wi";
import { TbUvIndex } from "react-icons/tb";
import { IoEyeOutline } from "react-icons/io5";

export default function HighlightsCard({ current, astro }) {
  const formatAstroTime = (timeStr) => {
    return timeStr.replace(/\s?(AM|PM)/i, "").trim();
  };

  return (
    <div className="bg-(--bg-card) rounded-2xl p-6 border border-(--border)">
      <h2 className="text-(--text-primary) font-semibold mb-4">
        Today's Highlight
      </h2>
      <div className="overflow-x-auto pb-2">
        <div className="grid grid-cols-[1fr_1fr_2fr] gap-4 min-w-150">
          <div className="flex flex-col gap-3 bg-(--bg-input) rounded-xl p-4">
            <h3 className="text-(--text-primary) text-sm! font-medium! flex items-center gap-1">
              <WiStrongWind className="text-xl" />
              Wind Status
            </h3>
            <div className="w-full text-right">
              <h2 className="text-(--text-primary) font-semibold">
                {current.wind_kph}
                <span className="text-sm font-normal ml-1"> km/h</span>
              </h2>
              <p className="text-(--text-primary) text-xs font-light mt-3">
                {formatTime(current.last_updated)}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 bg-(--bg-input) rounded-xl p-4 ">
            <h3 className="text-(--text-primary) text-sm! font-medium! flex items-center gap-1">
              <WiHumidity className="text-xl" />
              Humidity
            </h3>
            <div className="w-full text-right">
              <h2 className="text-(--text-primary) font-semibold">
                {current.humidity}
                <span className="text-sm font-normal ml-1"> %</span>
              </h2>
              <p className="text-(--text-primary) text-xs font-light mt-3">
                Humadity is good
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-between items-center bg-(--bg-input) rounded-xl p-4">
            <WiSunrise className="text-8xl text-amber-300" />
            <div className="flex flex-col items-center gap-4">
              <h2 className="text-(--text-primary)">Sunrise</h2>
              <h1 >{formatAstroTime(astro.sunrise)}</h1>
            </div>
          </div>

          <div className="flex flex-col gap-3 bg-(--bg-input) rounded-xl p-4 ">
            <h3 className="text-(--text-primary) text-sm! font-medium! flex items-center gap-1">
              <TbUvIndex className="text-xl" />
              UV Index
            </h3>
            <div className="w-full text-right">
              <h2 className="text-(--text-primary) font-semibold">
                {current.uv}
                <span className="text-sm font-normal ml-1"> UV</span>
              </h2>
              <p className="text-(--text-primary) text-xs font-light mt-3">
                Moderate UV
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 bg-(--bg-input) rounded-xl p-4 ">
            <h3 className="text-(--text-primary) text-sm! font-medium! flex items-center gap-1">
              <IoEyeOutline className="text-xl" />
              Visibility
            </h3>
            <div className="w-full text-right">
              <h2 className="text-(--text-primary) font-semibold">
                {current.vis_km}
                <span className="text-sm font-normal ml-1"> km</span>
              </h2>
              <p className="text-(--text-primary) text-xs font-light mt-3">
                {formatTime(current.last_updated)}
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-between items-center bg-(--bg-input) rounded-xl p-4">
            <WiSunset className="text-8xl text-amber-300" />
            <div className="flex flex-col items-center gap-4">
              <h2 className="text-(--text-primary)">Sunset</h2>
              <h1 className="">{formatAstroTime(astro.sunset)}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
