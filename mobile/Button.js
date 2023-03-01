import { StyleSheet, View, Button } from 'react-native';


export default function EnableViewBusStopButton({showBusStops, setShowBusStops}){
    return(
        <View style={styles.buttonContainer}>
            <Button 
            title={showBusStops ? "Hide bus stops" : "Show bus stops"} 
            onPress={() => setShowBusStops(!showBusStops)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
      position: 'absolute',
      bottom: 10,
      left: 10,
      right: 10,
      borderRadius: 4,
      padding: 8,
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });