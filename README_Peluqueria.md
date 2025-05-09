# 💈 Plataforma de Agendamiento de Cortes de Pelo

Sistema web y móvil para agendar cortes de pelo, registrar clientes y mantener historial de servicios.

---

## 🚀 Tecnologías utilizadas

- **Frontend Web**: React.js
- **App móvil**: React Native (Expo)
- **Backend**: Node.js + Express
- **Base de datos**: MySQL (puerto 3307)
- **API REST**: http://localhost:3001

---

## 📁 Estructura del Proyecto

```
/backend
  ├── server.js
  ├── controllers/
  │   ├── authController.js
  │   ├── appointmentController.js
  │   └── haircutController.js
  ├── routes/
  │   ├── authRoutes.js
  │   ├── appointmentRoutes.js
  │   └── haircutRoutes.js
  └── models/
      ├── db.js
      ├── userModel.js
      ├── appointmentModel.js

/frontend
  ├── BookingCalendar.js
  └── AppointmentForm.js

/mobile
  └── App con registro y visualización de cortes
```

---

## 🧠 Funcionalidades

- Registro automático de usuarios (name, email, phone)
- Agendamiento de citas sin login
- Validación de horas ocupadas
- Bloqueo de fechas y horas pasadas
- Registro de cortes con imagen (base64) y descripción
- Consulta de historial por RUT desde la app móvil

---

## 🗃 Base de Datos: `peluqueria_db`

### Tabla `users`
| id | name | email | phone | created_at |

### Tabla `appointments`
| id | user_id | date_time | cut_option | created_at |

### Tabla `haircuts`
| id | user_id | image_base64 | description | created_at |

---

## 🛠 Pendientes / Mejoras Futuras

- [ ] Respaldos automáticos de base de datos
- [ ] Subida de imágenes a servicios externos (Cloudinary, S3)
- [ ] Panel de administración de citas
- [ ] Despliegue: Railway (backend), Vercel/Netlify (frontend)

---

## 📦 Instalación rápida

```bash
# Backend
cd backend
npm install
node server.js

# Frontend
cd frontend
npm install
npm start

# App móvil
cd mobile
npx expo start
```

---

## 🔐 Notas

- No se usa autenticación con contraseña.
- Email se utiliza como identificador único.
