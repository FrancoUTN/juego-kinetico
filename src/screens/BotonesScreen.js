import { StyleSheet, View } from 'react-native';

import GiantButton from '../components/ui/GiantButton';
import { Colors } from '../constants/styles';

export default function BotonesScreen({ navigation }) {
  function onDCPressHandler() {
    navigation.navigate('Personajes');
  }

  function onMarvelPressHandler() {
    navigation.navigate('Personajes');
  }

  return (
    <View style={styles.container}>
      <GiantButton
        color={{backgroundColor: Colors.secondary}}
        imagen={require('../../assets/dc.png')}
        onPress={onDCPressHandler}
      />
      <GiantButton
        color={{backgroundColor: Colors.primary800}}
        imagen={require('../../assets/marvel.png')}
        onPress={onMarvelPressHandler}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
