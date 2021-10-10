import { themes } from "./data/Themes";
import { useThemeContext } from "./contexts/useThemeContext";

function ThemedButton() {
  const {
    state: { theme },
    dispatch,
  } = useThemeContext();

  return (
    <button
      style={{ backgroundColor: theme.background, color: theme.foreground }}
      onClick={() =>
        dispatch({
          type: theme.background === themes.dark.background ? "light" : "dark",
        })
      }
    >
      Change Theme
    </button>
  );
}

export default ThemedButton;
