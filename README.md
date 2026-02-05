# 🛍️ E-Commerce Shopping Website

<div align="center">

![E-Commerce](https://img.shields.io/badge/E--Commerce-Platform-blue?style=for-the-badge&logo=shopping-cart)
![Node.js](https://img.shields.io/badge/Node.js-16+-green?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-5.0+-orange?style=for-the-badge&logo=mongodb)
![Express](https://img.shields.io/badge/Express-5.0+-black?style=for-the-badge&logo=express)

**A modern, full-stack e-commerce web application built with cutting-edge technologies** 🚀

[![GitHub stars](https://img.shields.io/github/stars/hitaishi18-coder/project-Ecommerce-shopping-website?style=social)](https://github.com/hitaishi18-coder/project-Ecommerce-shopping-website)
[![GitHub forks](https://img.shields.io/github/forks/hitaishi18-coder/project-Ecommerce-shopping-website?style=social)](https://github.com/hitaishi18-coder/project-Ecommerce-shopping-website)
[![GitHub issues](https://img.shields.io/github/issues/hitaishi18-coder/project-Ecommerce-shopping-website)](https://github.com/hitaishi18-coder/project-Ecommerce-shopping-website/issues)
[![GitHub license](https://img.shields.io/github/license/hitaishi18-coder/project-Ecommerce-shopping-website)](https://github.com/hitaishi18-coder/project-Ecommerce-shopping-website/blob/main/LICENSE)

</div>

---

## ✨ **Amazing Features**

### 🛒 **Shopping Experience**
- 🎯 **Product Catalog** with smart categorization
- 🛍️ **Shopping Cart** with real-time updates
- 💳 **Secure Checkout** process
- 📦 **Order Management** & tracking
- 🔍 **Advanced Search** & filtering

### 👤 **User Management**
- 🔐 **User Registration** & authentication
- 👤 **Profile Management** with customization
- 🔒 **Session-based** login system
- 🛡️ **Protected Routes** for security
- 🔑 **Password Recovery** system

### 🤖 **AI Fashion Assistant**
- 🧠 **Google Generative AI** integration
- 👗 **Fashion Recommendations** 
- 💡 **Style Advice** & suggestions
- 🎨 **Personalized** fashion tips
- 💬 **Interactive Chat** interface

### 📱 **Modern UI/UX**
- 📱 **Responsive Design** for all devices
- 🌙 **Dark/Light Mode** toggle
- 🎨 **Bootstrap 5** styling
- ✨ **Font Awesome** icons
- 🎭 **Smooth Animations**

### 🔧 **Backend Features**
- 🌐 **RESTful API** endpoints
- 🗄️ **MongoDB** database
- ⚡ **Express.js** server
- 🔄 **Session Management**
- 📊 **Data Validation**

---

## 🚀 **Tech Stack**

### 🔥 **Backend Technologies**
- **Node.js** 🟢 - JavaScript runtime environment
- **Express.js** 🚀 - Fast, unopinionated web framework
- **MongoDB** 🍃 - NoSQL database
- **Mongoose** 🦊 - MongoDB object modeling
- **bcrypt** 🔐 - Password hashing
- **express-session** 🎫 - Session middleware

### 🎨 **Frontend Technologies**
- **HTML5** 📄 - Semantic markup
- **CSS3** 🎨 - Advanced styling
- **Vanilla JavaScript** ☕ - Pure JS functionality
- **Bootstrap 5** 🎯 - Responsive UI framework
- **Font Awesome** ✨ - Beautiful icons

### 🤖 **AI Integration**
- **Google Generative AI** 🧠 - Advanced AI capabilities
- **@google/genai** 🔌 - Official Google AI SDK

### 🔐 Sample Login Credentials
You can use the following credentials to test the login functionality:

Email: Ecommerce@gmail.com

Password: Ecommerce@123

---

## 📋 **Prerequisites**

Before running this project, ensure you have:

- 🟢 **Node.js** (v16 or higher)
- 🍃 **MongoDB** (local or MongoDB Atlas)
- 📦 **npm** or **yarn** package manager
- 🌐 **Modern web browser**
- 💻 **Code editor** (VS Code recommended)

---

## 🛠️ **Installation & Setup**

### 🚀 **Quick Start**

```bash
# 1️⃣ Clone the repository
git clone https://github.com/hitaishi18-coder/project-Ecommerce-shopping-website.git

# 2️⃣ Navigate to project directory
cd project-Ecommerce-shopping-website

# 3️⃣ Install dependencies
npm install

# 4️⃣ Create environment file
cp .env.example .env

# 5️⃣ Start the server
npm start
```

### 🔧 **Detailed Setup**

#### **Step 1: Clone Repository**
```bash
git clone https://github.com/hitaishi18-coder/project-Ecommerce-shopping-website.git
cd project-Ecommerce-shopping-website
```

#### **Step 2: Install Dependencies**
```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

#### **Step 3: Environment Configuration**
Create a `.env` file in the root directory:

```env
# Database Configuration
MONGO_URL=mongodb://localhost:27017/ecommerce
# OR for MongoDB Atlas:
# MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/ecommerce

# Server Configuration
PORT=8000
NODE_ENV=development

# Session Secret
SESSION_SECRET=your-super-secret-key-here

# Google AI Configuration (if using AI features)
GOOGLE_AI_API_KEY=your-google-ai-api-key
```

#### **Step 4:🛠️ Database Setup (MongoDB Atlas)

Since the project now uses **MongoDB Atlas**, follow these steps to connect your database:

1.  **Create a Cluster:** Log in to MongoDB Atlas and create a free shared cluster.
2.  **Network Access:** Go to the "Network Access" tab and click **Add IP Address**. Select **Allow Access From Anywhere (0.0.0.0/0)** to ensure your deployment (e.g., on Render) can connect.
3.  **Database Access:** Create a database user with a username and password.
4.  **Get Connection String:** Click **Connect** > **Drivers** and copy your connection string.

### ⚙️ Environment Variables

Create a `.env` file in the root directory and add your Atlas connection string:

```env
MONGO_URL=mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/ecommerce?retryWrites=true&w=majority
PORT=8000

#### **Step 5: Start Development Server**
```bash
# Development mode
npm start

# OR with nodemon for auto-restart
npm install -g nodemon
nodemon index.js

# OR with PM2 for production
npm install -g pm2
pm2 start index.js
```

#### **Step 6: Access Application**
🌐 Open your browser and navigate to: `http://localhost:8000`

---

## 📁 **Project Structure**

```
project-Ecommerce-shopping-website/
├── 📁 config/
│   └── 🗄️ db.js                 # Database configuration
├── 📁 model/
│   ├── 📝 contact.js            # Contact form model
│   ├── 📦 order.js              # Order model
│   ├── 🛍️ product.js            # Product model
│   └── 👤 user.js               # User model
├── 📁 public/
│   ├── 🖼️ images/               # Product images & assets
│   ├── 📜 script/               # Client-side JavaScript
│   ├── 🌐 *.html                # HTML pages
│   └── 🎨 style.css             # Main stylesheet
├── 📁 routes/
│   ├── 🤖 assistantRoute.js     # AI assistant routes
│   ├── 🔐 authroute.js          # Authentication routes
│   ├── 📞 contactroute.js       # Contact form routes
│   ├── 📦 orderRoutes.js        # Order management routes
│   └── 🛍️ productroutes.js      # Product routes
├── 🚀 index.js                  # Main server file
├── 📦 package.json              # Dependencies & scripts
├── 📄 package-lock.json         # Lock file
├── 🗃️ products.json             # Sample product data
└── 📖 README.md                 # This file
```

---

## 🔌 **API Endpoints**

### 🔐 **Authentication Routes**
```http
POST   /api/auth/signup          # User registration
POST   /api/auth/signin          # User login
GET    /api/auth/logout          # User logout
GET    /api/auth/profile         # Get user profile
PUT    /api/auth/profile         # Update user profile
```

### 🛍️ **Product Routes**
```http
GET    /api/products             # Get all products
GET    /api/products/:id         # Get product by ID
POST   /api/products             # Create new product
PUT    /api/products/:id         # Update product
DELETE /api/products/:id         # Delete product
GET    /api/products/category/:category  # Get products by category
```

### 📦 **Order Routes**
```http
GET    /api/orders               # Get user orders
POST   /api/orders               # Create new order
PUT    /api/orders/:id           # Update order status
GET    /api/orders/:id           # Get order details
DELETE /api/orders/:id           # Cancel order
```

### 📞 **Contact Routes**
```http
POST   /api/contact              # Submit contact form
GET    /api/contact              # Get contact submissions
```

### 🤖 **AI Assistant Routes**
```http
POST   /fashion/ai               # AI fashion recommendations
GET    /fashion/ai/history       # Get AI chat history
```

---

## 🎯 **Key Features Deep Dive**

### 🛒 **Shopping Cart System**
- ➕ **Add/Remove** products dynamically
- 🔢 **Quantity Management** with validation
- 💾 **Persistent Cart** data across sessions
- 🛍️ **Cart Summary** with totals
- 🚀 **One-Click Checkout** process

### 🔐 **Security Features**
- 🔒 **bcrypt** password hashing
- 🎫 **Session-based** authentication
- 🛡️ **Protected Routes** middleware
- 🔄 **Automatic Redirects** for unauthorized access
- 🚫 **CSRF Protection** built-in

### 🤖 **AI Fashion Assistant**
- 🧠 **Powered by Google's Generative AI**
- 👗 **Personalized Style Recommendations**
- 💡 **Fashion Trends** & advice
- 🎨 **Color Coordination** suggestions
- 💬 **Natural Language** interaction

### 📱 **Responsive Design**
- 📱 **Mobile-First** approach
- 🎯 **Bootstrap 5** grid system
- 🌙 **Dark/Light Mode** toggle
- 📐 **Optimized** for all screen sizes
- ⚡ **Fast Loading** performance

---

## 🚀 **Development Commands**

### 📦 **Package Management**
```bash
# Install dependencies
npm install

# Install specific package
npm install package-name

# Install dev dependencies
npm install --save-dev package-name

# Update packages
npm update

# Check outdated packages
npm outdated

# Audit security
npm audit
npm audit fix
```

### 🔧 **Development Scripts**
```bash
# Start development server
npm start

# Start with nodemon (auto-restart)
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Lint code
npm run lint

# Format code
npm run format
```

### 🗄️ **Database Commands**
```bash
# Start MongoDB
mongod

# Connect to MongoDB shell
mongosh

# Show databases
show dbs

# Use database
use ecommerce

# Show collections
show collections

# Find documents
db.products.find()
```

### 🐳 **Docker Commands** (if using Docker)
```bash
# Build image
docker build -t ecommerce-app .

# Run container
docker run -p 8000:8000 ecommerce-app

# Run with environment file
docker run --env-file .env -p 8000:8000 ecommerce-app

# Stop container
docker stop container-id

# Remove container
docker rm container-id
```

---

## 🌐 **Deployment**

### 🏠 **Local Development**
```bash
npm start
# Server runs at http://localhost:8000
```

### 🚀 **Production Deployment**

#### **Option 1: PM2 Process Manager**
```bash
# Install PM2 globally
npm install -g pm2

# Start application
pm2 start index.js --name "ecommerce-app"

# Monitor processes
pm2 status
pm2 logs
pm2 monit

# Restart application
pm2 restart ecommerce-app

# Stop application
pm2 stop ecommerce-app
```

#### **Option 2: Docker Deployment**
```bash
# Build Docker image
docker build -t ecommerce-app .

# Run in production
docker run -d -p 80:8000 --env-file .env ecommerce-app
```

#### **Option 3: Cloud Deployment**
- **Heroku**: `git push heroku main`
- **Vercel**: `vercel --prod`
- **Railway**: `railway up`
- **Render**: Connect GitHub repository

---

## 🧪 **Testing**

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- --grep "User Authentication"

# Run tests in watch mode
npm run test:watch

# Run integration tests
npm run test:integration
```

---

## 📊 **Performance Monitoring**

```bash
# Check bundle size
npm run build:analyze

# Run performance audit
npm run audit:performance

# Monitor memory usage
node --inspect index.js

# Profile application
npm run profile
```

---

## 🤝 **Contributing**

We love your input! We want to make contributing to this project as easy and transparent as possible.

### 📋 **Contribution Steps**

1. 🍴 **Fork the repository**
   ```bash
   git clone https://github.com/hitaishi18-coder/project-Ecommerce-shopping-website.git
   ```

2. 🌿 **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. 💾 **Commit your changes**
   ```bash
   git add .
   git commit -m "Add: Amazing new feature ✨"
   ```

4. 🚀 **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```

5. 🔄 **Open a Pull Request**

### 📝 **Commit Message Format**
```bash
# Format: type: description
git commit -m "feat: add shopping cart functionality 🛒"
git commit -m "fix: resolve authentication bug 🔐"
git commit -m "docs: update API documentation 📚"
git commit -m "style: improve UI design 🎨"
git commit -m "refactor: optimize database queries ⚡"
```

### 🏷️ **Pull Request Guidelines**
- 📝 **Clear description** of changes
- 🧪 **Include tests** for new features
- 📚 **Update documentation** if needed
- 🎯 **Follow coding standards**
- 🔍 **Self-review** before submitting

---

## 📝 **License**

This project is licensed under the **ISC License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 **Author**

<div align="center">

**Hitaishi** 🚀

[![GitHub](https://img.shields.io/badge/GitHub-hitaishi18--coder-black?style=for-the-badge&logo=github)](https://github.com/hitaishi18-coder)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/hitaishi18-coder)
[![Twitter](https://img.shields.io/badge/Twitter-Follow-blue?style=for-the-badge&logo=twitter)](https://twitter.com/hitaishi18_coder)

**Full-Stack Developer | E-Commerce Specialist | AI Enthusiast** 💻

</div>

---

## 🙏 **Acknowledgments**

- 🎨 **Bootstrap** for the responsive UI framework
- ✨ **Font Awesome** for the beautiful icons
- 🧠 **Google Generative AI** for the AI assistant functionality
- 🍃 **MongoDB** for the database solution
- 🚀 **Express.js** team for the amazing framework
- 💚 **Node.js** community for the runtime environment

---

## 📞 **Support & Contact**

<div align="center">

**Need help? We're here for you!** 🤝

[![GitHub Issues](https://img.shields.io/badge/GitHub-Issues-red?style=for-the-badge&logo=github)](https://github.com/hitaishi18-coder/project-Ecommerce-shopping-website/issues)
[![GitHub Discussions](https://img.shields.io/badge/GitHub-Discussions-blue?style=for-the-badge&logo=github)](https://github.com/hitaishi18-coder/project-Ecommerce-shopping-website/discussions)
[![Contact Form](https://img.shields.io/badge/Contact-Form-green?style=for-the-badge&logo=mail)](https://your-website.com/contact)

**Ways to get help:**
- 🐛 **Report bugs** via GitHub Issues
- 💡 **Request features** via GitHub Discussions
- 📧 **Email support** via contact form
- 💬 **Community chat** via Discord/Slack

</div>

---

<div align="center">

### ⭐ **Star this repository if you found it helpful!** ⭐

**Show your support by giving us a star!** 🌟

[![GitHub stars](https://img.shields.io/github/stars/hitaishi18-coder/project-Ecommerce-shopping-website?style=social&label=Star)](https://github.com/hitaishi18-coder/project-Ecommerce-shopping-website)
[![GitHub forks](https://img.shields.io/github/forks/hitaishi18-coder/project-Ecommerce-shopping-website?style=social&label=Fork)](https://github.com/hitaishi18-coder/project-Ecommerce-shopping-website)

**Made with ❤️ by Hitaishi**

</div>
