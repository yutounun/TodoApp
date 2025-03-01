import { createContext } from "react";
import { Theme } from "../constants/theme";

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({
  theme: "light",
  toggleTheme: () => {},
});

export default ThemeContext;
