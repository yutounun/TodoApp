import { useContext } from "react";
import { NAV_ITEMS } from "../libs/const";
import { Sun, Moon } from "lucide-react";
import { ThemeProvider } from "../providers/ThemeProvider";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeProvider);

  return (
    <div className="flex items-center justify-between bg-primary dark:bg-neutral-500 w-full h-16 px-16">
      <nav>
        <ul className="flex items-center gap-4 text-neutral-200">
          <li className="hover:text-neutral-100 transition-colors">
            <a href={NAV_ITEMS.HOME.href}>{NAV_ITEMS.HOME.label}</a>
          </li>
        </ul>
      </nav>
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full hover:bg-primary-foreground/10 transition-colors"
      >
        {theme === "light" ? (
          <Moon size={20} className="text-neutral-100" />
        ) : (
          <Sun size={20} className="text-neutral-100" />
        )}
      </button>
    </div>
  );
};

export default Header;
