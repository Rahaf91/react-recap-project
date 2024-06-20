import ColorForm from "../ColorForm/ColorForm";
import Color from "../Color/Color";

export default function Theme({
  colors,
  handleAddColor,
  handleDeleteColor,
  handleEditColor,
}) {
  if (!colors || colors.length === 0) {
    return (
      <div>
        <ColorForm text={"Add Color"} handleAddColor={handleAddColor} />
        <p className="message">Let it shine again! Please add new colors!</p>
      </div>
    );
  }

  return (
    <div>
      <ColorForm text={"Add Color"} handleAddColor={handleAddColor} />
      {colors.map((color) => (
        <Color
          key={color.id}
          color={color}
          handleDeleteColor={handleDeleteColor}
          handleEditColor={handleEditColor}
        />
      ))}
    </div>
  );
}
