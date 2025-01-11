import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import mapStyleSheet from './Style';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';


const INITIAL_REGION = {
  latitude: 14.5895,
  longitude: 121.0152,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const INITIAL_MARKER_POS = {
  latitude: 14.5895,
  longitude: 121.0152,
  title: 'BIN-A',
};

const GoogleMaps = () => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const focusMap = () => {
    const STA_MESA = {
      latitude: 14.5895,
      longitude: 121.0152,
      latitudeDelta: 0.0012,
      longitudeDelta: 0.0012,
    };

    mapRef.current?.animateToRegion(STA_MESA, 1000); // 1000 ms for smooth animation
  };

  const focusMarker = () => {
    const LNGLAT = {
      latitude: 14.5895,
      longitude: 121.0152,
    };

    if (markerRef.current) {
      markerRef.current.animateMarkerToCoordinate(LNGLAT, 1000); // Smooth marker movement
    }
	
  };

  useEffect(() => {
    focusMap();
  }, []);

  return (
    <MapView style={mapStyleSheet.map} initialRegion={INITIAL_REGION} ref={mapRef} provider={PROVIDER_GOOGLE}>
      <Marker coordinate={INITIAL_MARKER_POS} ref={markerRef} />
    </MapView>
  );
};

export default GoogleMaps;
