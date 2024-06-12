import "./ColorForm.css";
import ColorInput from "../ColorInput/ColorInput";
//not done
function ColorForm({
  AddColor,
  role = "Some color",
  hex = "#123456",
  contrastColor = "#ffffff",
}) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    AddColor(data);
    event.target.reset();
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="role">Role</label>

      <input id="role" type="text" name="role" defaultValue={role} required />
      <label htmlFor="hex">Hex</label>
      <ColorInput id="hex" defaultValue={hex} />

      <label htmlFor="contrastColor">Contrast Text</label>
      <ColorInput id="contrastColor" defaultValue={contrastColor} />

      <button type="submit">Add Color</button>
    </form>
  );
}
export default ColorForm;
