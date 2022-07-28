import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function App() {
  // const [data, setData] = useState({
  //   x: 0,
  //   y: 0,
  //   z: 0,
  // });
  const [subscription, setSubscription] = useState(null);
  // const [valorDeRight, setValorDeRight] = useState(0);
  // const [valorDeTop, setValorDeTop] = useState(0);
  const [valorDeRightYTop, setValorDeRightYTop] = useState({
    right: 0,
    top: 0
  });

  const _slow = () => {
    Accelerometer.setUpdateInterval(800);
  };

  const _fast = () => {
    Accelerometer.setUpdateInterval(50);
  };

  const _subscribe = () => {
    Accelerometer.setUpdateInterval(70);
    setSubscription(
      Accelerometer.addListener(accelerometerData => {
        const {x, y} = accelerometerData;

        // generarMovimiento(x, setValorDeRight);
        // generarMovimiento(y, setValorDeTop);
        
        const nuevoX = generarMovimiento2(x);
        const nuevoY = generarMovimiento2(y);

        setValorDeRightYTop(valorAnterior => {
          const rightAnterior = valorAnterior.right;
          const topAnterior = valorAnterior.top;

          return ({
            right: rightAnterior + nuevoX,
            top: topAnterior + nuevoY,
          });
        });

      })
    );
  };
  
  function generarMovimiento2(variable, setter) {
    const [a, b, c, d, e] = [10, 18, 26, 40, 80];

    if (variable < -0.66) {
      return -e;
    }
    else if (variable < -0.33) {
      return -d;
    }
    else if (variable < -0.16) {
      return -c;
    }
    else if (variable < -0.8) {
      return -b;
    }
    else if (variable < 0) {
      return -a;
    }
    else if (variable < 0.8) {
      return a;
    }
    else if (variable < 0.16) {
      return b;
    }
    else if (variable < 0.33) {
      return c;
    }
    else if (variable < 0.66) {
      return d;
    }
    else {
      return e;
    }
  }

  function generarMovimiento(variable, setter) {
    // const [a, b, c, d, e] = [10, 18, 26, 40, 80];
    const [a, b, c, d, e] = [1, 2, 4, 8, 16];

    if (variable < -0.66) {
      setter(valorPrevio => valorPrevio - e)
    }
    else if (variable < -0.33) {
      setter(valorPrevio => valorPrevio - d)
    }
    else if (variable < -0.16) {
      setter(valorPrevio => valorPrevio - c)
    }
    else if (variable < -0.8) {
      setter(valorPrevio => valorPrevio - b)
    }
    else if (variable < 0) {
      setter(valorPrevio => valorPrevio - a)
    }
    else if (variable < 0.8) {
      setter(valorPrevio => valorPrevio + a)
    }
    else if (variable < 0.16) {
      setter(valorPrevio => valorPrevio + b)
    }
    else if (variable < 0.33) {
      setter(valorPrevio => valorPrevio + c)
    }
    else if (variable < 0.66) {
      setter(valorPrevio => valorPrevio + d)
    }
    else {
      setter(valorPrevio => valorPrevio + e)
    }
  }

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  // const otrosEstilos = {
  //   right: valorDeRight,
  //   top: valorDeTop
  // };
  const otrosEstilos = {
    right: valorDeRightYTop.right,
    top: valorDeRightYTop.top
  };

  function reiniciar() {
    // setValorDeRight(0);
    // setValorDeTop(0);
    setValorDeRightYTop({
      right: 0,
      top: 0
    });
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
        {/* <View style={styles.otroCuadrado}></View> */}
        <View style={[styles.cuadrado, otrosEstilos]}>
          <Image            
            style={styles.superheroe}
            source={require('../../assets/spiderman.png')}
            // resizeMode="contain"
          />
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

const lado = 50;

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
    padding: 20,
    backgroundColor: '#52A35B',
  },
  cuadradoContainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#a0a',
    // alignItems: 'center'
  },
  cuadrado: {
    // backgroundColor: '#eee',
    width: lado,
    height: lado
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
    marginTop: 0
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
  superheroe: {
    flex: 1,
    width: undefined,
    height: undefined
  }
});
