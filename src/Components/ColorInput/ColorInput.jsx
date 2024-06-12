import "./ColorInput.css";
import { useState } from "react";

function ColorInput({ id, defaultvalue }) {
  const [color, setColor] = useState(defaultvalue);

  return (
    <>
      <input
        type="text"
        id={id}
        name={id}
        value={color}
        onChange={(event) => setColor(event.target.value)}
        required
      />
      <input
        type="color"
        value={color}
        onChange={(event) => setColor(event.target.value)}
      />
    </>
  );
}
export default ColorInput;
