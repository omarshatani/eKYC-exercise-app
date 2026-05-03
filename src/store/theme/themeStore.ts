import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface State {
  theme: typeof DefaultTheme | typeof DarkTheme;
}

interface Action {
  toggleTheme: () => void;
}

type ThemeStore = State & Action;

const initialState: State = {
  theme: DefaultTheme,
};

const themeStore = create<ThemeStore>()(
  persist(
    (set, getState, store) => ({
      ...initialState,
      toggleTheme: () => {
        set((state) => ({
          theme: state.theme === DefaultTheme ? DarkTheme : DefaultTheme,
        }));
      },
    }),
    {
      name: "theme-store",
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        theme: state.theme,
      }),
    },
  ),
);

export { themeStore as useThemeStore };
