import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FontSize, Radius, Spacing } from "@/theme";
import type { FormData, ThemeColors } from "./types";
import { DOCUMENT_TYPE_OPTIONS } from "./types";

type ReviewSectionProps = {
  title: string;
  rows: { label: string; value: string }[];
  colors: ThemeColors;
};

function ReviewSection({ title, rows, colors }: ReviewSectionProps) {
  return (
    <View style={reviewStyles.section}>
      <Text style={reviewStyles.sectionTitle}>{title}</Text>
      <View
        style={[
          reviewStyles.card,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        {rows.map((row, i) => (
          <View
            key={row.label}
            style={[
              reviewStyles.row,
              i < rows.length - 1 && {
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
              },
            ]}
          >
            <Text style={[reviewStyles.rowLabel, { color: "#6B7280" }]}>
              {row.label}
            </Text>
            <Text style={[reviewStyles.rowValue, { color: colors.text }]}>
              {row.value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export function StepReview({
  form,
  colors,
}: {
  form: FormData;
  colors: ThemeColors;
}) {
  const docTypeLabel =
    DOCUMENT_TYPE_OPTIONS.find((o) => o.value === form.documentType)?.label ??
    "—";

  return (
    <View style={styles.container}>
      <Text style={[styles.description, { color: "#6B7280" }]}>
        Review your information before submitting. Make sure all details are
        accurate.
      </Text>

      <ReviewSection
        title="Profile"
        rows={[
          { label: "Full Name", value: form.fullName || "—" },
          { label: "Date of Birth", value: form.dateOfBirth || "—" },
          { label: "Nationality", value: form.nationality || "—" },
        ]}
        colors={colors}
      />

      <ReviewSection
        title="Document"
        rows={[
          { label: "Type", value: docTypeLabel },
          { label: "Number", value: form.documentNumber || "—" },
        ]}
        colors={colors}
      />

      <ReviewSection
        title="Address"
        rows={[
          { label: "Address", value: form.addressLine || "—" },
          { label: "City", value: form.city || "—" },
          { label: "Country", value: form.country || "—" },
        ]}
        colors={colors}
      />
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
});

const reviewStyles = StyleSheet.create({
  section: {
    gap: Spacing.sm,
  },
  sectionTitle: {
    fontSize: FontSize.xs,
    fontWeight: "700",
    color: "#9CA3AF",
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
    paddingVertical: 12,
    paddingHorizontal: Spacing.md,
  },
  rowLabel: {
    fontSize: FontSize.sm,
  },
  rowValue: {
    fontSize: FontSize.sm,
    fontWeight: "600",
    maxWidth: "60%",
    textAlign: "right",
  },
});
