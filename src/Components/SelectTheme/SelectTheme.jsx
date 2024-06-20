import { useState } from "react";

export default function SelectTheme({
  themes,
  selectedTheme,
  onThemeChange,
  onAddTheme,
  onEditTheme,
  onDeleteTheme,
}) {
  const [themeState, setThemeState] = useState({
    isAddingTheme: false,
    newThemeName: "",
    editingThemeId: null,
    editedThemeName: "",
    isDeleteConfirmation: false,
  });

  //Adding a New Theme
  function handleAddTheme() {
    setThemeState({
      ...themeState,
      isAddingTheme: true,
    });
  }
  //reset add theme and clear the newThemeName

  function handleCancelAdd() {
    setThemeState({
      ...themeState,
      isAddingTheme: false,
      newThemeName: "",
    });
  }
  //Updates the theme name depending on the input value
  function handleNameChange(event) {
    setThemeState({
      ...themeState,
      newThemeName: event.target.value,
    });
  }

  //handles the newname by calling the onAddTheme with the new name and reset add theme and clear the newThemeName/go back to the dropdown menu/
  function handleAddNewTheme() {
    onAddTheme(themeState.newThemeName);
    setThemeState({
      ...themeState,
      isAddingTheme: false,
      newThemeName: "",
    });
  }

  //Editing a Theme
  function handleEditTheme(themeId, themeName) {
    setThemeState({
      ...themeState,
      editingThemeId: themeId, //to know which theme is being edited
      editedThemeName: themeName, //display the current theme name
    });
  }

  //Cancels editing a theme
  function handleCancelEdit() {
    setThemeState({
      ...themeState,
      editingThemeId: null,
      editedThemeName: "",
    });
  }

  //calls onEditTheme to Execute  the edit of the theme name
  function handleEditThemeName() {
    onEditTheme(themeState.editingThemeId, themeState.editedThemeName);
    setThemeState({
      ...themeState,
      editingThemeId: null,
      editedThemeName: "",
    });
  }

  //shows the buttons and the paragraph to the user

  function handleDeleteTheme() {
    setThemeState({
      ...themeState,
      isDeleteConfirmation: true,
    });
  }

  //calls onDeleteTheme and hide the buttons and the paragraph /go back to dropdown/

  function handleConfirmDelete() {
    onDeleteTheme();

    setThemeState({
      ...themeState,
      isDeleteConfirmation: false,
    });
  }

  //Cancels the deletion of the theme
  function handleCancelDelete() {
    setThemeState({
      ...themeState,
      isDeleteConfirmation: false,
    });
  }

  const isDefaultTheme = selectedTheme.id === themes[0].id;

  return (
    <div>
      {themeState.isAddingTheme ? (
        <div>
          <input
            type="text"
            placeholder="Enter new theme name"
            value={themeState.newThemeName}
            onChange={handleNameChange}
          />
          <button type="button" onClick={handleAddNewTheme}>
            Add Theme
          </button>
          <button type="button" onClick={handleCancelAdd}>
            Cancel
          </button>
        </div>
      ) : themeState.editingThemeId !== null ? (
        <div>
          <input
            type="text"
            value={themeState.editedThemeName}
            onChange={(event) =>
              setThemeState({
                ...themeState,
                editedThemeName: event.target.value,
              })
            }
          />
          <button type="button" onClick={handleEditThemeName}>
            Update
          </button>
          <button type="button" onClick={handleCancelEdit}>
            Cancel
          </button>
        </div>
      ) : themeState.isDeleteConfirmation ? (
        <div>
          <p>Are you sure you want to delete the {selectedTheme.name}?</p>
          <button type="button" onClick={handleConfirmDelete}>
            Yes, Delete
          </button>
          <button type="button" onClick={handleCancelDelete}>
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <select value={selectedTheme.id} onChange={onThemeChange}>
            {themes.map((theme) => (
              <option key={theme.id} value={theme.id}>
                {theme.name}
              </option>
            ))}
          </select>
          <button type="button" onClick={handleAddTheme}>
            Add
          </button>
          <button
            className="themeButto"
            type="button"
            onClick={() =>
              handleEditTheme(selectedTheme.id, selectedTheme.name)
            }
            disabled={isDefaultTheme}
          >
            Edit
          </button>
          <button
            className="themeButto"
            type="button"
            onClick={handleDeleteTheme}
            disabled={isDefaultTheme}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
