---
title: "Network Capacitor Plugin API | Capacitor Documentation"
source: "https://capacitorjs.com/docs/apis/network"
author:
published:
created: 2025-09-24
description: "The Network API provides network and connectivity information."
tags:
  - "clippings"
---
Version: v7

The Network API provides network and connectivity information.

## Install

```bash
npm install @capacitor/network
npx cap sync
```

## Example

```typescript
import { Network } from '@capacitor/network';

Network.addListener('networkStatusChange', status => {
  console.log('Network status changed', status);
});

const logCurrentNetworkStatus = async () => {
  const status = await Network.getStatus();

  console.log('Network status:', status);
};
```

## API

- [`getStatus()`](https://capacitorjs.com/docs/apis/#getstatus)
- [`addListener('networkStatusChange', ...)`](https://capacitorjs.com/docs/apis/#addlistenernetworkstatuschange-)
- [`removeAllListeners()`](https://capacitorjs.com/docs/apis/#removealllisteners)
- [Interfaces](https://capacitorjs.com/docs/apis/#interfaces)
- [Type Aliases](https://capacitorjs.com/docs/apis/#type-aliases)

### getStatus()

```typescript
getStatus() => Promise<ConnectionStatus>
```

Query the current status of the network connection.

**Returns:**

```typescript
Promise<ConnectionStatus>
```

**Since:** 1.0.0

---

### addListener('networkStatusChange',...)

```typescript
addListener(eventName: 'networkStatusChange', listenerFunc: ConnectionStatusChangeListener) => Promise<PluginListenerHandle>
```

Listen for changes in the network connection.

| Param | Type |
| --- | --- |
| **`eventName`** | `'networkStatusChange'` |
| **`listenerFunc`** | ```typescript ConnectionStatusChangeListener ``` |

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

Remove all listeners (including the network status changes) for this plugin.

**Since:** 1.0.0

---

### Interfaces

#### ConnectionStatus

Represents the state and type of the network connection.

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`connected`** | `boolean` | Whether there is an active connection or not. | 1.0.0 |
| **`connectionType`** | ```typescript ConnectionType ``` | The type of network connection currently in use. If there is no active network connection, `connectionType` will be `'none'`. | 1.0.0 |

#### PluginListenerHandle

| Prop | Type |
| --- | --- |
| **`remove`** | `() => Promise<void>` |

### Type Aliases

#### ConnectionType

The type of network connection that a device might have.

`'wifi' | 'cellular' | 'none' | 'unknown'`

#### ConnectionStatusChangeListener

Callback to receive the status change notifications.

```typescript
(status: ConnectionStatus): void
```