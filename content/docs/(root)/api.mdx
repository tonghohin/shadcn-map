---
title: API Reference
description: What components are available in shadcn Map and how to use them.
component: true
---

## Map Container and Core

### Map

The `Map` component is the main map container. It wraps `react-leaflet`’s `MapContainer` and provides default styles.

| Prop           | Type                                     | Description                                                                                                          |
| -------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `center`       | `LatLngExpression`                       | **Required.** The initial center of the map `[lat, lng]`.                                                            |
| ...other props | `Omit<MapContainerProps, "zoomControl">` | All other props from [React Leaflet MapContainer](https://react-leaflet.js.org/docs/api-map/), except `zoomControl`. |

### MapTileLayer

The `MapTileLayer` component adds a tile layer to the map. **It is required for the map to be rendered.** It automatically switches between light and dark map styles based on the current theme from `next-themes`. You can provide custom URLs and attributions for both light and dark modes using the `url`, `darkUrl`, `attribution`, and `darkAttribution` props.

| Prop              | Type             | Description                                                                                                         |
| ----------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------- |
| `url`             | `string`         | Optional. URL of the tile server for light mode. Defaults to Carto’s light tiles.                                   |
| `attribution`     | `string`         | Optional. HTML string for map attribution in light mode. Defaults to OpenStreetMap and CARTO attribution.           |
| `darkUrl`         | `string`         | Optional. URL of the tile server for dark mode. Defaults to Carto’s dark tiles.                                     |
| `darkAttribution` | `string`         | Optional. HTML string for map attribution in dark mode. Defaults to OpenStreetMap and CARTO attribution.            |
| `name`            | `string`         | Optional. Name of the layer, only required when using multiple tile layers with `MapLayers`. Defaults to `Default`. |
| ...other props    | `TileLayerProps` | All other props from [React Leaflet TileLayer](https://react-leaflet.js.org/docs/api-components/#tilelayer).        |

### MapLayerGroup

The `MapLayerGroup` component is for grouping multiple map layers, which is useful when you want to control their visibility by group. It has little effect if you only have one layer group or don’t need to toggle visibility.

| Prop           | Type              | Description                                                                                                               |
| -------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `name`         | `string`          | **Required.** A unique name for the layer group.                                                                          |
| `disabled`     | `boolean`         | Optional. If `true`, the layer group’s checkbox in the layer control will be disabled, preventing users from toggling it. |
| ...other props | `LayerGroupProps` | All other props from [React Leaflet LayerGroup](https://react-leaflet.js.org/docs/api-components/#layergroup).            |

### MapFeatureGroup

The `MapFeatureGroup` component is similar to `MapLayerGroup`, but with a few extra capabilities. You can bind popups or tooltips to all child layers at once, and events on the group will automatically propagate to its child layers.

| Prop           | Type                | Description                                                                                                               |
| -------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `name`         | `string`            | **Required.** A unique name for the layer group.                                                                          |
| `disabled`     | `boolean`           | Optional. If `true`, the layer group’s checkbox in the layer control will be disabled, preventing users from toggling it. |
| ...other props | `FeatureGroupProps` | All other props from [React Leaflet FeatureGroup](https://react-leaflet.js.org/docs/api-components/#featuregroup).        |

### MapLayers

The `MapLayers` component provides a context for managing multiple tile layers and layer groups on the map.  
It is required when you want to use multiple tile layers or multiple layer groups together.  
Tile layers and layer groups can still be used on their own, but `MapLayers` is needed if you want to control visibility via the `MapLayersControl` component.

| Prop                 | Type                           | Description                                                                                                  |
| -------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| `defaultTileLayer`   | `string`                       | Optional. The name of the tile layer to select by default. Must match the `name` prop of a `MapTileLayer`.   |
| `defaultLayerGroups` | `string[]`                     | Optional. Names of the layer groups to activate by default. Must match the `name` prop of a `MapLayerGroup`. |
| ...props             | `Omit<ProviderProps, "value">` | All props from the context provider, except `value`.                                                         |

### MapLayersControl

The `MapLayersControl` component renders a UI for selecting the active tile layer and toggling layer groups.  
It must be used inside a `MapLayers` component and is only visible if there are multiple tile layers or layer groups registered.

The control is only visible if there are **multiple tile layers** or **layer groups** registered.

| Prop               | Type                             | Description                                                                                      |
| ------------------ | -------------------------------- | ------------------------------------------------------------------------------------------------ |
| `tileLayersLabel`  | `string`                         | Optional. Custom label for the tile layers section in the dropdown menu. Defaults to `Map Type`. |
| `layerGroupsLabel` | `string`                         | Optional. Custom label for the layer groups section in the dropdown menu. Defaults to `Layers`.  |
| ...props           | `React.ComponentProps<"button">` | All props for the control button element.                                                        |

## Marker and Popup

### MapMarker

The `MapMarker` component renders a marker on the map. By default, it uses the `MapPinIcon` from `lucide-react`, but you can provide a custom React node as the `icon` to override it. It supports customization of the icon’s position, popups, and tooltips using standard Leaflet `DivIcon` [options](https://leafletjs.com/reference.html#divicon).

| Prop            | Type                        | Description                                                                                                |
| --------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `icon`          | `ReactNode`                 | Optional. Custom icon to display instead of the default marker. Defaults to `MapDefaultMarkerIcon`.        |
| `iconAnchor`    | `[number, number]`          | Optional. The point of the icon which will correspond to marker’s location. Defaults to `[12, 12]`.        |
| `bgPos`         | `[number, number]`          | Optional. Background position offset for the icon.                                                         |
| `popupAnchor`   | `[number, number]`          | Optional. Point from which the popup should open relative to the icon.                                     |
| `tooltipAnchor` | `[number, number]`          | Optional. Point from which the tooltip should open relative to the icon.                                   |
| ...other props  | `Omit<MarkerProps, "icon">` | All other props from [React Leaflet Marker](https://react-leaflet.js.org/docs/api-marker/), except `icon`. |

### MapMarkerClusterGroup

The `MapMarkerClusterGroup` component provides marker clustering functionality. It wraps `react-leaflet-markercluster` and enables grouping nearby markers into clusters to improve performance and readability.

| Prop     | Type                                                  | Description                                                                                                                                     |
| -------- | ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `icon`   | `(markerCount: number) => ReactNode`                  | Optional. A function that receives the total marker count and returns a React node to use as the custom cluster icon.                           |
| ...props | `Omit<MarkerClusterGroupProps, "iconCreateFunction">` | All props from [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster#all-options), except `iconCreateFunction` (use `icon`). |

### MapPopup

The `MapPopup` component renders a popup. It provides default styling and animations that match the shadcn/ui design system.

| Prop     | Type                          | Description                                                                                                      |
| -------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| ...props | `Omit<PopupProps, "content">` | All props from [React Leaflet Popup](https://react-leaflet.js.org/docs/api-components/#popup), except `content`. |

### MapTooltip

The `MapTooltip` component renders a tooltip. It provides default styling and animations that match the shadcn/ui design system.

| Prop         | Type                                     | Description                                                                                         |
| ------------ | ---------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `side`       | `"top" \| "right" \| "bottom" \| "left"` | Optional. Controls the position of the tooltip relative to the target element. Defaults to `"top"`. |
| `sideOffset` | `number`                                 | Optional. The distance between the tooltip and the target element. Defaults to `15`.                |
| ...props     | `TooltipProps`                           | All props from [React Leaflet Tooltip](https://react-leaflet.js.org/docs/api-components/#tooltip).  |

## Shapes

### MapCircle

The `MapCircle` component renders a circle on the map.

| Prop     | Type          | Description                                                                                      |
| -------- | ------------- | ------------------------------------------------------------------------------------------------ |
| ...props | `CircleProps` | All props from [React Leaflet Circle](https://react-leaflet.js.org/docs/api-components/#circle). |

### MapCircleMarker

The `MapCircleMarker` component renders a circle marker on the map.

| Prop     | Type                | Description                                                                                                  |
| -------- | ------------------- | ------------------------------------------------------------------------------------------------------------ |
| ...props | `CircleMarkerProps` | All props from [React Leaflet CircleMarker](https://react-leaflet.js.org/docs/api-components/#circlemarker). |

### MapPolyline

The `MapPolyline` component renders a polyline on the map.

| Prop     | Type            | Description                                                                                          |
| -------- | --------------- | ---------------------------------------------------------------------------------------------------- |
| ...props | `PolylineProps` | All props from [React Leaflet Polyline](https://react-leaflet.js.org/docs/api-components/#polyline). |

### MapPolygon

The `MapPolygon` component renders a polygon on the map.

| Prop     | Type           | Description                                                                                        |
| -------- | -------------- | -------------------------------------------------------------------------------------------------- |
| ...props | `PolygonProps` | All props from [React Leaflet Polygon](https://react-leaflet.js.org/docs/api-components/#polygon). |

### MapRectangle

The `MapRectangle` component renders a rectangle on the map.

| Prop     | Type             | Description                                                                                            |
| -------- | ---------------- | ------------------------------------------------------------------------------------------------------ |
| ...props | `RectangleProps` | All props from [React Leaflet Rectangle](https://react-leaflet.js.org/docs/api-components/#rectangle). |

## Controls

### MapZoomControl

The `MapZoomControl` component provides custom zoom buttons for the map.

| Prop     | Type                          | Description                        |
| -------- | ----------------------------- | ---------------------------------- |
| ...props | `React.ComponentProps<"div">` | All props for the container `div`. |

### MapLocateControl

The `MapLocateControl` component provides a button to locate the user on the map.

| Prop              | Type                                | Description                                                                                                                                            |
| ----------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `watch`           | `boolean`                           | Optional. Whether to continuously watch the user’s location. Defaults to `false`.                                                                      |
| `onLocationFound` | `(location: LocationEvent) => void` | Optional. Callback fired when the user’s location is found. Receives the [Leaflet LocationEvent](https://leafletjs.com/reference.html#locationevent).  |
| `onLocationError` | `(error: ErrorEvent) => void`       | Optional. Callback fired when there is an error locating the user. Receives the [Leaflet ErrorEvent](https://leafletjs.com/reference.html#errorevent). |
| ...props          | `React.ComponentProps<"button">`    | All props for the `button` element.                                                                                                                    |

### MapSearchControl

The `MapSearchControl` component uses [Shadcn Place Autocomplete](https://shadcn-place-autocomplete.vercel.app/) under the hood. It provides an autocomplete search input for finding addresses and places and apply the results to the map.

| Prop     | Type                     | Description                                                                                |
| -------- | ------------------------ | ------------------------------------------------------------------------------------------ |
| ...props | `PlaceAutocompleteProps` | All props from [Shadcn Place Autocomplete](https://shadcn-place-autocomplete.vercel.app/). |

### MapControlContainer

The `MapControlContainer` component is a wrapper for map controls that automatically prevents clicks and scroll events from propagating to the map.  
It is useful for buttons, search inputs, or any other UI elements placed on the map that should **not trigger map zooming, panning, or other interactions**.

| Prop     | Type                          | Description                        |
| -------- | ----------------------------- | ---------------------------------- |
| ...props | `React.ComponentProps<"div">` | All props for the container `div`. |

## Drawing

### MapDrawControl

The `MapDrawControl` component is required when you want to add drawing tools to the map.

Place any draw controls (e.g. `MapDrawMarker`, `MapDrawPolyline`, `MapDrawPolygon`) inside it.

| Prop             | Type                               | Description                                                                                                                                                               |
| ---------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `onLayersChange` | `(layers: L.FeatureGroup) => void` | Optional. Callback fired whenever layers are created, edited, or deleted. Receives the current [Leaflet FeatureGroup](https://leafletjs.com/reference.html#featuregroup). |
| ...props         | `React.ComponentProps<"div">`      | All props for the container `div`.                                                                                                                                        |

### MapDrawPolyline

The `MapDrawPolyline` component adds a button to the draw control for drawing polylines on the map.

| Prop     | Type                          | Description                                                                                                                           |
| -------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| ...props | `DrawOptions.PolylineOptions` | All props from [Leaflet Draw Polyline options](https://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html#polylineoptions). |

### MapDrawCircle

The `MapDrawCircle` component adds a button to the draw control for drawing circles on the map.

| Prop     | Type                        | Description                                                                                                                       |
| -------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| ...props | `DrawOptions.CircleOptions` | All props from [Leaflet Draw Circle options](https://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html#circleoptions). |

### MapDrawRectangle

The `MapDrawRectangle` component adds a button to the draw control for drawing rectangles on the map.

| Prop     | Type                           | Description                                                                                                                             |
| -------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| ...props | `DrawOptions.RectangleOptions` | All props from [Leaflet Draw Rectangle options](https://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html#rectangleoptions). |

### MapDrawPolygon

The `MapDrawPolygon` component adds a button to the draw control for drawing polygons on the map.

| Prop     | Type                         | Description                                                                                                                         |
| -------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| ...props | `DrawOptions.PolygonOptions` | All props from [Leaflet Draw Polygon options](https://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html#polygonoptions). |

### MapDrawEdit

The `MapDrawEdit` component adds a button to the draw control for editing existing shapes on the map.
When active, you can drag handles or markers to modify shapes.

| Prop     | Type                                                   | Description                                                                                                                                |
| -------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| ...props | `Omit<EditToolbar.EditHandlerOptions, "featureGroup">` | All props from [Leaflet Draw EditHandlerOptions](https://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html#edithandleroptions). |

### MapDrawDelete

The `MapDrawDelete` component adds a button to the draw control for deleting existing shapes on the map.
When active, clicking on a shape removes it.

| Prop     | Type                             | Description                       |
| -------- | -------------------------------- | --------------------------------- |
| ...props | `React.ComponentProps<"button">` | All props for the button element. |

### MapDrawUndo

The `MapDrawUndo` component adds a button to the draw control for reverting the most recent edit or delete action performed on the map.

| Prop     | Type                             | Description                       |
| -------- | -------------------------------- | --------------------------------- |
| ...props | `React.ComponentProps<"button">` | All props for the button element. |
