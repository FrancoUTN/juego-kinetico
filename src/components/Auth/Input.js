import { View, Text, TextInput, StyleSheet } from 'react-native';

import { Colors } from '../../constants/styles';

function Input({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>
      <TextInput
        style={[styles.input, isInvalid && styles.inputInvalid]}
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    fontFamily: 'AlegreyaSC_400Regular',
    color: 'white',
    marginBottom: 4,
    fontSize: 18,
    textAlign: 'center'
  },
  labelInvalid: {
    // color: Colors.error500,
  },
  input: {
    fontFamily: 'AlegreyaSC_400Regular',
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: Colors.secondary,
    borderRadius: 4,
    fontSize: 20,
    color: Colors.primary100,
  },
  inputInvalid: {
    backgroundColor: Colors.error100,
  },
});
