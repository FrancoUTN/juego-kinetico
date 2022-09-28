import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/styles';

export default function PersonajesScreen({ navigation, route }) {
  const universo = route.params?.universo;
  const esDC = universo == 'DC' ? true : false;

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
    {
      esDC ?
      <>
        <Image
          source={require('../../assets/dc.png')}
          style={styles.franquicia}
        />
        <View
          style={styles.containerDC}
        >
          <Pressable
            onPress={() => onPressHandler(require('../../assets/batman.png'))}
          >
            <Image
              source={require('../../assets/batman.png')}
              style={styles.imagen}
            />
          </Pressable>
          <Pressable
            onPress={() => onPressHandler(require('../../assets/joker.png'))}
          >
            <Image
              source={require('../../assets/joker.png')}
              style={styles.imagen}
            />
          </Pressable>
          <Pressable
            onPress={() => onPressHandler(require('../../assets/wonderwoman.png'))}
          >
            <Image
              source={require('../../assets/wonderwoman.png')}
              style={styles.imagen}
            />
          </Pressable>
        </View>
      </>
      :
      <>
        <View style={styles.viewUniverso}>
          <Image
            source={require('../../assets/marvel.png')}
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
            onPress={() => onPressHandler(require('../../assets/spiderman.png'))}
          >
            <Image
              source={require('../../assets/spiderman.png')}
              style={styles.imagen}
            />
          </Pressable>
          <Pressable
            onPress={() => onPressHandler(require('../../assets/hulk.png'))}
          >
            <Image
              source={require('../../assets/hulk.png')}
              style={styles.imagen}
            />
          </Pressable>
          <Pressable
            onPress={() => onPressHandler(require('../../assets/deadpool.png'))}
          >
            <Image
              source={require('../../assets/deadpool.png')}
              style={styles.imagen}
            />
          </Pressable>
        </View>
      </>
    }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center'
  },
  imagen: {
    width: 75,
    height: 75
  },
  franquicia: {
    flex: 1,
    width: '80%',
    resizeMode: 'contain',
    // marginHorizontal: 30,
    // marginTop: 30
  },
  viewUniverso: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end', // Nada
    // backgroundColor: Colors.primary800
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