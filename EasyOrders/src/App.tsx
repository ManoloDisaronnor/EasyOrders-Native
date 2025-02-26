import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from './navigation/screens/Home';
import { AltaScreen } from './navigation/screens/Alta';
import { ListadoScreen } from './navigation/screens/Listado';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

// Crear la navegación drawer
const Drawer = createDrawerNavigator();

// Componente personalizado para el encabezado del drawer
function CustomDrawerHeader() {
  return (
    <LinearGradient
      colors={['#24c55e', '#1ca24c', '#156e34']}
      style={styles.drawerHeader}
    >
      <Image
        source={require('./assets/locoEasyOrders.png')}
        style={styles.drawerLogo}
        resizeMode="contain"
      />
      <Text style={styles.drawerTitle}>EasyOrders</Text>
      <Text style={styles.drawerSubtitle}>Panel de administración</Text>
    </LinearGradient>
  );
}

// Componente personalizado para el contenido del drawer
interface CustomDrawerContentProps {
  navigation: any;
  state: any;
}

function CustomDrawerContent(props: CustomDrawerContentProps) {
  return (
    <View style={styles.drawerContainer}>
      <CustomDrawerHeader />

      <View style={styles.drawerItemsContainer}>
        <DrawerItem
          label="Inicio"
          icon="home"
          onPress={() => props.navigation.navigate('Home')}
          isActive={props.state.index === 0}
        />
        <DrawerItem
          label="Alta de Clientes"
          icon="person-add"
          onPress={() => props.navigation.navigate('Alta')}
          isActive={props.state.index === 1}
        />
        <DrawerItem
          label="Listado de Clientes"
          icon="list"
          onPress={() => props.navigation.navigate('Listado')}
          isActive={props.state.index === 2}
        />
      </View>

      <View style={styles.drawerFooter}>
        <Text style={styles.drawerFooterText}>v1.0.0</Text>
      </View>
    </View>
  );
}

// Componente para cada item del drawer
function DrawerItem({ label, icon, onPress, isActive }: { label: string; icon: string; onPress: () => void; isActive: boolean }) {
  return (
    <TouchableOpacity
      style={[styles.drawerItem, isActive && styles.drawerItemActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Icon
        name={icon}
        size={24}
        color={isActive ? '#ffffff' : '#156e34'}
        style={styles.drawerItemIcon}
      />
      <Text
        style={[styles.drawerItemLabel, isActive && styles.drawerItemLabelActive]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default function App() {
  return (
    <GluestackUIProvider mode="light">
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            headerStyle: {
              backgroundColor: '#ffffff',
            },
            headerTintColor: '#333333',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            drawerActiveTintColor: '#fff',
            drawerActiveBackgroundColor: '#24c55e',
            drawerInactiveTintColor: '#333',
            drawerLabelStyle: {
              fontSize: 16,
            },
          }}
        >
          <Drawer.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Inicio',
              drawerIcon: ({ color }) => (
                <Icon name="home" size={24} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Alta"
            component={AltaScreen}
            options={{
              title: 'Alta de Clientes',
              drawerIcon: ({ color }) => (
                <Icon name="person-add" size={24} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Listado"
            component={ListadoScreen}
            options={{
              title: 'Listado de Clientes',
              drawerIcon: ({ color }) => (
                <Icon name="list" size={24} color={color} />
              ),
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  drawerHeader: {
    padding: 20,
    alignItems: 'center',
  },
  drawerLogo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#ffffff',
    marginBottom: 10,
  },
  drawerTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  drawerSubtitle: {
    color: '#ffffff',
    fontSize: 14,
    opacity: 0.9,
  },
  drawerItemsContainer: {
    flex: 1,
    paddingTop: 10,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  drawerItemActive: {
    backgroundColor: '#24c55e',
  },
  drawerItemIcon: {
    marginRight: 15,
  },
  drawerItemLabel: {
    fontSize: 16,
    color: '#156e34',
  },
  drawerItemLabelActive: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  drawerFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eaeaea',
    alignItems: 'center',
  },
  drawerFooterText: {
    color: '#666666',
    fontSize: 12,
  },
});