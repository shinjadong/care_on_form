---
title: "Share Capacitor Plugin API | Capacitor Documentation"
source: "https://capacitorjs.com/docs/apis/share"
author:
published:
created: 2025-09-24
description: "The Share API provides methods for sharing content in any sharing-enabled apps the user may have installed."
tags:
  - "clippings"
---
Version: v7

The Share API provides methods for sharing content in any sharing-enabled apps the user may have installed.

The Share API works on iOS, Android, and the Web (using the new [Web Share API](https://web.dev/web-share/)), though web support is currently spotty.

## Install

## Android

By default, Capacitor apps only allow to share files from caches folder. To make other Android folders shareable, they have to be added in `android/app/src/main/res/xml/file_paths.xml` file. Check the Specifying Available Files section in [FileProvider docs](https://developer.android.com/reference/androidx/core/content/FileProvider) for the available locations.

## Example

Each platform uses a different set of fields, but you should supply them all.

## API

- [`canShare()`](https://capacitorjs.com/docs/apis/#canshare)
- [`share(...)`](https://capacitorjs.com/docs/apis/#share)
- [Interfaces](https://capacitorjs.com/docs/apis/#interfaces)

### canShare()

Check if sharing is supported.

**Returns:**

```markdown
Promise<CanShareResult>
```

**Since:** 1.1.0

---

### share(...)

Show a Share modal for sharing content with other apps

| Param | Type |
| --- | --- |
| **`options`** | ```markdown ShareOptions ``` |

**Returns:**

```markdown
Promise<ShareResult>
```

**Since:** 1.0.0

---

### Interfaces

#### CanShareResult

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`value`** | `boolean` | Whether sharing is supported or not. | 1.1.0 |

#### ShareResult

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`activityType`** | `string` | Identifier of the app that received the share action. Can be an empty string in some cases. On web it will be undefined. | 1.0.0 |

#### ShareOptions

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`title`** | `string` | Set a title for any message. This will be the subject if sharing to email | 1.0.0 |
| **`text`** | `string` | Set some text to share | 1.0.0 |
| **`url`** | `string` | Set a URL to share, can be http, https or file:// URL | 1.0.0 |
| **`files`** | `string[]` | Array of file:// URLs of the files to be shared. Only supported on iOS and Android. | 4.1.0 |
| **`dialogTitle`** | `string` | Set a title for the share modal. This option is only supported on Android. | 1.0.0 |