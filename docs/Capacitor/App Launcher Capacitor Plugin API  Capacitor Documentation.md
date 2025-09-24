---
title: "App Launcher Capacitor Plugin API | Capacitor Documentation"
source: "https://capacitorjs.com/docs/apis/app-launcher"
author:
published:
created: 2025-09-24
description: "The AppLauncher API allows to open other apps"
tags:
  - "clippings"
---
Version: v7

The AppLauncher API allows your app to check if an app can be opened and open it.

On iOS you can only open apps if you know their url scheme.

On Android you can open apps if you know their url scheme or use their public package name.

**Note:** On [Android 11](https://developer.android.com/about/versions/11/privacy/package-visibility) and newer you have to add the app package names you want to query in the `AndroidManifest.xml` inside the `queries` tag.

Example:

```xml
<queries>
  <package android:name="com.getcapacitor.myapp" />
</queries>
```

## Install

```bash
npm install @capacitor/app-launcher
npx cap sync
```

## Example

```typescript
import { AppLauncher } from '@capacitor/app-launcher';

const checkCanOpenUrl = async () => {
  const { value } = await AppLauncher.canOpenUrl({ url: 'com.getcapacitor.myapp' });

  console.log('Can open url: ', value);
};

const openPortfolioPage = async () => {
  await AppLauncher.openUrl({ url: 'com.getcapacitor.myapp://page?id=portfolio' });
};
```

## API

- [`canOpenUrl(...)`](https://capacitorjs.com/docs/apis/#canopenurl)
- [`openUrl(...)`](https://capacitorjs.com/docs/apis/#openurl)
- [Interfaces](https://capacitorjs.com/docs/apis/#interfaces)

### canOpenUrl(...)

```typescript
canOpenUrl(options: CanOpenURLOptions) => Promise<CanOpenURLResult>
```

Check if an app can be opened with the given URL.

On iOS you must declare the URL schemes you pass to this method by adding the `LSApplicationQueriesSchemes` key to your app's `Info.plist` file. Learn more about configuring [`Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist).

This method always returns false for undeclared schemes, whether or not an appropriate app is installed. To learn more about the key, see [LSApplicationQueriesSchemes](https://developer.apple.com/library/archive/documentation/General/Reference/InfoPlistKeyReference/Articles/LaunchServicesKeys.html#//apple_ref/doc/plist/info/LSApplicationQueriesSchemes).

| Param | Type |
| --- | --- |
| **`options`** | ```typescript CanOpenURLOptions ``` |

**Returns:**

```typescript
Promise<CanOpenURLResult>
```

**Since:** 1.0.0

---

### openUrl(...)

```typescript
openUrl(options: OpenURLOptions) => Promise<OpenURLResult>
```

Open an app with the given URL. On iOS the URL should be a known URLScheme. On Android the URL can be a known URLScheme or an app package name.

| Param | Type |
| --- | --- |
| **`options`** | ```typescript OpenURLOptions ``` |

**Returns:**

```typescript
Promise<OpenURLResult>
```

**Since:** 1.0.0

---

### Interfaces

#### CanOpenURLResult

| Prop | Type |
| --- | --- |
| **`value`** | `boolean` |

#### CanOpenURLOptions

| Prop | Type |
| --- | --- |
| **`url`** | `string` |

#### OpenURLResult

| Prop | Type |
| --- | --- |
| **`completed`** | `boolean` |

#### OpenURLOptions

| Prop | Type |
| --- | --- |
| **`url`** | `string` |