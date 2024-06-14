import ColorInput from "../ColorInput/ColorInput";
import "./ColorForm.css";
export default function ColorForm({
  text,
  handleAddColor,
  initialData = { role: "some color", hex: "#123456", contrastText: "#ffffff" },
}) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const addColor = Object.fromEntries(formData);
    handleAddColor(addColor);
    event.target.elements.role.focus();
  }

  return (
    <form className="color-form" onSubmit={handleSubmit}>
      <label className="color-lable" htmlFor="role">
        Role
        <br />
        <input
          className="color-input"
          type="text"
          id="role"
          name="role"
          defaultValue={initialData.role}
        />
      </label>
      <br />
      <label className="color-lable" htmlFor="hex">
        Hex
        <br />
        <ColorInput id="hex" defaultValue={initialData.hex} />
      </label>
      <br />
      <label className="color-lable" htmlFor="contrastText">
        Contrast Text
        <br />
        <ColorInput id="contrastText" defaultValue={initialData.contrastText} />
      </label>
      <br />

      <button type="submit">{text}</button>
    </form>
  );
}
