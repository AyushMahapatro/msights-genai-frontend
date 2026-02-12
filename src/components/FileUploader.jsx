import React from "react";

const FileUploader = ({
  files,
  setFiles,
  maxFiles = 5,
}) => {
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    const validImages = selectedFiles.filter((file) =>
      file.type.startsWith("image/")
    );

    const combinedFiles = [...files, ...validImages];

    if (combinedFiles.length > maxFiles) {
      alert(`Maximum ${maxFiles} images allowed.`);
      return;
    }

    setFiles(combinedFiles);
  };

  const removeFile = (indexToRemove) => {
    const updatedFiles = files.filter(
      (_, index) => index !== indexToRemove
    );
    setFiles(updatedFiles);
  };

  return (
    <div style={styles.container}>
      {/* File Input */}
      <label style={styles.uploadButton}>
        📎
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </label>

      {/* Preview Section */}
      {files.length > 0 && (
        <div style={styles.previewContainer}>
          {files.map((file, index) => (
            <div key={index} style={styles.previewItem}>
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                style={styles.image}
              />
              <button
                onClick={() => removeFile(index)}
                style={styles.removeButton}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploader;

/* ===========================
   Styles
=========================== */

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  uploadButton: {
    cursor: "pointer",
    fontSize: "18px",
  },

  previewContainer: {
    display: "flex",
    gap: "8px",
    overflowX: "auto",
  },

  previewItem: {
    position: "relative",
  },

  image: {
    width: "50px",
    height: "50px",
    objectFit: "cover",
    borderRadius: "6px",
    border: "1px solid #ddd",
  },

  removeButton: {
    position: "absolute",
    top: "-6px",
    right: "-6px",
    background: "#ff4d4f",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: "18px",
    height: "18px",
    fontSize: "10px",
    cursor: "pointer",
  },
};
