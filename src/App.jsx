import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import ColorForm from "./Components/ColorForm/ColorForm";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";
function App() {
  const [colors, setColors] = useLocalStorageState("colors", {
    defaultValue: initialColors,
  });

  function handleAddColor(newColor) {
    setColors([{ id: uid(), ...newColor }, ...colors]);
  }

  function handleDeleteColor(id) {
    const colorsToKeep = colors.filter((color) => color.id !== id);
    setColors(colorsToKeep);
  }

  function handleEditColor(id, newColor) {
    const newColors = colors.map((color) =>
      color.id === id ? { ...color, ...newColor } : color
    );
    setColors(newColors);
  }

  return (
    <div className={colors.length === 0 ? "dark-body" : ""}>
      <h1>Theme Creator</h1>
      <ColorForm text={"Add Color"} handleAddColor={handleAddColor} />
      <br />
      {colors.length === 0 ? ( //display a message encouraging users to add new colors.
        <p className="message">Let it shine again! Please add new colors!</p>
      ) : (
        colors.map((color) => (
          <Color
            key={color.id}
            color={color}
            handleDeleteColor={handleDeleteColor}
            handleEditColor={handleEditColor}
          />
        ))
      )}
    </div>
  );
}
export default App;
