# 🚀 Hybridge Blog API

API REST profesional construida con **Node.js**, **Express** y **Sequelize**, desplegada en **Render** y conectada a **PostgreSQL** en **Supabase**.

## 🌐 Live Demo
Puedes acceder a la API en vivo aquí: 
👉 [https://hybridge-blog-api-ru99.onrender.com/api/posts](https://hybridge-blog-api-ru99.onrender.com/api/posts)

---

## 🛠️ Stack Tecnológico
* **Backend:** Node.js & Express.js
* **Base de Datos:** PostgreSQL (alojada en Supabase)
* **ORM:** Sequelize
* **Despliegue:** Render (Web Service)

## 📌 Endpoints Disponibles

| Método | Endpoint | Acción |
| :--- | :--- | :--- |
| **GET** | `/api/posts` | Lista todos los artículos. |
| **GET** | `/api/posts/:id` | Obtiene un artículo por ID. |
| **POST** | `/api/posts` | Crea un nuevo artículo. |
| **PUT** | `/api/posts/:id` | Actualiza un artículo existente. |
| **DELETE** | `/api/posts/:id` | Elimina un artículo. |

---

## 🚀 Instalación Local

1.  Clona este repositorio:
    `git clone https://github.com/TU_USUARIO/TU_REPOSITORIO.git`
2.  Instala dependencias:
    `npm install`
3.  Configura tu variable `DATABASE_URL` en un archivo `.env`.
4.  Corre las migraciones:
    `npx sequelize-cli db:migrate`
5.  Inicia el servidor:
    `npm start`

---

## 📝 Notas de Despliegue
Este proyecto utiliza una conexión SSL forzada para comunicarse de forma segura con Supabase desde el entorno de producción en Render.
