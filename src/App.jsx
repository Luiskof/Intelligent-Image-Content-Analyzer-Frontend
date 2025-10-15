import { useState } from "react";
import "./App.css";
import { API_URL } from "./apiConfig";

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // ✅ Validate file type (only images)
    if (!file.type.startsWith("image/")) {
      alert("Solo se permiten archivos de imagen (JPG, JPEG, PNG, GIF, BMP, TIFF, WebP.)");
      e.target.value = ""; // reset the input
      return;
    }

    // Optional secondary validation by extension (for browsers missing MIME)
    const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"];
    if (!validExtensions.some((ext) => file.name.toLowerCase().endsWith(ext))) {
      alert("El archivo debe ser una imagen válida (JPG, JPEG, PNG, GIF, BMP, TIFF, WebP)");
      e.target.value = "";
      return;
    }

    const maxSizeMB = 2;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      alert("El archivo no debe superar los" `${maxSizeMB}` + "MB");
      e.target.value = "";
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setTags([]);
  };

  const handleAnalyze = async () => {
    if (!image) return alert("Por favor selecciona una imagen primero");

    setLoading(true);
    setTags([]);

    const formData = new FormData();
    formData.append("file", image);

    try {
      const res = await fetch(`${API_URL}/api/analyze`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Error analizando la imagen");

      const data = await res.json();
      setTags(data.tags || []);
    } catch (err) {
      console.error(err);
      alert("Hubo un error analizando la imagen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Analizador de Imágenes</h1>
      <div className="upload-section">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      <button onClick={handleAnalyze} disabled={!image || loading}>
        {loading ? "Analizando..." : "Analizar"}
      </button>
      {loading && <div className="spinner"></div>}
      {preview && (
        <div className="preview">
          <img src={preview} alt="Preview" />
        </div>
      )}
      {tags.length > 0 && (
        <div className="results">
          <h3>Resultados</h3>
          <ul>
            {tags.map((tag, i) => (
              <li key={i}>
                {tag.label} — {(tag.confidence * 100).toFixed(1)}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;