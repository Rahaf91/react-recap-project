import { initialThemes } from "./lib/colors";
import "./App.css";
import Theme from "./Components/Theme/Theme";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";
import { useState } from "react";
import SelectTheme from "./Components/SelectTheme/SelectTheme";

function App() {
  const [selectedTheme, setSelectedTheme] = useState(initialThemes[0]);
  const [colorThemes, setColorThemes] = useLocalStorageState("colorThemes", {
    defaultValue: initialThemes.reduce((themes, theme) => {
      themes[theme.id] = theme.colors;
      return themes;
    }, {}),
  });

  const [themes, setThemes] = useState(initialThemes);
  //Select a Theme
  function handleThemeChange(event) {
    const selectedTheme = themes.find(
      (theme) => theme.id === event.target.value
    );
    setSelectedTheme(selectedTheme);
  }

  //Add new Theme to themes array

  function handleAddTheme(newThemeName) {
    const newTheme = {
      id: uid(),
      name: newThemeName,
    };
    setThemes([...themes, newTheme]);
    setSelectedTheme(newTheme);
    setColorThemes({
      ...colorThemes,
      [newTheme.id]: [],
    });
  }
  //rename the existing theme in themes array
  function handleEditThemeName(themeId, newName) {
    const updatedThemes = themes.map((theme) =>
      theme.id === themeId ? { ...theme, name: newName } : theme
    );
    setThemes(updatedThemes);
    setSelectedTheme(updatedThemes.find((theme) => theme.id === themeId));
  }

  function handleDeleteTheme() {
    const updatedThemes = themes.filter(
      (theme) => theme.id !== selectedTheme.id
    );

    setThemes(updatedThemes);
    setSelectedTheme(initialThemes[0]);
  }

  function handleAddColor(newColor) {
    const currentColors = colorThemes[selectedTheme.id];
    setColorThemes({
      ...colorThemes,
      [selectedTheme.id]: [{ id: uid(), ...newColor }, ...currentColors],
    });
  }

  function handleDeleteColor(id) {
    const currentColors = colorThemes[selectedTheme.id];
    const colorsToKeep = currentColors.filter((color) => color.id !== id);
    setColorThemes({
      ...colorThemes,
      [selectedTheme.id]: colorsToKeep,
    });
  }

  function handleEditColor(id, newColor) {
    const currentColors = colorThemes[selectedTheme.id];
    const newColors = currentColors.map((color) =>
      color.id === id ? { ...color, ...newColor } : color
    );
    setColorThemes({
      ...colorThemes,
      [selectedTheme.id]: newColors,
    });
  }

  return (
    <>
      <h1>Theme Creator</h1>
      <SelectTheme
        themes={themes}
        selectedTheme={selectedTheme}
        onThemeChange={handleThemeChange}
        onAddTheme={handleAddTheme}
        onEditTheme={handleEditThemeName}
        onDeleteTheme={handleDeleteTheme}
      />
      <Theme
        colors={colorThemes[selectedTheme.id]}
        handleAddColor={handleAddColor}
        handleDeleteColor={handleDeleteColor}
        handleEditColor={handleEditColor}
      />
    </>
  );
}

export default App;
