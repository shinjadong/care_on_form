---
title: "Clipboard Capacitor Plugin API | Capacitor Documentation"
source: "https://capacitorjs.com/docs/apis/clipboard"
author:
published:
created: 2025-09-24
description: "The Clipboard API enables copy and pasting to/from the system clipboard."
tags:
  - "clippings"
---
Version: v7

The Clipboard API enables copy and pasting to/from the system clipboard.

## Install

```bash
npm install @capacitor/clipboard
npx cap sync
```

## Example

```typescript
import { Clipboard } from '@capacitor/clipboard';

const writeToClipboard = async () => {
  await Clipboard.write({
    string: "Hello World!"
  });
};

const checkClipboard = async () => {
  const { type, value } = await Clipboard.read();

  console.log(\`Got ${type} from clipboard: ${value}\`);
};
```

## API

- [`write(...)`](https://capacitorjs.com/docs/apis/#write)
- [`read()`](https://capacitorjs.com/docs/apis/#read)
- [Interfaces](https://capacitorjs.com/docs/apis/#interfaces)

### write(...)

```typescript
write(options: WriteOptions) => Promise<void>
```

Write a value to the clipboard (the "copy" action)

| Param | Type |
| --- | --- |
| **`options`** | ```typescript WriteOptions ``` |

**Since:** 1.0.0

---

### read()

```typescript
read() => Promise<ReadResult>
```

Read a value from the clipboard (the "paste" action)

**Returns:**

```typescript
Promise<ReadResult>
```

**Since:** 1.0.0

---

### Interfaces

#### WriteOptions

Represents the data to be written to the clipboard.

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`string`** | `string` | Text value to copy. | 1.0.0 |
| **`image`** | `string` | Image in [Data URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) format to copy. | 1.0.0 |
| **`url`** | `string` | URL string to copy. | 1.0.0 |
| **`label`** | `string` | User visible label to accompany the copied data (Android Only). | 1.0.0 |

#### ReadResult

Represents the data read from the clipboard.

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`value`** | `string` | Data read from the clipboard. | 1.0.0 |
| **`type`** | `string` | Type of data in the clipboard. | 1.0.0 |