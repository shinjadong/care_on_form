---
title: "Barcode Scanner Capacitor Plugin API | Capacitor Documentation"
source: "https://capacitorjs.com/docs/apis/barcode-scanner"
author:
published:
created: 2025-09-24
description: "Capacitor plugin using Outsystems Barcode libs"
tags:
  - "clippings"
---
Version: v7

Capacitor plugin using Outsystems Barcode libs

## Install

```bash
npm install @capacitor/barcode-scanner
npx cap sync
```

#### Android

The barcode scanner plugin requires a minimum Android SDK target of 26. This is higher than the default that comes with your Capacitor application. You can update this value in your `android/variables.gradle` file.

Note: Android with `ZXING` scanning library supports all formats, while `MLKIT` supports all but `MAXICODE`, `RSS_14`, `RSS_EXPANDED` and `UPC_EAN_EXTENSION` - using one of these in `hint` will default to scanning any format.

#### iOS

The barcode scanner uses the camera on the device. Ensure you configure the Privacy - Camera Usage Description in your Info.plist file so that your application can access the device's camera.

Note: iOS supports all formats but `MAXICODE` and `UPC_EAN_EXTENSION` - using them in `hint` will default to scanning any format. Also, Apple Vision does not distinguish between `UPC_A` and `EAN_13`, so specifying one of these in `hint` will allow to scan both.

---

## API

- [`scanBarcode(...)`](https://capacitorjs.com/docs/apis/#scanbarcode)
- [Type Aliases](https://capacitorjs.com/docs/apis/#type-aliases)
- [Enums](https://capacitorjs.com/docs/apis/#enums)

Interface defining the contract for a plugin capable of scanning barcodes. Requires implementation of the scanBarcode method, which initiates a barcode scan with given options.

### scanBarcode(...)

```typescript
scanBarcode(options: CapacitorBarcodeScannerOptions) => Promise<CapacitorBarcodeScannerScanResult>
```

| Param | Type |
| --- | --- |
| **`options`** | ```typescript CapacitorBarcodeScannerOptions ``` |

**Returns:**

```typescript
Promise<CapacitorBarcodeScannerScanResult>
```

---

### Type Aliases

#### CapacitorBarcodeScannerScanResult

Defines the structure of the result returned from a barcode scan.

```typescript
{ ScanResult: string; format: CapacitorBarcodeScannerTypeHint; }
```

#### CapacitorBarcodeScannerTypeHint

Extends supported formats from Html5Qrcode with a special 'ALL' option, indicating support for all barcode types. Type definition combining [Html5QrcodeSupportedFormats](https://capacitorjs.com/docs/apis/#html5qrcodesupportedformats) and OSBarcodeTypeHintALLOption to represent the hint for the type of barcode to be scanned.

```typescript
Html5QrcodeSupportedFormats | CapacitorBarcodeScannerTypeHintALLOption
```

#### CapacitorBarcodeScannerOptions

Defines the options for configuring a barcode scan.

```typescript
{ hint: CapacitorBarcodeScannerTypeHint; scanInstructions?: string; scanButton?: boolean; scanText?: string; cameraDirection?: CapacitorBarcodeScannerCameraDirection; scanOrientation?: CapacitorBarcodeScannerScanOrientation; android?: { scanningLibrary?: CapacitorBarcodeScannerAndroidScanningLibrary; }; web?: { showCameraSelection?: boolean; scannerFPS?: number; }; }
```

### Enums

#### Html5QrcodeSupportedFormats

| Members | Value |
| --- | --- |
| **`QR_CODE`** | `0` |
| **`AZTEC`** | `1` |
| **`CODABAR`** | `2` |
| **`CODE_39`** | `3` |
| **`CODE_93`** | `4` |
| **`CODE_128`** | `5` |
| **`DATA_MATRIX`** | `6` |
| **`MAXICODE`** | `7` |
| **`ITF`** | `8` |
| **`EAN_13`** | `9` |
| **`EAN_8`** | `10` |
| **`PDF_417`** | `11` |
| **`RSS_14`** | `12` |
| **`RSS_EXPANDED`** | `13` |
| **`UPC_A`** | `14` |
| **`UPC_E`** | `15` |
| **`UPC_EAN_EXTENSION`** | `16` |

#### CapacitorBarcodeScannerTypeHintALLOption

| Members | Value |
| --- | --- |
| **`ALL`** | `17` |

#### CapacitorBarcodeScannerCameraDirection

| Members | Value |
| --- | --- |
| **`BACK`** | `1` |
| **`FRONT`** | `2` |

#### CapacitorBarcodeScannerScanOrientation

| Members | Value |
| --- | --- |
| **`PORTRAIT`** | `1` |
| **`LANDSCAPE`** | `2` |
| **`ADAPTIVE`** | `3` |

#### CapacitorBarcodeScannerAndroidScanningLibrary

| Members | Value |
| --- | --- |
| **`ZXING`** | `'zxing'` |
| **`MLKIT`** | `'mlkit'` |