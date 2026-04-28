export default function Modal({ title, message, onConfirm, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-(--bg-card) border border-(--border) rounded-2xl p-6 w-full max-w-sm mx-4 flex flex-col gap-4">
        <h2 className="text-(--text-primary) font-semibold text-lg">{title}</h2>
        <p className="text-(--text-secondary) text-sm">{message}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm text-(--text-secondary) bg-(--bg-input) hover:opacity-80 transition-opacity"
          >
            Cancel
          </button>
          <button
            onClick={() => { onConfirm(); onClose(); }}
            className="px-4 py-2 rounded-xl text-sm text-red-400 bg-(--bg-input) hover:opacity-80 transition-opacity"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}