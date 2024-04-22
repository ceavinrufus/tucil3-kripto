function ReaderKey({ setContent }) {
  function onChange(event) {
    var file = event.target.files[0];
    if (!file) return; // Ensure a file is selected

    const reader = new FileReader();

    reader.readAsText(file);

    reader.onload = (event) => {
      const fileContent = event.target.result;
      setContent(JSON.parse(fileContent));
    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };
  }

  return (
    <div className="input-group">
      <input
        accept=".pub"
        onClick={(e) => (e.target.value = null)}
        onChange={(e) => onChange(e)}
        type="file"
      />
    </div>
  );
}

export default ReaderKey;
