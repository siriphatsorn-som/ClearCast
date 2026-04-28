import { NavLink } from "react-router-dom";
import { TbGridDots ,TbCircleLetterCFilled } from "react-icons/tb";
import { IoNewspaperOutline, IoPeopleOutline,IoCameraOutline } from "react-icons/io5";

const links = [
  { to: "/", icon: <TbGridDots size={20} />, label: "Home" },
  { to: "/photo-challenge", icon: <IoCameraOutline size={20} />, label: "Photo Challenge" },
  { to: "/community", icon: <IoPeopleOutline size={20} />, label: "Community" },
  { to: "/news", icon: <IoNewspaperOutline size={20} />, label: "News" },
];

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex w-16 min-h-screen-margin m-6 mr-0! rounded-full bg-(--bg-card) border-r border-(--border) flex-col items-center py-6 gap-6">
      <TbCircleLetterCFilled size={32} className="text-(--text-primary) " />
      <div className="h-px w-[80%]  bg-linear-to-r from-transparent via-(--text-primary) to-transparent " />
      {links.map(({ to, icon, label }) => (
        <NavLink
          key={to}
          to={to}
          title={label}
          className={({ isActive }) =>
            `w-10 h-10 flex items-center justify-center rounded-xl transition-all
            ${
              isActive
                ? "bg-(--bg-input) text-(--text-primary)"
                : "text-(--text-muted) hover:text-(--text-primary)"
            }`
          }
        >
          {icon}
        </NavLink>
      ))}
    </aside>
  );
}
