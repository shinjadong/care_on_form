---
title: "Cookies Capacitor Plugin API | Capacitor Documentation"
source: "https://capacitorjs.com/docs/apis/cookies"
author:
published:
created: 2025-09-24
description: "The Capacitor Cookies API provides native cookie support via patching `document.cookie` to use native libraries."
tags:
  - "clippings"
---
Version: v7

The Capacitor Cookies API provides native cookie support via patching `document.cookie` to use native libraries. It also provides methods for modifying cookies at a specific url. This plugin is bundled with `@capacitor/core`.

## Configuration

By default, the patching of `document.cookie` to use native libraries is disabled. If you would like to enable this feature, modify the configuration below in the `capacitor.config` file.

| Prop | Type | Description | Default |
| --- | --- | --- | --- |
| **`enabled`** | `boolean` | Enable the patching of `document.cookie` to use native libraries instead. | `false` |

### Example Configuration

In `capacitor.config.json`:

In `capacitor.config.ts`:

## Example

## Third Party Cookies on iOS

As of iOS 14, you cannot use 3rd party cookies by default. Add the following lines to your Info.plist file to get better support for cookies on iOS. You can add up to 10 domains.

```xml
<key>WKAppBoundDomains</key>
<array>
  <string>www.mydomain.com</string>
  <string>api.mydomain.com</string>
  <string>www.myothercooldomain.com</string>
</array>
```

## API

- [`getCookies(...)`](https://capacitorjs.com/docs/apis/#getcookies)
- [`setCookie(...)`](https://capacitorjs.com/docs/apis/#setcookie)
- [`deleteCookie(...)`](https://capacitorjs.com/docs/apis/#deletecookie)
- [`clearCookies(...)`](https://capacitorjs.com/docs/apis/#clearcookies)
- [`clearAllCookies()`](https://capacitorjs.com/docs/apis/#clearallcookies)
- [Interfaces](https://capacitorjs.com/docs/apis/#interfaces)
- [Type Aliases](https://capacitorjs.com/docs/apis/#type-aliases)

### getCookies(...)

| Param | Type |
| --- | --- |
| **`options`** | ```markdown GetCookieOptions ``` |

**Returns:**

```markdown
Promise<HttpCookieMap>
```

---

### setCookie(...)

Write a cookie to the device.

| Param | Type |
| --- | --- |
| **`options`** | ```markdown SetCookieOptions ``` |

---

### deleteCookie(...)

Delete a cookie from the device.

| Param | Type |
| --- | --- |
| **`options`** | ```markdown DeleteCookieOptions ``` |

---

### clearCookies(...)

Clear cookies from the device at a given URL.

| Param | Type |
| --- | --- |
| **`options`** | ```markdown ClearCookieOptions ``` |

---

### clearAllCookies()

Clear all cookies on the device.

---

### Interfaces

#### HttpCookieMap

#### HttpCookie

| Prop | Type | Description |
| --- | --- | --- |
| **`url`** | `string` | The URL of the cookie. |
| **`key`** | `string` | The key of the cookie. |
| **`value`** | `string` | The value of the cookie. |

#### HttpCookieExtras

| Prop | Type | Description |
| --- | --- | --- |
| **`path`** | `string` | The path to write the cookie to. |
| **`expires`** | `string` | The date to expire the cookie. |

### Type Aliases

#### GetCookieOptions

```markdown
Omit<HttpCookie, 'key' | 'value'>
```

#### Omit

Construct a type with the properties of T except for those in type K.

```markdown
Pick<T, Exclude<keyof T, K>>
```

#### Pick

From T, pick a set of properties whose keys are in the union K

`{ [P in K]: T[P]; }`

#### Exclude

[Exclude](https://capacitorjs.com/docs/apis/#exclude) from T those types that are assignable to U

`T extends U ? never : T`

#### SetCookieOptions

```markdown
HttpCookie & HttpCookieExtras
```

#### DeleteCookieOptions

```markdown
Omit<HttpCookie, 'value'>
```

#### ClearCookieOptions

```markdown
Omit<HttpCookie, 'key' | 'value'>
```