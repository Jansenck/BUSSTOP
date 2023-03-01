import MapView, { PROVIDER_GOOGLE, Marker, Circle } from 'react-native-maps';
import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import axios from 'axios';
import { MAPS_API_KEY } from "@env";

export default function Map({showBusStops}){

    const [location, setLocation] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [busStops, setBusStops] = useState([]);

    useEffect(() => {
        const getAccessGPSPermission = async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if(status !== "granted") {
            return window.alert(
              'É preciso permitir o acesso a localização do seu dispositivo para localizarmos os ponot de onibus'
            );
          }
    
          const currentLocation = await Location.getCurrentPositionAsync({});
          const { coords } = currentLocation;
          setLocation(coords);
          setCurrentLocation(coords);
        }
    
        getAccessGPSPermission();
    }, []);
    
      function handleRegionChangeComplete(region) {
        setCurrentLocation(region);
      }
    
      useEffect(() => {
        const getBusStops = async () => {
          if (currentLocation !== null) {
            const { latitude, longitude } = currentLocation;
            const radius = 2000;
            const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=bus_station&key=${MAPS_API_KEY}`);
            const { results } = response.data;
    
            const points = results.map(point => {
              return {
                id: point.place_id,
                name: point.name,
                location: point.geometry.location,
                description: point.plus_code.compound_code.split('+')[0]
              };
            });
            setBusStops(points);
          }
        };
      
        getBusStops();
      }, [currentLocation]);

      const POSITION = {
        region: {
            latitude: currentLocation?.latitude || null,
            longitude:currentLocation?.longitude || null,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
      }

    return(
        <MapView 
        style={styles.map} 
        provider={PROVIDER_GOOGLE}
        initialRegion={location}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        zoomControlEnabled={true}
        rotateEnabled={true}
        scrollEnabled={true}
        pitchEnabled={true}
        toolbarEnabled={true}
        loadingEnabled={true}
        showsIndoorLevelPicker={true}
        mapType="standard"
        region={currentLocation}
        mapPadding={{ top: 0, right: 0, bottom: 0, left: 0 }}
      >
        {currentLocation && <Circle style={styles.circle}  center={currentLocation} radius={1500} />}

        { showBusStops &&
          busStops.map((stop, index) => (
            <Marker 
              key={index}
              pinColor='gold' 
              description={stop.name}
              coordinate={{ latitude: stop.location.lat, longitude: stop.location.lng }} 
            ></Marker>
          ))
        }
      </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
      width: '100%',
      height: '100%',
      elevatedElement: {
        zIndex: 1, // works on ios
        elevation: 1, // works on android
      }
    },
    circle:{
        fillColor: '#526351',
        strokeColor: '#452698'
    }
  });