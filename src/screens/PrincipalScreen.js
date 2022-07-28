import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';

const ladoCuadradoSuperheroe = 75;

export default function App() {
  const [subscription, setSubscription] = useState(null);
  const [valorDeRightYTop, setValorDeRightYTop] = useState({
    right: 0,
    top: 0
  });
  const [dimensiones, setDimensiones] = useState({
    ancho: 0,
    alto: 0
  });

  const _slow = () => {
    Accelerometer.setUpdateInterval(800);
  };

  const _fast = () => {
    Accelerometer.setUpdateInterval(50);
  };

  useEffect(
    () => {
      if (dimensiones.ancho > 0 && dimensiones.alto > 0) {
        const mitadDelAncho = dimensiones.ancho / 2;
        const mitadDelAlto = dimensiones.alto / 2;
        // "- 5" porque el ícono tiene áreas ligeramente menores al cuadrado total
        const mitadDelSuperheroe = (ladoCuadradoSuperheroe - 15) / 2;
        const xPared = Math.abs(valorDeRightYTop.right) + mitadDelSuperheroe;
        const yPared = Math.abs(valorDeRightYTop.top) + mitadDelSuperheroe;

        // console.log(mitadDelAncho);
        // console.log(xPared);

        if (xPared >= mitadDelAncho || yPared >= mitadDelAlto) {
          console.log('PERDISTE!');
          _unsubscribe();
        }
      }
    }
  , [valorDeRightYTop]);

  const _subscribe = () => {
    // Accelerometer.setUpdateInterval(2000);
    Accelerometer.setUpdateInterval(70);
    setSubscription(
      Accelerometer.addListener(accelerometerData => {
        const nuevoX = generarMovimiento(accelerometerData.x);
        const nuevoY = generarMovimiento(accelerometerData.y);

        setValorDeRightYTop(valorAnterior => {
          // console.log(valorAnterior);
          return({
            
            right: valorAnterior.right + nuevoX,
            top: valorAnterior.top + nuevoY,
          })}
        );

      })
    );
  };

  function generarMovimiento(variable) {
    if (variable > -0.05 && variable < 0) {
      return -20;
    }
    if (variable > 0 && variable < 0.05) {
      return 20;
    }
    if (variable > -0.1 && variable < 0) {
      return -30;
    }
    if (variable > 0 && variable < 0.1) {
      return 30;
    }
    return variable * 30;
  }

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  const otrosEstilos = {
    right: valorDeRightYTop.right,
    top: valorDeRightYTop.top
  };

  function reiniciar() {
    setValorDeRightYTop({
      right: 0,
      top: 0
    });
  }

  return (
    <View style={styles.container}>

      <View style={styles.datosContainer}>
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

      <View
        style={styles.cuadradoContainer}
        onLayout={(event) => {
          const {width, height} = event.nativeEvent.layout;
          setDimensiones({ancho: width, alto: height});
          console.log(event.nativeEvent.layout);
        }}
      >
        <View style={[styles.cuadrado, otrosEstilos]}>
          <Image            
            style={styles.superheroe}
            source={require('../../assets/batman.png')}
          />
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
    alignItems: 'center'
  },
  cuadrado: {
    width: ladoCuadradoSuperheroe,
    height: ladoCuadradoSuperheroe
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
