import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ErrorPalette, FontSize, Radius, Spacing } from "@/theme";
import { Field, fieldStyles } from "./Field";
import type { StepFormProps } from "./types";
import { DOCUMENT_TYPE_OPTIONS } from "./types";

export function StepDocument({
  form,
  errors,
  onChange,
  colors,
}: StepFormProps) {
  return (
    <View style={styles.container}>
      <Field label="Document Type" error={errors.documentType} colors={colors}>
        <View style={styles.chipRow}>
          {DOCUMENT_TYPE_OPTIONS.map((option) => {
            const isSelected = form.documentType === option.value;
            return (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.chip,
                  {
                    borderColor: isSelected ? colors.primary : colors.border,
                    backgroundColor: isSelected
                      ? colors.primary + "1A"
                      : colors.card,
                  },
                ]}
                onPress={() => onChange("documentType", option.value)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.chipText,
                    {
                      color: isSelected ? colors.primary : "#6B7280",
                      fontWeight: isSelected ? "700" : "500",
                    },
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Field>

      <Field
        label="Document Number"
        error={errors.documentNumber}
        colors={colors}
      >
        <TextInput
          style={[
            fieldStyles.input,
            {
              borderColor: errors.documentNumber
                ? ErrorPalette.text
                : colors.border,
              color: colors.text,
              backgroundColor: colors.card,
            },
          ]}
          placeholder="e.g. P12345678"
          placeholderTextColor="#9CA3AF"
          value={form.documentNumber}
          onChangeText={(v) => onChange("documentNumber", v)}
          autoCapitalize="characters"
        />
      </Field>

      <Field label="Document Image" colors={colors}>
        <View
          style={[
            styles.imagePlaceholder,
            { borderColor: colors.border, backgroundColor: colors.background },
          ]}
        >
          <Ionicons name="camera-outline" size={36} color="#9CA3AF" />
          <Text style={[styles.placeholderLabel, { color: "#6B7280" }]}>
            Capture document photo
          </Text>
          <Text style={styles.placeholderHint}>Camera capture coming soon</Text>
        </View>
      </Field>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.lg,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.full,
    borderWidth: 1.5,
  },
  chipText: {
    fontSize: FontSize.sm,
  },
  imagePlaceholder: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderRadius: Radius.lg,
    paddingVertical: Spacing.xl,
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
