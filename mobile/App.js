import MapView, { PROVIDER_GOOGLE, Marker, Circle } from 'react-native-maps';
import { Dimensions, StyleSheet, View, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import axios from 'axios';
import { MAPS_API_KEY } from "@env";

import ShowBusStopsButton from './Button';

export default function App() {

  const [location, setLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(undefined);
  const [logged, setLogged] = useState(false);
  const [busStops, setBusStops] = useState([]);
  const [showBusStops, setShowBusStops] = useState(true);
  const [circle, setCircle] = useState([]);

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
    }

    getAccessGPSPermission();
  }, []);

  /* useEffect(() => {
    const loginAllowed = async () => {
      const permission = await axios.post(`http://api.olhovivo.sptrans.com.br/v2.1/Login/Autenticar?token=${SPTransAPI}`);
      setLogged(permission.data);
    }
    loginAllowed();
  }, []); */

  const { height, width } = Dimensions.get('window');

  const ASPECT_RATIO = width / height;

  const LATITUDE_DELTA = 0.02;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  function handleRegionChangeComplete(region) {
    setCurrentLocation(region);
  }

  useEffect(() => {
    const getBusStops = async () => {
      if (currentLocation !== null) {
        const { latitude, longitude } = currentLocation;
        const radius = 2000; // 2km
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

  return (
    <View style={styles.container}>
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
        onRegionChangeComplete={handleRegionChangeComplete}
        mapPadding={{ top: 0, right: 0, bottom: 0, left: 0 }}
      >
        {currentLocation && <Circle center={currentLocation} radius={1500} />}

        {
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
      <View style={styles.buttonContainer}>
        <Button 
          title={showBusStops ? "Hide bus stops" : "Show bus stops"} 
          onPress={() => setShowBusStops(!showBusStops)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  map: {
    width: '100%',
    height: '100%',
    elevatedElement: {
      zIndex: 1, // works on ios
      elevation: 1, // works on android
    }
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#3f51b5',
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
