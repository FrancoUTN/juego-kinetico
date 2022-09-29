import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/styles';

import Button from '../ui/Button';
import FlatButton from '../ui/FlatButton';
import Input from './Input';

function AuthForm({ onSubmit, credentialsInvalid, correo, clave }) {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const {
    email: emailIsInvalid,
    password: passwordIsInvalid
  } = credentialsInvalid;

  useEffect(
    () => {
      setEnteredEmail(correo);
      setEnteredPassword(clave);
    }, [correo, clave]
  );

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case 'email':
        setEnteredEmail(enteredValue);
        break;
      case 'password':
        setEnteredPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      password: enteredPassword
    });
  }

  return (
    <View style={styles.form}>
      <View style={styles.viewBienvenido}>
        <Text style={styles.textBienvenido}>
          ¡Ojo con los bordes
          {
            enteredEmail &&
            ', ' + enteredEmail.substring(0, enteredEmail.indexOf("@"))}
          !
        </Text>
      </View>
      <View>
        <Input
          label="Usuario"
          onUpdateValue={updateInputValueHandler.bind(this, 'email')}
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
        />
        <Input
          label="Clave"
          onUpdateValue={updateInputValueHandler.bind(this, 'password')}
          secure
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
        />
        <View style={styles.buttons}>
          <Button onPress={submitHandler}>
            Jugar
          </Button>
        </View>
      </View>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 30,
  },
  viewBienvenido: {
    marginTop: 16,
    marginBottom: 20,
    height: 80
  },
  textBienvenido: {
    color: Colors.secondary,
    fontSize: 30,
    fontFamily: 'AlegreyaSC_400Regular',
    textAlign: 'center'
  }
});
