import Users from "./Users";
import Favorites from "./Favorites";
import { useTheme } from "../context/ThemeContext";

export default function Dashboard() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen p-6 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Author Dashboard</h1>
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Toggle Theme
        </button>
      </header>

      <main className="grid gap-6">
        <Users />
        <Favorites />
      </main>
    </div>
  );
}