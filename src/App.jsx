import { useState } from "react";
import "./App.css";
import { API_URL } from "./apiConfig";
import Swal from "sweetalert2";

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
      Swal.fire({
        icon: "error",
        title: "Tipo de archivo no válido",
        html: `
            <div style="text-align: left;">
                <p style="margin-bottom: 15px; font-size: 16px; font-weight: 500;">
                    Solo se permiten archivos de imagen:
                </p>
                <ul style="margin: 10px 0; padding-left: 25px; font-size: 14px; line-height: 1.6;">
                    <li>JPG,JPEG</li>
                    <li>PNG</li>
                    <li>GIF</li>
                    <li>BMP</li>
                    <li>TIFF</li>
                    <li>WebP</li>
                </ul>
            </div>
        `,
        confirmButtonText: "Entendido",
        confirmButtonColor: "#2780F5",
        width: "450px",
        background: "#fff",
        customClass: {
          popup: "custom-swal-popup",
        },
      });
      e.target.value = "";
      return;
    }
    // Optional secondary validation by extension (for browsers missing MIME)
    const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"];
    if (!validExtensions.some((ext) => file.name.toLowerCase().endsWith(ext))) {
      alert(
        "El archivo debe ser una imagen válida (JPG, JPEG, PNG, GIF, BMP, TIFF, WebP)"
      );
      e.target.value = "";
      return;
    }

    const maxSizeMB = 10;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      Swal.fire({
        icon: "error",
        title: "Archivo demasiado grande",
        text: `El archivo no debe superar los ${maxSizeMB}MB`,
        confirmButtonText: "Entendido",
        confirmButtonColor: "#2780F5",
        width: "40%",
        maxWidth: "400px",
        padding: "20px",
        background: "#fff",
        customClass: {
          popup: "swal-responsive",
          confirmButton: "swal-btn-responsive",
        },
      });
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
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error analizando la imagen. Por favor, intenta nuevamente.",
        confirmButtonText: "Entendido",
        confirmButtonColor: "#FF4444",
        width: "40%",
        maxWidth: "400px",
        background: "#fff",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 class="main-title">Analizador de Imágenes</h1>
      <div className="upload-section">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="upload-input"
          id="file-upload-minimal"
        />
        <label
          htmlFor="file-upload-minimal"
          className="upload-button-responsive"
        >
          <span className="button-icon">📷</span>
          <span className="button-text">Seleccionar Imagen</span>
        </label>
        <p className="upload-hint-responsive">
          Formatos: JPG, PNG, GIF, BMP, TIFF, WebP • Máx. 10MB
        </p>
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
        <div className="results-grid">
          <h3 className="api-results-title">Resultados Consumo API</h3>
          <div className="tags-grid">
            {tags.map((tag, i) => (
              <div key={i} className="tag-card">
                <span className="card-label">{tag.label}</span>
                <span className="card-confidence">
                  {tag.confidence.toFixed(3)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
