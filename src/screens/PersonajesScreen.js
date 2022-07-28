import { Image, Pressable, StyleSheet, View } from 'react-native';

export default function PersonajesScreen({navigation}) {
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
      <Image
        source={require('../../assets/marvel.png')}
        style={styles.franquicia}
      />
      <View
        style={styles.containerMarvel}
      >
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerDC: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  containerMarvel: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  imagen: {
    width: 75,
    height: 75
  },
  franquicia: {
    width: '90%',
    flex: .5,
    resizeMode: 'contain',
    marginHorizontal: 30,
    marginTop: 30
  }
});