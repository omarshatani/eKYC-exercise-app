import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontSize, Radius, Spacing } from "@/theme";
import type { ThemeColors } from "./types";

export function StepSelfie({ colors }: { colors: ThemeColors }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.description, { color: "#6B7280" }]}>
        Take a selfie to verify your identity. Make sure your face is clearly
        visible and well-lit.
      </Text>
      <View
        style={[
          styles.imagePlaceholder,
          { borderColor: colors.border, backgroundColor: colors.background },
        ]}
      >
        <Ionicons name="person-circle-outline" size={64} color="#9CA3AF" />
        <Text style={[styles.placeholderLabel, { color: "#6B7280" }]}>
          Capture selfie
        </Text>
        <Text style={styles.placeholderHint}>Camera capture coming soon</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.lg,
  },
  description: {
    fontSize: FontSize.sm,
    lineHeight: 22,
  },
  imagePlaceholder: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderRadius: Radius.lg,
    paddingVertical: Spacing.xxl,
    alignItems: "center",
    gap: Spacing.sm,
  },
  placeholderLabel: {
    fontSize: FontSize.base,
    fontWeight: "600",
  },
  placeholderHint: {
    fontSize: FontSize.xs,
    color: "#9CA3AF",
  },
});
