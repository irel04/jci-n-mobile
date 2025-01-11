import React, { useEffect, useRef } from 'react';
import { Image, Text, View } from 'react-native';
import mapStyleSheet from './Style';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const INITIAL_REGION = {
  latitude: 14.5895,
  longitude: 121.0152,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

interface MarkerCoordinate {
  latitude: number;
  longitude: number;
  title: string;
  type: string
}

interface GoogleMapsInterface {
  markerCoordinates: MarkerCoordinate[];
}

const GoogleMaps = ({ markerCoordinates }: GoogleMapsInterface) => {
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    if (markerCoordinates.length > 0 && mapRef.current) {
      const coordinates = markerCoordinates.map((coord) => ({
        latitude: coord.latitude,
        longitude: coord.longitude,
      }));

      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  }, [markerCoordinates, mapRef]);

  return (
    <MapView
      ref={mapRef}
      style={mapStyleSheet.map}
      initialRegion={INITIAL_REGION}
      provider={PROVIDER_GOOGLE}
    >
      {markerCoordinates.map((coord, index) => {
        const { type, title, ...position } = coord;
        return <Marker coordinate={position} key={index} title={title} titleVisibility="visible" />
      })}
    </MapView>
  );
};

export default GoogleMaps;
