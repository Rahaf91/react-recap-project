import { useState } from "react";
import "./Color.css";

export default function Color({ color, handleDeleteColor }) {
  const [isConfirmed, setIsConfirmed] = useState(false);

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
      {isConfirmed ? (
        <>
          <h4 className="color-card-highlight">Sure?</h4>
          <button
            type="button"
            onClick={() => {
              handleDeleteColor(color.id);
            }}
          >
            Delete
          </button>
          <button
            type="button"
            onClick={() => {
              setIsConfirmed(false);
            }}
          >
            Cancel
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
    </div>
  );
}
