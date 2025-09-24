---
title: "Privacy Screen Capacitor Plugin API | Capacitor Documentation"
source: "https://capacitorjs.com/docs/apis/privacy-screen"
author:
published:
created: 2025-09-24
description: "The Privacy Screen plugin provides functionality to prevent sensitive information from being visible in app switchers and when leaving an app."
tags:
  - "clippings"
---
Version: v7

The Privacy Screen plugin provides functionality to prevent sensitive information from being visible in app switchers and when leaving an app.

> **Note:** This plugin is supported on Android and iOS platforms only. It is not available for web platforms.

## Install

### Platform Notes

#### Android

The privacy screen behavior on Android varies depending on the navigation method used:

- When using gesture navigation or the recent apps button, the privacy screen will display as configured
- When using the home button to exit the app, the system must fall back to using [`FLAG_SECURE`](https://developer.android.com/reference/android/view/WindowManager.LayoutParams#FLAG_SECURE) as it's the only way to prevent content visibility in this scenario

## API

- [`enable(...)`](https://capacitorjs.com/docs/apis/#enable)
- [`disable()`](https://capacitorjs.com/docs/apis/#disable)
- [`isEnabled()`](https://capacitorjs.com/docs/apis/#isenabled)
- [Interfaces](https://capacitorjs.com/docs/apis/#interfaces)

### enable(...)

Enable privacy screen protection

| Param | Type | Description |
| --- | --- | --- |
| **`config`** | ```markdown PrivacyScreenConfig ``` | Optional configuration for platform-specific behavior |

**Returns:**`Promise<{ success: boolean; }>`

---

### disable()

```typescript
disable() => Promise<{ success: boolean; }>
```

Disable privacy screen protection

**Returns:**`Promise<{ success: boolean; }>`

---

### isEnabled()

```typescript
isEnabled() => Promise<{ enabled: boolean; }>
```

Check if privacy screen is currently enabled

**Returns:**`Promise<{ enabled: boolean; }>`

---

### Interfaces

#### PrivacyScreenConfig

| Prop | Type |
| --- | --- |
| **`android`** | `{ dimBackground?: boolean; preventScreenshots?: boolean; privacyModeOnActivityHidden?: 'none' \| 'dim' \| 'splash'; }` |
| **`ios`** | `{ blurEffect?: 'none' \| 'light' \| 'dark'; }` |