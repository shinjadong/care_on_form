---
title: "Action Sheet Capacitor Plugin API | Capacitor Documentation"
source: "https://capacitorjs.com/docs/apis/action-sheet"
author:
published:
created: 2025-09-24
description: "The Action Sheet API provides access to native Action Sheets, which come up from the bottom of the screen and display actions a user can take."
tags:
  - "clippings"
---
Version: v7

The Action Sheet API provides access to native Action Sheets, which come up from the bottom of the screen and display actions a user can take.

## Install

```bash
npm install @capacitor/action-sheet
npx cap sync
```

### Variables

This plugin will use the following project variables (defined in your app's `variables.gradle` file):

- `androidxMaterialVersion`: version of `com.google.android.material:material` (default: `1.12.0`)

## PWA Notes

[PWA Elements](https://capacitorjs.com/docs/web/pwa-elements) are required for Action Sheet plugin to work.

## Example

## API

- [`showActions(...)`](https://capacitorjs.com/docs/apis/#showactions)
- [Interfaces](https://capacitorjs.com/docs/apis/#interfaces)
- [Enums](https://capacitorjs.com/docs/apis/#enums)

### showActions(...)

```typescript
showActions(options: ShowActionsOptions) => Promise<ShowActionsResult>
```

Show an Action Sheet style modal with various options for the user to select.

| Param | Type |
| --- | --- |
| **`options`** | ```typescript ShowActionsOptions ``` |

**Returns:**

```typescript
Promise<ShowActionsResult>
```

**Since:** 1.0.0

---

### Interfaces

#### ShowActionsResult

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`index`** | `number` | The index of the clicked option (Zero-based) | 1.0.0 |

#### ShowActionsOptions

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`title`** | `string` | The title of the Action Sheet. | 1.0.0 |
| **`message`** | `string` | A message to show under the title. This option is only supported on iOS. | 1.0.0 |
| **`options`** | `ActionSheetButton[]` | Options the user can choose from. | 1.0.0 |

#### ActionSheetButton

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`title`** | `string` | The title of the option | 1.0.0 |
| **`style`** | ```typescript ActionSheetButtonStyle ``` | The style of the option This option is only supported on iOS. | 1.0.0 |
| **`icon`** | `string` | Icon for the option (ionicon naming convention) This option is only supported on Web. | 1.0.0 |

### Enums

#### ActionSheetButtonStyle

| Members | Value | Description | Since |
| --- | --- | --- | --- |
| **`Default`** | `'DEFAULT'` | Default style of the option. | 1.0.0 |
| **`Destructive`** | `'DESTRUCTIVE'` | Style to use on destructive options. | 1.0.0 |
| **`Cancel`** | `'CANCEL'` | Style to use on the option that cancels the Action Sheet. If used, should be on the latest availabe option. | 1.0.0 |