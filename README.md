# eKYC Exercise App

A React Native mobile application that walks users through an electronic Know Your Customer (eKYC) identity verification
flow. Built as an exercise project to demonstrate feature-based architecture, global state management, and clean
separation between UI and service layers.

---

## Background

eKYC (electronic Know Your Customer) is the process of verifying a user's identity digitally — typically by collecting
personal details, identity documents, a selfie, and a residential address. This app simulates that flow with mock API
services that replicate realistic server behaviour including transient 500 errors, 401 token invalidation, and
field-level 422 validation errors.

---

## Features

| Screen         | Description                                                                                                                                                                  |
|----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Login**      | Email + password authentication. Displays contextual error messages for invalid credentials and generic server errors.                                                       |
| **Home**       | Entry point after login. Shows a "Start Application" card when no draft exists, or a "Resume Application" card with live progress when a draft is in progress.               |
| **Onboarding** | 5-step identity verification form (Profile → Document → Selfie → Address → Review & Submit). Form state is persisted globally so the user can leave and resume at any point. |
| **Settings**   | Dark / light theme toggle powered by the global theme store.                                                                                                                 |

### Onboarding Steps

1. **Profile** — Full name, date of birth, nationality
2. **Document** — Document type (Passport, National ID, Driver's License), document number, document image placeholder
3. **Selfie** — Selfie capture placeholder
4. **Address** — Address line, city, country
5. **Review & Submit** — Summary of all entered data before final submission

---

## Tech Stack

| Library              | Version | Purpose                                 |
|----------------------|---------|-----------------------------------------|
| React Native         | 0.81.5  | Core mobile framework                   |
| Expo                 | 54.0.1  | Build tooling and native modules        |
| TypeScript           | 5.9.2   | Static typing                           |
| React Navigation     | 7.x     | Navigation (native stack + bottom tabs) |
| Zustand              | 5.0.12  | Global state management                 |
| AsyncStorage         | 2.2.0   | Persistent store hydration              |
| `@expo/vector-icons` | 15.x    | Ionicons icon set                       |

---

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- [pnpm](https://pnpm.io/) (`npm install -g pnpm`)
- [Expo CLI](https://docs.expo.dev/more/expo-cli/) (`npm install -g expo-cli`)
- For iOS: Xcode with a simulator configured
- For Android: Android Studio with an emulator configured (or a physical device)

---

## Installation

```sh
# 1. Clone the repository
git clone <repo-url>
cd ekyc-exercise-app

# 2. Install dependencies
pnpm install
```

---

## Running the App

```sh
# Start the Expo development server
pnpm start

# Run on iOS simulator
pnpm ios

# Run on Android emulator / device
pnpm android

# Run in the browser (limited functionality)
pnpm web
```

From the Expo development server terminal you can also press:

- `i` — open iOS simulator
- `a` — open Android emulator
- `w` — open in web browser

---

## Mock Credentials

The app uses mock service implementations. Use the following credentials to log in:

| Field    | Value                  |
|----------|------------------------|
| Email    | `jane.doe@example.com` |
| Password | `test`                 |

> The mock `LoginService` returns a 401 for any other credentials, and has a 10% chance of throwing a transient 500
> error to simulate real-world network failures.

---

## How It Works

### Authentication Flow

1. The user enters credentials on the **Login** screen.
2. `useAuthStore.login()` calls `LoginService.apiLogin()`.
3. On success the store transitions to `status: "logged_in"` and persists the `session` and `user` to AsyncStorage.
4. React Navigation's `useIsSignedIn` / `useIsSignedOut` hooks drive which navigation group is rendered (`Authenticated`
   vs `Unauthenticated`).
5. The `withAuthRetry` utility transparently refreshes the access token on a 401 and retries the original request before
   surfacing an error to the UI.

### Onboarding Flow

1. From **Home**, the user taps **Start Application** to navigate to the Onboarding screen.
2. As the user fills in fields, each `updateField` call maps the flat form key to the corresponding nested path in
   `OnboardingDraft` via `useOnboardingStore.updateDraft()`.
3. The draft is persisted to AsyncStorage after every field change — the user can close the app and resume exactly where
   they left off.
4. On the **Review & Submit** step, tapping **Submit** calls `useDraftSubmit`, which wraps
   `OnboardingService.apiSubmit()` inside `withAuthRetry`.
5. On a successful `RECEIVED` response, the draft is cleared, an alert is shown, and the navigation stack is reset to
   Home (preventing back navigation to the completed form).
6. On a `422` validation error the field-level errors are surfaced in the error banner on step 5.

### State Architecture

```
src/store/
├── authentication/
│   ├── authStore.ts        — session, user, auth status, login/logout/refresh
│   └── hooks/
│       ├── useIsSignedIn.ts
│       └── useIsSignedOut.ts
├── onboarding/
│   └── onboardingStore.ts  — draft (OnboardingDraft), currentStep, updateDraft
└── theme/
    └── themeStore.ts       — DefaultTheme / DarkTheme toggle
```

All stores use Zustand `persist` middleware backed by AsyncStorage. Only the data needed for resume (session, draft,
currentStep, status) is serialised via `partialize`.

---

## Project Structure

```
src/
├── features/
│   ├── login/
│   │   ├── api/
│   │   │   ├── LoginService.ts       — mock apiLogin / apiRefresh
│   │   │   ├── types.ts              — LoginService interface
│   │   │   └── models/               — User, Session, LoginResponse
│   │   └── screens/
│   │       └── Login.tsx
│   ├── onboarding/
│   │   ├── api/
│   │   │   ├── OnboardingService.ts  — mock apiSubmit + validateDraft
│   │   │   ├── types.ts              — OnboardingService interface
│   │   │   └── models/               — OnboardingDraft and sub-interfaces
│   │   ├── hooks/
│   │   │   └── useDraftSubmit.ts     — submit hook with auth retry
│   │   └── screens/
│   │       ├── Onboarding.tsx        — main shell (progress, footer nav)
│   │       ├── StepProfile.tsx
│   │       ├── StepDocument.tsx
│   │       ├── StepSelfie.tsx
│   │       ├── StepAddress.tsx
│   │       ├── StepReview.tsx
│   │       ├── Field.tsx             — shared form field wrapper
│   │       └── types.ts              — FormData, StepFormProps, constants
│   ├── settings/
│   │   └── screens/
│   │       └── Settings.tsx
│   └── user/
│       ├── api/
│       │   ├── UserService.ts        — mock apiMe
│       │   ├── types.ts              — UserService interface
│       │   └── models/               — User
│       └── hooks/
│           └── useFetchUser.ts       — fetch user hook with auth retry
├── navigation/
│   ├── index.tsx                     — root stack + bottom tabs
│   └── screens/
│       └── Home.tsx
├── store/                            — Zustand stores (see above)
├── theme/
│   └── index.ts                      — Spacing, Radius, FontSize, ErrorPalette
└── util/
    └── withAuthRetry.ts              — 401 retry wrapper
```

---

## Mock Service Behaviour

Each service simulates realistic failure modes:

| Service                       | 401                   | 500        | 422                    |
|-------------------------------|-----------------------|------------|------------------------|
| `LoginService.apiLogin`       | Wrong credentials     | 10% random | —                      |
| `LoginService.apiRefresh`     | —                     | 10% random | —                      |
| `UserService.apiMe`           | Missing / empty token | —          | —                      |
| `OnboardingService.apiSubmit` | Missing / empty token | 10% random | Failed `validateDraft` |

`validateDraft` checks every required field on the `OnboardingDraft` and returns a list of `{ field, message }` errors
that are displayed in the submission error banner.
