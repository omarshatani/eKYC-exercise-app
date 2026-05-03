import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { ErrorPalette, Spacing } from "@/theme";
import { Field, fieldStyles } from "./Field";
import type { StepFormProps } from "./types";

export function StepProfile({ form, errors, onChange, colors }: StepFormProps) {
  return (
    <View style={styles.container}>
      <Field label="Full Name" error={errors.fullName} colors={colors}>
        <TextInput
          style={[
            fieldStyles.input,
            {
              borderColor: errors.fullName ? ErrorPalette.text : colors.border,
              color: colors.text,
              backgroundColor: colors.card,
            },
          ]}
          placeholder="Jane Doe"
          placeholderTextColor="#9CA3AF"
          value={form.fullName}
          onChangeText={(v) => onChange("fullName", v)}
        />
      </Field>

      <Field
        label="Date of Birth"
        hint="DD/MM/YYYY"
        error={errors.dateOfBirth}
        colors={colors}
      >
        <TextInput
          style={[
            fieldStyles.input,
            {
              borderColor: errors.dateOfBirth
                ? ErrorPalette.text
                : colors.border,
              color: colors.text,
              backgroundColor: colors.card,
            },
          ]}
          placeholder="15/05/1990"
          placeholderTextColor="#9CA3AF"
          value={form.dateOfBirth}
          onChangeText={(v) => onChange("dateOfBirth", v)}
          keyboardType="numeric"
        />
      </Field>

      <Field label="Nationality" error={errors.nationality} colors={colors}>
        <TextInput
          style={[
            fieldStyles.input,
            {
              borderColor: errors.nationality
                ? ErrorPalette.text
                : colors.border,
              color: colors.text,
              backgroundColor: colors.card,
            },
          ]}
          placeholder="e.g. American"
          placeholderTextColor="#9CA3AF"
          value={form.nationality}
          onChangeText={(v) => onChange("nationality", v)}
        />
      </Field>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.lg,
  },
});
