import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { FontSize, Radius, Spacing } from "@/theme";
import { STEP_TITLES, TOTAL_STEPS } from "@/features/onboarding/screens/types";
import useFetchUser from "@/features/user/hooks/useFetchUser";
import { useAuthStore } from "@/store/authentication/authStore";
import { useOnboardingStore } from "@/store/onboarding/onboardingStore";

const HomeScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { fetchUser } = useFetchUser();
  const user = useAuthStore((state) => state.user);

  const draft = useOnboardingStore((state) => state.draft);
  const currentStep = useOnboardingStore((state) => state.currentStep);
  const draftStep = draft !== null ? currentStep : null;

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      {user && (
        <Text style={[styles.title, { color: colors.text }]}>
          Welcome, {user.fullName}
        </Text>
      )}

      {draftStep === null ? (
        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Ionicons
            name="document-text-outline"
            size={40}
            color="#9CA3AF"
            style={styles.cardIcon}
          />
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            No application started
          </Text>
          <Text style={[styles.cardSubtitle, { color: "#6B7280" }]}>
            Complete your identity verification to get started.
          </Text>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={() => navigation.navigate("Onboarding" as never)}
            activeOpacity={0.85}
          >
            <Ionicons name="add" size={18} color="#FFFFFF" />
            <Text style={styles.buttonText}>Start Application</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <View style={styles.badgeRow}>
            <View style={[styles.badge, { backgroundColor: colors.primary }]}>
              <Text style={[styles.badgeText, { color: colors.card }]}>
                In Progress
              </Text>
            </View>
          </View>

          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Application in progress
          </Text>
          <Text style={[styles.cardSubtitle, { color: "#6B7280" }]}>
            Step {draftStep} of {TOTAL_STEPS} · {STEP_TITLES[draftStep - 1]}
          </Text>

          <View
            style={[styles.progressTrack, { backgroundColor: colors.border }]}
          >
            <View
              style={[
                styles.progressFill,
                {
                  backgroundColor: colors.primary,
                  width: `${(draftStep / TOTAL_STEPS) * 100}%`,
                },
              ]}
            />
          </View>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={() => navigation.navigate("Onboarding" as never)}
            activeOpacity={0.85}
          >
            <Ionicons name="play" size={16} color="#FFFFFF" />
            <Text style={styles.buttonText}>Resume Application</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: Spacing.lg,
  },
  title: {
    fontSize: FontSize["2xl"],
    fontWeight: "700",
    marginBottom: Spacing.xl,
  },
  card: {
    borderRadius: Radius.lg,
    borderWidth: 1,
    padding: Spacing.lg,
    gap: Spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardIcon: {
    alignSelf: "center",
    marginBottom: Spacing.xs,
  },
  badgeRow: {
    flexDirection: "row",
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: Spacing.sm,
    borderRadius: Radius.full,
  },
  badgeText: {
    fontSize: FontSize.xs,
    fontWeight: "700",
  },
  cardTitle: {
    fontSize: FontSize.lg,
    fontWeight: "700",
  },
  cardSubtitle: {
    fontSize: FontSize.sm,
    lineHeight: 20,
  },
  progressTrack: {
    height: 6,
    borderRadius: Radius.full,
    overflow: "hidden",
  },
  progressFill: {
    height: 6,
    borderRadius: Radius.full,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.xs,
    borderRadius: Radius.md,
    paddingVertical: 13,
    marginTop: Spacing.xs,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: FontSize.base,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});
