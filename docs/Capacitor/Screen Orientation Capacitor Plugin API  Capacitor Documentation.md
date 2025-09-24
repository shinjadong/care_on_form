---
title: "Screen Orientation Capacitor Plugin API | Capacitor Documentation"
source: "https://capacitorjs.com/docs/apis/screen-orientation"
author:
published:
created: 2025-09-24
description: "The Screen Orientation API provides methods to lock and unlock the screen orientation."
tags:
  - "clippings"
---
Version: v7

The Screen Orientation API provides information and functionality related to the orientation of the screen.

## Install

```bash
npm install @capacitor/screen-orientation
npx cap sync
```

## iOS

Locking the Screen Orientation only works for the Capacitor View Controller only, but not other View Controllers being presented (such as the one presented by Browser plugin). For also lock presented View Controllers, this code can be added to the app's `AppDelegate.swift` file:

```swift
func application(_ application: UIApplication, supportedInterfaceOrientationsFor window: UIWindow?) -> UIInterfaceOrientationMask {
  return UIInterfaceOrientationMask(rawValue: (self.window!.rootViewController as! CAPBridgeViewController).supportedInterfaceOrientations.rawValue)
}
```

### iPad Orientation Lock

By default, an iPad allows Multitasking and its orientation cannot be locked. If you need to lock orientation on an iPad set the option `Requires Full Screen` to `YES` by adding the following to `Info.plist`:

```markdown
<key>UIRequiresFullScreen</key>
  <true/>
```

## API

- [`orientation()`](https://capacitorjs.com/docs/apis/#orientation)
- [`lock(...)`](https://capacitorjs.com/docs/apis/#lock)
- [`unlock()`](https://capacitorjs.com/docs/apis/#unlock)
- [`addListener('screenOrientationChange', ...)`](https://capacitorjs.com/docs/apis/#addlistenerscreenorientationchange-)
- [`removeAllListeners()`](https://capacitorjs.com/docs/apis/#removealllisteners)
- [Interfaces](https://capacitorjs.com/docs/apis/#interfaces)
- [Type Aliases](https://capacitorjs.com/docs/apis/#type-aliases)

### orientation()

```typescript
orientation() => Promise<ScreenOrientationResult>
```

Returns the current screen orientation.

**Returns:**

```typescript
Promise<ScreenOrientationResult>
```

**Since:** 4.0.0

---

### lock(...)

```typescript
lock(options: OrientationLockOptions) => Promise<void>
```

Locks the screen orientation.

| Param | Type |
| --- | --- |
| **`options`** | ```typescript OrientationLockOptions ``` |

**Since:** 4.0.0

---

### unlock()

```typescript
unlock() => Promise<void>
```

Unlocks the screen's orientation.

**Since:** 4.0.0

---

### addListener('screenOrientationChange',...)

```typescript
addListener(eventName: 'screenOrientationChange', listenerFunc: (orientation: ScreenOrientationResult) => void) => Promise<PluginListenerHandle>
```

Listens for screen orientation changes.

| Param | Type |
| --- | --- |
| **`eventName`** | `'screenOrientationChange'` |
| **`listenerFunc`** | ```typescript (orientation: ScreenOrientationResult) => void ``` |

**Returns:**

```typescript
Promise<PluginListenerHandle>
```

**Since:** 4.0.0

---

### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

Removes all listeners.

**Since:** 4.0.0

---

### Interfaces

#### ScreenOrientationResult

| Prop | Type |
| --- | --- |
| **`type`** | `OrientationType` |

#### OrientationLockOptions

| Prop | Type | Description |
| --- | --- | --- |
| **`orientation`** | ```typescript OrientationLockType ``` | Note: Typescript v5.2+ users should import [OrientationLockType](https://capacitorjs.com/docs/apis/#orientationlocktype) from @capacitor/screen-orientation. |

#### PluginListenerHandle

| Prop | Type |
| --- | --- |
| **`remove`** | `() => Promise<void>` |

### Type Aliases

#### OrientationLockType

`'any' | 'natural' | 'landscape' | 'portrait' | 'portrait-primary' | 'portrait-secondary' | 'landscape-primary' | 'landscape-secondary'`