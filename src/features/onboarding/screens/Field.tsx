import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ErrorPalette, FontSize, Radius, Spacing } from "@/theme";
import type { ThemeColors } from "./types";

type FieldProps = {
  label: string;
  hint?: string;
  error?: string;
  colors: ThemeColors;
  children: React.ReactNode;
};

export function Field({ label, hint, error, colors, children }: FieldProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.labelRow}>
        <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
        {hint ? <Text style={styles.hint}>{hint}</Text> : null}
      </View>
      {children}
      {error ? (
        <Text style={[styles.error, { color: ErrorPalette.text }]}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

export const fieldStyles = StyleSheet.create({
  input: {
    borderWidth: 1.5,
    borderRadius: Radius.md,
    paddingVertical: 12,
    paddingHorizontal: Spacing.md,
    fontSize: FontSize.base,
  },
});

const styles = StyleSheet.create({
  wrapper: {
    gap: Spacing.xs,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  label: {
    fontSize: FontSize.sm,
    fontWeight: "600",
  },
  hint: {
    fontSize: FontSize.xs,
    color: "#9CA3AF",
  },
  error: {
    fontSize: FontSize.xs,
  },
});
