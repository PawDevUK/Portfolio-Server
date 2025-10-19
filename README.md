# Portfolio Server

A comprehensive **Node.js Express backend** that serves as the API layer for a personal portfolio website. This serverless application provides various endpoints for portfolio features including work tracking, contact forms, visitor analytics, and interactive applications.

## Overview

This backend server is designed to support a full-stack portfolio website with multiple interactive features. Built with **Express.js** and deployed as **serverless functions on Vercel**, it provides RESTful APIs for client applications while maintaining scalability and performance.

## Core Features

### **Work Tracker** *(Active)*
- **Endpoint**: `/workTracker`
- **Functionality**: Advanced work schedule and earnings calculator
- **Features**: 
  - Calendar generation for tax years (April-March)
  - Overtime calculations and pay day tracking
  - Flexible rota management with custom off-days
  - JSON data storage for work patterns and rates

### **Contact Form** *(Available)*
- **Endpoint**: `/contactForm`
- **Functionality**: Email handling system for portfolio inquiries
- **Features**: 
  - Email validation and processing
  - Automated reply system
  - Integration with nodemailer for SMTP

### **Visitor Counter** *(Available)*
- **Endpoint**: `/visitor`
- **Functionality**: Analytics and visitor tracking
- **Features**: 
  - MongoDB integration for visitor data
  - Real-time visitor counting
  - Historical visit data storage

### **Additional Features** *(In Development)*
- **ChatBot**: Interactive chat functionality
- **Tictactoe**: Browser-based game with user accounts
- **COVID Tracker**: News and data aggregation
- **User Registration/Login**: Authentication system

## Technology Stack

### **Backend Framework**
- **Express.js** - Web application framework
- **Node.js** - JavaScript runtime environment

### **Database & Storage**
- **MongoDB** - NoSQL database for user data and analytics
- **Mongoose** - MongoDB object modeling
- **JSON Files** - Local storage for configuration and static data

### **Authentication & Security**
- **JSON Web Tokens (JWT)** - Token-based authentication
- **CORS** - Cross-origin resource sharing
- **Cookie Parser** - Cookie handling middleware

### **External Services**
- **Nodemailer** - Email service integration
- **Axios** - HTTP client for API requests
- **Socket.io** - Real-time communication

### **Development & Deployment**
- **Vercel** - Serverless deployment platform
- **Nodemon** - Development server with hot reload
- **Jest** - Testing framework
- **Google Cloud Functions** - Cloud function support

### **Utilities**
- **Moment.js** - Date and time manipulation
- **UUID** - Unique identifier generation
- **Dotenv** - Environment variable management

## Project Structure

```
Portfolio-Server/
├── routes/                    # API route handlers
│   ├── WorkTracker/          # Work tracking functionality
│   ├── ContactForm/          # Email and contact handling
│   ├── VisitorsCounter/      # Analytics and visitor tracking
│   ├── Tictactoe/           # Game logic and user management
│   ├── ChatBot/             # Chat functionality
│   └── Covid/               # News and data aggregation
├── Functions/               # Google Cloud Functions
├── public/                  # Static assets
├── test/                    # Test suites
├── server.js               # Main application entry point
├── vercel.json             # Vercel deployment configuration
└── package.json            # Dependencies and scripts
```

## Deployment

The application is deployed as **serverless functions on Vercel**, providing:
- **Automatic scaling** based on demand
- **Global CDN distribution** for optimal performance
- **Zero-downtime deployments** with instant rollbacks
- **Environment variable management** for secure configuration

## Development Status

**Current Status**: **Production Ready**
- ✅ Successfully deployed to Vercel
- ✅ Core WorkTracker functionality operational
- ✅ Contact form and visitor tracking ready
- ✅ Comprehensive testing suite implemented

## Next Steps

- [ ] Test all API endpoints on deployed Vercel instance
- [ ] Implement proper error handling for production
- [ ] Add comprehensive logging for serverless environment
- [ ] Consider adding API documentation
- [ ] Set up monitoring and analytics

## API Documentation

### Base URL
```
Production: https://your-vercel-deployment.vercel.app
Development: http://localhost:8080
```

### Available Endpoints
- `GET /` - Health check endpoint
- `POST /workTracker` - Work schedule and earnings calculation
- `POST /contactForm` - Contact form submission
- `GET /visitor` - Visitor analytics (when activated)

---

**Built with ❤️ for portfolio demonstration and real-world application**
