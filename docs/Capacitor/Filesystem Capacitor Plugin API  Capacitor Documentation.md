---
title: "Filesystem Capacitor Plugin API | Capacitor Documentation"
source: "https://capacitorjs.com/docs/apis/filesystem"
author:
published:
created: 2025-09-24
description: "The Filesystem API provides a NodeJS-like API for working with files on the device."
tags:
  - "clippings"
---
Version: v7

The Filesystem API provides a NodeJS-like API for working with files on the device.

## Install

```bash
npm install @capacitor/filesystem
npx cap sync
```

## Apple Privacy Manifest Requirements

Apple mandates that app developers now specify approved reasons for API usage to enhance user privacy. By May 1st, 2024, it's required to include these reasons when submitting apps to the App Store Connect.

When using this specific plugin in your app, you must create a `PrivacyInfo.xcprivacy` file in `/ios/App` or use the VS Code Extension to generate it, specifying the usage reasons.

For detailed steps on how to do this, please see the [Capacitor Docs](https://capacitorjs.com/docs/ios/privacy-manifest).

**For this plugin, the required dictionary key is [NSPrivacyAccessedAPICategoryFileTimestamp](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api#4278393) and the recommended reason is [C617.1](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api#4278393).**

### Example PrivacyInfo.xcprivacy

## Migrating from downloadFile to File Transfer plugin

As of version 7.1.0, the `downloadFile` functionality in the Filesystem plugin has been deprecated in favor of the new [@capacitor/file-transfer](https://capacitorjs.com/docs/apis/file-transfer) plugin.

### Installing the File Transfer plugin

```bash
npm install @capacitor/file-transfer
npx cap sync
```

### Migration example

Before (using Filesystem plugin):

```typescript
import { Filesystem, Directory } from '@capacitor/filesystem';

await Filesystem.downloadFile({
  url: 'https://example.com/file.pdf',
  path: 'downloaded-file.pdf',
  directory: Directory.Documents,
  progress: true
});

// Progress events
Filesystem.addListener('progress', (progress) => {
  console.log(\`Downloaded ${progress.bytes} of ${progress.contentLength}\`);
});
```

After (using File Transfer plugin):

```typescript
import { FileTransfer } from '@capacitor/file-transfer';
import { Filesystem, Directory } from '@capacitor/filesystem';

// First get the full file path using Filesystem
const fileInfo = await Filesystem.getUri({
  directory: Directory.Documents,
  path: 'downloaded-file.pdf'
});

// Then use the FileTransfer plugin to download
await FileTransfer.downloadFile({
  url: 'https://example.com/file.pdf',
  path: fileInfo.uri,
  progress: true
});

// Progress events
FileTransfer.addListener('progress', (progress) => {
  console.log(\`Downloaded ${progress.bytes} of ${progress.contentLength}\`);
});
```

The File Transfer plugin offers improved reliability, better error handling with specific error codes, and also adds upload functionality.

## iOS

To have files appear in the Files app, you must also set the following keys to `YES` in `Info.plist`:

- `UIFileSharingEnabled` (`Application supports iTunes file sharing`)
- `LSSupportsOpeningDocumentsInPlace` (`Supports opening documents in place`)

Read about [Configuring iOS](https://capacitorjs.com/docs/ios/configuration) for help.

## Android

If using [`Directory.Documents`](https://capacitorjs.com/docs/apis/#directory) or [`Directory.ExternalStorage`](https://capacitorjs.com/docs/apis/#directory), in Android 10 and older, this API requires the following permissions be added to your `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

Read about [Setting Permissions](https://capacitorjs.com/docs/android/configuration#setting-permissions) in the [Android Guide](https://capacitorjs.com/docs/android) for more information on setting Android permissions.

Note that [`Directory.ExternalStorage`](https://capacitorjs.com/docs/apis/#directory) is only available on Android 9 or older and [`Directory.Documents`](https://capacitorjs.com/docs/apis/#directory) only allows to access the files/folders created by your app on Android on Android 11 and newer.

Working with large files may require you to add `android:largeHeap="true"` to the `<application>` tag in `AndroidManifest.xml`.

## Understanding Directories and Files

iOS and Android have additional layers of separation between files, such as special directories that are backed up to the Cloud, or ones for storing Documents. The Filesystem API offers a simple way to scope each operation to a specific special directory on the device.

Additionally, the Filesystem API supports using full `file://` paths, or reading `content://` files on Android. Simply leave out the `directory` param to use a full file path.

## Example

```typescript
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

const writeSecretFile = async () => {
  await Filesystem.writeFile({
    path: "secrets/text.txt",
    data: "This is a test",
    directory: Directory.Documents,
    encoding: Encoding.UTF8,
  });
};

const readSecretFile = async () => {
  const contents = await Filesystem.readFile({
    path: "secrets/text.txt",
    directory: Directory.Documents,
    encoding: Encoding.UTF8,
  });

  console.log("secrets:", contents);
};

const deleteSecretFile = async () => {
  await Filesystem.deleteFile({
    path: "secrets/text.txt",
    directory: Directory.Documents,
  });
};

const readFilePath = async () => {
  // Here's an example of reading a file with a full file path. Use this to
  // read binary data (base64 encoded) from plugins that return File URIs, such as
  // the Camera.
  const contents = await Filesystem.readFile({
    path: "file:///var/mobile/Containers/Data/Application/22A433FD-D82D-4989-8BE6-9FC49DEA20BB/Documents/text.txt",
  });

  console.log("data:", contents);
};
```

## API

- [`checkPermissions()`](https://capacitorjs.com/docs/apis/#checkpermissions)
- [`requestPermissions()`](https://capacitorjs.com/docs/apis/#requestpermissions)
- [`readFile(...)`](https://capacitorjs.com/docs/apis/#readfile)
- [`readFileInChunks(...)`](https://capacitorjs.com/docs/apis/#readfileinchunks)
- [`writeFile(...)`](https://capacitorjs.com/docs/apis/#writefile)
- [`appendFile(...)`](https://capacitorjs.com/docs/apis/#appendfile)
- [`deleteFile(...)`](https://capacitorjs.com/docs/apis/#deletefile)
- [`mkdir(...)`](https://capacitorjs.com/docs/apis/#mkdir)
- [`rmdir(...)`](https://capacitorjs.com/docs/apis/#rmdir)
- [`readdir(...)`](https://capacitorjs.com/docs/apis/#readdir)
- [`getUri(...)`](https://capacitorjs.com/docs/apis/#geturi)
- [`stat(...)`](https://capacitorjs.com/docs/apis/#stat)
- [`rename(...)`](https://capacitorjs.com/docs/apis/#rename)
- [`copy(...)`](https://capacitorjs.com/docs/apis/#copy)
- [`downloadFile(...)`](https://capacitorjs.com/docs/apis/#downloadfile)
- [`addListener('progress', ...)`](https://capacitorjs.com/docs/apis/#addlistenerprogress-)
- [`removeAllListeners()`](https://capacitorjs.com/docs/apis/#removealllisteners)
- [Interfaces](https://capacitorjs.com/docs/apis/#interfaces)
- [Type Aliases](https://capacitorjs.com/docs/apis/#type-aliases)
- [Enums](https://capacitorjs.com/docs/apis/#enums)

For list of existing error codes, see [Errors](https://capacitorjs.com/docs/apis/#errors).

### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

Check read/write permissions. Required on Android, only when using [`Directory.Documents`](https://capacitorjs.com/docs/apis/#directory) or `Directory.ExternalStorage`.

**Returns:**

```typescript
Promise<PermissionStatus>
```

**Since:** 1.0.0

---

### requestPermissions()

```typescript
requestPermissions() => Promise<PermissionStatus>
```

Request read/write permissions. Required on Android, only when using [`Directory.Documents`](https://capacitorjs.com/docs/apis/#directory) or `Directory.ExternalStorage`.

**Returns:**

```typescript
Promise<PermissionStatus>
```

**Since:** 1.0.0

---

### readFile(...)

```typescript
readFile(options: ReadFileOptions) => Promise<ReadFileResult>
```

Read a file from disk

| Param | Type |
| --- | --- |
| **`options`** | ```typescript ReadFileOptions ``` |

**Returns:**

```typescript
Promise<ReadFileResult>
```

**Since:** 1.0.0

---

### readFileInChunks(...)

```typescript
readFileInChunks(options: ReadFileInChunksOptions, callback: ReadFileInChunksCallback) => Promise<CallbackID>
```

Read a file from disk, in chunks. Native only (not available in web). Use the callback to receive each read chunk. If empty chunk is returned, it means file has been completely read.

| Param | Type |
| --- | --- |
| **`options`** | ```typescript ReadFileInChunksOptions ``` |
| **`callback`** | ```typescript ReadFileInChunksCallback ``` |

**Returns:**`Promise<string>`

**Since:** 7.1.0

---

### writeFile(...)

```typescript
writeFile(options: WriteFileOptions) => Promise<WriteFileResult>
```

Write a file to disk in the specified location on device

| Param | Type |
| --- | --- |
| **`options`** | ```typescript WriteFileOptions ``` |

**Returns:**

```typescript
Promise<WriteFileResult>
```

**Since:** 1.0.0

---

### appendFile(...)

```typescript
appendFile(options: AppendFileOptions) => Promise<void>
```

Append to a file on disk in the specified location on device

| Param | Type |
| --- | --- |
| **`options`** | ```typescript AppendFileOptions ``` |

**Since:** 1.0.0

---

### deleteFile(...)

```typescript
deleteFile(options: DeleteFileOptions) => Promise<void>
```

Delete a file from disk

| Param | Type |
| --- | --- |
| **`options`** | ```typescript DeleteFileOptions ``` |

**Since:** 1.0.0

---

### mkdir(...)

```typescript
mkdir(options: MkdirOptions) => Promise<void>
```

Create a directory.

| Param | Type |
| --- | --- |
| **`options`** | ```typescript MkdirOptions ``` |

**Since:** 1.0.0

---

### rmdir(...)

```typescript
rmdir(options: RmdirOptions) => Promise<void>
```

Remove a directory

| Param | Type |
| --- | --- |
| **`options`** | ```typescript RmdirOptions ``` |

**Since:** 1.0.0

---

### readdir(...)

```typescript
readdir(options: ReaddirOptions) => Promise<ReaddirResult>
```

Return a list of files from the directory (not recursive)

| Param | Type |
| --- | --- |
| **`options`** | ```typescript ReaddirOptions ``` |

**Returns:**

```typescript
Promise<ReaddirResult>
```

**Since:** 1.0.0

---

### getUri(...)

```typescript
getUri(options: GetUriOptions) => Promise<GetUriResult>
```

Return full File URI for a path and directory

| Param | Type |
| --- | --- |
| **`options`** | ```typescript GetUriOptions ``` |

**Returns:**

```typescript
Promise<GetUriResult>
```

**Since:** 1.0.0

---

### stat(...)

```typescript
stat(options: StatOptions) => Promise<StatResult>
```

Return data about a file

| Param | Type |
| --- | --- |
| **`options`** | ```typescript StatOptions ``` |

**Returns:**

```typescript
Promise<FileInfo>
```

**Since:** 1.0.0

---

### rename(...)

```typescript
rename(options: RenameOptions) => Promise<void>
```

Rename a file or directory

| Param | Type |
| --- | --- |
| **`options`** | ```typescript CopyOptions ``` |

**Since:** 1.0.0

---

### copy(...)

```typescript
copy(options: CopyOptions) => Promise<CopyResult>
```

Copy a file or directory

| Param | Type |
| --- | --- |
| **`options`** | ```typescript CopyOptions ``` |

**Returns:**

```typescript
Promise<CopyResult>
```

**Since:** 1.0.0

---

### downloadFile(...)

```typescript
downloadFile(options: DownloadFileOptions) => Promise<DownloadFileResult>
```

Perform a http request to a server and download the file to the specified destination.

This method has been deprecated since version 7.1.0. We recommend using the @capacitor/file-transfer plugin instead, in conjunction with this plugin.

| Param | Type |
| --- | --- |
| **`options`** | ```typescript DownloadFileOptions ``` |

**Returns:**

```typescript
Promise<DownloadFileResult>
```

**Since:** 5.1.0

---

### addListener('progress',...)

```typescript
addListener(eventName: 'progress', listenerFunc: ProgressListener) => Promise<PluginListenerHandle>
```

Add a listener to file download progress events.

This method has been deprecated since version 7.1.0. We recommend using the @capacitor/file-transfer plugin instead, in conjunction with this plugin.

| Param | Type |
| --- | --- |
| **`eventName`** | `'progress'` |
| **`listenerFunc`** | ```typescript ProgressListener ``` |

**Returns:**

```typescript
Promise<PluginListenerHandle>
```

**Since:** 5.1.0

---

### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

Remove all listeners for this plugin.

This method has been deprecated since version 7.1.0. We recommend using the @capacitor/file-transfer plugin instead, in conjunction with this plugin.

**Since:** 5.2.0

---

### Interfaces

#### PermissionStatus

| Prop | Type |
| --- | --- |
| **`publicStorage`** | ```typescript PermissionState ``` |

#### ReadFileResult

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`data`** | `string \| Blob` | The representation of the data contained in the file Note: Blob is only available on Web. On native, the data is returned as a string. | 1.0.0 |

#### ReadFileOptions

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`path`** | `string` | The path of the file to read | 1.0.0 |
| **`directory`** | ```typescript Directory ``` | The [`Directory`](https://capacitorjs.com/docs/apis/#directory) to read the file from | 1.0.0 |
| **`encoding`** | ```typescript Encoding ``` | The encoding to read the file in, if not provided, data is read as binary and returned as base64 encoded. Pass [Encoding.UTF8](https://capacitorjs.com/docs/apis/#encoding) to read data as string | 1.0.0 |

#### ReadFileInChunksOptions

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`chunkSize`** | `number` | Size of the chunks in bytes. | 7.1.0 |

#### WriteFileResult

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`uri`** | `string` | The uri where the file was written into | 1.0.0 |

#### WriteFileOptions

| Prop | Type | Description | Default | Since |
| --- | --- | --- | --- | --- |
| **`path`** | `string` | The path of the file to write |  | 1.0.0 |
| **`data`** | `string \| Blob` | The data to write Note: Blob data is only supported on Web. |  | 1.0.0 |
| **`directory`** | ```typescript Directory ``` | The [`Directory`](https://capacitorjs.com/docs/apis/#directory) to store the file in |  | 1.0.0 |
| **`encoding`** | ```typescript Encoding ``` | The encoding to write the file in. If not provided, data is written as base64 encoded. Pass [Encoding.UTF8](https://capacitorjs.com/docs/apis/#encoding) to write data as string |  | 1.0.0 |
| **`recursive`** | `boolean` | Whether to create any missing parent directories. | `false` | 1.0.0 |

#### AppendFileOptions

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`path`** | `string` | The path of the file to append | 1.0.0 |
| **`data`** | `string` | The data to write | 1.0.0 |
| **`directory`** | ```typescript Directory ``` | The [`Directory`](https://capacitorjs.com/docs/apis/#directory) to store the file in | 1.0.0 |
| **`encoding`** | ```typescript Encoding ``` | The encoding to write the file in. If not provided, data is written as base64 encoded. Pass [Encoding.UTF8](https://capacitorjs.com/docs/apis/#encoding) to write data as string | 1.0.0 |

#### DeleteFileOptions

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`path`** | `string` | The path of the file to delete | 1.0.0 |
| **`directory`** | ```typescript Directory ``` | The [`Directory`](https://capacitorjs.com/docs/apis/#directory) to delete the file from | 1.0.0 |

#### MkdirOptions

| Prop | Type | Description | Default | Since |
| --- | --- | --- | --- | --- |
| **`path`** | `string` | The path of the new directory |  | 1.0.0 |
| **`directory`** | ```typescript Directory ``` | The [`Directory`](https://capacitorjs.com/docs/apis/#directory) to make the new directory in |  | 1.0.0 |
| **`recursive`** | `boolean` | Whether to create any missing parent directories as well. | `false` | 1.0.0 |

#### RmdirOptions

| Prop | Type | Description | Default | Since |
| --- | --- | --- | --- | --- |
| **`path`** | `string` | The path of the directory to remove |  | 1.0.0 |
| **`directory`** | ```typescript Directory ``` | The [`Directory`](https://capacitorjs.com/docs/apis/#directory) to remove the directory from |  | 1.0.0 |
| **`recursive`** | `boolean` | Whether to recursively remove the contents of the directory | `false` | 1.0.0 |

#### ReaddirResult

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`files`** | `FileInfo[]` | List of files and directories inside the directory | 1.0.0 |

#### FileInfo

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`name`** | `string` | Name of the file or directory. | 7.1.0 |
| **`type`** | `'file' \| 'directory'` | Type of the file. | 4.0.0 |
| **`size`** | `number` | Size of the file in bytes. | 4.0.0 |
| **`ctime`** | `number` | Time of creation in milliseconds. It's not available on Android 7 and older devices. | 7.1.0 |
| **`mtime`** | `number` | Time of last modification in milliseconds. | 7.1.0 |
| **`uri`** | `string` | The uri of the file. | 4.0.0 |

#### ReaddirOptions

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`path`** | `string` | The path of the directory to read | 1.0.0 |
| **`directory`** | ```typescript Directory ``` | The [`Directory`](https://capacitorjs.com/docs/apis/#directory) to list files from | 1.0.0 |

#### GetUriResult

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`uri`** | `string` | The uri of the file | 1.0.0 |

#### GetUriOptions

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`path`** | `string` | The path of the file to get the URI for | 1.0.0 |
| **`directory`** | ```typescript Directory ``` | The [`Directory`](https://capacitorjs.com/docs/apis/#directory) to get the file under | 1.0.0 |

#### StatOptions

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`path`** | `string` | The path of the file to get data about | 1.0.0 |
| **`directory`** | ```typescript Directory ``` | The [`Directory`](https://capacitorjs.com/docs/apis/#directory) to get the file under | 1.0.0 |

#### CopyOptions

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`from`** | `string` | The existing file or directory | 1.0.0 |
| **`to`** | `string` | The destination file or directory | 1.0.0 |
| **`directory`** | ```typescript Directory ``` | The [`Directory`](https://capacitorjs.com/docs/apis/#directory) containing the existing file or directory | 1.0.0 |
| **`toDirectory`** | ```typescript Directory ``` | The [`Directory`](https://capacitorjs.com/docs/apis/#directory) containing the destination file or directory. If not supplied will use the 'directory' parameter as the destination | 1.0.0 |

#### CopyResult

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`uri`** | `string` | The uri where the file was copied into | 4.0.0 |

#### DownloadFileResult

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`path`** | `string` | The path the file was downloaded to. | 5.1.0 |
| **`blob`** | `Blob` | The blob data of the downloaded file. This is only available on web. | 5.1.0 |

#### DownloadFileOptions

| Prop | Type | Description | Default | Since |
| --- | --- | --- | --- | --- |
| **`path`** | `string` | The path the downloaded file should be moved to. |  | 5.1.0 |
| **`directory`** | ```typescript Directory ``` | The directory to write the file to. If this option is used, filePath can be a relative path rather than absolute. The default is the `DATA` directory. |  | 5.1.0 |
| **`progress`** | `boolean` | An optional listener function to receive downloaded progress events. If this option is used, progress event should be dispatched on every chunk received. Chunks are throttled to every 100ms on Android/iOS to avoid slowdowns. |  | 5.1.0 |
| **`recursive`** | `boolean` | Whether to create any missing parent directories. | `false` | 5.1.2 |

#### PluginListenerHandle

| Prop | Type |
| --- | --- |
| **`remove`** | `() => Promise<void>` |

#### ProgressStatus

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`url`** | `string` | The url of the file being downloaded. | 5.1.0 |
| **`bytes`** | `number` | The number of bytes downloaded so far. | 5.1.0 |
| **`contentLength`** | `number` | The total number of bytes to download for this file. | 5.1.0 |

### Type Aliases

#### PermissionState

`'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'`

#### ReadFileInChunksCallback

Callback for receiving chunks read from a file, or error if something went wrong.

```typescript
(chunkRead: ReadFileResult | null, err?: any): void
```

#### CallbackID

`string`

#### StatResult

```typescript
FileInfo
```

#### RenameOptions

```typescript
CopyOptions
```

#### ProgressListener

A listener function that receives progress events.

```typescript
(progress: ProgressStatus): void
```

### Enums

#### Directory

| Members | Value | Description | Since |
| --- | --- | --- | --- |
| **`Documents`** | `'DOCUMENTS'` | The Documents directory. On iOS it's the app's documents directory. Use this directory to store user-generated content. On Android it's the Public Documents folder, so it's accessible from other apps. It's not accessible on Android 10 unless the app enables legacy External Storage by adding `android:requestLegacyExternalStorage="true"` in the `application` tag in the `AndroidManifest.xml`. On Android 11 or newer the app can only access the files/folders the app created. | 1.0.0 |
| **`Data`** | `'DATA'` | The Data directory. On iOS it will use the Documents directory. On Android it's the directory holding application files. Files will be deleted when the application is uninstalled. | 1.0.0 |
| **`Library`** | `'LIBRARY'` | The Library directory. On iOS it will use the Library directory. On Android it's the directory holding application files. Files will be deleted when the application is uninstalled. | 1.1.0 |
| **`Cache`** | `'CACHE'` | The Cache directory. Can be deleted in cases of low memory, so use this directory to write app-specific files. that your app can re-create easily. | 1.0.0 |
| **`External`** | `'EXTERNAL'` | The external directory. On iOS it will use the Documents directory. On Android it's the directory on the primary shared/external storage device where the application can place persistent files it owns. These files are internal to the applications, and not typically visible to the user as media. Files will be deleted when the application is uninstalled. | 1.0.0 |
| **`ExternalStorage`** | `'EXTERNAL_STORAGE'` | The external storage directory. On iOS it will use the Documents directory. On Android it's the primary shared/external storage directory. It's not accessible on Android 10 unless the app enables legacy External Storage by adding `android:requestLegacyExternalStorage="true"` in the `application` tag in the `AndroidManifest.xml`. It's not accessible on Android 11 or newer. | 1.0.0 |
| **`ExternalCache`** | `'EXTERNAL_CACHE'` | The external cache directory. On iOS it will use the Documents directory. On Android it's the primary shared/external cache. | 7.1.0 |
| **`LibraryNoCloud`** | `'LIBRARY_NO_CLOUD'` | The Library directory without cloud backup. Used in iOS. On Android it's the directory holding application files. | 7.1.0 |
| **`Temporary`** | `'TEMPORARY'` | A temporary directory for iOS. On Android it's the directory holding the application cache. | 7.1.0 |

#### Encoding

| Members | Value | Description | Since |
| --- | --- | --- | --- |
| **`UTF8`** | `'utf8'` | Eight-bit UCS Transformation Format | 1.0.0 |
| **`ASCII`** | `'ascii'` | Seven-bit ASCII, a.k.a. ISO646-US, a.k.a. the Basic Latin block of the Unicode character set This encoding is only supported on Android. | 1.0.0 |
| **`UTF16`** | `'utf16'` | Sixteen-bit UCS Transformation Format, byte order identified by an optional byte-order mark This encoding is only supported on Android. | 1.0.0 |

### Errors

Since version 7.1.0, the plugin returns specific errors with specific codes on native Android and iOS. Web does not follow this standard for errors.

The following table list all the plugin errors:

| Error code | Platform(s) | Message |
| --- | --- | --- |
| OS-PLUG-FILE-0004 | iOS | Cordova / Capacitor bridge isn’t initialized. |
| OS-PLUG-FILE-0005 | Android, iOS | The method input parameters aren’t valid. |
| OS-PLUG-FILE-0006 | Android, iOS | Invalid path was provided. |
| OS-PLUG-FILE-0007 | Android | Unable to perform file operation, user denied permission request. |
| OS-PLUG-FILE-0008 | Android, iOS | Operation failed because file does not exist. |
| OS-PLUG-FILE-0009 | Android | Operation not supported for provided input. |
| OS-PLUG-FILE-0010 | Android, iOS | Directory already exists, cannot be overwritten. |
| OS-PLUG-FILE-0011 | Android, iOS | Missing parent directory – possibly recursive=false was passed or parent directory creation failed. |
| OS-PLUG-FILE-0012 | Android, iOS | Cannot delete directory with children; received recursive=false but directory has contents. |
| OS-PLUG-FILE-0013 | Android, iOS | The operation failed with an error. |

## Contents

---

[Edit this page](https://github.com/ionic-team/capacitor-filesystem/blob/main/packages/capacitor-plugin/README.md)