import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BookingScreen = () => {
  const navigation = useNavigation();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/appointments');
        const data = await res.json();

        // Filtrar citas sin usuario por seguridad
        const filtered = data.filter(a => a.userId && a.userId.email);
        setAppointments(filtered);
      } catch (error) {
        console.error('Error al cargar citas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handlePress = (appointmentId) => {
    navigation.navigate('RegisterCut', { appointmentId });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cortes programados hoy</Text>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => handlePress(item._id)}
          >
            <Text style={styles.text}>
              {new Date(item.dateTime).toLocaleString()} - {item.userId?.email}
            </Text>
            <Text style={styles.subtext}>
              {item.cutOption}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>No hay citas para hoy.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  item: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
  },
  subtext: {
    fontSize: 14,
    color: '#555',
  },
});

export default BookingScreen;
