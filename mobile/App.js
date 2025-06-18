
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BookingScreen from './screens/BookingScreen';
import RegisterCutScreen from './screens/RegisterCutScreen';

const Stack = createStackNavigator();

export default function App() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/appointments');
        const data = await res.json();

        // ✅ Evitar error: userId puede ser undefined
        const filtered = data.filter(a => a.userId?.email);
        setAppointments(filtered);
      } catch (error) {
        console.error('Error al obtener citas', error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Booking" options={{ title: 'Inicio' }}>
          {(props) => <BookingScreen {...props} appointments={appointments} />}
        </Stack.Screen>
        <Stack.Screen name="RegisterCut" component={RegisterCutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
