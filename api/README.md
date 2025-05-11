# GharManzil - api

Welcome to the **api** folder of GharManzil! This folder contains the backend logic that handles user authentication, property listings, bookings, and communication between clients. It also interacts with the blockchain for secure property document storage and uses Prisma ORM for database operations.

## **Installation**
To set up the server locally, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/UmerKhan-18/GharManzil-FYP.git
   ```

2. **Navigate to the api Folder:**
   ```bash
   cd api
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Configure Environment Variables:**
   Create a `.env` file and configure the necessary environment variables as given below:
   ```env
   DATABASE_URL= <MongoDB connection string>
   JWT_SECRET_KEY= <Secret key for JWT>
   PORT= <Port number for the server>
   CLIENT_URL = ''
   ```

5. **Prisma Setup:**
   ```bash
   npx prisma generate
   npx prisma migrate deploy
   npx prisma db push
   ```

6. **Run the Server:**
   ```bash
   node app.js
   ```
---

## **Technologies Used**
- **Backend Framework:** Node.js, Express.js
- **Database:** MongoDB with Prisma ORM
- **Authentication:** JSON Web Tokens (JWT)

