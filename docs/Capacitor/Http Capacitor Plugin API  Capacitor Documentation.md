---
title: "Http Capacitor Plugin API | Capacitor Documentation"
source: "https://capacitorjs.com/docs/apis/http"
author:
published:
created: 2025-09-24
description: "The Capacitor Http API provides native http support via patching `fetch` and `XMLHttpRequest` to use native libraries."
tags:
  - "clippings"
---
Version: v7

The Capacitor Http API provides native http support via patching `fetch` and `XMLHttpRequest` to use native libraries. It also provides helper methods for native http requests without the use of `fetch` and `XMLHttpRequest`. This plugin is bundled with `@capacitor/core`.

## Configuration

By default, the patching of `window.fetch` and `XMLHttpRequest` to use native libraries is disabled. If you would like to enable this feature, modify the configuration below in the `capacitor.config` file.

| Prop | Type | Description | Default |
| --- | --- | --- | --- |
| **`enabled`** | `boolean` | Enable the patching of `fetch` and `XMLHttpRequest` to use native libraries instead. | `false` |

### Example Configuration

In `capacitor.config.json`:

```json
{
  "plugins": {
    "CapacitorHttp": {
      "enabled": true
    }
  }
}
```

In `capacitor.config.ts`:

```ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
};

export default config;
```

## Example

```typescript
import { CapacitorHttp } from '@capacitor/core';

// Example of a GET request
const doGet = () => {
  const options = {
    url: 'https://example.com/my/api',
    headers: { 'X-Fake-Header': 'Fake-Value' },
    params: { size: 'XL' },
  };

  const response: HttpResponse = await CapacitorHttp.get(options);

  // or...
  // const response = await CapacitorHttp.request({ ...options, method: 'GET' })
};

// Example of a POST request. Note: data
// can be passed as a raw JS Object (must be JSON serializable)
const doPost = () => {
  const options = {
    url: 'https://example.com/my/api',
    headers: { 'X-Fake-Header': 'Fake-Value' },
    data: { foo: 'bar' },
  };

  const response: HttpResponse = await CapacitorHttp.post(options);

  // or...
  // const response = await CapacitorHttp.request({ ...options, method: 'POST' })
};
```

## Large File Support

Due to the nature of the bridge, parsing and transferring large amount of data from native to the web can cause issues. Support for downloading and uploading files to the native device is planned to be added to the `@capacitor/filesystem` plugin in the near future. One way to potentially circumvent the issue of running out of memory in the meantime (specifically on Android) is to edit the `AndroidManifest.xml` and add `android:largeHeap="true"` to the `application` element. Most apps should not need this and should instead focus on reducing their overall memory usage for improved performance. Enabling this also does not guarantee a fixed increase in available memory, because some devices are constrained by their total available memory.

## API

- [`request(...)`](https://capacitorjs.com/docs/apis/#request)
- [`get(...)`](https://capacitorjs.com/docs/apis/#get)
- [`post(...)`](https://capacitorjs.com/docs/apis/#post)
- [`put(...)`](https://capacitorjs.com/docs/apis/#put)
- [`patch(...)`](https://capacitorjs.com/docs/apis/#patch)
- [`delete(...)`](https://capacitorjs.com/docs/apis/#delete)
- [Interfaces](https://capacitorjs.com/docs/apis/#interfaces)
- [Type Aliases](https://capacitorjs.com/docs/apis/#type-aliases)

\*\*\*\*\*\* HTTP PLUGIN \*\*\*\*\*\*\*

### request(...)

```typescript
request(options: HttpOptions) => Promise<HttpResponse>
```

Make a Http Request to a server using native libraries.

| Param | Type |
| --- | --- |
| **`options`** | ```typescript HttpOptions ``` |

**Returns:**

```typescript
Promise<HttpResponse>
```

---

### get(...)

```typescript
get(options: HttpOptions) => Promise<HttpResponse>
```

Make a Http GET Request to a server using native libraries.

| Param | Type |
| --- | --- |
| **`options`** | ```typescript HttpOptions ``` |

**Returns:**

```typescript
Promise<HttpResponse>
```

---

### post(...)

```typescript
post(options: HttpOptions) => Promise<HttpResponse>
```

Make a Http POST Request to a server using native libraries.

| Param | Type |
| --- | --- |
| **`options`** | ```typescript HttpOptions ``` |

**Returns:**

```typescript
Promise<HttpResponse>
```

---

### put(...)

```typescript
put(options: HttpOptions) => Promise<HttpResponse>
```

Make a Http PUT Request to a server using native libraries.

| Param | Type |
| --- | --- |
| **`options`** | ```typescript HttpOptions ``` |

**Returns:**

```typescript
Promise<HttpResponse>
```

---

### patch(...)

```typescript
patch(options: HttpOptions) => Promise<HttpResponse>
```

Make a Http PATCH Request to a server using native libraries.

| Param | Type |
| --- | --- |
| **`options`** | ```typescript HttpOptions ``` |

**Returns:**

```typescript
Promise<HttpResponse>
```

---

### delete(...)

```typescript
delete(options: HttpOptions) => Promise<HttpResponse>
```

Make a Http DELETE Request to a server using native libraries.

| Param | Type |
| --- | --- |
| **`options`** | ```typescript HttpOptions ``` |

**Returns:**

```typescript
Promise<HttpResponse>
```

---

### Interfaces

#### HttpResponse

| Prop | Type | Description |
| --- | --- | --- |
| **`data`** | `any` | Additional data received with the Http response. |
| **`status`** | `number` | The status code received from the Http response. |
| **`headers`** | ```typescript HttpHeaders ``` | The headers received from the Http response. |
| **`url`** | `string` | The response URL recieved from the Http response. |

#### HttpHeaders

#### HttpOptions

| Prop | Type | Description |
| --- | --- | --- |
| **`url`** | `string` | The URL to send the request to. |
| **`method`** | `string` | The Http Request method to run. (Default is GET) |
| **`params`** | ```typescript HttpParams ``` | URL parameters to append to the request. |
| **`data`** | `any` | Note: On Android and iOS, data can only be a string or a JSON. FormData, [Blob](https://capacitorjs.com/docs/apis/#blob), [ArrayBuffer](https://capacitorjs.com/docs/apis/#arraybuffer), and other complex types are only directly supported on web or through enabling `CapacitorHttp` in the config and using the patched `window.fetch` or `XMLHttpRequest`. If you need to send a complex type, you should serialize the data to base64 and set the `headers["Content-Type"]` and `dataType` attributes accordingly. |
| **`headers`** | ```typescript HttpHeaders ``` | Http Request headers to send with the request. |
| **`readTimeout`** | `number` | How long to wait to read additional data in milliseconds. Resets each time new data is received. |
| **`connectTimeout`** | `number` | How long to wait for the initial connection in milliseconds. |
| **`disableRedirects`** | `boolean` | Sets whether automatic HTTP redirects should be disabled |
| **`webFetchExtra`** | ```typescript RequestInit ``` | Extra arguments for fetch when running on the web |
| **`responseType`** | ```typescript HttpResponseType ``` | This is used to parse the response appropriately before returning it to the requestee. If the response content-type is "json", this value is ignored. |
| **`shouldEncodeUrlParams`** | `boolean` | Use this option if you need to keep the URL unencoded in certain cases (already encoded, azure/firebase testing, etc.). The default is *true*. |
| **`dataType`** | `'file' \| 'formData'` | This is used if we've had to convert the data from a JS type that needs special handling in the native layer |

#### HttpParams

#### RequestInit

| Prop | Type | Description |
| --- | --- | --- |
| **`body`** | ```typescript BodyInit ``` | A [BodyInit](https://capacitorjs.com/docs/apis/#bodyinit) object or null to set request's body. |
| **`cache`** | ```typescript RequestCache ``` | A string indicating how the request will interact with the browser's cache to set request's cache. |
| **`credentials`** | ```typescript RequestCredentials ``` | A string indicating whether credentials will be sent with the request always, never, or only when sent to a same-origin URL. Sets request's credentials. |
| **`headers`** | ```typescript HeadersInit ``` | A [Headers](https://capacitorjs.com/docs/apis/#headers) object, an object literal, or an array of two-item arrays to set request's headers. |
| **`integrity`** | `string` | A cryptographic hash of the resource to be fetched by request. Sets request's integrity. |
| **`keepalive`** | `boolean` | A boolean to set request's keepalive. |
| **`method`** | `string` | A string to set request's method. |
| **`mode`** | ```typescript RequestMode ``` | A string to indicate whether the request will use CORS, or will be restricted to same-origin URLs. Sets request's mode. |
| **`redirect`** | ```typescript RequestRedirect ``` | A string indicating whether request follows redirects, results in an error upon encountering a redirect, or returns the redirect (in an opaque fashion). Sets request's redirect. |
| **`referrer`** | `string` | A string whose value is a same-origin URL, "about:client", or the empty string, to set request's referrer. |
| **`referrerPolicy`** | ```typescript ReferrerPolicy ``` | A referrer policy to set request's referrerPolicy. |
| **`signal`** | ```typescript AbortSignal ``` | An [AbortSignal](https://capacitorjs.com/docs/apis/#abortsignal) to set request's signal. |
| **`window`** | `any` | Can only be null. Used to disassociate request from any Window. |

#### Blob

A file-like object of immutable, raw data. Blobs represent data that isn't necessarily in a JavaScript-native format. The [File](https://capacitorjs.com/docs/apis/#file) interface is based on [Blob](https://capacitorjs.com/docs/apis/#blob), inheriting blob functionality and expanding it to support files on the user's system.`Blob` class is a global reference for `require('node:buffer').Blob` [https://nodejs.org/api/buffer.html#class-blob](https://nodejs.org/api/buffer.html#class-blob)

| Prop | Type |
| --- | --- |
| **`size`** | `number` |
| **`type`** | `string` |

| Method | Signature |
| --- | --- |
| **arrayBuffer** | () => Promise< [ArrayBuffer](https://capacitorjs.com/docs/apis/#arraybuffer) > |
| **slice** | (start?: number, end?: number, contentType?: string) => [Blob](https://capacitorjs.com/docs/apis/#blob) |
| **stream** | () => [ReadableStream](https://capacitorjs.com/docs/apis/#readablestream) |
| **text** | () => Promise<string> |

#### ArrayBuffer

Represents a raw buffer of binary data, which is used to store data for the different typed arrays. ArrayBuffers cannot be read from or written to directly, but can be passed to a typed array or DataView Object to interpret the raw buffer as needed.

| Prop | Type | Description |
| --- | --- | --- |
| **`byteLength`** | `number` | Read-only. The length of the [ArrayBuffer](https://capacitorjs.com/docs/apis/#arraybuffer) (in bytes). |

| Method | Signature | Description |
| --- | --- | --- |
| **slice** | (begin: number, end?: number) => [ArrayBuffer](https://capacitorjs.com/docs/apis/#arraybuffer) | Returns a section of an [ArrayBuffer](https://capacitorjs.com/docs/apis/#arraybuffer). |

#### ReadableStream

This Streams API interface represents a readable stream of byte data. The Fetch API offers a concrete instance of a [ReadableStream](https://capacitorjs.com/docs/apis/#readablestream) through the body property of a Response object.

| Prop | Type |
| --- | --- |
| **`locked`** | `boolean` |

| Method | Signature |
| --- | --- |
| **cancel** | (reason?: any) => Promise<void> |
| **getReader** | () => [ReadableStreamDefaultReader](https://capacitorjs.com/docs/apis/#readablestreamdefaultreader) <R> |
| **pipeThrough** | <T>(transform: [ReadableWritablePair](https://capacitorjs.com/docs/apis/#readablewritablepair) <T, R>, options?: [StreamPipeOptions](https://capacitorjs.com/docs/apis/#streampipeoptions)) => [ReadableStream](https://capacitorjs.com/docs/apis/#readablestream) <T> |
| **pipeTo** | (dest: [WritableStream](https://capacitorjs.com/docs/apis/#writablestream) <R>, options?: [StreamPipeOptions](https://capacitorjs.com/docs/apis/#streampipeoptions)) => Promise<void> |
| **tee** | () => \[ReadableStream<R>, [ReadableStream](https://capacitorjs.com/docs/apis/#readablestream) <R>\] |

#### ReadableStreamDefaultReader

| Method | Signature |
| --- | --- |
| **read** | () => Promise< [ReadableStreamDefaultReadResult](https://capacitorjs.com/docs/apis/#readablestreamdefaultreadresult) <R>> |
| **releaseLock** | () => void |

#### ReadableStreamDefaultReadValueResult

| Prop | Type |
| --- | --- |
| **`done`** | `false` |
| **`value`** | `T` |

#### ReadableStreamDefaultReadDoneResult

| Prop | Type |
| --- | --- |
| **`done`** | `true` |
| **`value`** |  |

#### ReadableWritablePair

| Prop | Type | Description |
| --- | --- | --- |
| **`readable`** | ```typescript ReadableStream<R> ``` |  |
| **`writable`** | ```typescript WritableStream<W> ``` | Provides a convenient, chainable way of piping this readable stream through a transform stream (or any other { writable, readable } pair). It simply pipes the stream into the writable side of the supplied pair, and returns the readable side for further use. Piping a stream will lock it for the duration of the pipe, preventing any other consumer from acquiring a reader. |

#### WritableStream

This Streams API interface provides a standard abstraction for writing streaming data to a destination, known as a sink. This object comes with built-in backpressure and queuing.

| Prop | Type |
| --- | --- |
| **`locked`** | `boolean` |

| Method | Signature |
| --- | --- |
| **abort** | (reason?: any) => Promise<void> |
| **getWriter** | () => [WritableStreamDefaultWriter](https://capacitorjs.com/docs/apis/#writablestreamdefaultwriter) <W> |

#### WritableStreamDefaultWriter

This Streams API interface is the object returned by [WritableStream.getWriter](https://capacitorjs.com/docs/apis/#writablestream) () and once created locks the < writer to the [WritableStream](https://capacitorjs.com/docs/apis/#writablestream) ensuring that no other streams can write to the underlying sink.

| Prop | Type |
| --- | --- |
| **`closed`** | `Promise<undefined>` |
| **`desiredSize`** | `number` |
| **`ready`** | `Promise<undefined>` |

| Method | Signature |
| --- | --- |
| **abort** | (reason?: any) => Promise<void> |
| **close** | () => Promise<void> |
| **releaseLock** | () => void |
| **write** | (chunk: W) => Promise<void> |

#### StreamPipeOptions

| Prop | Type | Description |
| --- | --- | --- |
| **`preventAbort`** | `boolean` |  |
| **`preventCancel`** | `boolean` |  |
| **`preventClose`** | `boolean` | Pipes this readable stream to a given writable stream destination. The way in which the piping process behaves under various error conditions can be customized with a number of passed options. It returns a promise that fulfills when the piping process completes successfully, or rejects if any errors were encountered. Piping a stream will lock it for the duration of the pipe, preventing any other consumer from acquiring a reader. Errors and closures of the source and destination streams propagate as follows: An error in this source readable stream will abort destination, unless preventAbort is truthy. The returned promise will be rejected with the source's error, or with any error that occurs during aborting the destination. An error in destination will cancel this source readable stream, unless preventCancel is truthy. The returned promise will be rejected with the destination's error, or with any error that occurs during canceling the source. When this source readable stream closes, destination will be closed, unless preventClose is truthy. The returned promise will be fulfilled once this process completes, unless an error is encountered while closing the destination, in which case it will be rejected with that error. If destination starts out closed or closing, this source readable stream will be canceled, unless preventCancel is true. The returned promise will be rejected with an error indicating piping to a closed stream failed, or with any error that occurs during canceling the source. The signal option can be set to an [AbortSignal](https://capacitorjs.com/docs/apis/#abortsignal) to allow aborting an ongoing pipe operation via the corresponding AbortController. In this case, this source readable stream will be canceled, and destination aborted, unless the respective options preventCancel or preventAbort are set. |
| **`signal`** | ```typescript AbortSignal ``` |  |

#### AbortSignal

A signal object that allows you to communicate with a DOM request (such as a Fetch) and abort it if required via an AbortController object.

| Prop | Type | Description |
| --- | --- | --- |
| **`aborted`** | `boolean` | Returns true if this [AbortSignal](https://capacitorjs.com/docs/apis/#abortsignal) 's AbortController has signaled to abort, and false otherwise. |
| **`onabort`** | ```typescript (this: AbortSignal, ev: Event) => any ``` |  |

| Method | Signature | Description |
| --- | --- | --- |
| **addEventListener** | <K extends "abort">(type: K, listener: (this: [AbortSignal](https://capacitorjs.com/docs/apis/#abortsignal), ev: AbortSignalEventMap\[K\]) => any, options?: boolean \| [AddEventListenerOptions](https://capacitorjs.com/docs/apis/#addeventlisteneroptions)) => void | Appends an event listener for events whose type attribute value is type. The callback argument sets the callback that will be invoked when the event is dispatched. The options argument sets listener-specific options. For compatibility this can be a boolean, in which case the method behaves exactly as if the value was specified as options's capture. When set to true, options's capture prevents callback from being invoked when the event's eventPhase attribute value is BUBBLING\_PHASE. When false (or not present), callback will not be invoked when event's eventPhase attribute value is CAPTURING\_PHASE. Either way, callback will be invoked if event's eventPhase attribute value is AT\_TARGET. When set to true, options's passive indicates that the callback will not cancel the event by invoking preventDefault(). This is used to enable performance optimizations described in § 2.8 Observing event listeners. When set to true, options's once indicates that the callback will only be invoked once after which the event listener will be removed. The event listener is appended to target's event listener list and is not appended if it has the same type, callback, and capture. |
| **addEventListener** | (type: string, listener: [EventListenerOrEventListenerObject](https://capacitorjs.com/docs/apis/#eventlisteneroreventlistenerobject), options?: boolean \| [AddEventListenerOptions](https://capacitorjs.com/docs/apis/#addeventlisteneroptions)) => void | Appends an event listener for events whose type attribute value is type. The callback argument sets the callback that will be invoked when the event is dispatched. The options argument sets listener-specific options. For compatibility this can be a boolean, in which case the method behaves exactly as if the value was specified as options's capture. When set to true, options's capture prevents callback from being invoked when the event's eventPhase attribute value is BUBBLING\_PHASE. When false (or not present), callback will not be invoked when event's eventPhase attribute value is CAPTURING\_PHASE. Either way, callback will be invoked if event's eventPhase attribute value is AT\_TARGET. When set to true, options's passive indicates that the callback will not cancel the event by invoking preventDefault(). This is used to enable performance optimizations described in § 2.8 Observing event listeners. When set to true, options's once indicates that the callback will only be invoked once after which the event listener will be removed. The event listener is appended to target's event listener list and is not appended if it has the same type, callback, and capture. |
| **removeEventListener** | <K extends "abort">(type: K, listener: (this: [AbortSignal](https://capacitorjs.com/docs/apis/#abortsignal), ev: AbortSignalEventMap\[K\]) => any, options?: boolean \| [EventListenerOptions](https://capacitorjs.com/docs/apis/#eventlisteneroptions)) => void | Removes the event listener in target's event listener list with the same type, callback, and options. |
| **removeEventListener** | (type: string, listener: [EventListenerOrEventListenerObject](https://capacitorjs.com/docs/apis/#eventlisteneroreventlistenerobject), options?: boolean \| [EventListenerOptions](https://capacitorjs.com/docs/apis/#eventlisteneroptions)) => void | Removes the event listener in target's event listener list with the same type, callback, and options. |

#### AbortSignalEventMap

| Prop | Type |
| --- | --- |
| **`"abort"`** | ```typescript Event ``` |

#### Event

An event which takes place in the DOM.

| Prop | Type | Description |
| --- | --- | --- |
| **`bubbles`** | `boolean` | Returns true or false depending on how event was initialized. True if event goes through its target's ancestors in reverse tree order, and false otherwise. |
| **`cancelBubble`** | `boolean` |  |
| **`cancelable`** | `boolean` | Returns true or false depending on how event was initialized. Its return value does not always carry meaning, but true can indicate that part of the operation during which event was dispatched, can be canceled by invoking the preventDefault() method. |
| **`composed`** | `boolean` | Returns true or false depending on how event was initialized. True if event invokes listeners past a ShadowRoot node that is the root of its target, and false otherwise. |
| **`currentTarget`** | ```typescript EventTarget ``` | Returns the object whose event listener's callback is currently being invoked. |
| **`defaultPrevented`** | `boolean` | Returns true if preventDefault() was invoked successfully to indicate cancelation, and false otherwise. |
| **`eventPhase`** | `number` | Returns the event's phase, which is one of NONE, CAPTURING\_PHASE, AT\_TARGET, and BUBBLING\_PHASE. |
| **`isTrusted`** | `boolean` | Returns true if event was dispatched by the user agent, and false otherwise. |
| **`returnValue`** | `boolean` |  |
| **`srcElement`** | ```typescript EventTarget ``` |  |
| **`target`** | ```typescript EventTarget ``` | Returns the object to which event is dispatched (its target). |
| **`timeStamp`** | `number` | Returns the event's timestamp as the number of milliseconds measured relative to the time origin. |
| **`type`** | `string` | Returns the type of event, e.g. "click", "hashchange", or "submit". |
| **`AT_TARGET`** | `number` |  |
| **`BUBBLING_PHASE`** | `number` |  |
| **`CAPTURING_PHASE`** | `number` |  |
| **`NONE`** | `number` |  |

| Method | Signature | Description |
| --- | --- | --- |
| **composedPath** | () => EventTarget\[\] | Returns the invocation target objects of event's path (objects on which listeners will be invoked), except for any nodes in shadow trees of which the shadow root's mode is "closed" that are not reachable from event's currentTarget. |
| **initEvent** | (type: string, bubbles?: boolean, cancelable?: boolean) => void |  |
| **preventDefault** | () => void | If invoked when the cancelable attribute value is true, and while executing a listener for the event with passive set to false, signals to the operation that caused event to be dispatched that it needs to be canceled. |
| **stopImmediatePropagation** | () => void | Invoking this method prevents event from reaching any registered event listeners after the current one finishes running and, when dispatched in a tree, also prevents event from reaching any other objects. |
| **stopPropagation** | () => void | When dispatched in a tree, invoking this method prevents event from reaching any objects other than the current object. |

#### EventTarget

[EventTarget](https://capacitorjs.com/docs/apis/#eventtarget) is a DOM interface implemented by objects that can receive events and may have listeners for them. EventTarget is a DOM interface implemented by objects that can receive events and may have listeners for them.

| Method | Signature | Description |
| --- | --- | --- |
| **addEventListener** | (type: string, listener: [EventListenerOrEventListenerObject](https://capacitorjs.com/docs/apis/#eventlisteneroreventlistenerobject) \| null, options?: boolean \| [AddEventListenerOptions](https://capacitorjs.com/docs/apis/#addeventlisteneroptions)) => void | Appends an event listener for events whose type attribute value is type. The callback argument sets the callback that will be invoked when the event is dispatched. The options argument sets listener-specific options. For compatibility this can be a boolean, in which case the method behaves exactly as if the value was specified as options's capture. When set to true, options's capture prevents callback from being invoked when the event's eventPhase attribute value is BUBBLING\_PHASE. When false (or not present), callback will not be invoked when event's eventPhase attribute value is CAPTURING\_PHASE. Either way, callback will be invoked if event's eventPhase attribute value is AT\_TARGET. When set to true, options's passive indicates that the callback will not cancel the event by invoking preventDefault(). This is used to enable performance optimizations described in § 2.8 Observing event listeners. When set to true, options's once indicates that the callback will only be invoked once after which the event listener will be removed. The event listener is appended to target's event listener list and is not appended if it has the same type, callback, and capture. |
| **dispatchEvent** | (event: [Event](https://capacitorjs.com/docs/apis/#event)) => boolean | Dispatches a synthetic event event to target and returns true if either event's cancelable attribute value is false or its preventDefault() method was not invoked, and false otherwise. |
| **removeEventListener** | (type: string, callback: [EventListenerOrEventListenerObject](https://capacitorjs.com/docs/apis/#eventlisteneroreventlistenerobject) \| null, options?: [EventListenerOptions](https://capacitorjs.com/docs/apis/#eventlisteneroptions) \| boolean) => void | Removes the event listener in target's event listener list with the same type, callback, and options. |

#### EventListener

#### EventListenerObject

| Method | Signature |
| --- | --- |
| **handleEvent** | (evt: [Event](https://capacitorjs.com/docs/apis/#event)) => void |

#### AddEventListenerOptions

| Prop | Type |
| --- | --- |
| **`once`** | `boolean` |
| **`passive`** | `boolean` |

#### EventListenerOptions

| Prop | Type |
| --- | --- |
| **`capture`** | `boolean` |

#### ArrayBufferView

| Prop | Type | Description |
| --- | --- | --- |
| **`buffer`** | ```typescript ArrayBufferLike ``` | The [ArrayBuffer](https://capacitorjs.com/docs/apis/#arraybuffer) instance referenced by the array. |
| **`byteLength`** | `number` | The length in bytes of the array. |
| **`byteOffset`** | `number` | The offset in bytes of the array. |

#### ArrayBufferTypes

Allowed [ArrayBuffer](https://capacitorjs.com/docs/apis/#arraybuffer) types for the buffer of an [ArrayBufferView](https://capacitorjs.com/docs/apis/#arraybufferview) and related Typed Arrays.

| Prop | Type |
| --- | --- |
| **`ArrayBuffer`** | ```typescript ArrayBuffer ``` |

#### FormData

Provides a way to easily construct a set of key/value pairs representing form fields and their values, which can then be easily sent using the XMLHttpRequest.send() method. It uses the same format a form would use if the encoding type were set to "multipart/form-data".

| Method | Signature |
| --- | --- |
| **append** | (name: string, value: string \| [Blob](https://capacitorjs.com/docs/apis/#blob), fileName?: string) => void |
| **delete** | (name: string) => void |
| **get** | (name: string) => [FormDataEntryValue](https://capacitorjs.com/docs/apis/#formdataentryvalue) \| null |
| **getAll** | (name: string) => FormDataEntryValue\[\] |
| **has** | (name: string) => boolean |
| **set** | (name: string, value: string \| [Blob](https://capacitorjs.com/docs/apis/#blob), fileName?: string) => void |
| **forEach** | (callbackfn: (value: [FormDataEntryValue](https://capacitorjs.com/docs/apis/#formdataentryvalue), key: string, parent: [FormData](https://capacitorjs.com/docs/apis/#formdata)) => void, thisArg?: any) => void |

#### File

Provides information about files and allows JavaScript in a web page to access their content.

| Prop | Type |
| --- | --- |
| **`lastModified`** | `number` |
| **`name`** | `string` |

#### URLSearchParams

[`URLSearchParams`](https://capacitorjs.com/docs/apis/#urlsearchparams) class is a global reference for `require('url').URLSearchParams` [https://nodejs.org/api/url.html#class-urlsearchparams](https://nodejs.org/api/url.html#class-urlsearchparams)

| Method | Signature | Description |
| --- | --- | --- |
| **append** | (name: string, value: string) => void | Appends a specified key/value pair as a new search parameter. |
| **delete** | (name: string) => void | Deletes the given search parameter, and its associated value, from the list of all search parameters. |
| **get** | (name: string) => string \| null | Returns the first value associated to the given search parameter. |
| **getAll** | (name: string) => string\[\] | Returns all the values association with a given search parameter. |
| **has** | (name: string) => boolean | Returns a Boolean indicating if such a search parameter exists. |
| **set** | (name: string, value: string) => void | Sets the value associated to a given search parameter to the given value. If there were several values, delete the others. |
| **sort** | () => void |  |
| **toString** | () => string | Returns a string containing a query string suitable for use in a URL. Does not include the question mark. |
| **forEach** | (callbackfn: (value: string, key: string, parent: [URLSearchParams](https://capacitorjs.com/docs/apis/#urlsearchparams)) => void, thisArg?: any) => void |  |

#### Uint8Array

A typed array of 8-bit unsigned integer values. The contents are initialized to 0. If the requested number of bytes could not be allocated an exception is raised.

| Prop | Type | Description |
| --- | --- | --- |
| **`BYTES_PER_ELEMENT`** | `number` | The size in bytes of each element in the array. |
| **`buffer`** | ```typescript ArrayBufferLike ``` | The [ArrayBuffer](https://capacitorjs.com/docs/apis/#arraybuffer) instance referenced by the array. |
| **`byteLength`** | `number` | The length in bytes of the array. |
| **`byteOffset`** | `number` | The offset in bytes of the array. |
| **`length`** | `number` | The length of the array. |

| Method | Signature | Description |
| --- | --- | --- |
| **copyWithin** | (target: number, start: number, end?: number) => this | Returns the this object after copying a section of the array identified by start and end to the same array starting at position target |
| **every** | (predicate: (value: number, index: number, array: [Uint8Array](https://capacitorjs.com/docs/apis/#uint8array)) => unknown, thisArg?: any) => boolean | Determines whether all the members of an array satisfy the specified test. |
| **fill** | (value: number, start?: number, end?: number) => this | Returns the this object after filling the section identified by start and end with value |
| **filter** | (predicate: (value: number, index: number, array: [Uint8Array](https://capacitorjs.com/docs/apis/#uint8array)) => any, thisArg?: any) => [Uint8Array](https://capacitorjs.com/docs/apis/#uint8array) | Returns the elements of an array that meet the condition specified in a callback function. |
| **find** | (predicate: (value: number, index: number, obj: [Uint8Array](https://capacitorjs.com/docs/apis/#uint8array)) => boolean, thisArg?: any) => number \| undefined | Returns the value of the first element in the array where predicate is true, and undefined otherwise. |
| **findIndex** | (predicate: (value: number, index: number, obj: [Uint8Array](https://capacitorjs.com/docs/apis/#uint8array)) => boolean, thisArg?: any) => number | Returns the index of the first element in the array where predicate is true, and -1 otherwise. |
| **forEach** | (callbackfn: (value: number, index: number, array: [Uint8Array](https://capacitorjs.com/docs/apis/#uint8array)) => void, thisArg?: any) => void | Performs the specified action for each element in an array. |
| **indexOf** | (searchElement: number, fromIndex?: number) => number | Returns the index of the first occurrence of a value in an array. |
| **join** | (separator?: string) => string | Adds all the elements of an array separated by the specified separator string. |
| **lastIndexOf** | (searchElement: number, fromIndex?: number) => number | Returns the index of the last occurrence of a value in an array. |
| **map** | (callbackfn: (value: number, index: number, array: [Uint8Array](https://capacitorjs.com/docs/apis/#uint8array)) => number, thisArg?: any) => [Uint8Array](https://capacitorjs.com/docs/apis/#uint8array) | Calls a defined callback function on each element of an array, and returns an array that contains the results. |
| **reduce** | (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: [Uint8Array](https://capacitorjs.com/docs/apis/#uint8array)) => number) => number | Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function. |
| **reduce** | (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: [Uint8Array](https://capacitorjs.com/docs/apis/#uint8array)) => number, initialValue: number) => number |  |
| **reduce** | <U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: [Uint8Array](https://capacitorjs.com/docs/apis/#uint8array)) => U, initialValue: U) => U | Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function. |
| **reduceRight** | (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: [Uint8Array](https://capacitorjs.com/docs/apis/#uint8array)) => number) => number | Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function. |
| **reduceRight** | (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: [Uint8Array](https://capacitorjs.com/docs/apis/#uint8array)) => number, initialValue: number) => number |  |
| **reduceRight** | <U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: [Uint8Array](https://capacitorjs.com/docs/apis/#uint8array)) => U, initialValue: U) => U | Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function. |
| **reverse** | () => [Uint8Array](https://capacitorjs.com/docs/apis/#uint8array) | Reverses the elements in an Array. |
| **set** | (array: [ArrayLike](https://capacitorjs.com/docs/apis/#arraylike) <number>, offset?: number) => void | Sets a value or an array of values. |
| **slice** | (start?: number, end?: number) => [Uint8Array](https://capacitorjs.com/docs/apis/#uint8array) | Returns a section of an array. |
| **some** | (predicate: (value: number, index: number, array: [Uint8Array](https://capacitorjs.com/docs/apis/#uint8array)) => unknown, thisArg?: any) => boolean | Determines whether the specified callback function returns true for any element of an array. |
| **sort** | (compareFn?: (a: number, b: number) => number) => this | Sorts an array. |
| **subarray** | (begin?: number, end?: number) => [Uint8Array](https://capacitorjs.com/docs/apis/#uint8array) | Gets a new [Uint8Array](https://capacitorjs.com/docs/apis/#uint8array) view of the [ArrayBuffer](https://capacitorjs.com/docs/apis/#arraybuffer) store for this array, referencing the elements at begin, inclusive, up to end, exclusive. |
| **toLocaleString** | () => string | Converts a number to a string by using the current locale. |
| **toString** | () => string | Returns a string representation of an array. |
| **valueOf** | () => [Uint8Array](https://capacitorjs.com/docs/apis/#uint8array) | Returns the primitive value of the specified object. |

#### ArrayLike

| Prop | Type |
| --- | --- |
| **`length`** | `number` |

#### Headers

This Fetch API interface allows you to perform various actions on HTTP request and response headers. These actions include retrieving, setting, adding to, and removing. A [Headers](https://capacitorjs.com/docs/apis/#headers) object has an associated header list, which is initially empty and consists of zero or more name and value pairs. You can add to this using methods like append() (see Examples.) In all methods of this interface, header names are matched by case-insensitive byte sequence.

| Method | Signature |
| --- | --- |
| **append** | (name: string, value: string) => void |
| **delete** | (name: string) => void |
| **get** | (name: string) => string \| null |
| **has** | (name: string) => boolean |
| **set** | (name: string, value: string) => void |
| **forEach** | (callbackfn: (value: string, key: string, parent: [Headers](https://capacitorjs.com/docs/apis/#headers)) => void, thisArg?: any) => void |

### Type Aliases

#### BodyInit

```typescript
Blob | BufferSource | FormData | URLSearchParams | ReadableStream<Uint8Array> | string
```

#### ReadableStreamDefaultReadResult

```typescript
ReadableStreamDefaultReadValueResult<T> | ReadableStreamDefaultReadDoneResult
```

#### EventListenerOrEventListenerObject

```typescript
EventListener | EventListenerObject
```

#### BufferSource

```typescript
ArrayBufferView | ArrayBuffer
```

#### ArrayBufferLike

`ArrayBufferTypes[keyof ArrayBufferTypes]`

#### FormDataEntryValue

```typescript
File | string
```

#### RequestCache

`"default" | "force-cache" | "no-cache" | "no-store" | "only-if-cached" | "reload"`

#### RequestCredentials

`"include" | "omit" | "same-origin"`

#### HeadersInit

```typescript
Headers | string[][] | Record<string, string>
```

#### Record

Construct a type with a set of properties K of type T

`{ [P in K]: T; }`

#### RequestMode

`"cors" | "navigate" | "no-cors" | "same-origin"`

#### RequestRedirect

`"error" | "follow" | "manual"`

#### ReferrerPolicy

`"" | "no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "same-origin" | "strict-origin" | "strict-origin-when-cross-origin" | "unsafe-url"`

#### HttpResponseType

How to parse the Http response before returning it to the client.

`'arraybuffer' | 'blob' | 'json' | 'text' | 'document'`