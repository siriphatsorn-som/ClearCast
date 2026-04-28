import { getWeatherEmoji } from "../../utils/weatherCollection";
import { formatWeekday } from "../../utils/dateUtil";

export default function ForecastCard({ forecast }) {
  return (
    <div className="bg-(--bg-card) rounded-2xl p-6 border border-(--border)">
      <h2 className="text-(--text-primary) font-semibold mb-4">
        7 Day Forecast
      </h2>
      <div className="flex flex-row gap-4 overflow-x-auto pb-2 ">
        {forecast.forecastday.map((day, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 bg-(--bg-input) rounded-xl p-4 w-24 shrink-0 justify-center items-center"
          >
            <p className="text-sm">{index === 0 ? "Today" : formatWeekday(day.date, true)}</p>

            <div className="h-px w-full bg-linear-to-r from-transparent via-(--text-primary) to-transparent " />

            <div className="text-[56px] leading-none">
              {getWeatherEmoji(day.day.condition.code)}
            </div>
            <h3>{day.day.avgtemp_c} °C</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
