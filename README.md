# GharManzil - Full Stack Rental Application

Welcome to the **GharManzil** repository! This repository contains the complete codebase for a comprehensive home renting application, built to simplify and streamline the process of listing, renting, and managing properties. The application leverages blockchain for secure document storage, ensuring transparency and trust.

---

## **Project Overview**
The Full Stack Rental Application is designed to provide a seamless platform for property owners and renters to list, discover, and manage properties efficiently. Built with a modern tech stack, the application ensures fast, secure, and real-time property transactions.

The application consists of two main components:

- **Client:** Developed using React and SCSS, this component offers an intuitive user interface for property owners and renters to interact with the platform.
- **Server:** Powered by Node.js, Prisma ORM, and MongoDB, the server handles user authentication, property listings, and communication between users. Blockchain integration allows secure property document storage.
- **Socket:** This module enables real-time communication features like instant property status updates and live chat between renters and property owners.

---

## **Features**
- User registration and CNIC-based authentication.
- Property owners can list their properties with detailed descriptions and images.
- Renters can search for properties based on location, price range, and other filters.
- Secure storage of property documents on the blockchain for enhanced transparency.
- Real-time property updates and management.
- Efficient database operations with Prisma ORM.
- Real-time messaging with Socket.io integration.

---

## **Setup**
Follow these instructions to set up the GharManzil Renting Application locally:

**1- Clone the Repository:** 
 ```bash
    git clone https://github.com/UmerKhan-18/GharManzil-FYP.git
   ```
**2- Server Setup:** Navigate to the api folder and follow the instructions in the api's README.md to set up the backend.

**3- Client Setup:**
   ```bash
    cd client
    npm install
    npm run dev
   ```
**4- Socket Setup:**
   ```bash
    cd socket
    npm install
    node app.js
   ```
---

## 💡 **Usage**
- Register or Login with your CNIC.
- List properties for rent or sale.
- Browse available properties and manage listings.
- Property documents are securely verified and stored on the blockchain.
- Real-time chat and updates with Socket.io.

---

## 🛠 **Technologies Used**
- **Frontend:** React, SCSS
- **Backend:** Node.js, Prisma ORM, MongoDB
- **Blockchain:** Secure storage for property documents
- **Sockets:** Real-time communication with Socket.io

