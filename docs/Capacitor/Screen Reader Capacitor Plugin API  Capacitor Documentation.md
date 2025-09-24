---
title: "Screen Reader Capacitor Plugin API | Capacitor Documentation"
source: "https://capacitorjs.com/docs/apis/screen-reader"
author:
published:
created: 2025-09-24
description: "The Screen Reader API provides access to TalkBack/VoiceOver/etc. and provides simple text-to-speech capabilities for visual accessibility."
tags:
  - "clippings"
---
Version: v7

The Screen Reader API provides access to TalkBack/VoiceOver/etc. and provides simple text-to-speech capabilities for visual accessibility.

## Install

```bash
npm install @capacitor/screen-reader
npx cap sync
```

## Example

```typescript
import { ScreenReader } from '@capacitor/screen-reader';

ScreenReader.addListener('stateChange', ({ value }) => {
  console.log(\`Screen reader is now ${value ? 'on' : 'off'}\`);
});

const checkScreenReaderEnabled = async () => {
  const { value } = await ScreenReader.isEnabled();

  console.log('Voice over enabled? ' + value);
};

const sayHello = async () => {
  await ScreenReader.speak({ value: 'Hello World!' });
};
```

## API

- [`isEnabled()`](https://capacitorjs.com/docs/apis/#isenabled)
- [`speak(...)`](https://capacitorjs.com/docs/apis/#speak)
- [`addListener('stateChange', ...)`](https://capacitorjs.com/docs/apis/#addlistenerstatechange-)
- [`removeAllListeners()`](https://capacitorjs.com/docs/apis/#removealllisteners)
- [Interfaces](https://capacitorjs.com/docs/apis/#interfaces)
- [Type Aliases](https://capacitorjs.com/docs/apis/#type-aliases)

### isEnabled()

```typescript
isEnabled() => Promise<{ value: boolean; }>
```

Whether a Screen Reader is currently active.

This method is not supported on web (it is not possible to detect Screen Readers).

**Returns:**`Promise<{ value: boolean; }>`

**Since:** 1.0.0

---

### speak(...)

```typescript
speak(options: SpeakOptions) => Promise<void>
```

Text-to-Speech functionality.

This function will only work if a Screen Reader is currently active.

On web, browsers must support the [SpeechSynthesis API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis), or this method will throw an error.

For more text-to-speech capabilities, please see the [Capacitor Community Text-to-Speech plugin](https://github.com/capacitor-community/text-to-speech).

| Param | Type |
| --- | --- |
| **`options`** | ```typescript SpeakOptions ``` |

**Since:** 1.0.0

---

### addListener('stateChange',...)

```typescript
addListener(eventName: 'stateChange', listener: StateChangeListener) => Promise<PluginListenerHandle>
```

Add a listener for when the screen reader is turned on or off.

This event used to be named `'accessibilityScreenReaderStateChange'`.

This method is not supported on web (it is not possible to detect Screen Readers).

| Param | Type |
| --- | --- |
| **`eventName`** | `'stateChange'` |
| **`listener`** | ```typescript StateChangeListener ``` |

**Returns:**

```typescript
Promise<PluginListenerHandle>
```

**Since:** 1.0.0

---

### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

Remove all the listeners that are attached to this plugin.

**Since:** 1.0.0

---

### Interfaces

#### SpeakOptions

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`value`** | `string` | The text to speak. | 1.0.0 |
| **`language`** | `string` | The language to speak the text in, as its [ISO 639-1 Code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) (e.g.: "en"). This option is only supported on Android. | 1.0.0 |

#### PluginListenerHandle

| Prop | Type |
| --- | --- |
| **`remove`** | `() => Promise<void>` |

#### ScreenReaderState

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`value`** | `boolean` | Whether a Screen Reader is currently active. | 1.0.0 |

### Type Aliases

#### StateChangeListener

```typescript
(state: ScreenReaderState): void
```