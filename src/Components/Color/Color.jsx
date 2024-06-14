import { useState } from "react";
import "./Color.css";
import ColorForm from "../ColorForm/ColorForm";

export default function Color({ color, handleDeleteColor, handleEditColor }) {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      <h3 className="color-card-headline">{color.hex}</h3>
      <h4>{color.role}</h4>
      <p>contrast: {color.contrastText}</p>

      {!isEdited && !isConfirmed && (
        <>
          <button
            type="button"
            onClick={() => {
              setIsConfirmed(true);
            }}
          >
            Delete
          </button>

          <button
            type="button"
            onClick={() => {
              setIsEdited(true);
            }}
          >
            Edit
          </button>
        </>
      )}

      {!isEdited && isConfirmed && (
        <>
          <h4 className="color-card-highlight">Sure?</h4>
          <button
            type="button"
            onClick={() => {
              setIsConfirmed(false);
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              handleDeleteColor(color.id);
            }}
          >
            Delete
          </button>
        </>
      )}

      {isEdited && (
        <>
          <ColorForm
            text={"Update Color"}
            handleAddColor={(newColor) => {
              handleEditColor(color.id, newColor);
              setIsEdited(false); // To exit the edit mode
            }}
          />
          <button
            type="button"
            onClick={() => {
              setIsEdited(false);
            }}
          >
            Cancel
          </button>
        </>
      )}
    </div>
  );
}
