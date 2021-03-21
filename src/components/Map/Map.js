import { GoogleMap, LoadScript } from '@react-google-maps/api';
import React from 'react';

const containerStyle = {
    width: '100%',
    height: '500px'
};
const center = {
    lat: -3.745,
    lng: -38.523
};

const ReactMap = () => {
    return (
        <LoadScript googleMapsApiKey = "AIzaSyDz_YlzDxUUs4gz1TPD0WN_Fdwa4oaVJiw">
            <GoogleMap mapContainerStyle = {containerStyle} center={center} zoom = {10}></GoogleMap>
        </LoadScript>
    );
};

export default ReactMap;