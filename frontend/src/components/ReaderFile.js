import { RiAttachment2 } from "react-icons/ri";

function ReaderFile({ disabled, setFile, setFileName }) {
  function onChange(event) {
    var file = event.target.files[0];
    if (!file) return; // Ensure a file is selected

    if (file.size > 1e6) {
      alert("Please upload a file smaller than 1 MB");
      return;
    }

    const reader = new FileReader();
    setFileName(file.name);
    reader.readAsArrayBuffer(file); // Read file as array buffer to handle binary data

    reader.onload = (event) => {
      const fileContent = new Uint8Array(event.target.result); // File content as Uint8Array
      setFile(fileContent);
    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };
  }

  return (
    <div className="input-group">
      <label
        htmlFor="fileUpload"
        className={`flex items-center justify-center ${
          disabled ? "cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        <RiAttachment2 className="text-2xl " />
      </label>
      <input
        disabled={disabled}
        id="fileUpload"
        className="hidden disabled:cursor-not-allowed"
        onClick={(e) => (e.target.value = null)}
        onChange={(e) => onChange(e)}
        type="file"
      />
    </div>
  );
}

export default ReaderFile;
