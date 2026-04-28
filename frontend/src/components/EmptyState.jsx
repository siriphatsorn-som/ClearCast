import { IoHeartOutline, IoNewspaperOutline, IoLocationOutline, IoSearchOutline } from "react-icons/io5";

const icons = {
  heart: IoHeartOutline,
  news: IoNewspaperOutline,
  location: IoLocationOutline,
  search: IoSearchOutline,
};

export default function EmptyState({ icon = "location", title, message }) {
  const Icon = icons[icon];

  return (
    <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
      <div className="p-4 rounded-full bg-(--bg-input)">
        <Icon className="text-4xl text-(--text-secondary)" />
      </div>
      <p className="text-(--text-primary) font-medium mt-2">{title}</p>
      <p className="text-(--text-secondary) text-sm">{message}</p>
    </div>
  );
}