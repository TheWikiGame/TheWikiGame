import "./App.css";
import { Game } from "./page/Game";
import { ThemeProvider } from "./theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div>
        <h1>Wiki Game</h1>
        <Game />
      </div>
    </ThemeProvider>
  );
}

export default App;
