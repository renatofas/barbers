import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterCutScreen from './screens/RegisterCutScreen';

const Stack = createNativeStackNavigator();
const API = process.env.EXPO_PUBLIC_API || 'http://localhost:3001';

function HomeScreen({ navigation }) {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(`${API}/api/appointments`);
        const today = new Date().toISOString().split('T')[0];
        const filtered = res.data.filter(app =>
          app.date_time.startsWith(today)
        );
        setAppointments(filtered);
      } catch (err) {
        console.error('Error al obtener citas', err);
      }
    };
    fetchAppointments();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
      <Text>{new Date(item.date_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
      <Text>{item.email}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('RegistrarCorte', { appointment: item })}
      >
        <Text style={styles.buttonText}>Registrar corte</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cortes programados hoy</Text>
      <FlatList
        data={appointments}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Inicio" component={HomeScreen} />
        <Stack.Screen name="RegistrarCorte" component={RegisterCutScreen} options={{ title: 'Registrar Corte' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, paddingHorizontal: 20, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  item: { backgroundColor: '#f9f9f9', padding: 15, marginVertical: 8, borderRadius: 10 },
  title: { fontSize: 18, fontWeight: '600' },
  button: { marginTop: 10, backgroundColor: '#007bff', padding: 10, borderRadius: 5 },
  buttonText: { color: 'white', textAlign: 'center' },
});
