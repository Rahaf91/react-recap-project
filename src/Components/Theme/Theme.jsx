import ColorForm from "../ColorForm/ColorForm";
import Color from "../Color/Color";

export default function Theme({
  colors,
  handleAddColor,
  handleDeleteColor,
  handleEditColor,
}) {
  return (
    <div>
      <ColorForm text="Add Color" handleAddColor={handleAddColor} />
      {!colors || colors.length === 0 ? (
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
