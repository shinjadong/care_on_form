---
title: "Device Capacitor Plugin API | Capacitor Documentation"
source: "https://capacitorjs.com/docs/apis/device"
author:
published:
created: 2025-09-24
description: "The Device API exposes internal information about the device, such as the model and operating system version, along with user information such as unique ids."
tags:
  - "clippings"
---
Version: v7

The Device API exposes internal information about the device, such as the model and operating system version, along with user information such as unique ids.

## Install

```bash
npm install @capacitor/device
npx cap sync
```

## Example Plugin Usage

```typescript
import { Device } from '@capacitor/device';

const logDeviceInfo = async () => {
  const info = await Device.getInfo();

  console.log(info);
};

const logBatteryInfo = async () => {
  const info = await Device.getBatteryInfo();

  console.log(info);
};
```

## API

- [`getId()`](https://capacitorjs.com/docs/apis/#getid)
- [`getInfo()`](https://capacitorjs.com/docs/apis/#getinfo)
- [`getBatteryInfo()`](https://capacitorjs.com/docs/apis/#getbatteryinfo)
- [`getLanguageCode()`](https://capacitorjs.com/docs/apis/#getlanguagecode)
- [`getLanguageTag()`](https://capacitorjs.com/docs/apis/#getlanguagetag)
- [Interfaces](https://capacitorjs.com/docs/apis/#interfaces)
- [Type Aliases](https://capacitorjs.com/docs/apis/#type-aliases)

### getId()

```typescript
getId() => Promise<DeviceId>
```

Return an unique identifier for the device.

**Returns:**

```typescript
Promise<DeviceId>
```

**Since:** 1.0.0

---

### getInfo()

```typescript
getInfo() => Promise<DeviceInfo>
```

Return information about the underlying device/os/platform.

**Returns:**

```typescript
Promise<DeviceInfo>
```

**Since:** 1.0.0

---

### getBatteryInfo()

```typescript
getBatteryInfo() => Promise<BatteryInfo>
```

Return information about the battery.

**Returns:**

```typescript
Promise<BatteryInfo>
```

**Since:** 1.0.0

---

### getLanguageCode()

```typescript
getLanguageCode() => Promise<GetLanguageCodeResult>
```

Get the device's current language locale code.

**Returns:**

```typescript
Promise<GetLanguageCodeResult>
```

**Since:** 1.0.0

---

### getLanguageTag()

```typescript
getLanguageTag() => Promise<LanguageTag>
```

Get the device's current language locale tag.

**Returns:**

```typescript
Promise<LanguageTag>
```

**Since:** 4.0.0

---

### Interfaces

#### DeviceId

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`identifier`** | `string` | The identifier of the device as available to the app. This identifier may change on modern mobile platforms that only allow per-app install ids. On iOS, the identifier is a UUID that uniquely identifies a device to the app’s vendor ([read more](https://developer.apple.com/documentation/uikit/uidevice/1620059-identifierforvendor)). on Android 8+, **the identifier is a 64-bit number (expressed as a hexadecimal string)**, unique to each combination of app-signing key, user, and device ([read more](https://developer.android.com/reference/android/provider/Settings.Secure#ANDROID_ID)). On web, a random identifier is generated and stored on localStorage for subsequent calls. If localStorage is not available a new random identifier will be generated on every call. | 1.0.0 |

#### DeviceInfo

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`name`** | `string` | The name of the device. For example, "John's iPhone". This is only supported on iOS and Android 7.1 or above. On iOS 16+ this will return a generic device name without the appropriate [entitlements](https://developer.apple.com/documentation/bundleresources/entitlements/com_apple_developer_device-information_user-assigned-device-name). | 1.0.0 |
| **`model`** | `string` | The device model. For example, "iPhone13,4". | 1.0.0 |
| **`platform`** | `'ios' \| 'android' \| 'web'` | The device platform (lowercase). | 1.0.0 |
| **`operatingSystem`** | ```typescript OperatingSystem ``` | The operating system of the device. | 1.0.0 |
| **`osVersion`** | `string` | The version of the device OS. | 1.0.0 |
| **`iOSVersion`** | `number` | The iOS version number. Only available on iOS. Multi-part version numbers are crushed down into an integer padded to two-digits, ex: `"16.3.1"` -> `160301` | 5.0.0 |
| **`androidSDKVersion`** | `number` | The Android SDK version number. Only available on Android. | 5.0.0 |
| **`manufacturer`** | `string` | The manufacturer of the device. | 1.0.0 |
| **`isVirtual`** | `boolean` | Whether the app is running in a simulator/emulator. | 1.0.0 |
| **`memUsed`** | `number` | Approximate memory used by the current app, in bytes. Divide by 1048576 to get the number of MBs used. | 1.0.0 |
| **`webViewVersion`** | `string` | The web view browser version | 1.0.0 |

#### BatteryInfo

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`batteryLevel`** | `number` | A percentage (0 to 1) indicating how much the battery is charged. | 1.0.0 |
| **`isCharging`** | `boolean` | Whether the device is charging. | 1.0.0 |

#### GetLanguageCodeResult

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`value`** | `string` | Two character language code. | 1.0.0 |

#### LanguageTag

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`value`** | `string` | Returns a well-formed IETF BCP 47 language tag. | 4.0.0 |

### Type Aliases

#### OperatingSystem

`'ios' | 'android' | 'windows' | 'mac' | 'unknown'`