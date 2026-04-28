import { useEffect } from "react";

export default function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    success: "bg-(--bg-card) border-(--border) text-(--text-primary)",
    error: "bg-(--bg-card) border-red-400 text-red-400",
  };
  return (
    <>
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" />
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50
      flex items-center gap-3 px-6 py-4 rounded-2xl border shadow-xl
      text-sm font-medium whitespace-nowrap ${colors[type]}`}
      >
        <span className="text-xl">{type === "success" ? "✅" : "❌"}</span>
        {message}
      </div>
    </>
  );
}
