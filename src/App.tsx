import { Navigation } from "./navigation";
import { useThemeStore } from "@/store/theme/themeStore";
import * as Linking from "expo-linking";

export function App() {
  const theme = useThemeStore((state) => state.theme);
  return (
    <Navigation
      theme={theme}
      linking={{
        enabled: "auto",
        prefixes: [Linking.createURL("/")],
      }}
    />
  );
}
