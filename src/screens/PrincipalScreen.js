import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function App() {
  // const [data, setData] = useState({
  //   x: 0,
  //   y: 0,
  //   z: 0,
  // });
  const [subscription, setSubscription] = useState(null);
  const [valorDeTop, setValorDeTop] = useState(0);

  const _slow = () => {
    Accelerometer.setUpdateInterval(800);
  };

  const _fast = () => {
    Accelerometer.setUpdateInterval(50);
  };

  const _subscribe = () => {
    // Accelerometer.setUpdateInterval(100);
    setSubscription(
      Accelerometer.addListener(accelerometerData => {
        // console.log(accelerometerData);
        // setData(accelerometerData);
        if (accelerometerData.y > 0) {
          setValorDeTop(valorPrevio => valorPrevio + 2)
        }
        else if (accelerometerData.y < 0) {
          setValorDeTop(valorPrevio => valorPrevio - 2)
        }
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

  function reiniciar() {
    setValorDeTop(0);
  }

  // const { x, y, z } = data;
  return (
    <View style={styles.container}>

      <View style={styles.datosContainer}>
        {/* <Text style={styles.text}>Accelerometer: (in Gs where 1 G = 9.81 m s^-2)</Text>
        <Text style={styles.text}>
          x: {round(x)} y: {round(y)} z: {round(z)}
        </Text> */}
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
          <TouchableOpacity onPress={reiniciar} style={styles.button}>
            <Text>Restart</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.cuadradoContainer}>
        <View style={styles.otroCuadrado}>
        </View>
        <View style={[styles.cuadrado, otrosEstilos]}>
        </View>
      </View>

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

const lado = 15;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center'
  },
  datosContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  cuadradoContainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a0a',
    // alignItems: 'center'
  },
  cuadrado: {
    backgroundColor: '#eee',
    width: lado,
    height: lado,
    // top: 60
  },
  otroCuadrado: {
    backgroundColor: '#ada',
    width: lado,
    height: lado,
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
