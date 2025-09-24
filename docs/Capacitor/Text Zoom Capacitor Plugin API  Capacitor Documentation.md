---
title: "Text Zoom Capacitor Plugin API | Capacitor Documentation"
source: "https://capacitorjs.com/docs/apis/text-zoom"
author:
published:
created: 2025-09-24
description: "The Text Zoom API provides the ability to change Web View text size for visual accessibility."
tags:
  - "clippings"
---
Version: v7

The Text Zoom API provides the ability to change Web View text size for visual accessibility.

**Note:** text-zoom plugin won't work on iPads unless `preferredContentMode` configuration is set to `mobile` in your [Capacitor configuration file](https://capacitorjs.com/docs/config).

```json
{
  "ios": {
    "preferredContentMode": "mobile"
  }
}
```

## Install

```bash
npm install @capacitor/text-zoom
npx cap sync
```

## API

- [`get()`](https://capacitorjs.com/docs/apis/#get)
- [`getPreferred()`](https://capacitorjs.com/docs/apis/#getpreferred)
- [`set(...)`](https://capacitorjs.com/docs/apis/#set)
- [Interfaces](https://capacitorjs.com/docs/apis/#interfaces)

### get()

```typescript
get() => Promise<GetResult>
```

Get the current zoom level.

Zoom levels are represented as a decimal (e.g. 1.2 is 120%).

**Returns:**

```typescript
Promise<GetResult>
```

**Since:** 1.0.0

---

### getPreferred()

```typescript
getPreferred() => Promise<GetPreferredResult>
```

Get the preferred zoom level.

Zoom levels are represented as a decimal (e.g. 1.2 is 120%).

**Returns:**

```typescript
Promise<GetPreferredResult>
```

**Since:** 1.0.0

---

### set(...)

```typescript
set(options: SetOptions) => Promise<void>
```

Set the current zoom level.

Zoom levels are represented as a decimal (e.g. 1.2 is 120%).

| Param | Type |
| --- | --- |
| **`options`** | ```typescript SetOptions ``` |

**Since:** 1.0.0

---

### Interfaces

#### GetResult

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`value`** | `number` | The current zoom level (represented as a decimal). | 1.0.0 |

#### GetPreferredResult

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`value`** | `number` | The preferred zoom level (represented as a decimal). | 1.0.0 |

#### SetOptions

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`value`** | `number` | The new zoom level (represented as a decimal). | 1.0.0 |