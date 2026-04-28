import { NavLink } from "react-router-dom";
import { TbGridDots } from "react-icons/tb";
import {
  IoNewspaperOutline,
  IoPeopleOutline,
  IoCameraOutline,
} from "react-icons/io5";

const links = [
  { to: "/", icon: <TbGridDots size={22} />, label: "Home" },
  {
    to: "/photo-challenge",
    icon: <IoCameraOutline size={20} />,
    label: "Photo Challenge",
  },
  { to: "/community", icon: <IoPeopleOutline size={20} />, label: "Community" },
  { to: "/news", icon: <IoNewspaperOutline size={22} />, label: "News" },
];

export default function BottomNav() {
  return (
    <nav className="lg:hidden fixed m-4 bottom-0 left-0 right-0 h-16 bg-(--bg-input) border-t border-(--border) flex items-center justify-around z-50 rounded-full shadow-(--shadow)">
      {links.map(({ to, icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 px-6 transition-all
            ${isActive ? "text-(--text-primary)" : "text-(--text-muted)"}`
          }
        >
          {icon}
        </NavLink>
      ))}
    </nav>
  );
}
