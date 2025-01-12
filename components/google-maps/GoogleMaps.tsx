import React, { useEffect, useRef, useState } from 'react';
import { Alert, Image, Text, View } from 'react-native';
import mapStyleSheet from './Style';
import MapView, { AnimatedRegion, Marker, MarkerAnimated, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { supabase } from "@/utils/supabase";

const INITIAL_REGION = {
  latitude: 14.5895,
  longitude: 121.0152,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

interface MarkerCoordinate {
  latitude: number;
  longitude: number;
  title?: string;
  type?: string
}

interface GoogleMapsInterface {
  markerCoordinates: MarkerCoordinate[];
  movingMarkerCoords: MarkerCoordinate
}

const GoogleMaps = ({ markerCoordinates, movingMarkerCoords }: GoogleMapsInterface) => {
  const mapRef = useRef<MapView>(null);
  const markerRef = useRef(null)

  const [userCoords, setUserCoords] = useState({...movingMarkerCoords})

  
    // This susbcribes to changes happen on the user location
    useEffect(() => {
  
      const channels = supabase.channel('custom-update-channel')
        .on(
          'postgres_changes',
          { event: 'UPDATE', schema: 'public', table: 'users_details' },
          (payload) => {
            const { lng: longitude, lat: latitude, first_name } = payload.new

            const newCoords = {longitude, latitude, title: first_name}
  
            setUserCoords(newCoords)
            mapRef.current?.fitToCoordinates([newCoords, ...markerCoordinates], {
              edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
              animated: true,
            })
          }
        )
        .subscribe()

    }, [])


  return (
    <MapView
      ref={mapRef}
      style={mapStyleSheet.map}
      initialRegion={INITIAL_REGION}
      provider={PROVIDER_GOOGLE}
      onMapReady={() => {
      if (markerCoordinates.length > 0 && mapRef.current) {
        const coordinates = markerCoordinates.map((coord) => ({
        latitude: coord.latitude,
        longitude: coord.longitude,
        }));

        mapRef.current.fitToCoordinates([userCoords, ...coordinates], {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
        });
      }
      }}
    >

      {markerCoordinates.map((coord, index) => {
      const { type, title, ...position } = coord;
      return <Marker coordinate={position} key={index} title={title} titleVisibility="visible"/>
      })}

      <Marker coordinate={userCoords} ref={markerRef}>
      <View style={{ alignItems: 'center' }}>
        <Image
        source={require("@/assets/images/jb-profile.png")}
        style={{ width: 40, height: 40, borderRadius: 20 }}
        />
        <Text className="text-brand-700">{userCoords.title}</Text>
      </View>
      </Marker>
    </MapView>
  );
};

export default GoogleMaps;
