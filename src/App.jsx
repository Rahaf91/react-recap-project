import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import ColorForm from "./Components/ColorForm/ColorForm";
import { useState } from "react";
import { uid } from "uid";

function App() {
  const [colors, setColors] = useState(initialColors);

  function handleAddColor(newColor) {
    setColors([{ id: uid(), ...newColor }, ...colors]);
  }

  //function to handle the deletion of a color.
  function handleDeleteColor(id) {
    const colorsToKeep = colors.filter((color) => color.id !== id);
    setColors(colorsToKeep);
  }
  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm handleAddColor={handleAddColor} />
      <br />
      {colors.length === 0 ? ( //display a message encouraging users to add new colors.
        <p className="message">Please add new colors!</p>
      ) : (
        colors.map((color) => (
          <Color
            key={color.id}
            color={color}
            handleDeleteColor={handleDeleteColor}
          />
        ))
      )}
    </>
  );
}
export default App;
