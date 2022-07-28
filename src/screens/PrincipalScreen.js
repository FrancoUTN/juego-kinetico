import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function App() {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);
  const [valorDeTop, setValorDeTop] = useState(0);

  const _slow = () => {
    Accelerometer.setUpdateInterval(1000);
  };

  const _fast = () => {
    Accelerometer.setUpdateInterval(500);
  };

  const _subscribe = () => {
    Accelerometer.setUpdateInterval(1000);
    setSubscription(
      Accelerometer.addListener(accelerometerData => {
        console.log(accelerometerData);
        setData(accelerometerData);
        setValorDeTop(valorPrevio => valorPrevio + 1)
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  const otrosEstilos = {
    top: valorDeTop
  };

  const { x, y, z } = data;
  return (
    <View style={styles.container}>
      <View style={styles.otroCuadrado}>

      </View>
      <View style={[styles.cuadrado, otrosEstilos]}>

      </View>
      {/* <Text style={styles.text}>Accelerometer: (in Gs where 1 G = 9.81 m s^-2)</Text>
      <Text style={styles.text}>
        x: {round(x)} y: {round(y)} z: {round(z)}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} style={styles.button}>
          <Text>{subscription ? 'On' : 'Off'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_slow} style={[styles.button, styles.middleButton]}>
          <Text>Slow</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_fast} style={styles.button}>
          <Text>Fast</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

function round(n) {
  if (!n) {
    return 0;
  }
  // return Math.floor(n * 100) / 100;
  return Math.floor(n * 100);
  // return n;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cuadrado: {
    backgroundColor: '#eee',
    width: 50,
    height: 50,
    // top: 60
  },
  otroCuadrado: {
    backgroundColor: '#ada',
    width: 50,
    height: 50,
    position: 'absolute',
  },
  text: {
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
});
