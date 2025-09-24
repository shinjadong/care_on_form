---
title: "Google Maps Capacitor Plugin API | Capacitor Documentation"
source: "https://capacitorjs.com/docs/apis/google-maps"
author:
published:
created: 2025-09-24
description: "Google maps on Capacitor"
tags:
  - "clippings"
---
Version: v7

Google maps on Capacitor

## Install

```bash
npm install @capacitor/google-maps
npx cap sync
```

## API Keys

To use the Google Maps SDK on any platform, API keys associated with an account *with billing enabled* are required. These can be obtained from the [Google Cloud Console](https://console.cloud.google.com/). This is required for all three platforms, Android, iOS, and Javascript. Additional information about obtaining these API keys can be found in the [Google Maps documentation](https://developers.google.com/maps/documentation/android-sdk/overview) for each platform.

## iOS

The Google Maps SDK supports the use of showing the users current location via `enableCurrentLocation(bool)`. To use this, Apple requires privacy descriptions to be specified in `Info.plist`:

- `NSLocationWhenInUseUsageDescription` (`Privacy - Location When In Use Usage Description`)

Read about [Configuring `Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist) in the [iOS Guide](https://capacitorjs.com/docs/ios) for more information on setting iOS permissions in Xcode.

### Typescript Configuration

Your project will also need have `skipLibCheck` set to `true` in `tsconfig.json`.

### Migrating from older versions

> The main Google Maps SDK now supports running on simulators on Apple Silicon Macs, but make sure you have the latest version of [Google-Maps-iOS-Utils](https://github.com/googlemaps/google-maps-ios-utils) installed.

If you added the previous workaround for getting the unreleased version, you can delete it now by removing this line from `ios/App/Podfile`:

```markdown
pod 'Google-Maps-iOS-Utils', :git => 'https://github.com/googlemaps/google-maps-ios-utils.git', :commit => '637954e5bcb2a879c11a6f2cead153a6bad5339f'
```

Then run `pod update Google-Maps-iOS-Utils` from the `ios/App/` folder:

```markdown
cd ios/App
pod update Google-Maps-iOS-Utils
```

## Android

The Google Maps SDK for Android requires you to add your API key to the AndroidManifest.xml file in your project.

```xml
<meta-data android:name="com.google.android.geo.API_KEY" android:value="YOUR_API_KEY_HERE"/>
```

To use certain location features, the SDK requires the following permissions to also be added to your AndroidManifest.xml:

```xml
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

### Variables

This plugin will use the following project variables (defined in your app's `variables.gradle` file):

- `googleMapsPlayServicesVersion`: version of `com.google.android.gms:play-services-maps` (default: `18.2.0`)
- `googleMapsUtilsVersion`: version of `com.google.maps.android:android-maps-utils` (default: `3.8.2`)
- `googleMapsKtxVersion`: version of `com.google.maps.android:maps-ktx` (default: `5.0.0`)
- `googleMapsUtilsKtxVersion`: version of `com.google.maps.android:maps-utils-ktx` (default: `5.0.0`)
- `kotlinxCoroutinesVersion`: version of `org.jetbrains.kotlinx:kotlinx-coroutines-android` and `org.jetbrains.kotlinx:kotlinx-coroutines-core` (default: `1.7.3`)
- `androidxCoreKTXVersion`: version of `androidx.core:core-ktx` (default: `1.12.0`)
- `kotlin_version`: version of `org.jetbrains.kotlin:kotlin-stdlib` (default: `1.9.10`)

## Usage

The Google Maps Capacitor plugin ships with a web component that must be used to render the map in your application as it enables us to embed the native view more effectively on iOS. The plugin will automatically register this web component for use in your application.

> For Angular users, you will get an error warning that this web component is unknown to the Angular compiler. This is resolved by modifying the module that declares your component to allow for custom web components.
> 
> ```typescript
> import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
> 
> @NgModule({
>   schemas: [CUSTOM_ELEMENTS_SCHEMA]
> })
> ```

Include this component in your HTML and assign it an ID so that you can easily query for that element reference later.

```html
<capacitor-google-map id="map"></capacitor-google-map>
```

> On Android, the map is rendered beneath the entire webview, and uses this component to manage its positioning during scrolling events. This means that as the developer, you *must* ensure that the webview is transparent all the way through the layers to the very bottom. In a typically Ionic application, that means setting transparency on elements such as IonContent and the root HTML tag to ensure that it can be seen. If you can't see your map on Android, this should be the first thing you check.
> 
> On iOS, we render the map directly into the webview and so the same transparency effects are not required. We are investigating alternate methods for Android still and hope to resolve this better in a future update.

The Google Map element itself comes unstyled, so you should style it to fit within the layout of your page structure. Because we're rendering a view into this slot, by itself the element has no width or height, so be sure to set those explicitly.

```markdown
capacitor-google-map {
  display: inline-block;
  width: 275px;
  height: 400px;
}
```

Next, we should create the map reference. This is done by importing the GoogleMap class from the Capacitor plugin and calling the create method, and passing in the required parameters.

```typescript
import { GoogleMap } from '@capacitor/google-maps';

const apiKey = 'YOUR_API_KEY_HERE';

const mapRef = document.getElementById('map');

const newMap = await GoogleMap.create({
  id: 'my-map', // Unique identifier for this map instance
  element: mapRef, // reference to the capacitor-google-map element
  apiKey: apiKey, // Your Google Maps API Key
  config: {
    center: {
      // The initial position to be rendered by the map
      lat: 33.6,
      lng: -117.9,
    },
    zoom: 8, // The initial zoom level to be rendered by the map
  },
});
```

At this point, your map should be created within your application. Using the returned reference to the map, you can easily interact with your map in a number of way, a few of which are shown here.

```typescript
const newMap = await GoogleMap.create({...});

// Add a marker to the map
const markerId = await newMap.addMarker({
  coordinate: {
    lat: 33.6,
    lng: -117.9
  }
});

// Move the map programmatically
await newMap.setCamera({
  coordinate: {
    lat: 33.6,
    lng: -117.9
  }
});

// Enable marker clustering
await newMap.enableClustering();

// Handle marker click
await newMap.setOnMarkerClickListener((event) => {...});

// Clean up map reference
await newMap.destroy();
```

## Full Examples

### Angular

```typescript
import { GoogleMap } from '@capacitor/google-maps';

@Component({
  template: \`
    <capacitor-google-map #map></capacitor-google-map>
    <button (click)="createMap()">Create Map</button>
  \`,
  styles: [
    \`
      capacitor-google-map {
        display: inline-block;
        width: 275px;
        height: 400px;
      }
    \`,
  ],
})
export class MyMap {
  @ViewChild('map')
  mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;

  async createMap() {
    this.newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: this.mapRef.nativeElement,
      apiKey: environment.apiKey,
      config: {
        center: {
          lat: 33.6,
          lng: -117.9,
        },
        zoom: 8,
      },
    });
  }
}
```

### React

```jsx
import { GoogleMap } from '@capacitor/google-maps';
import { useRef } from 'react';

const MyMap: React.FC = () => {
  const mapRef = useRef<HTMLElement>();
  let newMap: GoogleMap;

  async function createMap() {
    if (!mapRef.current) return;

    newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: mapRef.current,
      apiKey: process.env.REACT_APP_YOUR_API_KEY_HERE,
      config: {
        center: {
          lat: 33.6,
          lng: -117.9
        },
        zoom: 8
      }
    })
  }

  return (
    <div className="component-wrapper">
      <capacitor-google-map ref={mapRef} style={{
        display: 'inline-block',
        width: 275,
        height: 400
      }}></capacitor-google-map>

      <button onClick={createMap}>Create Map</button>
    </div>
  )
}

export default MyMap;
```

### Vue

```markdown
<script lang="ts" setup>
import { ref, shallowRef, useTemplateRef } from 'vue'
import { GoogleMap } from '@capacitor/google-maps'

const mapRef = useTemplateRef<HTMLElement>('mapRef')
const newMap = shallowRef<GoogleMap>()

async function createMap() {
  if (!mapRef.value) return

  newMap.value = await GoogleMap.create({
    id: 'my-cool-map',
    element: mapRef.value,
    apiKey: import.meta.env.VITE_YOUR_API_KEY_HERE,
    config: {
      center: {
        lat: 33.6,
        lng: -117.9,
      },
      zoom: 8,
    },
  })
}
</script>

<template>
  <capacitor-google-map
    ref="mapRef"
    style="display: inline-block; width: 275px; height: 400px"
  ></capacitor-google-map>
  <button @click="createMap()">Create Map</button>
</template>
```

make sure you need enable [recognize native custom elements](https://vuejs.org/guide/extras/web-components.html#using-custom-elements-in-vue) like

```ts
// vite.config.mts > plugins
Vue({
  template: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith('capacitor-')
    },
  },
}),
```

### Javascript

```html
<capacitor-google-map id="map"></capacitor-google-map>
<button onclick="createMap()">Create Map</button>

<style>
  capacitor-google-map {
    display: inline-block;
    width: 275px;
    height: 400px;
  }
</style>

<script>
  import { GoogleMap } from '@capacitor/google-maps';

  const createMap = async () => {
    const mapRef = document.getElementById('map');

    const newMap = await GoogleMap.create({
      id: 'my-map', // Unique identifier for this map instance
      element: mapRef, // reference to the capacitor-google-map element
      apiKey: 'YOUR_API_KEY_HERE', // Your Google Maps API Key
      config: {
        center: {
          // The initial position to be rendered by the map
          lat: 33.6,
          lng: -117.9,
        },
        zoom: 8, // The initial zoom level to be rendered by the map
      },
    });
  };
</script>
```

## API

- [`create(...)`](https://capacitorjs.com/docs/apis/#create)
- [`enableTouch()`](https://capacitorjs.com/docs/apis/#enabletouch)
- [`disableTouch()`](https://capacitorjs.com/docs/apis/#disabletouch)
- [`enableClustering(...)`](https://capacitorjs.com/docs/apis/#enableclustering)
- [`disableClustering()`](https://capacitorjs.com/docs/apis/#disableclustering)
- [`addTileOverlay(...)`](https://capacitorjs.com/docs/apis/#addtileoverlay)
- [`removeTileOverlay(...)`](https://capacitorjs.com/docs/apis/#removetileoverlay)
- [`addMarker(...)`](https://capacitorjs.com/docs/apis/#addmarker)
- [`addMarkers(...)`](https://capacitorjs.com/docs/apis/#addmarkers)
- [`removeMarker(...)`](https://capacitorjs.com/docs/apis/#removemarker)
- [`removeMarkers(...)`](https://capacitorjs.com/docs/apis/#removemarkers)
- [`addPolygons(...)`](https://capacitorjs.com/docs/apis/#addpolygons)
- [`removePolygons(...)`](https://capacitorjs.com/docs/apis/#removepolygons)
- [`addCircles(...)`](https://capacitorjs.com/docs/apis/#addcircles)
- [`removeCircles(...)`](https://capacitorjs.com/docs/apis/#removecircles)
- [`addPolylines(...)`](https://capacitorjs.com/docs/apis/#addpolylines)
- [`removePolylines(...)`](https://capacitorjs.com/docs/apis/#removepolylines)
- [`destroy()`](https://capacitorjs.com/docs/apis/#destroy)
- [`setCamera(...)`](https://capacitorjs.com/docs/apis/#setcamera)
- [`getMapType()`](https://capacitorjs.com/docs/apis/#getmaptype)
- [`setMapType(...)`](https://capacitorjs.com/docs/apis/#setmaptype)
- [`enableIndoorMaps(...)`](https://capacitorjs.com/docs/apis/#enableindoormaps)
- [`enableTrafficLayer(...)`](https://capacitorjs.com/docs/apis/#enabletrafficlayer)
- [`enableAccessibilityElements(...)`](https://capacitorjs.com/docs/apis/#enableaccessibilityelements)
- [`enableCurrentLocation(...)`](https://capacitorjs.com/docs/apis/#enablecurrentlocation)
- [`setPadding(...)`](https://capacitorjs.com/docs/apis/#setpadding)
- [`getMapBounds()`](https://capacitorjs.com/docs/apis/#getmapbounds)
- [`fitBounds(...)`](https://capacitorjs.com/docs/apis/#fitbounds)
- [`setOnBoundsChangedListener(...)`](https://capacitorjs.com/docs/apis/#setonboundschangedlistener)
- [`setOnCameraIdleListener(...)`](https://capacitorjs.com/docs/apis/#setoncameraidlelistener)
- [`setOnCameraMoveStartedListener(...)`](https://capacitorjs.com/docs/apis/#setoncameramovestartedlistener)
- [`setOnClusterClickListener(...)`](https://capacitorjs.com/docs/apis/#setonclusterclicklistener)
- [`setOnClusterInfoWindowClickListener(...)`](https://capacitorjs.com/docs/apis/#setonclusterinfowindowclicklistener)
- [`setOnInfoWindowClickListener(...)`](https://capacitorjs.com/docs/apis/#setoninfowindowclicklistener)
- [`setOnMapClickListener(...)`](https://capacitorjs.com/docs/apis/#setonmapclicklistener)
- [`setOnMarkerClickListener(...)`](https://capacitorjs.com/docs/apis/#setonmarkerclicklistener)
- [`setOnPolygonClickListener(...)`](https://capacitorjs.com/docs/apis/#setonpolygonclicklistener)
- [`setOnCircleClickListener(...)`](https://capacitorjs.com/docs/apis/#setoncircleclicklistener)
- [`setOnPolylineClickListener(...)`](https://capacitorjs.com/docs/apis/#setonpolylineclicklistener)
- [`setOnMarkerDragStartListener(...)`](https://capacitorjs.com/docs/apis/#setonmarkerdragstartlistener)
- [`setOnMarkerDragListener(...)`](https://capacitorjs.com/docs/apis/#setonmarkerdraglistener)
- [`setOnMarkerDragEndListener(...)`](https://capacitorjs.com/docs/apis/#setonmarkerdragendlistener)
- [`setOnMyLocationButtonClickListener(...)`](https://capacitorjs.com/docs/apis/#setonmylocationbuttonclicklistener)
- [`setOnMyLocationClickListener(...)`](https://capacitorjs.com/docs/apis/#setonmylocationclicklistener)
- [Interfaces](https://capacitorjs.com/docs/apis/#interfaces)
- [Type Aliases](https://capacitorjs.com/docs/apis/#type-aliases)
- [Enums](https://capacitorjs.com/docs/apis/#enums)

### create(...)

```typescript
create(options: CreateMapArgs, callback?: MapListenerCallback<MapReadyCallbackData> | undefined) => Promise<GoogleMap>
```

| Param | Type |
| --- | --- |
| **`options`** | ```typescript CreateMapArgs ``` |
| **`callback`** | ```typescript MapListenerCallback<MapReadyCallbackData> ``` |

**Returns:**`Promise<GoogleMap>`

---

### enableTouch()

```typescript
enableTouch() => Promise<void>
```

---

### disableTouch()

```typescript
disableTouch() => Promise<void>
```

---

### enableClustering(...)

```typescript
enableClustering(minClusterSize?: number | undefined) => Promise<void>
```

| Param | Type | Description |
| --- | --- | --- |
| **`minClusterSize`** | `number` | The minimum number of markers that can be clustered together. The default is 4 markers. |

---

### disableClustering()

```typescript
disableClustering() => Promise<void>
```

---

### addTileOverlay(...)

```typescript
addTileOverlay(tileOverlay: TileOverlay) => Promise<{ id: string; }>
```

| Param | Type |
| --- | --- |
| **`tileOverlay`** | ```typescript TileOverlay ``` |

**Returns:**`Promise<{ id: string; }>`

---

### removeTileOverlay(...)

```typescript
removeTileOverlay(id: string) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`id`** | `string` |

---

### addMarker(...)

```typescript
addMarker(marker: Marker) => Promise<string>
```

| Param | Type |
| --- | --- |
| **`marker`** | ```typescript Marker ``` |

**Returns:**`Promise<string>`

---

### addMarkers(...)

```typescript
addMarkers(markers: Marker[]) => Promise<string[]>
```

| Param | Type |
| --- | --- |
| **`markers`** | `Marker[]` |

**Returns:**`Promise<string[]>`

---

### removeMarker(...)

```typescript
removeMarker(id: string) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`id`** | `string` |

---

### removeMarkers(...)

```typescript
removeMarkers(ids: string[]) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`ids`** | `string[]` |

---

### addPolygons(...)

```typescript
addPolygons(polygons: Polygon[]) => Promise<string[]>
```

| Param | Type |
| --- | --- |
| **`polygons`** | `Polygon[]` |

**Returns:**`Promise<string[]>`

---

### removePolygons(...)

```typescript
removePolygons(ids: string[]) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`ids`** | `string[]` |

---

### addCircles(...)

```typescript
addCircles(circles: Circle[]) => Promise<string[]>
```

| Param | Type |
| --- | --- |
| **`circles`** | `Circle[]` |

**Returns:**`Promise<string[]>`

---

### removeCircles(...)

```typescript
removeCircles(ids: string[]) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`ids`** | `string[]` |

---

### addPolylines(...)

```typescript
addPolylines(polylines: Polyline[]) => Promise<string[]>
```

| Param | Type |
| --- | --- |
| **`polylines`** | `Polyline[]` |

**Returns:**`Promise<string[]>`

---

### removePolylines(...)

```typescript
removePolylines(ids: string[]) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`ids`** | `string[]` |

---

### destroy()

```typescript
destroy() => Promise<void>
```

---

### setCamera(...)

```typescript
setCamera(config: CameraConfig) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`config`** | ```typescript CameraConfig ``` |

---

### getMapType()

```typescript
getMapType() => Promise<MapType>
```

Get current map type

**Returns:**

```typescript
Promise<MapType>
```

---

### setMapType(...)

```typescript
setMapType(mapType: MapType) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`mapType`** | ```typescript MapType ``` |

---

### enableIndoorMaps(...)

```typescript
enableIndoorMaps(enabled: boolean) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`enabled`** | `boolean` |

---

### enableTrafficLayer(...)

```typescript
enableTrafficLayer(enabled: boolean) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`enabled`** | `boolean` |

---

### enableAccessibilityElements(...)

```typescript
enableAccessibilityElements(enabled: boolean) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`enabled`** | `boolean` |

---

### enableCurrentLocation(...)

```typescript
enableCurrentLocation(enabled: boolean) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`enabled`** | `boolean` |

---

### setPadding(...)

```typescript
setPadding(padding: MapPadding) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`padding`** | ```typescript MapPadding ``` |

---

### getMapBounds()

```typescript
getMapBounds() => Promise<LatLngBounds>
```

Get the map's current viewport latitude and longitude bounds.

**Returns:**`Promise<LatLngBounds>`

---

### fitBounds(...)

```typescript
fitBounds(bounds: LatLngBounds, padding?: number | undefined) => Promise<void>
```

Sets the map viewport to contain the given bounds.

| Param | Type | Description |
| --- | --- | --- |
| **`bounds`** | `LatLngBounds` | The bounds to fit in the viewport. |
| **`padding`** | `number` | Optional padding to apply in pixels. The bounds will be fit in the part of the map that remains after padding is removed. |

---

### setOnBoundsChangedListener(...)

```typescript
setOnBoundsChangedListener(callback?: MapListenerCallback<CameraIdleCallbackData> | undefined) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`callback`** | ```typescript MapListenerCallback<CameraIdleCallbackData> ``` |

---

### setOnCameraIdleListener(...)

```typescript
setOnCameraIdleListener(callback?: MapListenerCallback<CameraIdleCallbackData> | undefined) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`callback`** | ```typescript MapListenerCallback<CameraIdleCallbackData> ``` |

---

### setOnCameraMoveStartedListener(...)

```typescript
setOnCameraMoveStartedListener(callback?: MapListenerCallback<CameraMoveStartedCallbackData> | undefined) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`callback`** | ```typescript MapListenerCallback<CameraMoveStartedCallbackData> ``` |

---

### setOnClusterClickListener(...)

```typescript
setOnClusterClickListener(callback?: MapListenerCallback<ClusterClickCallbackData> | undefined) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`callback`** | ```typescript MapListenerCallback<ClusterClickCallbackData> ``` |

---

### setOnClusterInfoWindowClickListener(...)

```typescript
setOnClusterInfoWindowClickListener(callback?: MapListenerCallback<ClusterClickCallbackData> | undefined) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`callback`** | ```typescript MapListenerCallback<ClusterClickCallbackData> ``` |

---

### setOnInfoWindowClickListener(...)

```typescript
setOnInfoWindowClickListener(callback?: MapListenerCallback<MarkerClickCallbackData> | undefined) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`callback`** | ```typescript MapListenerCallback<MarkerClickCallbackData> ``` |

---

### setOnMapClickListener(...)

```typescript
setOnMapClickListener(callback?: MapListenerCallback<MapClickCallbackData> | undefined) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`callback`** | ```typescript MapListenerCallback<MapClickCallbackData> ``` |

---

### setOnMarkerClickListener(...)

```typescript
setOnMarkerClickListener(callback?: MapListenerCallback<MarkerClickCallbackData> | undefined) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`callback`** | ```typescript MapListenerCallback<MarkerClickCallbackData> ``` |

---

### setOnPolygonClickListener(...)

```typescript
setOnPolygonClickListener(callback?: MapListenerCallback<PolygonClickCallbackData> | undefined) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`callback`** | ```typescript MapListenerCallback<PolygonClickCallbackData> ``` |

---

### setOnCircleClickListener(...)

```typescript
setOnCircleClickListener(callback?: MapListenerCallback<CircleClickCallbackData> | undefined) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`callback`** | ```typescript MapListenerCallback<CircleClickCallbackData> ``` |

---

### setOnPolylineClickListener(...)

```typescript
setOnPolylineClickListener(callback?: MapListenerCallback<PolylineCallbackData> | undefined) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`callback`** | ```typescript MapListenerCallback<PolylineCallbackData> ``` |

---

### setOnMarkerDragStartListener(...)

```typescript
setOnMarkerDragStartListener(callback?: MapListenerCallback<MarkerClickCallbackData> | undefined) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`callback`** | ```typescript MapListenerCallback<MarkerClickCallbackData> ``` |

---

### setOnMarkerDragListener(...)

```typescript
setOnMarkerDragListener(callback?: MapListenerCallback<MarkerClickCallbackData> | undefined) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`callback`** | ```typescript MapListenerCallback<MarkerClickCallbackData> ``` |

---

### setOnMarkerDragEndListener(...)

```typescript
setOnMarkerDragEndListener(callback?: MapListenerCallback<MarkerClickCallbackData> | undefined) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`callback`** | ```typescript MapListenerCallback<MarkerClickCallbackData> ``` |

---

### setOnMyLocationButtonClickListener(...)

```typescript
setOnMyLocationButtonClickListener(callback?: MapListenerCallback<MyLocationButtonClickCallbackData> | undefined) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`callback`** | ```typescript MapListenerCallback<MyLocationButtonClickCallbackData> ``` |

---

### setOnMyLocationClickListener(...)

```typescript
setOnMyLocationClickListener(callback?: MapListenerCallback<MapClickCallbackData> | undefined) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`callback`** | ```typescript MapListenerCallback<MapClickCallbackData> ``` |

---

### Interfaces

#### CreateMapArgs

An interface containing the options used when creating a map.

| Prop | Type | Description | Default |
| --- | --- | --- | --- |
| **`id`** | `string` | A unique identifier for the map instance. |  |
| **`apiKey`** | `string` | The Google Maps SDK API Key. |  |
| **`config`** | ```typescript GoogleMapConfig ``` | The initial configuration settings for the map. |  |
| **`element`** | `HTMLElement` | The DOM element that the Google Map View will be mounted on which determines size and positioning. |  |
| **`forceCreate`** | `boolean` | Destroy and re-create the map instance if a map with the supplied id already exists | `false` |
| **`region`** | `string` | The region parameter alters your application to serve different map tiles or bias the application (such as biasing geocoding results towards the region). Only available for web. |  |
| **`language`** | `string` | The language parameter affects the names of controls, copyright notices, driving directions, and control labels, as well as the responses to service requests. Only available for web. |  |

#### GoogleMapConfig

For web, all the javascript Google Maps options are available as GoogleMapConfig extends google.maps.MapOptions. For iOS and Android only the config options declared on [GoogleMapConfig](https://capacitorjs.com/docs/apis/#googlemapconfig) are available.

| Prop | Type | Description | Default | Since |
| --- | --- | --- | --- | --- |
| **`width`** | `number` | Override width for native map. |  |  |
| **`height`** | `number` | Override height for native map. |  |  |
| **`x`** | `number` | Override absolute x coordinate position for native map. |  |  |
| **`y`** | `number` | Override absolute y coordinate position for native map. |  |  |
| **`center`** | ```typescript LatLng ``` | Default location on the Earth towards which the camera points. |  |  |
| **`zoom`** | `number` | Sets the zoom of the map. |  |  |
| **`androidLiteMode`** | `boolean` | Enables image-based lite mode on Android. | `false` |  |
| **`devicePixelRatio`** | `number` | Override pixel ratio for native map. |  |  |
| **`styles`** | `MapTypeStyle[] \| null` | Styles to apply to each of the default map types. Note that for satellite, hybrid and terrain modes, these styles will only apply to labels and geometry. |  | 4.3.0 |
| **`mapId`** | `string` | A map id associated with a specific map style or feature. [Use Map IDs](https://developers.google.com/maps/documentation/get-map-id) Only for Web. |  | 5.4.0 |
| **`androidMapId`** | `string` | A map id associated with a specific map style or feature. [Use Map IDs](https://developers.google.com/maps/documentation/get-map-id) Only for Android. |  | 5.4.0 |
| **`iOSMapId`** | `string` | A map id associated with a specific map style or feature. [Use Map IDs](https://developers.google.com/maps/documentation/get-map-id) Only for iOS. |  | 5.4.0 |
| **`maxZoom`** | `number \| null` | The maximum zoom level which will be displayed on the map. If omitted, or set to <code>null</code>, the maximum zoom from the current map type is used instead. Valid zoom values are numbers from zero up to the supported <a href=" [https://developers.google.com/maps/documentation/javascript/maxzoom"&gt;maximum](https://developers.google.com/maps/documentation/javascript/maxzoom%22&gt;maximum) zoom level</a>. |  |  |
| **`minZoom`** | `number \| null` | The minimum zoom level which will be displayed on the map. If omitted, or set to <code>null</code>, the minimum zoom from the current map type is used instead. Valid zoom values are numbers from zero up to the supported <a href=" [https://developers.google.com/maps/documentation/javascript/maxzoom"&gt;maximum](https://developers.google.com/maps/documentation/javascript/maxzoom%22&gt;maximum) zoom level</a>. |  |  |
| **`mapTypeId`** | `string \| null` | The initial Map mapTypeId. Defaults to <code>ROADMAP</code>. |  |  |
| **`heading`** | `number \| null` | The heading for aerial imagery in degrees measured clockwise from cardinal direction North. Headings are snapped to the nearest available angle for which imagery is available. |  |  |
| **`restriction`** | `MapRestriction \| null` | Defines a boundary that restricts the area of the map accessible to users. When set, a user can only pan and zoom while the camera view stays inside the limits of the boundary. |  |  |

#### LatLng

An interface representing a pair of latitude and longitude coordinates.

| Prop | Type | Description |
| --- | --- | --- |
| **`lat`** | `number` | Coordinate latitude, in degrees. This value is in the range \[-90, 90\]. |
| **`lng`** | `number` | Coordinate longitude, in degrees. This value is in the range \[-180, 180\]. |

#### MapReadyCallbackData

| Prop | Type |
| --- | --- |
| **`mapId`** | `string` |

#### TileOverlay

A tile overlay is an image placed on top of your map at a specific zoom level. Available on iOS, Android and Web

| Prop | Type | Description | Default |
| --- | --- | --- | --- |
| **`url`** | `string` | A string representing the tile url. Should contain `{x}`, `{y}` and `{z}` so they can be replaced with actual values for x, y and zoom. Available on iOS, Android and Web |  |
| **`opacity`** | `number` | The opacity of the tile overlay, between 0 (completely transparent) and 1 inclusive. Available on iOS, Android and Web | `undefined` |
| **`visible`** | `boolean` | Controls whether this tile overlay should be visible. Available only on Android | `undefined` |
| **`zIndex`** | `number` | The zIndex of the tile overlay. Available on iOS and Android | `undefined` |

#### Marker

A marker is an icon placed at a particular point on the map's surface.

| Prop | Type | Description | Default | Since |
| --- | --- | --- | --- | --- |
| **`coordinate`** | ```typescript LatLng ``` | [Marker](https://capacitorjs.com/docs/apis/#marker) position |  |  |
| **`opacity`** | `number` | Sets the opacity of the marker, between 0 (completely transparent) and 1 inclusive. | `1` |  |
| **`title`** | `string` | Title, a short description of the overlay. |  |  |
| **`snippet`** | `string` | Snippet text, shown beneath the title in the info window when selected. |  |  |
| **`isFlat`** | `boolean` | Controls whether this marker should be flat against the Earth's surface or a billboard facing the camera. | `false` |  |
| **`iconUrl`** | `string` | Path to a marker icon to render. It can be relative to the web app public directory, or a https url of a remote marker icon. **SVGs are not supported on native platforms.** |  | 4.2.0 |
| **`iconSize`** | ```typescript Size ``` | Controls the scaled size of the marker image set in `iconUrl`. |  | 4.2.0 |
| **`iconOrigin`** | ```typescript Point ``` | The position of the image within a sprite, if any. By default, the origin is located at the top left corner of the image. |  | 4.2.0 |
| **`iconAnchor`** | ```typescript Point ``` | The position at which to anchor an image in correspondence to the location of the marker on the map. By default, the anchor is located along the center point of the bottom of the image. |  | 4.2.0 |
| **`tintColor`** | `{ r: number; g: number; b: number; a: number; }` | Customizes the color of the default marker image. Each value must be between 0 and 255. Only for iOS and Android. |  | 4.2.0 |
| **`draggable`** | `boolean` | Controls whether this marker can be dragged interactively | `false` |  |
| **`zIndex`** | `number` | Specifies the stack order of this marker, relative to other markers on the map. A marker with a high z-index is drawn on top of markers with lower z-indexes | `0` |  |

#### Size

| Prop | Type |
| --- | --- |
| **`width`** | `number` |
| **`height`** | `number` |

#### Point

| Prop | Type |
| --- | --- |
| **`x`** | `number` |
| **`y`** | `number` |

#### Polygon

For web, all the javascript [Polygon](https://capacitorjs.com/docs/apis/#polygon) options are available as Polygon extends google.maps.PolygonOptions. For iOS and Android only the config options declared on [Polygon](https://capacitorjs.com/docs/apis/#polygon) are available.

| Prop | Type | Description |
| --- | --- | --- |
| **`paths`** | `any[] \| MVCArray<any>` | The ordered sequence of coordinates that designates a closed loop. Unlike polylines, a polygon may consist of one or more paths. As a result, the paths property may specify one or more arrays of <code> [LatLng](https://capacitorjs.com/docs/apis/#latlng) </code> coordinates. Paths are closed automatically; do not repeat the first vertex of the path as the last vertex. Simple polygons may be defined using a single array of <code> [LatLng](https://capacitorjs.com/docs/apis/#latlng) </code>s. More complex polygons may specify an array of arrays. Any simple arrays are converted into <code><a href="#MVCArray">MVCArray</a></code>s. Inserting or removing <code> [LatLng](https://capacitorjs.com/docs/apis/#latlng) </code>s from the <code>MVCArray</code> will automatically update the polygon on the map. |
| **`strokeColor`** | `string` | The stroke color. All CSS3 colors are supported except for extended named colors. |
| **`strokeOpacity`** | `number` | The stroke opacity between 0.0 and 1.0 |
| **`strokeWeight`** | `number` | The stroke width in pixels. |
| **`fillColor`** | `string` | The fill color. All CSS3 colors are supported except for extended named colors. |
| **`fillOpacity`** | `number` | The fill opacity between 0.0 and 1.0 |
| **`geodesic`** | `boolean` | When <code>true</code>, edges of the polygon are interpreted as geodesic and will follow the curvature of the Earth. When <code>false</code>, edges of the polygon are rendered as straight lines in screen space. Note that the shape of a geodesic polygon may appear to change when dragged, as the dimensions are maintained relative to the surface of the earth. |
| **`clickable`** | `boolean` | Indicates whether this <code> [Polygon](https://capacitorjs.com/docs/apis/#polygon) </code> handles mouse events. |
| **`title`** | `string` | Title, a short description of the overlay. Some overlays, such as markers, will display the title on the map. The title is also the default accessibility text. Only available on iOS. |
| **`tag`** | `string` |  |

#### Circle

For web, all the javascript [Circle](https://capacitorjs.com/docs/apis/#circle) options are available as Circle extends google.maps.CircleOptions. For iOS and Android only the config options declared on [Circle](https://capacitorjs.com/docs/apis/#circle) are available.

| Prop | Type | Description |
| --- | --- | --- |
| **`fillColor`** | `string` | The fill color. All CSS3 colors are supported except for extended named colors. |
| **`fillOpacity`** | `number` | The fill opacity between 0.0 and 1.0. |
| **`strokeColor`** | `string` | The stroke color. All CSS3 colors are supported except for extended named colors. |
| **`strokeWeight`** | `number` | The stroke width in pixels. |
| **`geodesic`** | `boolean` |  |
| **`clickable`** | `boolean` | Indicates whether this <code> [Circle](https://capacitorjs.com/docs/apis/#circle) </code> handles mouse events. |
| **`title`** | `string` | Title, a short description of the overlay. Some overlays, such as markers, will display the title on the map. The title is also the default accessibility text. Only available on iOS. |
| **`tag`** | `string` |  |

#### Polyline

For web, all the javascript [Polyline](https://capacitorjs.com/docs/apis/#polyline) options are available as Polyline extends google.maps.PolylineOptions. For iOS and Android only the config options declared on [Polyline](https://capacitorjs.com/docs/apis/#polyline) are available.

| Prop | Type | Description |
| --- | --- | --- |
| **`strokeColor`** | `string` | The stroke color. All CSS3 colors are supported except for extended named colors. |
| **`strokeOpacity`** | `number` | The stroke opacity between 0.0 and 1.0. |
| **`strokeWeight`** | `number` | The stroke width in pixels. |
| **`geodesic`** | `boolean` | When <code>true</code>, edges of the polygon are interpreted as geodesic and will follow the curvature of the Earth. When <code>false</code>, edges of the polygon are rendered as straight lines in screen space. Note that the shape of a geodesic polygon may appear to change when dragged, as the dimensions are maintained relative to the surface of the earth. |
| **`clickable`** | `boolean` | Indicates whether this <code> [Polyline](https://capacitorjs.com/docs/apis/#polyline) </code> handles mouse events. |
| **`tag`** | `string` |  |
| **`styleSpans`** | `StyleSpan[]` | Used to specify the color of one or more segments of a polyline. The styleSpans property is an array of [StyleSpan](https://capacitorjs.com/docs/apis/#stylespan) objects. Setting the spans property is the preferred way to change the color of a polyline. Only on iOS and Android. |

#### StyleSpan

Describes the style for some region of a polyline.

| Prop | Type | Description |
| --- | --- | --- |
| **`color`** | `string` | The stroke color. All CSS3 colors are supported except for extended named colors. |
| **`segments`** | `number` | The length of this span in number of segments. |

#### CameraConfig

Configuration properties for a Google Map Camera

| Prop | Type | Description | Default |
| --- | --- | --- | --- |
| **`coordinate`** | ```typescript LatLng ``` | Location on the Earth towards which the camera points. |  |
| **`zoom`** | `number` | Sets the zoom of the map. |  |
| **`bearing`** | `number` | Bearing of the camera, in degrees clockwise from true north. | `0` |
| **`angle`** | `number` | The angle, in degrees, of the camera from the nadir (directly facing the Earth). The only allowed values are 0 and 45. | `0` |
| **`animate`** | `boolean` | Animate the transition to the new Camera properties. | `false` |
| **`animationDuration`** | `number` | This configuration option is not being used. |  |

#### MapPadding

Controls for setting padding on the 'visible' region of the view.

| Prop | Type |
| --- | --- |
| **`top`** | `number` |
| **`left`** | `number` |
| **`right`** | `number` |
| **`bottom`** | `number` |

#### CameraIdleCallbackData

| Prop | Type |
| --- | --- |
| **`mapId`** | `string` |
| **`bounds`** | `LatLngBounds` |
| **`bearing`** | `number` |
| **`latitude`** | `number` |
| **`longitude`** | `number` |
| **`tilt`** | `number` |
| **`zoom`** | `number` |

#### CameraMoveStartedCallbackData

| Prop | Type |
| --- | --- |
| **`mapId`** | `string` |
| **`isGesture`** | `boolean` |

#### ClusterClickCallbackData

| Prop | Type |
| --- | --- |
| **`mapId`** | `string` |
| **`latitude`** | `number` |
| **`longitude`** | `number` |
| **`size`** | `number` |
| **`items`** | `MarkerCallbackData[]` |

#### MarkerCallbackData

| Prop | Type |
| --- | --- |
| **`markerId`** | `string` |
| **`latitude`** | `number` |
| **`longitude`** | `number` |
| **`title`** | `string` |
| **`snippet`** | `string` |

#### MarkerClickCallbackData

| Prop | Type |
| --- | --- |
| **`mapId`** | `string` |

#### MapClickCallbackData

| Prop | Type |
| --- | --- |
| **`mapId`** | `string` |
| **`latitude`** | `number` |
| **`longitude`** | `number` |

#### PolygonClickCallbackData

| Prop | Type |
| --- | --- |
| **`mapId`** | `string` |
| **`polygonId`** | `string` |
| **`tag`** | `string` |

#### CircleClickCallbackData

| Prop | Type |
| --- | --- |
| **`mapId`** | `string` |
| **`circleId`** | `string` |
| **`tag`** | `string` |

#### PolylineCallbackData

| Prop | Type |
| --- | --- |
| **`polylineId`** | `string` |
| **`tag`** | `string` |

#### MyLocationButtonClickCallbackData

| Prop | Type |
| --- | --- |
| **`mapId`** | `string` |

### Type Aliases

#### MapListenerCallback

The callback function to be called when map events are emitted.

`(data: T): void`

#### Marker

Supports markers of either either "legacy" or "advanced" types.

```typescript
google.maps.Marker | google.maps.marker.AdvancedMarkerElement
```

### Enums

#### MapType

| Members | Value | Description |
| --- | --- | --- |
| **`Normal`** | `'Normal'` | Basic map. |
| **`Hybrid`** | `'Hybrid'` | Satellite imagery with roads and labels. |
| **`Satellite`** | `'Satellite'` | Satellite imagery with no labels. |
| **`Terrain`** | `'Terrain'` | Topographic data. |
| **`None`** | `'None'` | No base map tiles. |