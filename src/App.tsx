import "./App.css";
import { Game } from "./page/Game";
import { PageLayout } from "./page/PageLayout";
import { ThemeProvider } from "./theme-provider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route
            path="/"
            element={<PageLayout header={"The Wiki Game"} content={<Game />} />}
          />
          <Route
            path="/:game_id"
            element={<PageLayout header={"The Wiki Game"} content={<Game />} />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
