import { useState, useEffect } from "react";
import "./Color.css";
import ColorForm from "../ColorForm/ColorForm";
import CopyToClipboard from "../CopyToClipboard/CopyToClipboard";

export default function Color({ color, handleDeleteColor, handleEditColor }) {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  const [checkContrast, setCheckContrast] = useState("");
  async function fetchContrast(foreground, background) {
    setCheckContrast("");
    try {
      const response = await fetch(
        "https://www.aremycolorsaccessible.com/api/are-they",
        {
          method: "POST",
          body: JSON.stringify({ colors: [foreground, background] }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const Data = await response.json();
      //console.log(Data);
      setCheckContrast(Data.overall);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch data! Status Code: ${response.status}`
        );
      }
    } catch (error) {
      setCheckContrast("Failed to load contrast data.");
    }
  }

  useEffect(() => {
    fetchContrast(color.hex, color.contrastText);
  }, [color.hex, color.contrastText]);

  const contrastClasses = () =>
    checkContrast === "Nope"
      ? "contrast_check_nope"
      : checkContrast === "Kinda"
      ? "contrast_check_kinda"
      : checkContrast === "Yup"
      ? "contrast_check_yup"
      : "contrast_check";
  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      <div>
        <h3 className="color-card-headline">{color.hex}</h3>
        <CopyToClipboard text={color.hex} />
      </div>

      <h4>{color.role}</h4>
      <p>Contrast: {color.contrastText}</p>

      <p className={`contrast-check ${contrastClasses()}`}>
        Overall Contrast Score: {checkContrast}
      </p>

      {!isEdited && !isConfirmed && (
        <>
          <button type="button" onClick={() => setIsConfirmed(true)}>
            Delete
          </button>
          <button type="button" onClick={() => setIsEdited(true)}>
            Edit
          </button>
        </>
      )}

      {!isEdited && isConfirmed && (
        <>
          <h4 className="color-card-highlight">Sure?</h4>
          <button type="button" onClick={() => setIsConfirmed(false)}>
            Cancel
          </button>
          <button type="button" onClick={() => handleDeleteColor(color.id)}>
            Delete
          </button>
        </>
      )}

      {isEdited && (
        <>
          <ColorForm
            fetchContrast={fetchContrast}
            text="Update Color"
            handleAddColor={(newColor) => {
              handleEditColor(color.id, newColor);
              setIsEdited(false); // To exit the edit mode
            }}
          />
          <button type="button" onClick={() => setIsEdited(false)}>
            Cancel
          </button>
        </>
      )}
    </div>
  );
}
