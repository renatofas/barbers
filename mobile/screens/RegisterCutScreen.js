import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import uploadToCloudinary from '../utils/uploadToCloudinary';
import { useRoute } from '@react-navigation/native';

export default function RegisterCutScreen() {
  const route = useRoute();
  const { appointmentId } = route.params;

  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
  const loadData = async () => {
    try {
      const appointmentRes = await fetch(`http://localhost:3001/api/appointments/${appointmentId}`);
      const appointment = await appointmentRes.json();
      setUserId(appointment.userId);

      const userRes = await fetch(`http://localhost:3001/api/users/${appointment.userId}`);
      const user = await userRes.json();
      if (user.fotoPerfilCliente) setImageUrl(user.fotoPerfilCliente);
      if (user.description) setDescription(user.description);
    } catch (err) {
      console.error('Error al cargar datos:', err);
      Alert.alert('Error', 'No se pudo cargar la información del cliente.');
    }
  };

  loadData();
}, [appointmentId]);

  const pickImageAndUpload = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        base64: true,
        allowsEditing: true,
        quality: 0.7,
      });

      if (!result.cancelled) {
        setLoading(true);
        const uploadResult = await uploadToCloudinary(result.base64);
        setImageUrl(uploadResult.secure_url);
      }
    } catch (err) {
      console.error('Error al subir la imagen:', err);
      Alert.alert('Error', 'No se pudo subir la imagen.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
  try {
    const res = await fetch(`http://localhost:3001/api/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fotoPerfilCliente: imageUrl,
        description: description
      })
    });

    if (res.ok) {
      Alert.alert('Guardado', 'La información del cliente fue actualizada.');
    } else {
      throw new Error('Error al actualizar el usuario');
    }
  } catch (err) {
    console.error('Error al guardar en usuario:', err);
    Alert.alert('Error', 'No se pudo guardar la información del cliente.');
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Foto del cliente:</Text>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : (
        <Text style={styles.placeholder}>No hay imagen subida</Text>
      )}
      <Button title="Subir nueva foto" onPress={pickImageAndUpload} disabled={loading} />

      <Text style={styles.label}>Descripción del corte:</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Ej: Corte degradado + barba"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Button title="Guardar cambios" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16
  },
  label: {
    fontWeight: 'bold'
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 16,
    alignSelf: 'center'
  },
  placeholder: {
    textAlign: 'center',
    marginBottom: 8,
    fontStyle: 'italic',
    color: '#888'
  },
  textInput: {
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    textAlignVertical: 'top',
    borderRadius: 8
  }
});



