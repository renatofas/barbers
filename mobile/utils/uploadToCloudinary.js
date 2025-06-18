export const uploadToCloudinary = async (imageUri) => {
  const formData = new FormData();

  if (imageUri.startsWith('data:image/')) {
    // Base64 Web
    formData.append("file", imageUri); // directamente el string base64
  } else {
    // File URI (móvil)
    formData.append("file", {
      uri: imageUri,
      type: "image/jpeg",
      name: "foto_cliente.jpg",
    });
  }

  formData.append("upload_preset", "foto_cliente");
  formData.append("folder", "BARBERIA");

  try {
    const res = await fetch("https://api.cloudinary.com/v1_1/dhvxcx2d2/image/upload", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();

    if (res.status !== 200) {
      console.error("Cloudinary error:", result);
      throw new Error("Error al subir imagen");
    }

    return result.secure_url;
  } catch (error) {
    console.error("Error subiendo a Cloudinary:", error);
    throw error;
  }
};