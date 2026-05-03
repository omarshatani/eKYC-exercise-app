import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { ErrorPalette, FontSize, Radius, Spacing } from "@/theme";
import {
  type ApiFieldError,
  type FormData,
  INITIAL_FORM,
  STEP_TITLES,
  TOTAL_STEPS,
} from "./types";
import { StepProfile } from "./StepProfile";
import { StepDocument } from "./StepDocument";
import { StepSelfie } from "./StepSelfie";
import { StepAddress } from "./StepAddress";
import { StepReview } from "./StepReview";

const OnboardingScreen = () => {
  const { colors } = useTheme();

  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  // Placeholder — will be populated from API response after draft submission
  const [apiErrors] = useState<ApiFieldError[]>([]);

  const updateField = <K extends keyof FormData>(
    key: K,
    value: FormData[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1);
    } else {
      // TODO: call submission API and populate apiErrors from response
    }
  };

  const handleBack = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const isLastStep = step === TOTAL_STEPS;

  return (
    <KeyboardAvoidingView
      style={[styles.root, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Progress header */}
      <View
        style={[
          styles.progressHeader,
          { backgroundColor: colors.card, borderBottomColor: colors.border },
        ]}
      >
        <Text style={[styles.stepCounter, { color: "#6B7280" }]}>
          Step {step} of {TOTAL_STEPS}
        </Text>
        <View style={styles.progressBar}>
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.progressSegment,
                { backgroundColor: i < step ? colors.primary : colors.border },
                i < TOTAL_STEPS - 1 && styles.progressSegmentGap,
              ]}
            />
          ))}
        </View>
        <Text style={[styles.stepTitle, { color: colors.text }]}>
          {STEP_TITLES[step - 1]}
        </Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {step === 1 && (
          <StepProfile
            form={form}
            errors={{}}
            onChange={updateField}
            colors={colors}
          />
        )}
        {step === 2 && (
          <StepDocument
            form={form}
            errors={{}}
            onChange={updateField}
            colors={colors}
          />
        )}
        {step === 3 && (
          <StepSelfie
            hasSelfie={form.hasSelfie}
            onCapture={() => updateField("hasSelfie", true)}
            colors={colors}
          />
        )}
        {step === 4 && (
          <StepAddress
            form={form}
            errors={{}}
            onChange={updateField}
            colors={colors}
          />
        )}
        {step === 5 && <StepReview form={form} colors={colors} />}

        {/* API error banner — visible on step 5 after a failed submission */}
        {isLastStep && apiErrors.length > 0 && (
          <View
            style={[
              styles.apiErrorBanner,
              {
                backgroundColor: ErrorPalette.bg,
                borderColor: ErrorPalette.border,
              },
            ]}
          >
            <Text style={[styles.apiErrorTitle, { color: ErrorPalette.text }]}>
              Please correct the following:
            </Text>
            {apiErrors.map((e, i) => (
              <Text
                key={i}
                style={[styles.apiErrorItem, { color: ErrorPalette.text }]}
              >
                {"• "}
                {e.field}: {e.message}
              </Text>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Footer navigation */}
      <View
        style={[
          styles.footer,
          { backgroundColor: colors.card, borderTopColor: colors.border },
        ]}
      >
        {step > 1 ? (
          <TouchableOpacity
            style={[styles.backButton, { borderColor: colors.primary }]}
            onPress={handleBack}
            activeOpacity={0.8}
          >
            <Ionicons name="arrow-back" size={16} color={colors.primary} />
            <Text style={[styles.backButtonText, { color: colors.primary }]}>
              Back
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.footerSpacer} />
        )}

        <TouchableOpacity
          style={[styles.nextButton, { backgroundColor: colors.primary }]}
          onPress={handleNext}
          activeOpacity={0.85}
        >
          <Text style={styles.nextButtonText}>
            {isLastStep ? "Submit" : "Next"}
          </Text>
          {!isLastStep && (
            <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  progressHeader: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
    borderBottomWidth: 1,
  },
  stepCounter: {
    fontSize: FontSize.xs,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: Spacing.sm,
  },
  progressBar: {
    flexDirection: "row",
    marginBottom: Spacing.sm,
  },
  progressSegment: {
    flex: 1,
    height: 4,
    borderRadius: Radius.full,
  },
  progressSegmentGap: {
    marginRight: 4,
  },
  stepTitle: {
    fontSize: FontSize.xl,
    fontWeight: "700",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: Spacing.lg,
    gap: Spacing.lg,
  },
  apiErrorBanner: {
    borderRadius: Radius.md,
    padding: Spacing.md,
    borderWidth: 1,
    gap: Spacing.xs,
  },
  apiErrorTitle: {
    fontSize: FontSize.sm,
    fontWeight: "700",
  },
  apiErrorItem: {
    fontSize: FontSize.sm,
    lineHeight: 20,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    paddingVertical: 11,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1.5,
  },
  backButtonText: {
    fontSize: FontSize.sm,
    fontWeight: "600",
  },
  footerSpacer: {
    width: 80,
  },
  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    paddingVertical: 12,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.md,
  },
  nextButtonText: {
    fontSize: FontSize.sm,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
});
