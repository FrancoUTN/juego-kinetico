import { Image, Pressable, StyleSheet, View } from 'react-native';

export default function GiantButton({ onPress, color, imagen }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.rootContainer, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View style={[styles.botonGigante, color]}>
        <Image
          style={styles.imagen}
          source={imagen}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1
  },
  pressed: {
    opacity: 0.7,
  },
  botonGigante: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagen: {
    width: 250,
    height: 150,
    resizeMode: 'contain'
  }
});
