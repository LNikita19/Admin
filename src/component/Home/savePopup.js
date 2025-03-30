export function SaveChangesPopup({ open, onClose, onSave }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded">
        <h2 className="text-center mb-4">Save current changes?</h2>
        <div className="flex justify-between space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded on_active_bounce"
          >
            CANCEL
          </button>
          <button
            onClick={onSave}
            className="bg-[#1A2338] text-white px-4 py-2 rounded on_active_bounce"
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
}
