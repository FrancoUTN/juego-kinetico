import React, { useState, useEffect } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { getFirestore, getDoc, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

import Button from '../components/ui/Button';
import { Colors } from '../constants/styles';


const ladoCuadradoSuperheroe = 75;

const arregloAuxiliar = [
  {
    correo: 'asdsa',
    puntaje: 0
  },
  {
    correo: 'qwesde',
    puntaje: 3
  },    
  {
    correo: 'Yamilo@jasd.com',
    puntaje: 1
  }
];

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
  const [gameOver, setGameOver] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [intervalo, setIntervalo] = useState(null);
  const [userRef, setUserRef] = useState(null);
  const [cargando, setCargando] = useState(false);

  const _slow = () => {
    Accelerometer.setUpdateInterval(800);
  };

  const _fast = () => {
    Accelerometer.setUpdateInterval(50);
  };

  useEffect(() => {
    const db = getFirestore();    
    const auth = getAuth();
    const uid = auth.currentUser.uid;
    const userRef = doc(db, 'usuarios', uid);

    setUserRef(userRef);
  }, []);

  useEffect(() => {
    crearIntervalo();

    return () => limpiarIntervalo();
  }, []);
  
  const crearIntervalo = () => {
    setIntervalo(
      setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000)
    );
  }

  const limpiarIntervalo = () => {
    intervalo && clearInterval(intervalo);
    setIntervalo(null);
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

        if (xPared >= mitadDelAncho || yPared >= mitadDelAlto) {
          setGameOver(true);
          _unsubscribe();
          limpiarIntervalo();
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
          return({
            
            right: valorAnterior.right + nuevoX,
            top: valorAnterior.top + nuevoY,
          });
        });

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
    // if (variable > -0.1 && variable < 0) {
    //   return -30;
    // }
    // if (variable > 0 && variable < 0.1) {
    //   return 30;
    // }
    return variable * 100;
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
    setGameOver(false);
    _subscribe();
    crearIntervalo();
    setSeconds(0);
  }

  async function guardarResultado() {
    setCargando(true);

    await updateDoc(userRef, {
      puntaje: seconds
    });
  }

  function renderizarMejorJugador({item}) {
    // return (
    //   <Text>Hola</Text>
    // );
    return (
      <View style={styles.mejorJugadorContainer}>
        <Text style={styles.mejorJugadorTexto}>
          {item.correo}:
        </Text>
        <Text style={styles.mejorJugadorTexto}>
          {item.puntaje} puntos
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <View style={styles.datosContainer}>
        <Text style={styles.timerTexto}>
          Puntuación: {seconds}
        </Text>
      </View>

      <View
        style={styles.cuadradoContainer}
        onLayout={(event) => {
          const {width, height} = event.nativeEvent.layout;
          setDimensiones({ancho: width, alto: height});
        }}
      >
        {
          gameOver ?
          <View style={styles.containerGenerico}>
            <View style={styles.listadoContainer}>
              <Text style={styles.mejoresJugadoresTitulo}>
                Mejores jugadores
              </Text>
              <FlatList
                data={arregloAuxiliar}
                renderItem={renderizarMejorJugador}
                keyExtracor={item => item.correo}
              />
            </View>
            <View style={styles.perdisteContainer}>
              <Text style={styles.perdisteTexto}>
                ¡Perdiste!
              </Text>
              <View style={{marginBottom: 40}}>
                <Button
                  onPress={guardarResultado}
                >
                  Guardar resultado
                </Button>
              </View>
              <Button
                onPress={reiniciar}
              >
                ¿Reintentar?
              </Button>
            </View>
          </View>
          :
          <View style={[styles.cuadrado, otrosEstilos]}>
            <Image            
              style={styles.superheroe}
              source={require('../../assets/batman.png')}
            />
          </View>
        }
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  containerGenerico: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  datosContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.primary800,
    zIndex: 5
  },
  cuadradoContainer: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center'
  },
  perdisteContainer: {
    flex: 2,
    alignItems: 'center',
  },
  timerTexto: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold'
  },
  perdisteTexto: {
    color: Colors.error500,
    fontSize: 50,
    fontWeight: 'bold',
    margin: 30
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
  },
  mejorJugadorContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  mejoresJugadoresTitulo: {
    color: 'white',
    fontSize: 22,
    margin: 10,
  },
  mejorJugadorTexto: {
    color: 'white',
    fontSize: 16,
    margin: 5,
    marginHorizontal: 10
  },
  listadoContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 5
  }
});
