import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const API = process.env.EXPO_PUBLIC_API || 'http://localhost:3001';

export default function RegisterCutScreen({ route, navigation }) {
  const { appointment } = route.params;
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
      base64: true,
    });
    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const handleSubmit = async () => {
    if (!description || !image) {
      Alert.alert('Faltan datos', 'Debes ingresar descripción y seleccionar una imagen.');
      return;
    }
    try {
      await axios.post(`${API}/api/haircuts`, {
        email: appointment.email,
        image: image.base64,
        description
      });
      Alert.alert('Éxito', 'Corte registrado correctamente');
      navigation.goBack();
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'No se pudo registrar el corte');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar corte para {appointment.name}</Text>
      <TextInput
        placeholder="Descripción del corte"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        multiline
      />
      <Button title="Seleccionar foto" onPress={pickImage} />
      {image && <Image source={{ uri: image.uri }} style={styles.preview} />}
      <Button title="Guardar" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10, minHeight: 60 },
  preview: { width: '100%', height: 200, marginVertical: 10, borderRadius: 10 }
});
