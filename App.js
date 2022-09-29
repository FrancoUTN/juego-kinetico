import { useContext, useCallback, useEffect, useMemo, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import Constants from "expo-constants";
import * as SplashScreen from "expo-splash-screen";
import { Animated, StyleSheet, View} from "react-native";

import { Colors } from './src/constants/styles';
import LoginScreen from './src/screens/LoginScreen';
import PrincipalScreen from './src/screens/PrincipalScreen';
import AuthContextProvider, { AuthContext } from './src/store/auth-context';
import IconButton from './src/components/ui/IconButton';
import PersonajesScreen from "./src/screens/PersonajesScreen";
import ModalScreen from "./src/screens/ModalScreen";
import {
  useFonts,
  AlegreyaSC_400Regular,
  AlegreyaSC_400Regular_Italic,
  AlegreyaSC_500Medium,
  AlegreyaSC_500Medium_Italic,
  AlegreyaSC_700Bold,
  AlegreyaSC_700Bold_Italic,
  AlegreyaSC_800ExtraBold,
  AlegreyaSC_800ExtraBold_Italic,
  AlegreyaSC_900Black,
  AlegreyaSC_900Black_Italic,
} from '@expo-google-fonts/alegreya-sc';

// Inicializar App y Auth
import './src/util/auth'
import BotonesScreen from "./src/screens/BotonesScreen";


// Instruct SplashScreen not to hide yet, we want to do this manually
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
});
const Stack = createNativeStackNavigator();


function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} options={{
        title: 'Ingreso',
          headerTitleStyle: {
            fontFamily: 'AlegreyaSC_400Regular'
          }
        }}/>
      <Stack.Group screenOptions={{
          presentation: 'modal',
          headerStyle: { backgroundColor: Colors.error500 },
          headerTintColor: 'white',
          contentStyle: { backgroundColor: Colors.error100 },
        }}f
      >
        <Stack.Screen name="MiModal" component={ModalScreen} options={{
          title: 'Error',
          headerTitleStyle: {
            fontFamily: 'AlegreyaSC_400Regular'
          } 
        }}/>
      </Stack.Group>
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Botones"
        component={BotonesScreen}
        options={{
          title: 'Elige universo:',
          headerTitleStyle: {
            fontFamily: 'AlegreyaSC_400Regular'
          },
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="power"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Personajes"
        component={PersonajesScreen}
        options={{
          headerTitleStyle: {
            fontFamily: 'AlegreyaSC_400Regular'
          },
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="power"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Principal"
        component={PrincipalScreen}
        options={{
          headerTitleStyle: {
            fontFamily: 'AlegreyaSC_400Regular'
          },
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="power"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.email && <AuthStack />}
      {!!authCtx.email && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  const [animacionFinalizada, setAnimacionFinalizada] = useState(false);
  return (
    <>
    {
      !animacionFinalizada ?
      <AnimatedSplashScreen
        image={require('./assets/splash.png')}
        onFinalizada={() => setAnimacionFinalizada(true)}        
      />
      :
      <>
        <StatusBar style="light" />
        <MainScreen />
      </>
    }
    </>
  );
}

function AnimatedSplashScreen({ onFinalizada, image }) {
  const animation = useMemo(() => new Animated.Value(0), []);
  const [isAppReady, setAppReady] = useState(false);
  let [fontsLoaded] = useFonts({
    AlegreyaSC_400Regular,
    AlegreyaSC_400Regular_Italic,
    AlegreyaSC_500Medium,
    AlegreyaSC_500Medium_Italic,
    AlegreyaSC_700Bold,
    AlegreyaSC_700Bold_Italic,
    AlegreyaSC_800ExtraBold,
    AlegreyaSC_800ExtraBold_Italic,
    AlegreyaSC_900Black,
    AlegreyaSC_900Black_Italic,
  });
  const onImageLoaded = useCallback(async () => {
    try {
      setTimeout(() => SplashScreen.hideAsync(), 300);
    } catch (e) {

    } finally {
      setAppReady(true);
    }
  }, []);

  useEffect(() => {
    if (isAppReady) {
      Animated.timing(animation, {
        toValue: 1000,
        duration: 1200,
        useNativeDriver: true,
      }).start(() => onFinalizada());
    }
  }, [isAppReady]);

  return (
    <View style={{ flex: 1 }}>
      {fontsLoaded && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: Constants.manifest.splash.backgroundColor,
            },
          ]}
        >
          <Animated.Image
            style={{
              width: "100%",
              height: "100%",
              resizeMode: Constants.manifest.splash.resizeMode || "contain",
              transform: [
                {
                  translateX: animation,
                },
              ],
            }}
            source={image}
            onLoadEnd={onImageLoaded}
            fadeDuration={0}
          />
        </Animated.View>
      )}
    </View>
  );
}

function MainScreen() {
  return (
    <AuthContextProvider>
      <Navigation />
    </AuthContextProvider>
  );
}
