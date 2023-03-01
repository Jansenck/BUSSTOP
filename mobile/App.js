import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';

import Map from './Map';
import EnableViewBusStopButton from './Button';

export default function App() {

  const [showBusStops, setShowBusStops] = useState(true);

  return (
    <View style={styles.container}>
      <Map showBusStops={showBusStops}/>
      <EnableViewBusStopButton 
        showBusStops={showBusStops} 
        setShowBusStops={setShowBusStops}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  }
});
