# 🚀 HireFlow – Role-Based Job Portal API

HireFlow is a production-ready backend API for a Job Portal system built with Node.js, Express, and MongoDB.

It implements authentication, authorization, and complete role-based workflows for Users, Employers, and Admins.

---

## 📌 Features

- 🔐 JWT Authentication
- 🛡 Role-Based Access Control (User, Employer, Admin)
- 📄 Job Creation & Management
- 📝 Job Applications
- ✅ Accept / Reject Applications
- 👑 Admin Role Management
- 📊 Pagination & Sorting
- 🚫 Duplicate Application Prevention
- 🧩 Clean MVC Architecture

---

## 🏗 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- dotenv
- bcrypt

---

## 📂 Project Structure

```

hireflow/
│
├── controllers/
│   ├── auth.controller.js
│   ├── admin.controller.js
│   ├── employer.controller.js
│   ├── job.controller.js
│   └── application.controller.js
│
├── models/
│   ├── User.js
│   ├── Job.js
│   └── Application.js
│
├── routes/
│   ├── auth.routes.js
│   ├── admin.routes.js
│   ├── employer.routes.js
│   ├── job.routes.js
│   └── application.routes.js
│
├── middlewares/
│   ├── auth.middleware.js
│   ├── admin.middleware.js
│   └── employer.middleware.js
│
├── databse/
│   └── db.js
│
├── server.js
├── .env
└── package.json

```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/chirannnn/hireflow-jobs-api.git
cd hireflow
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_secret_key
```

### 4️⃣ Start Server

```bash
npm start
```

Server will run on:

```
http://localhost:3000
```

---

## 🔐 Authentication

All protected routes require JWT token in headers:

```
Authorization: Bearer <your_token>
```

---

# 👥 Roles & Permissions

| Role     | Access                                                   |
| -------- | -------------------------------------------------------- |
| User     | View jobs, Apply, View application status                |
| Employer | Create jobs, View applicants, Accept/Reject applications |
| Admin    | View all users, Update user roles                        |

---

# 📌 API Endpoints

---

## 🔑 Auth Routes

### Register

```
POST /api/v1/auth/register
```

### Login

```
POST /api/v1/auth/login
```

---

## 📄 Job Routes

### Get All Jobs (Public)

```
GET /api/v1/jobs?page=1&limit=5
```

### Get Single Job

```
GET /api/v1/jobs/:id
```

---

## 📝 Application Routes

### Apply to Job (User)

```
POST /api/v1/applications/:jobId
```

### View My Applications (User)

```
GET /api/v1/applications/my
```

### View Applicants (Employer)

```
GET /api/v1/applications/job/:jobId
```

### Update Application Status (Employer)

```
PATCH /api/v1/applications/:applicationId/status
```

---

## 👑 Admin Routes

### Get All Users

```
GET /api/v1/admin/users
```

### Update User Role

```
PATCH /api/v1/admin/users/:id/role
```

---

# 🔄 Business Workflow

1. User registers
2. Admin promotes user to Employer
3. Employer creates job
4. User views jobs and applies
5. Employer reviews applications
6. Employer accepts/rejects
7. User checks application status

---

# 📊 Database Models

## User

- name
- email
- password
- role (user / employer / admin)

## Job

- title
- description
- company
- location
- salary
- createdBy (Employer reference)

## Application

- job (Job reference)
- applicant (User reference)
- status (pending / accepted / rejected)

---

# 🚀 Future Enhancements

- Resume upload
- Email notifications
- Job search & filters
- Profile management
- Swagger documentation
- Rate limiting
- Production deployment (AWS / Render)

---

# 🧪 Testing

Use:

- Postman
- Thunder Client
- REST Client extension

Test complete role-based workflow from register → apply → accept/reject.

---

# 📦 Production Notes

Before deploying:

- Enable CORS
- Add helmet middleware
- Add rate limiter
- Use strong JWT secret
- Validate inputs
- Add error handling middleware

---

# 👨‍💻 Author

Developed as a full backend role-based job portal project to demonstrate:

- Authentication & Authorization
- RESTful API Design
- Database Relationships
- Clean Architecture
- Real-world Business Logic

---

# ⭐ If You Like This Project

Give it a star ⭐ on GitHub.

---

# 📜 License

This project is open-source and free to use.
