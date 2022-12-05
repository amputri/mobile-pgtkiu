import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, View, Text } from 'react-native';
import Beranda from './components/Beranda';
import Biodata from './components/Biodata';
import Rapotpg from './components/Rapotpg';
import Rapottka from './components/Rapottka';
import Rapottkb from './components/Rapottkb';
import Akun from './components/Akun';
import Login from './components/Login';
import { ContextProvider, AuthContext } from './assets/AuthContext';
import { Divider } from 'react-native-paper';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const DraweNav = () => {
  const { contextSiswa, contextPg, contextTka, contextTkb } = useContext(AuthContext);

  return (
    <Drawer.Navigator initialRouteName="Beranda">
      <Drawer.Screen
        name="Beranda"
        component={Beranda}
        options={{
          drawerLabel: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
              <View style={{ marginEnd: 15, alignItems: 'center', justifyContent: 'center' }}>
                <Image
                  style={{
                    width: 60,
                    height: 80,
                  }}
                  source={{ uri: contextTka?.foto_masuk !== '' ? contextTka?.foto_masuk : contextPg?.foto_masuk !== '' ? contextPg?.foto_masuk : 'https://api-pgtkiu.sihaq.com/assets/images/logo.png' }}
                />
              </View>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{contextSiswa?.nama_siswa}</Text>
                <Divider style={{ marginVertical: 5 }} />
                <Text style={{ fontSize: 12 }}>{contextSiswa?.panggilan}</Text>
              </View>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Biodata"
        component={Biodata}
      />
      {
        contextPg?.kelasnamakelas ? (
          <Drawer.Screen
            name="Rapot PG"
            component={Rapotpg}
          />
        ) : null
      }
      {
        contextTka?.kelasnamakelas ? (
          <Drawer.Screen
            name="Rapot TK A"
            component={Rapottka}
          />
        ) : null
      }
      {
        contextTkb?.kelasnamakelas ? (
          <Drawer.Screen
            name="Rapot TK B"
            component={Rapottkb}
          />
        ) : null
      }
      <Drawer.Screen
        name="Akun"
        component={Akun}
      />
    </Drawer.Navigator>
  );
};

export default function App() {
  return (
    <ContextProvider value={500}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Root"
            component={DraweNav}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  );
}