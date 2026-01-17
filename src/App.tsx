import { Routes, Route, Link } from "react-router-dom";
import Users from "./pages/Users";
import UserDetail from "./pages/UserDetail";
import FavoritesPage from "./pages/FavoritesPage";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

function AppContent() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-primary-50 text-primary-900 dark:bg-gray-900 dark:text-white transition-colors duration-500">
      <header className="bg-primary-500 dark:bg-blue-800 text-white p-4 shadow-md transition-colors duration-500">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Author Dashboard</h1>
          <nav className="space-x-4">
            <Link className="hover:underline" to="/">Authors</Link>
            <Link className="hover:underline" to="/favorites">Favorites</Link>
            <button
              onClick={toggleTheme}
              className="ml-4 px-3 py-1 bg-white dark:bg-gray-700 text-black dark:text-white rounded hover:opacity-80 transition-colors"
            >
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
