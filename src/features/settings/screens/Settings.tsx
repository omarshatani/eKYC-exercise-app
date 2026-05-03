import React, { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { FontSize, Radius, Spacing } from "@/theme";

export default function SettingsScreen() {
  const { colors } = useTheme();

  // Placeholder — will be replaced by global theme state
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <Text style={[styles.pageTitle, { color: colors.text }]}>Settings</Text>

      <View style={styles.section}>
        <Text style={[styles.sectionLabel, { color: "#9CA3AF" }]}>
          Appearance
        </Text>
        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <View style={styles.row}>
            <View style={styles.rowInfo}>
              <Text style={[styles.rowLabel, { color: colors.text }]}>
                Dark Mode
              </Text>
              <Text style={[styles.rowHint, { color: "#9CA3AF" }]}>
                Switch between light and dark theme
              </Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={setIsDarkMode}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: Spacing.lg,
  },
  pageTitle: {
    fontSize: FontSize["2xl"],
    fontWeight: "700",
    marginBottom: Spacing.xl,
  },
  section: {
    gap: Spacing.sm,
  },
  sectionLabel: {
    fontSize: FontSize.xs,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  card: {
    borderRadius: Radius.md,
    borderWidth: 1,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  rowInfo: {
    flex: 1,
    marginRight: Spacing.md,
  },
  rowLabel: {
    fontSize: FontSize.base,
    fontWeight: "600",
  },
  rowHint: {
    fontSize: FontSize.xs,
    marginTop: 2,
  },
});
