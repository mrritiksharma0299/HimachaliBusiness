# Himachali Business

A full-stack business directory platform built for discovering and connecting with local businesses across Himachal Pradesh.

🌐 **Live Website:** https://himachali-business-aksfdhe2f-mrritiksharma300.vercel.app/

📦 **GitHub Repository:** https://github.com/mrritiksharma0299/HimachaliBusiness

---

## 📌 About the Project

**Himachali Business** is a full-stack web application designed to help people discover local businesses, services, offers, and businesses across Himachal Pradesh.

The platform provides a centralized place where users can explore local businesses by category and location, search for businesses and services, view business details, and discover current offers.

Business owners can also manage their own business information and offers through authenticated dashboard functionality.

The project was built from scratch using **React.js for the frontend** and **Django REST Framework for the backend**.

---

## ✨ Features

### 👤 User Features

* User registration and login
* JWT-based authentication
* Email-based account authentication
* User profile management
* Profile picture support
* Customer and business account types
* Location-based business discovery
* Business search
* Category-based browsing
* Business detail pages
* Current offers and discounts
* Responsive user interface

### 🏢 Business Features

Business owners can:

* Create their business profile
* Manage business information
* Upload business images
* View their business dashboard
* Create offers
* Edit/update offers
* Activate or deactivate offers
* Delete offers
* Manage their own business content

### 🔎 Search & Discovery

Users can discover businesses through:

* Business name search
* Location search
* Category filtering
* Popular businesses
* Latest offers
* Local business updates

The platform supports locations across Himachal Pradesh, including districts and major locations such as Mandi, Shimla, Kullu, Kangra, Chamba, Solan, and others.

---

## 🗂️ Business Categories

The platform currently supports the following categories:

1. Hotels & Homestays
2. Food & Restaurants
3. Repair & Mechanics
4. Home Services
5. Healthcare
6. Shops & Retail
7. Travel & Transport
8. Beauty & Personal Care
9. Education & Training
10. Professional & Digital Services

---

## 🎨 Business Detail Templates

The application includes category-specific business detail templates designed to provide different experiences depending on the type of business.

Examples include:

* Hotel & Homestay
* Restaurant
* Repair & Mechanic
* Home Service
* Healthcare
* Retail Shop
* Travel & Transport
* Beauty & Personal Care
* Education & Training
* Professional & Digital Services

---

## 🛠️ Technology Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router
* Axios
* Lucide React

### Backend

* Python
* Django
* Django REST Framework
* Django REST Framework Simple JWT
* PostgreSQL
* Pillow
* django-cors-headers

### Database

* PostgreSQL for production
* SQLite for local development

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: PostgreSQL on Render

---

## 🔐 Authentication

The application uses JWT-based authentication for protected functionality.

Authentication includes:

* User registration
* Login
* Access tokens
* Refresh tokens
* Protected API endpoints
* Business-owner authorization
* Owner-based business permissions
* Owner-based offer permissions

Business owners can only modify their own business data and offers.

---

## 🔌 REST API

The backend provides RESTful API endpoints for:

* Authentication
* Businesses
* Business details
* Business images
* Categories
* Offers
* Business-owner operations

Example production API:

```text
https://himachalibusiness.onrender.com/api/businesses/
```

---

## 🏗️ Project Structure

```text
HimachaliBusiness/
│
├── backend/
│   ├── accounts/
│   ├── businesses/
│   ├── config/
│   ├── manage.py
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   └── ...
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json
│
├── .gitignore
└── README.md
```

---

## 📱 Frontend Pages

### Public Pages

* Home
* Categories
* Businesses
* Business Details
* Offers
* About Us
* Privacy Policy
* Terms & Conditions

### Authentication Pages

* Login
* Register
* Verify Email
* User Profile

### Business Dashboard

* Dashboard
* Business Profile
* Business Posts
* Business Offers
* Business Verification

---

## 🧩 Main Application Flow

```text
User
 │
 ▼
React Frontend
 │
 │ HTTP / REST API
 ▼
Django REST Framework
 │
 ▼
Authentication & Permissions
 │
 ▼
Django Models / ORM
 │
 ▼
PostgreSQL Database
```

---

## 📍 Location-Based Search

The application provides location-aware business discovery.

For example:

```text
Mandi
   ↓
/businesses?location=mandi
```

A user can also search for a specific business:

```text
Prince Homestay
   ↓
/businesses?search=Prince%20Homestay
```

---

## 💼 Business & Offer Management

One of the core features of the platform is business-owner control.

Business owners are able to manage their own offers:

```text
Create Offer
     ↓
Edit Offer
     ↓
Activate / Deactivate
     ↓
Delete Offer
```

Public users only see active/current offers.

---

## 🧪 Testing

The Django backend includes automated tests covering important application functionality.

The backend test suite has been successfully executed with:

```bash
python manage.py test
```

Current test result:

```text
Ran 21 tests

OK
```

---

## 🚀 Local Development

### Clone the repository

```bash
git clone https://github.com/mrritiksharma0299/HimachaliBusiness.git
```

### Backend

```bash
cd backend
```

Create and activate a virtual environment:

```bash
python -m venv venv
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run migrations:

```bash
python manage.py migrate
```

Start the backend:

```bash
python manage.py runserver
```

---

### Frontend

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

## 🌐 Deployment

### Frontend

The React frontend is deployed using Vercel.

**Live Website:**

https://himachali-business-aksfdhe2f-mrritiksharma300.vercel.app/

### Backend

The Django REST API is deployed using Render.

**Backend:**

https://himachalibusiness.onrender.com

### Production API

```text
https://himachalibusiness.onrender.com/api/businesses/
```

---

## 🔒 Security & Permissions

The backend implements authenticated and owner-based permissions.

Important security features include:

* JWT authentication
* Protected business creation
* Business-owner authorization
* Offer-owner authorization
* CORS configuration
* CSRF trusted origins
* Environment-based production configuration
* PostgreSQL production database

---

## 🎯 Project Goals

The main goals of Himachali Business are:

* Help users discover local businesses
* Promote businesses across Himachal Pradesh
* Make local services easier to find
* Provide businesses with their own online presence
* Allow business owners to manage their offers
* Build a scalable full-stack business directory platform

---

## 🔮 Future Improvements

Planned improvements may include:

* Business verification workflow
* Advanced business filtering
* Reviews and ratings
* Business following
* Maps and location integration
* More detailed business analytics
* Persistent cloud media storage
* Improved business-owner dashboard
* Additional business management tools

---

## 👨‍💻 Developer

**Ritik Sharma**

Full-Stack Web Developer

Built with:

* Python
* Django
* Django REST Framework
* React
* JavaScript
* Tailwind CSS
* PostgreSQL

---

## 📄 License

This project is currently developed as a personal full-stack web development project.

---

⭐ If you find this project interesting, feel free to explore the repository and the live website.

**Live Website:**
https://himachali-business-aksfdhe2f-mrritiksharma300.vercel.app/

**GitHub Repository:**
https://github.com/mrritiksharma0299/HimachaliBusiness
