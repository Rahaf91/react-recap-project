import { useState } from "react";
import "./Color.css";
import ColorForm from "../ColorForm/ColorForm";

export default function Color({ color, handleDeleteColor, handleEditColor }) {
  const [isConfirmed, setIsConfirmed] = useState(false);
  //4- Introduce a state for the edit
  const [isEdited, setIsEdited] = useState(false);

  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      {isEdited ? ( //Reuse the ColorForm Component and display it within the Color Component when in edit mode
        <ColorForm
          text={"Update Color"}
          handleAddColor={(newColor) => {
            handleEditColor(color.id, newColor);
            setIsEdited(false); //To exit the edit mode
          }}
        />
      ) : (
        <>
          <h3 className="color-card-headline">{color.hex}</h3>
          <h4>{color.role}</h4>
          <p>contrast: {color.contrastText}</p>
          {isConfirmed ? (
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
          ) : (
            <button
              type="button"
              onClick={() => {
                setIsConfirmed(true);
              }}
            >
              Delete
            </button>
          )}
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
    </div>
  );
}
