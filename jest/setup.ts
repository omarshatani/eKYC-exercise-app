// Include this line for mocking react-native-gesture-handler
import "react-native-gesture-handler/jestSetup";

// Include this section for mocking react-native-reanimated
import { setUpTests } from "react-native-reanimated";

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
import { jest } from "@jest/globals";

setUpTests();

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");
