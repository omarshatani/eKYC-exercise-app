import { Navigation } from "./navigation";
import { useThemeStore } from "@/store/theme/themeStore";

export function App() {
  const theme = useThemeStore((state) => state.theme);
  return <Navigation theme={theme} />;
}
