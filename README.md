# AI Document Analyzer

A full-stack MERN application that leverages Google Generative AI (Gemini) to analyze PDF documents and extract insights automatically.

## Features

- **User Authentication**: JWT-based login/register with secure password hashing
- **PDF Upload & Text Extraction**: Upload PDFs and automatically extract text content
- **AI-Powered Analysis**: Get AI-generated summaries, key points, keywords, and sentiment analysis
- **Document History**: View all previously uploaded and analyzed documents
- **Responsive UI**: Built with React, Vite, and Tailwind CSS
- **Protected Routes**: Only authenticated users can upload and view documents

## Tech Stack

### Backend
- **Node.js** + **Express.js** - REST API server
- **MongoDB** + **Mongoose** - NoSQL database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Google Generative AI** - AI-powered document analysis
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 19** - UI framework
- **Vite** - Fast build tool
- **React Router v7** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **AuthContext** - Global auth state management

## Project Structure

```
AI-Document-Analyzer/
├── Backend/
│   ├── src/
│   │   ├── server.js           # Entry point
│   │   ├── app.js              # Express app setup
│   │   ├── config/
│   │   │   └── db.js           # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── authController.js   # Auth logic
│   │   │   └── docController.js    # Document analysis logic
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js   # JWT verification
│   │   │   └── uploadMiddleware.js # File upload handling
│   │   ├── models/
│   │   │   ├── userModel.js    # User schema
│   │   │   └── documentModel.js # Document schema
│   │   ├── routes/
│   │   │   ├── authRoutes.js   # Auth endpoints
│   │   │   └── docRoutes.js    # Document endpoints
│   │   └── utils/
│   │       └── geminiClient.js # Google AI client
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx     # Global auth state
│   │   ├── hooks/
│   │   │   └── useAuth.js          # Auth hook
│   │   ├── services/
│   │   │   └── api.js              # Axios instance
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── History.jsx
│   │   │   └── Home.jsx
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   ├── Upload/
│   │   │   │   └── PDFUploader.jsx
│   │   │   ├── Results/
│   │   │   │   └── AnalysisResult.jsx
│   │   │   └── Layout/
│   │   │       ├── Header.jsx
│   │   │       └── Footer.jsx
│   │   └── tailwind.css
│   ├── package.json
│   ├── .env.example
│   └── vite.config.js
└── README.md
```

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Google AI API key (Gemini)

### Backend Setup

1. Navigate to the Backend directory:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update `.env` with your credentials:
```
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_google_ai_api_key
GEMINI_MODEL=models/gemini-2.5-flash
FRONTEND_URL=http://localhost:5174
TOKEN_EXPIRE_DAYS=7
MAX_FILE_SIZE=52428800

```

5. Start the dev server:
```bash
npm run dev
```

The backend will run on `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
cp .env.example .env
```

4. The `.env` should contain:
```
VITE_API_BASE_URL=http://localhost:8000
```

5. Start the dev server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
  - Body: `{ name, email, password }`
  - Returns: `{ user, token }`

- `POST /api/auth/login` - Login user
  - Body: `{ email, password }`
  - Returns: `{ message, user }` (sets HTTP-only cookie)

- `POST /api/auth/logout` - Logout user
  - Returns: `{ message }`

- `GET /api/auth/me` - Get current user profile (protected)
  - Returns: `{ user }`

### Documents
- `POST /api/docs/upload` - Upload and analyze PDF (protected)
  - Multipart form with file
  - Returns: `{ document }`

- `GET /api/docs/history` - Get user's document history (protected)
  - Returns: `[{ documents array }]`

- `GET /api/docs/:id` - Get specific document (protected)
  - Returns: `{ document }`

## Usage

1. **Register**: Create a new account on the registration page
2. **Login**: Sign in with your credentials
3. **Upload PDF**: Click "Upload & Analyze" on the Dashboard
4. **View Results**: See AI-generated summary, key points, keywords, and sentiment
5. **View History**: Check all your previous uploads in the History page
6. **Logout**: Click "Logout" in the header to sign out

## Authentication Flow

1. User registers or logs in
2. Backend generates JWT and sets it in an HTTP-only cookie
3. Frontend stores `token` and `user` in localStorage (redundant for cookie-based auth)
4. Subsequent requests automatically send the JWT:
   - Via HTTP-only cookie (browser-managed)
   - Via Authorization header from localStorage (fallback)
5. Protected routes verify the token using `authMiddleware`
6. On logout, token is cleared from localStorage and server cookie is cleared

## Features

### PDF Text Extraction
- Uses `pdfjs-dist` or `pdf-parse-fixed` (with fallback)
- Handles both text-based and scanned PDFs

### AI Analysis (Google Gemini)
- Generates concise summaries (3-6 sentences)
- Extracts 6-10 key points
- Identifies 10-15 keywords
- Analyzes sentiment/tone (Positive/Neutral/Negative)
- Provides recommendations

### Security
- JWT-based authentication
- Bcryptjs password hashing
- HTTP-only cookies prevent XSS attacks
- CORS protection
- Protected API routes

## Running the Full Application

### Terminal 1 - Backend
```bash
cd Backend
npm run dev
```

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

Then open `http://localhost:5173` in your browser.

## Troubleshooting

### Backend won't start
- Check that MongoDB connection string is correct
- Verify all required environment variables are set
- Ensure port 8000 is not already in use

### Frontend can't connect to backend
- Verify `VITE_API_BASE_URL` in `.env` matches backend URL
- Check CORS settings in `Backend/src/app.js`
- Ensure backend is running before starting frontend

### PDF upload fails
- Verify file size is under 50MB
- Ensure file is a valid PDF
- Check that backend has pdfjs-dist or pdf-parse-fixed installed

### AI analysis returns errors
- Verify `GEMINI_API_KEY` is valid and has sufficient quota
- Check that text was successfully extracted from PDF
- Ensure prompt size doesn't exceed model limits

## Environment Variables

### Backend
- `PORT` - Server port (default: 8000)
- `MONGO_URI` - MongoDB connection string (required)
- `JWT_SECRET` - Secret key for JWT signing (required)
- `GEMINI_API_KEY` - Google AI API key (required)
- `GEMINI_MODEL` - Gemini model name (default: models/gemini-2.5-flash)
- `FRONTEND_URL` - Frontend URL for CORS (default: http://localhost:5173)
- `TOKEN_EXPIRE_DAYS` - JWT expiration in days (default: 7)
- `MAX_FILE_SIZE` - Max upload size in bytes (default: 50MB)

### Frontend
- `VITE_API_BASE_URL` - Backend API URL (default: http://localhost:8000)

## Contributing

This is a demo project. Feel free to fork and customize as needed.

## License

MIT License - feel free to use this project as a template for your own applications.

## Support

For issues or questions, please refer to the troubleshooting section or create an issue in the repository.
