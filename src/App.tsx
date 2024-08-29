import "./App.css";
import { Game } from "./page/Game";
import { PageLayout } from "./page/PageLayout";
import { ThemeProvider } from "./theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <PageLayout header={"The Wiki Game"} content={<Game />} />
    </ThemeProvider>
  );
}

export default App;
