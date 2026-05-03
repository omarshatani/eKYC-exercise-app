import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { ErrorPalette, FontSize, Radius, Spacing } from "@/theme";
import { useAuthStore } from "@/store/authentication/authStore";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const AUTH_ERROR_MESSAGES = {
  invalid_credentials: "Incorrect email or password.",
  session_expired: "Your session has expired. Please sign in again.",
  generic: "Something went wrong. Please try again later.",
};

const LoginScreen = () => {
  const { colors } = useTheme();
  const { login, status, error } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const isLoggingIn = status === "logging_in";

  const validate = (): boolean => {
    let valid = true;

    if (!email.trim()) {
      setEmailError("Email is required.");
      valid = false;
    } else if (!EMAIL_REGEX.test(email)) {
      setEmailError("Enter a valid email address.");
      valid = false;
    }

    if (!password) {
      setPasswordError("Password is required.");
      valid = false;
    } else if (password.length < 4) {
      setPasswordError("Password must be at least 4 characters.");
      valid = false;
    }

    return valid;
  };

  console.log("error", error);

  const handleLogin = async () => {
    if (!validate()) return;
    await login(email, password);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.root, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.brand}>
          <View style={[styles.logoBox, { backgroundColor: colors.primary }]}>
            <Text style={styles.logoText}>eKYC</Text>
          </View>
          <Text style={[styles.heading, { color: colors.text }]}>
            Welcome back
          </Text>
          <Text style={[styles.subheading, { color: "#6B7280" }]}>
            Sign in to continue your verification
          </Text>
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, shadowColor: colors.text },
          ]}
        >
          <View style={styles.field}>
            <Text style={[styles.label, { color: colors.text }]}>
              Email address
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: emailError ? ErrorPalette.text : colors.border,
                  color: colors.text,
                  backgroundColor: colors.card,
                },
              ]}
              placeholder="you@example.com"
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={(v) => {
                setEmail(v);
                setEmailError("");
              }}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
              editable={!isLoggingIn}
            />
            {!!emailError && (
              <Text style={styles.fieldError}>{emailError}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={[styles.label, { color: colors.text }]}>Password</Text>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: passwordError
                    ? ErrorPalette.text
                    : colors.border,
                  color: colors.text,
                  backgroundColor: colors.card,
                },
              ]}
              placeholder="Min. 4 characters"
              placeholderTextColor="#9CA3AF"
              value={password}
              onChangeText={(v) => {
                setPassword(v);
                setPasswordError("");
              }}
              secureTextEntry
              editable={!isLoggingIn}
            />
            {!!passwordError && (
              <Text style={styles.fieldError}>{passwordError}</Text>
            )}
          </View>

          <TouchableOpacity
            style={[
              styles.submitButton,
              {
                backgroundColor: colors.primary,
                opacity: isLoggingIn ? 0.7 : 1,
              },
            ]}
            onPress={handleLogin}
            disabled={isLoggingIn}
            activeOpacity={0.85}
          >
            <Text style={styles.submitButtonText}>
              {isLoggingIn ? "Signing in…" : "Sign in"}
            </Text>
          </TouchableOpacity>

          {error !== null && (
            <View
              style={[
                styles.errorBanner,
                {
                  backgroundColor: ErrorPalette.bg,
                  borderColor: ErrorPalette.border,
                },
              ]}
            >
              <Text
                style={[styles.errorBannerText, { color: ErrorPalette.text }]}
              >
                {AUTH_ERROR_MESSAGES[error]}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xxl + 20,
    paddingBottom: Spacing.xl,
  },
  brand: {
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  logoBox: {
    width: 64,
    height: 64,
    borderRadius: Radius.lg,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: FontSize.sm,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  heading: {
    fontSize: FontSize["2xl"],
    fontWeight: "700",
    marginBottom: Spacing.xs,
  },
  subheading: {
    fontSize: FontSize.sm,
    textAlign: "center",
  },
  card: {
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    gap: Spacing.md,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  field: {
    gap: Spacing.xs,
  },
  label: {
    fontSize: FontSize.sm,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1.5,
    borderRadius: Radius.md,
    paddingVertical: 12,
    paddingHorizontal: Spacing.md,
    fontSize: FontSize.base,
  },
  fieldError: {
    fontSize: FontSize.xs,
    color: ErrorPalette.text,
  },
  submitButton: {
    borderRadius: Radius.md,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: Spacing.xs,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: FontSize.base,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  errorBanner: {
    borderRadius: Radius.md,
    padding: Spacing.md,
    borderWidth: 1,
  },
  errorBannerText: {
    fontSize: FontSize.sm,
    textAlign: "center",
  },
});
