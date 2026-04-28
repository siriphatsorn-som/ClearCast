import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { FiMapPin } from "react-icons/fi";
import { getWeatherEmoji } from "../../utils/weatherCollection";
import { formatDate, formatWeekday } from "../../utils/dateUtil";

export default function WeatherCard({ weather, isFav, onFav }) {

  return (
    <div className="bg-(--bg-card) rounded-2xl p-6 border border-(--border) flex flex-col">
      <div className="flex justify-between items-start ">
        <div className="flex flex-row gap-2 items-center justify-center py-1.5 px-3 bg-(--bg-input)  rounded-xl">
          <FiMapPin size={16} className="text-(--text-primary)" />
          <p className="text-(--text-primary) text-sm font-bold">
            {weather.location.name}, {weather.location.country}
          </p>
        </div>

        <button
          onClick={onFav}
          className="text-red-400 hover:scale-110 transition-transform"
        >
          {isFav ? <IoHeart size={22} /> : <IoHeartOutline size={22} />}
        </button>
      </div>

      <div className="relative mt-6 flex flex-col justify-between flex-1">
        <div className="flex flex-col gap-2">
          <h1 className="text-(--text-secondary)">
            {formatWeekday(weather.location.localtime)}
          </h1>
          <p className="text-(--text-primary) text-sm">
            {formatDate(weather.location.localtime)}
          </p>
        </div>

        <div className="flex flex-col justify-end w-full text-right gap-2">
          <h1 className="font-bold text-(--text-primary)">
            {weather.current.temp_c}°C
          </h1>
          <h2 className="font-bold text-(--text-secondary)! mt-1">
            /{weather.current.temp_f}°F
          </h2>
        </div>

        <div className="flex flex-col justify-end items-end w-full text-right mt-8 gap-2">
          <h2 className="font-bold text-(--text-primary) w-[30%]">
            {weather.current.condition.text}
          </h2>
          <h3 className="font-bold text-(--text-secondary)!">
            Feels like {weather.current.feelslike_c}°
          </h3>
        </div>

        <span
          className="
            text-[100px] lg:text-[140px] leading-none absolute
            top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            [@media(max-width:900px)_and_(min-width:768px)]:top-auto
            [@media(max-width:900px)_and_(min-width:768px)]:bottom-12
            [@media(max-width:900px)_and_(min-width:768px)]:left-6
            [@media(max-width:900px)_and_(min-width:768px)]:translate-x-0
            [@media(max-width:900px)_and_(min-width:768px)]:translate-y-0
          "
        >
          {getWeatherEmoji(weather.current.condition.code)}
        </span>
      </div>
    </div>
  );
}
