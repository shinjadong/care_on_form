---
title: "Status Bar Capacitor Plugin API | Capacitor Documentation"
source: "https://capacitorjs.com/docs/apis/status-bar"
author:
published:
created: 2025-09-24
description: "The StatusBar API Provides methods for configuring the style of the Status Bar, along with showing or hiding it."
tags:
  - "clippings"
---
Version: v7

The StatusBar API Provides methods for configuring the style of the Status Bar, along with showing or hiding it.

## Install

```bash
npm install @capacitor/status-bar
npx cap sync
```

## iOS Note

This plugin requires "View controller-based status bar appearance" (`UIViewControllerBasedStatusBarAppearance`) set to `YES` in `Info.plist`. Read about [Configuring iOS](https://capacitorjs.com/docs/ios/configuration) for help.

The status bar visibility defaults to visible and the style defaults to `Style.Default`. You can change these defaults by adding `UIStatusBarHidden` and/or `UIStatusBarStyle` in `Info.plist`.

## Example

```typescript
import { StatusBar, Style } from '@capacitor/status-bar';

// iOS only
window.addEventListener('statusTap', function () {
  console.log('statusbar tapped');
});

// Display content under transparent status bar
StatusBar.setOverlaysWebView({ overlay: true });

const setStatusBarStyleDark = async () => {
  await StatusBar.setStyle({ style: Style.Dark });
};

const setStatusBarStyleLight = async () => {
  await StatusBar.setStyle({ style: Style.Light });
};

const hideStatusBar = async () => {
  await StatusBar.hide();
};

const showStatusBar = async () => {
  await StatusBar.show();
};
```

## Configuration

These config values are available:

| Prop | Type | Description | Default | Since |
| --- | --- | --- | --- | --- |
| **`overlaysWebView`** | `boolean` | Whether the statusbar is overlaid or not. For applications targeting Android 15, this property has no effect unless the property windowOptOutEdgeToEdgeEnforcement is added to the application layout file. Otherwise, the application assumes always overlays as true. More details in [https://developer.android.com/reference/android/R.attr#windowOptOutEdgeToEdgeEnforcement](https://developer.android.com/reference/android/R.attr#windowOptOutEdgeToEdgeEnforcement) | `true` | 1.0.0 |
| **`style`** | `string` | [Style](https://capacitorjs.com/docs/apis/#style) of the text of the status bar. | `default` | 1.0.0 |
| **`backgroundColor`** | `string` | Color of the background of the statusbar in hex format, #RRGGBB. Doesn't work if `overlaysWebView` is true. | `#000000` | 1.0.0 |

### Examples

In `capacitor.config.json`:

```json
{
  "plugins": {
    "StatusBar": {
      "overlaysWebView": false,
      "style": "DARK",
      "backgroundColor": "#ffffffff"
    }
  }
}
```

In `capacitor.config.ts`:

```ts
/// <reference types="@capacitor/status-bar" />

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    StatusBar: {
      overlaysWebView: false,
      style: "DARK",
      backgroundColor: "#ffffffff",
    },
  },
};

export default config;
```

## API

- [`setStyle(...)`](https://capacitorjs.com/docs/apis/#setstyle)
- [`setBackgroundColor(...)`](https://capacitorjs.com/docs/apis/#setbackgroundcolor)
- [`show(...)`](https://capacitorjs.com/docs/apis/#show)
- [`hide(...)`](https://capacitorjs.com/docs/apis/#hide)
- [`getInfo()`](https://capacitorjs.com/docs/apis/#getinfo)
- [`setOverlaysWebView(...)`](https://capacitorjs.com/docs/apis/#setoverlayswebview)
- [Interfaces](https://capacitorjs.com/docs/apis/#interfaces)
- [Enums](https://capacitorjs.com/docs/apis/#enums)

### setStyle(...)

```typescript
setStyle(options: StyleOptions) => Promise<void>
```

Set the current style of the status bar.

| Param | Type |
| --- | --- |
| **`options`** | ```typescript StyleOptions ``` |

**Since:** 1.0.0

---

### setBackgroundColor(...)

```typescript
setBackgroundColor(options: BackgroundColorOptions) => Promise<void>
```

Set the background color of the status bar.

| Param | Type |
| --- | --- |
| **`options`** | ```typescript BackgroundColorOptions ``` |

**Since:** 1.0.0

---

### show(...)

```typescript
show(options?: AnimationOptions | undefined) => Promise<void>
```

Show the status bar. On iOS, if the status bar is initially hidden and the initial style is set to `UIStatusBarStyleLightContent`, first show call might present a glitch on the animation showing the text as dark and then transition to light. It's recommended to use [`Animation.None`](https://capacitorjs.com/docs/apis/#animation) as the animation on the first call.

| Param | Type |
| --- | --- |
| **`options`** | ```typescript AnimationOptions ``` |

**Since:** 1.0.0

---

### hide(...)

```typescript
hide(options?: AnimationOptions | undefined) => Promise<void>
```

Hide the status bar.

| Param | Type |
| --- | --- |
| **`options`** | ```typescript AnimationOptions ``` |

**Since:** 1.0.0

---

### getInfo()

```typescript
getInfo() => Promise<StatusBarInfo>
```

Get info about the current state of the status bar.

**Returns:**

```typescript
Promise<StatusBarInfo>
```

**Since:** 1.0.0

---

### setOverlaysWebView(...)

```typescript
setOverlaysWebView(options: SetOverlaysWebViewOptions) => Promise<void>
```

Set whether or not the status bar should overlay the webview to allow usage of the space underneath it.

| Param | Type |
| --- | --- |
| **`options`** | ```typescript SetOverlaysWebViewOptions ``` |

**Since:** 1.0.0

---

### Interfaces

#### StyleOptions

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`style`** | ```typescript Style ``` | [Style](https://capacitorjs.com/docs/apis/#style) of the text of the status bar. | 1.0.0 |

#### BackgroundColorOptions

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`color`** | `string` | A hex color to which the status bar color is set. | 1.0.0 |

#### AnimationOptions

| Prop | Type | Description | Default | Since |
| --- | --- | --- | --- | --- |
| **`animation`** | ```typescript Animation ``` | The type of status bar animation used when showing or hiding. This option is only supported on iOS. | `Animation.Fade` | 1.0.0 |

#### StatusBarInfo

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`visible`** | `boolean` | Whether the status bar is visible or not. | 1.0.0 |
| **`style`** | ```typescript Style ``` | The current status bar style. | 1.0.0 |
| **`color`** | `string` | The current status bar color. | 1.0.0 |
| **`overlays`** | `boolean` | Whether the statusbar is overlaid or not. | 1.0.0 |

#### SetOverlaysWebViewOptions

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`overlay`** | `boolean` | Whether to overlay the status bar or not. | 1.0.0 |

### Enums

#### Style

| Members | Value | Description | Since |
| --- | --- | --- | --- |
| **`Dark`** | `'DARK'` | Light text for dark backgrounds. | 1.0.0 |
| **`Light`** | `'LIGHT'` | Dark text for light backgrounds. | 1.0.0 |
| **`Default`** | `'DEFAULT'` | The style is based on the device appearance. If the device is using Dark mode, the statusbar text will be light. If the device is using Light mode, the statusbar text will be dark. | 1.0.0 |

#### Animation

| Members | Value | Description | Since |
| --- | --- | --- | --- |
| **`None`** | `'NONE'` | No animation during show/hide. | 1.0.0 |
| **`Slide`** | `'SLIDE'` | Slide animation during show/hide. It doesn't work on iOS 15+. | 1.0.0 |
| **`Fade`** | `'FADE'` | Fade animation during show/hide. | 1.0.0 |