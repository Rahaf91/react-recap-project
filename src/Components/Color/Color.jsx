import { useState } from "react";
import "./Color.css";

export default function Color({ color, handleDeleteColor }) {
  //Introduce a state to handle the confirmation message
  const [isConfirmed, setIsConfirmed] = useState(false); //The current state is false

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
      {isConfirmed ? ( // if isConfirmed is true then show the heading and two buttons delete(it calls the handleDeleteColor(color.id) ) and cancel(it sets the value to false)
        <>
          <h4 className="color-card-highlight">Really delete?</h4>
          <button
            type="button"
            onClick={() => {
              handleDeleteColor(color.id);
            }}
          >
            delete
          </button>
          <button
            type="button"
            onClick={() => {
              setIsConfirmed(false); //to cancel the deletion
            }}
          >
            Cancel
          </button>
        </>
      ) : (
        // If isConfirmed is false, then show the Delete button
        <button
          type="button"
          onClick={() => {
            setIsConfirmed(true); // set the value to true to show the message and the buttons
          }}
        >
          Delete
        </button>
      )}
    </div>
  );
}
