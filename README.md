# SnappHire - Smart Seamless Student Placements

![SnappHire Logo](frontend/public/JobZeelogo.png)

SnappHire is a comprehensive job placement platform designed specifically for educational institutions to streamline student recruitment processes. It connects students with potential employers while providing teachers/administrators with powerful tools to manage and facilitate the placement process.

## 🌟 Features

### For Students
- **Comprehensive Profile Management**: Detailed personal, educational, and contact information
- **Job Search & Application**: Browse and apply for jobs with resume upload
- **Application Tracking**: Monitor application status in real-time
- **Educational History**: Track academic performance across semesters
- **Multi-step Registration**: Structured onboarding with personal and educational details

### For Teachers/Employers
- **Student Invitation System**: Invite students via email with validation
- **Job Posting**: Create and manage job postings
- **Application Management**: Review student applications and resumes
- **Special Privileges**: Grant special access to selected students for job posting
- **Email Integration**: Gmail app password integration for automated invitations

### Core Platform Features
- **Modern UI/UX**: Responsive design with smooth animations using Framer Motion
- **Authentication & Authorization**: Secure JWT-based authentication
- **File Management**: Cloudinary integration for resume and image uploads
- **Email Notifications**: Automated email system for invitations and updates
- **Real-time Updates**: Dynamic status updates and notifications

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite for fast development
- **Tailwind CSS** for modern, responsive styling
- **Framer Motion** for smooth animations and transitions
- **React Router DOM** for client-side routing
- **React Hot Toast** for user notifications
- **React Icons** for comprehensive icon library
- **Axios** for API communication

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Cloudinary** for file storage
- **Nodemailer** for email functionality
- **bcrypt** for password hashing
- **CORS** for cross-origin requests
- **Cookie Parser** for session management

## 📋 Prerequisites

Before running this application, make sure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Gmail account with App Password (for email functionality)
- Cloudinary account (for file uploads)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/AAAAniket666/SnappHire.git
cd SnappHire
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret_key
JWT_EXPIRE=7d
COOKIE_EXPIRE=7

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

### 4. Running the Application

#### Start Backend Server
```bash
cd backend
npm start
# or for development
npm run dev
```
The backend server will run on `http://localhost:4000`

#### Start Frontend Development Server
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:5173`

## 📁 Project Structure

```
SnappHire/
├── backend/
│   ├── controllers/         # Business logic controllers
│   │   ├── applicationController.js
│   │   ├── InviteContorller.js
│   │   ├── jobController.js
│   │   └── userController.js
│   ├── database/           # Database connection
│   ├── middlewares/        # Custom middleware
│   ├── models/            # MongoDB schemas
│   │   ├── applicationSchema.js
│   │   ├── jobSchema.js
│   │   └── userSchema.js
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   ├── app.js             # Express app configuration
│   └── server.js          # Server entry point
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Application/
│   │   │   ├── Auth/
│   │   │   ├── Home/
│   │   │   ├── Invite/
│   │   │   ├── Job/
│   │   │   ├── Layout/
│   │   │   └── NotFound/
│   │   ├── App.jsx        # Main App component
│   │   └── main.jsx       # React entry point
│   ├── public/           # Static assets
│   └── package.json      # Frontend dependencies
└── README.md            # Project documentation
```

## 🔧 Configuration

### Email Setup for Teachers
Teachers need to configure Gmail App Passwords for sending invitations:

1. Go to Google Account settings
2. Enable two-step verification
3. Generate an App Password for "email"
4. Use this password in the teacher portal

### Cloudinary Setup
1. Create a Cloudinary account
2. Get your cloud name, API key, and API secret
3. Configure these in your backend `.env` file

## 🚀 Usage

### Student Workflow
1. **Registration**: Students register with detailed personal and educational information
2. **Profile Completion**: Complete academic history and upload documents
3. **Job Search**: Browse available job postings
4. **Apply**: Submit applications with cover letters and resumes
5. **Track**: Monitor application status and receive updates

### Teacher/Employer Workflow
1. **Setup**: Configure email settings for invitations
2. **Invite Students**: Send email invitations to students
3. **Grant Special Access**: Provide posting privileges to selected students
4. **Post Jobs**: Create detailed job postings
5. **Review Applications**: Assess student applications and resumes

## 🔐 Authentication & Security

- JWT-based authentication with secure cookie storage
- Password hashing using bcrypt
- Protected routes with role-based access control
- File upload validation and security
- CORS configuration for secure cross-origin requests

## 📊 API Endpoints

### User Routes
- `POST /api/v1/user/register` - User registration
- `POST /api/v1/user/login` - User login
- `GET /api/v1/user/getuser` - Get current user
- `GET /api/v1/user/getstudent` - Get all students (teachers only)

### Job Routes
- `GET /api/v1/job/getall` - Get all jobs
- `POST /api/v1/job/post` - Create job posting
- `GET /api/v1/job/getmyjobs` - Get user's job postings
- `GET /api/v1/job/:id` - Get specific job details

### Application Routes
- `POST /api/v1/application/post` - Submit job application
- `GET /api/v1/application/employer/getall` - Get applications (employers)
- `GET /api/v1/application/jobseeker/getall` - Get applications (students)

### Invitation Routes
- `POST /api/v1/invites/student` - Send student invitation

## 🤝 Contributing

We welcome contributions to SnappHire! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📝 License

This project is licensed under the ISC License. See the LICENSE file for details.

## 🐛 Known Issues & Troubleshooting

### Common Issues
1. **Email not sending**: Ensure Gmail App Password is correctly configured
2. **File upload failing**: Check Cloudinary credentials
3. **CORS errors**: Verify frontend URL is added to CORS configuration
4. **Database connection**: Ensure MongoDB is running and connection string is correct

### Support
For support and questions, please open an issue on the GitHub repository.

## 🏆 Acknowledgments

- Built as part of HackFusion hackathon
- Thanks to all contributors and beta testers
- Special thanks to the educational institutions providing feedback

---

**SnappHire** - Connecting talent with opportunity, one placement at a time. 🎓💼
