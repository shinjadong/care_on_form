---
title: "InAppBrowser Capacitor Plugin API | Capacitor Documentation"
source: "https://capacitorjs.com/docs/apis/inappbrowser"
author:
published:
created: 2025-09-24
description: "The InAppBrowser Plugin provides a web browser view that allows you to load any web page externally. It behaves as a standard web browser and is useful to load untrusted content without risking your application's security. It offers three different ways to open URLs; in a WebView, in an in-app system browser (Custom Tabs for Android and SFSafariViewController for iOS), and in the device's default browser."
tags:
  - "clippings"
---
Version: v7

The InAppBrowser Plugin provides a web browser view that allows you to load any web page externally. It behaves as a standard web browser and is useful to load untrusted content without risking your application's security. It offers three different ways to open URLs; in a WebView, in an in-app system browser (Custom Tabs for Android and SFSafariViewController for iOS), and in the device's default browser.

## Install

```bash
npm install @capacitor/inappbrowser
npx cap sync
```

## Supported Platforms

- iOS
- Android

#### Android

The InAppBrowser plugin requires a minimum Android SDK target of 26. This is higher than the default that comes with your Capacitor application. You can update this value in your `android/variables.gradle` file.

## Usage Example

#### Open In External Browser

```typescript
import { InAppBrowser } from '@capacitor/inappbrowser';
await InAppBrowser.openInExternalBrowser({
    url: "https://www.google.com"
});
```
```typescript
import { InAppBrowser, DefaultSystemBrowserOptions } from '@capacitor/inappbrowser';
await InAppBrowser.openInSystemBrowser({
    url: "https://www.google.com",
    options: DefaultSystemBrowserOptions
});
```

#### Open In Web View

```typescript
import { InAppBrowser, DefaultWebViewOptions } from '@capacitor/inappbrowser';
await InAppBrowser.openInWebView({
    url: "https://www.google.com",
    options: DefaultWebViewOptions
});
```

#### Close (Web View or System Browser)

```typescript
import { InAppBrowser } from '@capacitor/inappbrowser';
await InAppBrowser.close();
```

#### Add Listeners

#### Remove All Listeners

```typescript
import { InAppBrowser } from '@capacitor/inappbrowser';
InAppBrowser.removeAllListeners();
```

## API

- [`openInWebView(...)`](https://capacitorjs.com/docs/apis/#openinwebview)
- [`openInSystemBrowser(...)`](https://capacitorjs.com/docs/apis/#openinsystembrowser)
- [`openInExternalBrowser(...)`](https://capacitorjs.com/docs/apis/#openinexternalbrowser)
- [`close()`](https://capacitorjs.com/docs/apis/#close)
- [`addListener('browserClosed' | 'browserPageLoaded', ...)`](https://capacitorjs.com/docs/apis/#addlistenerbrowserclosed--browserpageloaded-)
- [`addListener('browserPageNavigationCompleted', ...)`](https://capacitorjs.com/docs/apis/#addlistenerbrowserpagenavigationcompleted-)
- [`removeAllListeners()`](https://capacitorjs.com/docs/apis/#removealllisteners)
- [Interfaces](https://capacitorjs.com/docs/apis/#interfaces)
- [Enums](https://capacitorjs.com/docs/apis/#enums)

### openInWebView(...)

```typescript
openInWebView(model: OpenInWebViewParameterModel) => Promise<void>
```

Opens the web content of the given URL in your mobile app using a custom web view within your application.

| Param | Type | Description |
| --- | --- | --- |
| **`model`** | ```typescript OpenInWebViewParameterModel ``` | The parameters to open the URL in the web view |

---

### openInSystemBrowser(...)

```typescript
openInSystemBrowser(model: OpenInSystemBrowserParameterModel) => Promise<void>
```

Opens the web content of the given URL in your mobile app, using SafariViewController for iOS and Custom Tabs for Android.

| Param | Type | Description |
| --- | --- | --- |
| **`model`** | ```typescript OpenInSystemBrowserParameterModel ``` | The parameters to open the URL in the system browser |

---

### openInExternalBrowser(...)

```typescript
openInExternalBrowser(model: OpenInDefaultParameterModel) => Promise<void>
```

Opens the web content of the given URL in a separate browser, outside of your mobile application.

| Param | Type | Description |
| --- | --- | --- |
| **`model`** | ```typescript OpenInDefaultParameterModel ``` | The parameters to open the URL in the external browser |

---

### close()

```typescript
close() => Promise<void>
```

Closes the currently active browser. It can be used to close browsers launched through the openInSystemBrowser or openInWebView actions.

---

### addListener('browserClosed' | 'browserPageLoaded',...)

```typescript
addListener(eventName: 'browserClosed' | 'browserPageLoaded', listenerFunc: () => void) => Promise<PluginListenerHandle>
```

Adds a listener for the specified browser events, with no data being returned.

| Param | Type | Description |
| --- | --- | --- |
| **`eventName`** | `'browserClosed' \| 'browserPageLoaded'` | The name of the browser event to listen for: 'browserClosed' or 'browserPageLoaded'. |
| **`listenerFunc`** | `() => void` | The function to be called when the event occurs. |

**Returns:**

```typescript
Promise<PluginListenerHandle>
```

---

### addListener('browserPageNavigationCompleted',...)

Adds a listener for the specified browser event, which receives data.

| Param | Type | Description |
| --- | --- | --- |
| **`eventName`** | `'browserPageNavigationCompleted'` | The name of the browser event to listen for: 'browserPageNavigationCompleted'. Applies only to openInWebView. |
| **`listenerFunc`** | ```typescript (data: BrowserPageNavigationCompletedEventData) => void ``` | The function to be called when the event occurs. |

**Returns:**

```typescript
Promise<PluginListenerHandle>
```

---

### removeAllListeners()

```typescript
removeAllListeners() => void
```

Removes all listeners for the browser events.

---

### Interfaces

#### OpenInWebViewParameterModel

Defines the options for opening a URL in the web view.

| Prop | Type | Description |
| --- | --- | --- |
| **`options`** | ```typescript WebViewOptions ``` | A structure containing some configurations to apply to the Web View. |
| **`customHeaders`** | `{ [key: string]: string; }` | A map of custom headers to be sent with the request. |

#### WebViewOptions

| Prop | Type | Description |
| --- | --- | --- |
| **`showURL`** | `boolean` | Displays the URL on the Web View. |
| **`showToolbar`** | `boolean` | Displays the toolbar on the Web View. |
| **`clearCache`** | `boolean` | Clears the Web View's cookie cache before a new window is opened. |
| **`clearSessionCache`** | `boolean` | Clears the session cookie cache before a new window is opened. |
| **`mediaPlaybackRequiresUserAction`** | `boolean` | Prevents HTML5 audio or video from auto-playing. |
| **`closeButtonText`** | `string` | Sets the text to display on the Close button on the Web View. |
| **`toolbarPosition`** | ```typescript ToolbarPosition ``` | Sets the position to display the Toolbar on the Web View. |
| **`showNavigationButtons`** | `boolean` | Displays the navigation buttons. |
| **`leftToRight`** | `boolean` | Swaps the positions of the navigation buttons and the close button. |
| **`customWebViewUserAgent`** | `string \| null` | Sets a custom user agent to open the Web View with. If empty or not set, the parameter will be ignored. |
| **`android`** | ```typescript AndroidWebViewOptions ``` | Android-specific Web View options. |
| **`iOS`** | ```typescript iOSWebViewOptions ``` | iOS-specific Web View options. |

#### AndroidWebViewOptions

| Prop | Type | Description |
| --- | --- | --- |
| **`allowZoom`** | `boolean` | Shows the Android browser's zoom controls. |
| **`hardwareBack`** | `boolean` | Uses the hardware back button to navigate backwards through the Web View's history. If there is no previous page, the Web View will close. |
| **`pauseMedia`** | `boolean` | Makes the Web View pause/resume with the app to stop background audio. |

#### iOSWebViewOptions

| Prop | Type | Description |
| --- | --- | --- |
| **`allowOverScroll`** | `boolean` | Turns on the Web View bounce property. |
| **`enableViewportScale`** | `boolean` | Prevents viewport scaling through a meta tag. |
| **`allowInLineMediaPlayback`** | `boolean` | Allows in-line HTML5 media playback, displaying within the browser window rather than a device-specific playback interface. Note: The HTML's video element must also include the webkit-playsinline attribute. |
| **`surpressIncrementalRendering`** | `boolean` | Waits until all new view content is received before being rendered. |
| **`viewStyle`** | ```typescript iOSViewStyle ``` | Sets the presentation style of the Web View. |
| **`animationEffect`** | ```typescript iOSAnimation ``` | Sets the transition style of the Web View. |
| **`allowsBackForwardNavigationGestures`** | `boolean` | Enables back and forward swipe gestures in the Web View. |

#### OpenInSystemBrowserParameterModel

Defines the options for opening a URL in the system browser.

| Prop | Type | Description |
| --- | --- | --- |
| **`options`** | ```typescript SystemBrowserOptions ``` | A structure containing some configurations to apply to the System Browser. |

#### SystemBrowserOptions

| Prop | Type | Description |
| --- | --- | --- |
| **`android`** | ```typescript AndroidSystemBrowserOptions ``` | Android-specific System Browser options. |
| **`iOS`** | ```typescript iOSSystemBrowserOptions ``` | iOS-specific System Browser options. |

#### AndroidSystemBrowserOptions

| Prop | Type | Description |
| --- | --- | --- |
| **`showTitle`** | `boolean` | Enables the title display. |
| **`hideToolbarOnScroll`** | `boolean` | Hides the toolbar when scrolling. |
| **`viewStyle`** | ```typescript AndroidViewStyle ``` | Sets the presentation style of CustomTabs. |
| **`bottomSheetOptions`** | ```typescript AndroidBottomSheet ``` | Sets the options for the bottom sheet when this is selected as the viewStyle. If viewStyle is FULL\_SCREEN, this will be ignored. |
| **`startAnimation`** | ```typescript AndroidAnimation ``` | Sets the start animation for when the browser appears. |
| **`exitAnimation`** | ```typescript AndroidAnimation ``` | Sets the exit animation for when the browser disappears. |

#### AndroidBottomSheet

| Prop | Type | Description |
| --- | --- | --- |
| **`height`** | `number` | Sets the height of the bottom sheet, in pixels. Custom tabs will set the bottom height to at least 50% of the screen. If no value is passed, it will default to the minimum value. |
| **`isFixed`** | `boolean` | Sets whether the bottom sheet is fixed. |

#### iOSSystemBrowserOptions

| Prop | Type | Description |
| --- | --- | --- |
| **`closeButtonText`** | ```typescript DismissStyle ``` | Sets a text to use as the close button's caption. |
| **`viewStyle`** | ```typescript iOSViewStyle ``` | Sets the presentation style of SafariViewController. |
| **`animationEffect`** | ```typescript iOSAnimation ``` | Sets the transition style of SafariViewController. |
| **`enableBarsCollapsing`** | `boolean` | Enables bars to collapse on scrolling down. |
| **`enableReadersMode`** | `boolean` | Enables readers mode. |

#### OpenInDefaultParameterModel

Defines the options for opening a URL in the external browser and used by the others.

| Prop | Type | Description |
| --- | --- | --- |
| **`url`** | `string` | The URL to be opened. It must contain either 'http' or 'https' as the protocol prefix. |

#### PluginListenerHandle

| Prop | Type |
| --- | --- |
| **`remove`** | `() => Promise<void>` |

#### BrowserPageNavigationCompletedEventData

Defines the data for the 'browserPageNavigationCompleted' event.

| Prop | Type | Description |
| --- | --- | --- |
| **`url`** | `string` | The URL of the page that was loaded. |

### Enums

#### ToolbarPosition

| Members |
| --- |
| **`TOP`** |
| **`BOTTOM`** |

#### iOSViewStyle

| Members |
| --- |
| **`PAGE_SHEET`** |
| **`FORM_SHEET`** |
| **`FULL_SCREEN`** |

#### iOSAnimation

| Members |
| --- |
| **`FLIP_HORIZONTAL`** |
| **`CROSS_DISSOLVE`** |
| **`COVER_VERTICAL`** |

#### AndroidViewStyle

| Members |
| --- |
| **`BOTTOM_SHEET`** |
| **`FULL_SCREEN`** |

#### AndroidAnimation

| Members |
| --- |
| **`FADE_IN`** |
| **`FADE_OUT`** |
| **`SLIDE_IN_LEFT`** |
| **`SLIDE_OUT_RIGHT`** |

#### DismissStyle

| Members |
| --- |
| **`CLOSE`** |
| **`CANCEL`** |
| **`DONE`** |