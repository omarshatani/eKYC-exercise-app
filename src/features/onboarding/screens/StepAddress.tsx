import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { ErrorPalette, Spacing } from "@/theme";
import { Field, fieldStyles } from "./Field";
import type { StepFormProps } from "./types";

export function StepAddress({ form, errors, onChange, colors }: StepFormProps) {
  return (
    <View style={styles.container}>
      <Field label="Address Line" error={errors.addressLine} colors={colors}>
        <TextInput
          style={[
            fieldStyles.input,
            {
              borderColor: errors.addressLine
                ? ErrorPalette.text
                : colors.border,
              color: colors.text,
              backgroundColor: colors.card,
            },
          ]}
          placeholder="123 Main St, Apt 4B"
          placeholderTextColor="#9CA3AF"
          value={form.addressLine}
          onChangeText={(v) => onChange("addressLine", v)}
        />
      </Field>

      <Field label="City" error={errors.city} colors={colors}>
        <TextInput
          style={[
            fieldStyles.input,
            {
              borderColor: errors.city ? ErrorPalette.text : colors.border,
              color: colors.text,
              backgroundColor: colors.card,
            },
          ]}
          placeholder="Springfield"
          placeholderTextColor="#9CA3AF"
          value={form.city}
          onChangeText={(v) => onChange("city", v)}
        />
      </Field>

      <Field label="Country" error={errors.country} colors={colors}>
        <TextInput
          style={[
            fieldStyles.input,
            {
              borderColor: errors.country ? ErrorPalette.text : colors.border,
              color: colors.text,
              backgroundColor: colors.card,
            },
          ]}
          placeholder="United States"
          placeholderTextColor="#9CA3AF"
          value={form.country}
          onChangeText={(v) => onChange("country", v)}
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
