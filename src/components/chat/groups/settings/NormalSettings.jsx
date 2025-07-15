export default function NormalSettings({
  normalSettings,
  setNormalSettings,
  loading,
  saveNormalSettings,
}) {
  const handleNormalSettingsChange = (e) => {
    const { name, value } = e.target;
    setNormalSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleIconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNormalSettings((prev) => ({
        ...prev,
        newIcon: file,
        iconPreview: URL.createObjectURL(file),
      }));
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block mb-1">Group Name</label>
        <input
          type="text"
          name="name"
          value={normalSettings.name}
          onChange={handleNormalSettingsChange}
          className="w-full bg-[var(--dark-color)] border border-[var(--g-color)] rounded p-2"
        />
      </div>

      <div>
        <label className="block mb-1">Description</label>
        <textarea
          name="description"
          value={normalSettings.description}
          onChange={handleNormalSettingsChange}
          className="w-full bg-[var(--dark-color)] border border-[var(--g-color)] rounded p-2"
          rows="3"
        />
      </div>

      <div>
        <label className="block mb-1">Group Icon</label>
        <div className="flex items-center gap-4">
          <label className="cursor-pointer bg-[var(--dark-color)] py-2 px-4 rounded border border-[var(--g-color)] hover:bg-[var(--main-color-hover)]">
            Change Icon
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleIconChange}
            />
          </label>
          {normalSettings.iconPreview && (
            <img
              src={normalSettings.iconPreview}
              alt="Group Icon"
              className="w-12 h-12 rounded-full border border-[var(--g-color)]"
            />
          )}
        </div>
      </div>

      <button
        onClick={saveNormalSettings}
        disabled={loading}
        className="mt-4 w-full bg-[var(--b-color)] hover:bg-[var(--b-color-hover)] text-white py-2 px-4 rounded disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Normal Settings"}
      </button>
    </div>
  );
}
