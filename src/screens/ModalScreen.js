import { Button, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/styles';

export default function ModalScreen({ route, navigation }) {
  const mensajeError = route.params?.mensajeError;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-evenly' }}>
      <Text style={styles.texto}>
        { mensajeError }
      </Text>
      <Button onPress={() => navigation.goBack()} title="De acuerdo." color={Colors.primary500}/>
    </View>
  );
}

const styles = StyleSheet.create({
  texto: {
    fontFamily: 'AlegreyaSC_400Regular',
    fontSize: 36,
    color: 'black',
    margin: 20
  }
});