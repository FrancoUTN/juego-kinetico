import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/styles';

export default function PersonajesScreen({ navigation, route }) {
  const universo = route.params?.universo;
  const esDC = universo == 'DC' ? true : false;
  // Íconos
  const iconoDC = require('../../assets/dc.png');
  const iconoBatman = require('../../assets/batman.png');
  const iconoJoker = require('../../assets/joker.png');
  const iconoWonderWoman = require('../../assets/wonderwoman.png');
  const iconoMarvel = require('../../assets/marvel.png');
  const iconoSpiderman = require('../../assets/spiderman.png');
  const iconoHulk = require('../../assets/hulk.png');
  const iconoDeadpool = require('../../assets/deadpool.png');

  function onPressHandler(elRequire) {
    const configuracion = {
      name: 'Principal',
      params: {superheroe: elRequire},
      merge: true,
    };
    navigation.navigate(configuracion);
  }

  return(
    <View
      style={styles.container}
    >
      <View style={styles.viewUniverso}>
        <Image
          source={esDC ? iconoDC : iconoMarvel}
          style={styles.franquicia}
        />
      </View>
      <View style={styles.viewTexto}>
        <Text style={styles.texto}>
          Elige tu personaje:
        </Text>
      </View>
      <View style={styles.viewPersonajes}>
        <Pressable
          onPress={() => onPressHandler(esDC ? iconoBatman : iconoSpiderman)}
        >
          <Image
            source={esDC ? iconoBatman : iconoSpiderman}
            style={styles.imagen}
          />
        </Pressable>
        <Pressable
          onPress={() => onPressHandler(esDC ? iconoJoker : iconoHulk)}
        >
          <Image
            source={esDC ? iconoJoker : iconoHulk}
            style={styles.imagen}
          />
        </Pressable>
        <Pressable
          onPress={() => onPressHandler(esDC ? iconoWonderWoman : iconoDeadpool)}
        >
          <Image
            source={esDC ? iconoWonderWoman : iconoDeadpool}
            style={styles.imagen}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imagen: {
    width: 75,
    height: 75
  },
  franquicia: {
    flex: 1,
    width: '80%',
    resizeMode: 'contain',
    marginTop: 30
  },
  viewUniverso: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: 'white'
  },
  viewTexto: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewPersonajes: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  texto: {
    color: 'white',
    fontSize: 36,
    fontFamily: 'AlegreyaSC_500Medium',
  }
});