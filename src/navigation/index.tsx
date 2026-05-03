import {
  createStaticNavigation,
  StaticParamList,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./screens/Home";
import LoginScreen from "@/features/login/screens/Login";
import OnboardingScreen from "@/features/onboarding/screens/Onboarding";
import SettingsScreen from "@/features/settings/screens/Settings";
import useIsSignedIn from "@/store/authentication/hooks/useIsSignedIn";
import useIsSignedOut from "@/store/authentication/hooks/useIsSignedOut";

const RootTabs = createBottomTabNavigator({
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons
            name={focused ? "home" : "home-outline"}
            size={size}
            color={color}
          />
        ),
      },
    },
    Settings: {
      screen: SettingsScreen,
      options: {
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons
            name={focused ? "settings" : "settings-outline"}
            size={size}
            color={color}
          />
        ),
      },
    },
  },
});

const RootStack = createNativeStackNavigator({
  groups: {
    Authenticated: {
      if: useIsSignedIn,
      screens: {
        RootTabs: {
          screen: RootTabs,
          options: {
            headerShown: false,
          },
        },
        Onboarding: {
          screen: OnboardingScreen,
          linking: {
            path: "onboarding/:step",
          },
        },
      },
    },
    Unauthenticated: {
      if: useIsSignedOut,
      screens: {
        Login: {
          screen: LoginScreen,
          options: {
            headerShown: false,
          },
        },
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
