import {withScriptjs, withGoogleMap,GoogleMap, Marker } from "react-google-maps"
import React from 'react'
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";


const MapComponent = withScriptjs(withGoogleMap((props) =>
	<GoogleMap
	center={{lat: parseFloat(props.center[0]), lng: parseFloat(props.center[1])}}
	zoom={props.zoom}
	>
	    <MarkerClusterer 
      averageCenter
      enableRetinaIcons
      gridSize={45}
    >
	{props.locationData.map((device, index) => {
		//maps each device to a map marker

			return (
				<Marker
				key={index}
				position={{ lat: parseFloat(device.Latitude), 
					lng: parseFloat(device.Longitude) }}
				onClick={function(){props.markerClickEvent(device.ChargeDeviceId,device.Latitude, device.Longitude )}}>
				</Marker>)

	})}
	</MarkerClusterer>
	</GoogleMap>
	))

export default MapComponent;

