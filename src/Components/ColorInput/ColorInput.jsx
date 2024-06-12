import { useState } from "react";

export default function ColorInput({ id, defaultValue }) {
  const [input, setInput] = useState(defaultValue);

  return (
    <>
      <input
        type="text"
        id={id}
        name={id}
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
      <input
        type="color"
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
    </>
  );
}
