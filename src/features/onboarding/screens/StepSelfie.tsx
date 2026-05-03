import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontSize, Radius, Spacing } from "@/theme";
import type { ThemeColors } from "./types";

type StepSelfieProps = {
  hasSelfie: boolean;
  onCapture: () => void;
  colors: ThemeColors;
};

export const StepSelfie = ({
  hasSelfie,
  onCapture,
  colors,
}: StepSelfieProps) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.description, { color: "#6B7280" }]}>
        Take a selfie to verify your identity. Make sure your face is clearly
        visible and well-lit.
      </Text>

      <View
        style={[
          styles.captureArea,
          { borderColor: colors.border, backgroundColor: colors.background },
        ]}
      >
        <Ionicons name="person-circle-outline" size={64} color="#9CA3AF" />
        <Text style={[styles.captureLabel, { color: "#6B7280" }]}>
          {hasSelfie ? "Selfie captured" : "No selfie taken yet"}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={onCapture}
        activeOpacity={0.85}
      >
        <Ionicons name="camera" size={18} color="#FFFFFF" />
        <Text style={styles.buttonText}>
          {hasSelfie ? "Retake Selfie" : "Take Selfie"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: Spacing.lg,
  },
  description: {
    fontSize: FontSize.sm,
    lineHeight: 22,
  },
  captureArea: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderRadius: Radius.lg,
    paddingVertical: Spacing.xxl,
    alignItems: "center",
    gap: Spacing.sm,
  },
  captureLabel: {
    fontSize: FontSize.base,
    fontWeight: "600",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.xs,
    borderRadius: Radius.md,
    paddingVertical: 13,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: FontSize.base,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});
