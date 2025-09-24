---
title: "Camera Capacitor Plugin API | Capacitor Documentation"
source: "https://capacitorjs.com/docs/apis/camera"
author:
published:
created: 2025-09-24
description: "The Camera API provides the ability to take a photo with the camera or choose an existing one from the photo album."
tags:
  - "clippings"
---
Version: v7

The Camera API provides the ability to take a photo with the camera or choose an existing one from the photo album.

## Install

```bash
npm install @capacitor/camera
npx cap sync
```

## iOS

iOS requires the following usage description be added and filled out for your app in `Info.plist`:

- `NSCameraUsageDescription` (`Privacy - Camera Usage Description`)
- `NSPhotoLibraryAddUsageDescription` (`Privacy - Photo Library Additions Usage Description`)
- `NSPhotoLibraryUsageDescription` (`Privacy - Photo Library Usage Description`)

Read about [Configuring `Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist) in the [iOS Guide](https://capacitorjs.com/docs/ios) for more information on setting iOS permissions in Xcode

## Android

When picking existing images from the device gallery, the Android Photo Picker component is now used. The Photo Picker is available on devices that meet the following criteria:

- Run Android 11 (API level 30) or higher
- Receive changes to Modular System Components through Google System Updates

Older devices and Android Go devices running Android 11 or 12 that support Google Play services can install a backported version of the photo picker. To enable the automatic installation of the backported photo picker module through Google Play services, add the following entry to the `<application>` tag in your `AndroidManifest.xml` file:

```xml
<!-- Trigger Google Play services to install the backported photo picker module. -->
<!--suppress AndroidDomInspection -->
<service android:name="com.google.android.gms.metadata.ModuleDependencies"
    android:enabled="false"
    android:exported="false"
    tools:ignore="MissingClass">
    <intent-filter>
        <action android:name="com.google.android.gms.metadata.MODULE_DEPENDENCIES" />
    </intent-filter>
    <meta-data android:name="photopicker_activity:0:required" android:value="" />
</service>
```

If that entry is not added, the devices that don't support the Photo Picker, the Photo Picker component fallbacks to `Intent.ACTION_OPEN_DOCUMENT`.

The Camera plugin requires no permissions, unless using `saveToGallery: true`, in that case the following permissions should be added to your `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

You can also specify those permissions only for the Android versions where they will be requested:

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" android:maxSdkVersion="32"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" android:maxSdkVersion="29"/>
```

The storage permissions are for reading/saving photo files.

Read about [Setting Permissions](https://capacitorjs.com/docs/android/configuration#setting-permissions) in the [Android Guide](https://capacitorjs.com/docs/android) for more information on setting Android permissions.

Additionally, because the Camera API launches a separate Activity to handle taking the photo, you should listen for `appRestoredResult` in the `App` plugin to handle any camera data that was sent in the case your app was terminated by the operating system while the Activity was running.

### Variables

This plugin will use the following project variables (defined in your app's `variables.gradle` file):

- `androidxExifInterfaceVersion`: version of `androidx.exifinterface:exifinterface` (default: `1.3.7`)
- `androidxMaterialVersion`: version of `com.google.android.material:material` (default: `1.12.0`)

## PWA Notes

[PWA Elements](https://capacitorjs.com/docs/web/pwa-elements) are required for Camera plugin to work.

## Example

```typescript
import { Camera, CameraResultType } from '@capacitor/camera';

const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri
  });

  // image.webPath will contain a path that can be set as an image src.
  // You can access the original file using image.path, which can be
  // passed to the Filesystem API to read the raw data of the image,
  // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
  var imageUrl = image.webPath;

  // Can be set to the src of an image now
  imageElement.src = imageUrl;
};
```

## API

- [`getPhoto(...)`](https://capacitorjs.com/docs/apis/#getphoto)
- [`pickImages(...)`](https://capacitorjs.com/docs/apis/#pickimages)
- [`pickLimitedLibraryPhotos()`](https://capacitorjs.com/docs/apis/#picklimitedlibraryphotos)
- [`getLimitedLibraryPhotos()`](https://capacitorjs.com/docs/apis/#getlimitedlibraryphotos)
- [`checkPermissions()`](https://capacitorjs.com/docs/apis/#checkpermissions)
- [`requestPermissions(...)`](https://capacitorjs.com/docs/apis/#requestpermissions)
- [Interfaces](https://capacitorjs.com/docs/apis/#interfaces)
- [Type Aliases](https://capacitorjs.com/docs/apis/#type-aliases)
- [Enums](https://capacitorjs.com/docs/apis/#enums)

### getPhoto(...)

```typescript
getPhoto(options: ImageOptions) => Promise<Photo>
```

Prompt the user to pick a photo from an album, or take a new photo with the camera.

| Param | Type |
| --- | --- |
| **`options`** | ```typescript ImageOptions ``` |

**Returns:**

```typescript
Promise<Photo>
```

**Since:** 1.0.0

---

### pickImages(...)

```typescript
pickImages(options: GalleryImageOptions) => Promise<GalleryPhotos>
```

Allows the user to pick multiple pictures from the photo gallery. On iOS 13 and older it only allows to pick one picture.

| Param | Type |
| --- | --- |
| **`options`** | ```typescript GalleryImageOptions ``` |

**Returns:**

```typescript
Promise<GalleryPhotos>
```

**Since:** 1.2.0

---

### pickLimitedLibraryPhotos()

```typescript
pickLimitedLibraryPhotos() => Promise<GalleryPhotos>
```

iOS 14+ Only: Allows the user to update their limited photo library selection. On iOS 15+ returns all the limited photos after the picker dismissal. On iOS 14 or if the user gave full access to the photos it returns an empty array.

**Returns:**

```typescript
Promise<GalleryPhotos>
```

**Since:** 4.1.0

---

### getLimitedLibraryPhotos()

```typescript
getLimitedLibraryPhotos() => Promise<GalleryPhotos>
```

iOS 14+ Only: Return an array of photos selected from the limited photo library.

**Returns:**

```typescript
Promise<GalleryPhotos>
```

**Since:** 4.1.0

---

### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

Check camera and photo album permissions

**Returns:**

```typescript
Promise<PermissionStatus>
```

**Since:** 1.0.0

---

### requestPermissions(...)

```typescript
requestPermissions(permissions?: CameraPluginPermissions | undefined) => Promise<PermissionStatus>
```

Request camera and photo album permissions

| Param | Type |
| --- | --- |
| **`permissions`** | ```typescript CameraPluginPermissions ``` |

**Returns:**

```typescript
Promise<PermissionStatus>
```

**Since:** 1.0.0

---

### Interfaces

#### Photo

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`base64String`** | `string` | The base64 encoded string representation of the image, if using [CameraResultType.Base64](https://capacitorjs.com/docs/apis/#cameraresulttype). | 1.0.0 |
| **`dataUrl`** | `string` | The url starting with 'data:image/jpeg;base64,' and the base64 encoded string representation of the image, if using [CameraResultType.DataUrl](https://capacitorjs.com/docs/apis/#cameraresulttype). Note: On web, the file format could change depending on the browser. | 1.0.0 |
| **`path`** | `string` | If using [CameraResultType.Uri](https://capacitorjs.com/docs/apis/#cameraresulttype), the path will contain a full, platform-specific file URL that can be read later using the Filesystem API. | 1.0.0 |
| **`webPath`** | `string` | webPath returns a path that can be used to set the src attribute of an image for efficient loading and rendering. | 1.0.0 |
| **`exif`** | `any` | Exif data, if any, retrieved from the image | 1.0.0 |
| **`format`** | `string` | The format of the image, ex: jpeg, png, gif. iOS and Android only support jpeg. Web supports jpeg, png and gif, but the exact availability may vary depending on the browser. gif is only supported if `webUseInput` is set to `true` or if `source` is set to `Photos`. | 1.0.0 |
| **`saved`** | `boolean` | Whether if the image was saved to the gallery or not. On Android and iOS, saving to the gallery can fail if the user didn't grant the required permissions. On Web there is no gallery, so always returns false. | 1.1.0 |

#### ImageOptions

| Prop | Type | Description | Default | Since |
| --- | --- | --- | --- | --- |
| **`quality`** | `number` | The quality of image to return as JPEG, from 0-100 Note: This option is only supported on Android and iOS |  | 1.0.0 |
| **`allowEditing`** | `boolean` | Whether to allow the user to crop or make small edits (platform specific). On iOS 14+ it's only supported for [CameraSource.Camera](https://capacitorjs.com/docs/apis/#camerasource), but not for [CameraSource.Photos](https://capacitorjs.com/docs/apis/#camerasource). |  | 1.0.0 |
| **`resultType`** | ```typescript CameraResultType ``` | How the data should be returned. Currently, only 'Base64', 'DataUrl' or 'Uri' is supported |  | 1.0.0 |
| **`saveToGallery`** | `boolean` | Whether to save the photo to the gallery. If the photo was picked from the gallery, it will only be saved if edited. | `: false` | 1.0.0 |
| **`width`** | `number` | The desired maximum width of the saved image. The aspect ratio is respected. |  | 1.0.0 |
| **`height`** | `number` | The desired maximum height of the saved image. The aspect ratio is respected. |  | 1.0.0 |
| **`correctOrientation`** | `boolean` | Whether to automatically rotate the image "up" to correct for orientation in portrait mode | `: true` | 1.0.0 |
| **`source`** | ```typescript CameraSource ``` | The source to get the photo from. By default this prompts the user to select either the photo album or take a photo. | `: CameraSource.Prompt` | 1.0.0 |
| **`direction`** | ```typescript CameraDirection ``` | iOS and Web only: The camera direction. | `: CameraDirection.Rear` | 1.0.0 |
| **`presentationStyle`** | `'fullscreen' \| 'popover'` | iOS only: The presentation style of the Camera. | `: 'fullscreen'` | 1.0.0 |
| **`webUseInput`** | `boolean` | Web only: Whether to use the PWA Element experience or file input. The default is to use PWA Elements if installed and fall back to file input. To always use file input, set this to `true`. Learn more about PWA Elements: [https://capacitorjs.com/docs/web/pwa-elements](https://capacitorjs.com/docs/web/pwa-elements) |  | 1.0.0 |
| **`promptLabelHeader`** | `string` | Text value to use when displaying the prompt. | `: 'Photo'` | 1.0.0 |
| **`promptLabelCancel`** | `string` | Text value to use when displaying the prompt. iOS only: The label of the 'cancel' button. | `: 'Cancel'` | 1.0.0 |
| **`promptLabelPhoto`** | `string` | Text value to use when displaying the prompt. The label of the button to select a saved image. | `: 'From Photos'` | 1.0.0 |
| **`promptLabelPicture`** | `string` | Text value to use when displaying the prompt. The label of the button to open the camera. | `: 'Take Picture'` | 1.0.0 |

#### GalleryPhotos

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`photos`** | `GalleryPhoto[]` | Array of all the picked photos. | 1.2.0 |

#### GalleryPhoto

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`path`** | `string` | Full, platform-specific file URL that can be read later using the Filesystem API. | 1.2.0 |
| **`webPath`** | `string` | webPath returns a path that can be used to set the src attribute of an image for efficient loading and rendering. | 1.2.0 |
| **`exif`** | `any` | Exif data, if any, retrieved from the image | 1.2.0 |
| **`format`** | `string` | The format of the image, ex: jpeg, png, gif. iOS and Android only support jpeg. Web supports jpeg, png and gif. | 1.2.0 |

#### GalleryImageOptions

| Prop | Type | Description | Default | Since |
| --- | --- | --- | --- | --- |
| **`quality`** | `number` | The quality of image to return as JPEG, from 0-100 Note: This option is only supported on Android and iOS. |  | 1.2.0 |
| **`width`** | `number` | The desired maximum width of the saved image. The aspect ratio is respected. |  | 1.2.0 |
| **`height`** | `number` | The desired maximum height of the saved image. The aspect ratio is respected. |  | 1.2.0 |
| **`correctOrientation`** | `boolean` | Whether to automatically rotate the image "up" to correct for orientation in portrait mode | `: true` | 1.2.0 |
| **`presentationStyle`** | `'fullscreen' \| 'popover'` | iOS only: The presentation style of the Camera. | `: 'fullscreen'` | 1.2.0 |
| **`limit`** | `number` | Maximum number of pictures the user will be able to choose. Note: This option is only supported on Android 13+ and iOS. | `0 (unlimited)` | 1.2.0 |

#### PermissionStatus

| Prop | Type |
| --- | --- |
| **`camera`** | ```typescript CameraPermissionState ``` |
| **`photos`** | ```typescript CameraPermissionState ``` |

#### CameraPluginPermissions

| Prop | Type |
| --- | --- |
| **`permissions`** | `CameraPermissionType[]` |

### Type Aliases

#### CameraPermissionState

```typescript
PermissionState | 'limited'
```

#### PermissionState

`'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'`

#### CameraPermissionType

`'camera' | 'photos'`

### Enums

#### CameraResultType

| Members | Value |
| --- | --- |
| **`Uri`** | `'uri'` |
| **`Base64`** | `'base64'` |
| **`DataUrl`** | `'dataUrl'` |

#### CameraSource

| Members | Value | Description |
| --- | --- | --- |
| **`Prompt`** | `'PROMPT'` | Prompts the user to select either the photo album or take a photo. |
| **`Camera`** | `'CAMERA'` | Take a new photo using the camera. |
| **`Photos`** | `'PHOTOS'` | Pick an existing photo from the gallery or photo album. |

#### CameraDirection

| Members | Value |
| --- | --- |
| **`Rear`** | `'REAR'` |
| **`Front`** | `'FRONT'` |