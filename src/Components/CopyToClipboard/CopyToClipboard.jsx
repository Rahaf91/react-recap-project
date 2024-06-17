import { useState, useEffect } from "react";

export default function CopyToClipboard({ text }) {
  //Introduce a state that handles the confirmation message
  const [isCopied, setIsCopied] = useState(false);

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
    } catch (error) {
      alert("Failed to copy to clipboard. Please try again.");
    }
  }

  //Confirmation message disappears after 3 seconds
  useEffect(() => {
    if (isCopied) {
      const timer = setInterval(() => {
        setIsCopied(false);
      }, 3000);

      // cleanup function
      return () => {
        clearInterval(timer);
      };
    }
  }, [isCopied]); //this effect will run every time the state of isCopied changes.

  return (
    <button type="button" onClick={copyToClipboard}>
      {isCopied ? "Copied successfully!" : "Copy Code"}
    </button>
  );
}
