
## About This Project

The Pet Adoption Platform project is designed to facilitate the adoption of pets by connecting potential pet adopters with shelters and pet owners. The platform provides a comprehensive system for managing user registrations, pet profiles, and adoption requests, ensuring a streamlined and user-friendly experience. The project utilizes modern web technologies, including TypeScript, Express.js, Prisma, PostgreSQL, and JWT-based authentication to build a robust and secure application.





## **Endpoints:**
### **1. User Registration**

-  **Endpoint:** **`POST /api/register`**
-  **Request Body:**

```json
{
   "name": "John Doe",
   "email": "john@example.com",
   "password": "password"
}
```

-  **Response** (Response should not include the password):

```json
{
   "success": true,
   "statusCode": 201,
   "message": "User registered successfully",
   "data": {
      "id": "b9964127-2924-42bb-9970-60f93c016bvf",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2024-03-24T12:00:00Z",
      "updatedAt": "2024-03-24T12:00:00Z"
   }
}
```

### **2. User Login**

-  **Endpoint:** **`POST /api/login`**
-  **Request Body:**

```json
{
   "email": "john@example.com",
   "password": "password"
}
```

-  **Response:**

```json
{
   "success": true,
   "statusCode": 200,
   "message": "User logged in successfully",
   "data": {
      "id": "b9964127-2924-42bb-9970-60f93c016bvf",
      "name": "John Doe",
      "email": "john@example.com",
      "token": "<JWT token>"
   }
}
```

### **3. Add a Pet**

-  **Endpoint:** **`POST /api/pets`**
-  **Request Headers:**
   -  `Authorization: <JWT_TOKEN>`
-  **Request Body:**

```json
{
   "name": "Buddy",
   "species": "dog",
   "breed": "Labrador Retriever",
   "age": 3,
   "size": "Large",
   "location": "Shelter XYZ",
   "description": "Buddy is a friendly and energetic Labrador Retriever. He loves playing fetch and going for long walks.",
   "temperament": "Friendly, playful",
   "medicalHistory": "Up to date on vaccinations, neutered.",
   "adoptionRequirements": "Buddy needs a home with a fenced yard and an active family."
}
```

-  **Response:**

```json
{
   "success": true,
   "statusCode": 201,
   "message": "Pet added successfully",
   "data": {
      "id": "b9964127-2924-42bb-9970-60f93c016ghs",
      "name": "Buddy",
      "species": "Dog",
      "breed": "Labrador Retriever",
      "age": 3,
      "size": "Large",
      "location": "Shelter XYZ",
      "description": "Buddy is a friendly and energetic Labrador Retriever. He loves playing fetch and going for long walks.",
      "temperament": "Friendly, playful",
      "medicalHistory": "Up to date on vaccinations, neutered.",
      "adoptionRequirements": "Buddy needs a home with a fenced yard and an active family.",
      "createdAt": "2024-03-24T12:00:00Z",
      "updatedAt": "2024-03-24T12:00:00Z"
   }
}
```

### **4. Get Paginated and Filtered Pets**

-  **Endpoint:** **`GET /api/pets`**

**Query Parameters for API Requests:**

When interacting with the API, you can utilize the following query parameters to customize and filter the results according to your preferences.

-  `species`: (Optional) Filter pets by species (e.g., dog, cat).
-  `breed`: (Optional) Filter pets by breed.
-  `age`: (Optional) Filter pets by age.
-  `size`: (Optional) Filter pets by size.
-  `location`: (Optional) Filter pets by location.
-  `searchTerm`: (Optional) Searches for pets based on a keyword or phrase. Only applicable to the following fields: `species`, `breed`, `location`, etc.
-  `page`: (Optional) Specifies the page number for paginated results. Default is 1. Example: ?page=2
-  `limit`: (Optional) Sets the number of data per page. Default is 10. Example: ?limit=5
-  `sortBy`: (Optional) Specifies the field by which the results should be sorted. Only applicable to the following fields: `species`, `breed`, `size`. Example: ?sortBy=species
-  `sortOrder`: (Optional) Determines the sorting order, either 'asc' (ascending) or 'desc' (descending). Example: ?sortOrder=desc
-  **Response:**

```json
{
   "success": true,
   "statusCode": 200,
   "message": "Pets retrieved successfully",
   "meta": {
      // only for paginated result
      "page": 1,
      "limit": 10,
      "total": 20
   },
   "data": [
      {
         "id": "b9964127-2924-42bb-9970-60f93c016ghs",
         "name": "Buddy",
         "species": "Dog",
         "breed": "Labrador Retriever",
         "age": 3,
         "size": "Large",
         "location": "Shelter XYZ",
         "description": "Buddy is a friendly and energetic Labrador Retriever. He loves playing fetch and going for long walks.",
         "temperament": "Friendly, playful",
         "medicalHistory": "Up to date on vaccinations, neutered.",
         "adoptionRequirements": "Buddy needs a home with a fenced yard and an active family.",
         "createdAt": "2024-03-24T12:00:00Z",
         "updatedAt": "2024-03-24T12:00:00Z"
      }
      // More pets
   ]
}
```

### 5. Update Pet profile

-  **Endpoint:** **`PUT /api/pets/:petId`**
-  **Request Headers:**
   -  **`Authorization: <JWT_TOKEN>`**
-  **Request Body:**

```json
{
   "location": "Shelter ABC"
}
```

-  **Response:**

```json
{
   "success": true,
   "statusCode": 200,
   "message": "Pet profile updated successfully",
   "data": {
      "id": "b9964127-2924-42bb-9970-60f93c016ghs",
      "name": "Buddy",
      "species": "Dog",
      "breed": "Labrador Retriever",
      "age": 3,
      "size": "Large",
      "location": "Shelter ABC",
      "description": "Buddy is a friendly and energetic Labrador Retriever. He loves playing fetch and going for long walks.",
      "temperament": "Friendly, playful",
      "medicalHistory": "Up to date on vaccinations, neutered.",
      "adoptionRequirements": "Buddy needs a home with a fenced yard and an active family.",
      "createdAt": "2024-03-24T12:00:00Z",
      "updatedAt": "2024-03-24T12:05:00Z"
   }
}
```

This endpoint allows users with appropriate permissions to update the profile of a pet.

### 6. Submit Adoption Request

-  **Endpoint:** **`POST /api/adoption-request`**
-  **Request Headers:**
   -  `Authorization: <JWT_TOKEN>`
-  **Request Body:**

```json
{
   "petId": "b9964127-2924-42bb-9970-60f93c016ghs",
   "petOwnershipExperience": "Previous owner of a Labrador Retriever"
}
```

-  **Response:**

```json
{
   "success": true,
   "statusCode": 201,
   "message": "Adoption request submitted successfully",
   "data": {
      "id": "9b0dadf5-10fd-41d1-8355-80e67c85727c",
      "userId": "b9964127-2924-42bb-9970-60f93c016bvf",
      "petId": "b9964127-2924-42bb-9970-60f93c016ghs",
      "status": "PENDING",
      "petOwnershipExperience": "Previous owner of a Labrador Retriever",
      "createdAt": "2024-03-24T12:00:00Z",
      "updatedAt": "2024-03-24T12:00:00Z"
   }
}
```

### 7. Get Adoption Requests

-  **Endpoint:** **`GET /api/adoption-requests`**
-  **Request Headers:**
   -  `Authorization: <JWT_TOKEN>`
-  **Response:**

```json
{
   "success": true,
   "statusCode": 200,
   "message": "Adoption requests retrieved successfully",
   "data": [
      {
         "id": "9b0dadf5-10fd-41d1-8355-80e67c85727c",
         "userId": "b9964127-2924-42bb-9970-60f93c016bvf",
         "petId": "b9964127-2924-42bb-9970-60f93c016ghs",
         "status": "PENDING",
         "petOwnershipExperience": "Previous owner of a Labrador Retriever",
         "createdAt": "2024-03-24T12:00:00Z",
         "updatedAt": "2024-03-24T12:00:00Z"
      }
      // More adoption requests
   ]
}
```

### 8. Update Adoption Request Status

-  **Endpoint:** **`PUT /api/adoption-requests/:requestId`**
-  **Request Headers:**
   -  `Authorization: <JWT_TOKEN>`
-  **Request Body:**

```json
{
   "status": "APPROVED"
}
```

-  **Response:**

```json
{
   "success": true,
   "statusCode": 200,
   "message": "Adoption request updated successfully",
   "data": {
      "id": "9b0dadf5-10fd-41d1-8355-80e67c85727c",
      "userId": "b9964127-2924-42bb-9970-60f93c016bvf",
      "petId": "b9964127-2924-42bb-9970-60f93c016ghs",
      "status": "APPROVED",
      "petOwnershipExperience": "Previous owner of a Labrador Retriever",
      "createdAt": "2024-03-24T12:00:00Z",
      "updatedAt": "2024-03-24T12:00:00Z"
   }
}
```

### 9. Get User Information

-  **Endpoint:** **`GET /api/profile`**
-  **Request Headers:**
   -  `Authorization: <JWT_TOKEN>`
-  **Response:**

```json
{
   "success": true,
   "statusCode": 200,
   "message": "User profile retrieved successfully",
   "data": {
      "id": "9b0dadf5-10fd-41d1-8355-80e67c85727c",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2024-03-24T12:00:00Z",
      "updatedAt": "2024-03-24T12:00:00Z"
   }
}
```

### 10. Update User Information

-  **Endpoint:** **`PUT /api/profile`**
-  **Request Headers:**
   -  `Authorization: <JWT_TOKEN>`
-  **Request Body:**

```json
{
   "name": "John Doe",
   "email": "john.doe@example.com"
}
```

-  **Response:**

```json
{
   "success": true,
   "statusCode": 200,
   "message": "User profile updated successfully",
   "data": {
      "id": "9b0dadf5-10fd-41d1-8355-80e67c85727c",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "createdAt": "2024-03-24T12:00:00Z",
      "updatedAt": "2024-03-24T12:05:00Z"
   }
}
```




## **Project Models:**
## User Model
```
model User {
  id              String            @id @default(uuid())
  name            String
  email           String            @unique
  password        String
  createdAt       DateTime          @default(now())
  updatedAt       DateTime          @updatedAt
  adoptionRequest AdoptionRequest[]

}
```
### Pet Model

```
model Pet {
  id                   String            @id @default(uuid())
  name                 String            @unique
  species              String
  breed                String
  age                  Int
  size                 String
  location             String
  description          String
  temperament          String
  medicalHistory       String
  adoptionRequirements String
  createdAt            DateTime          @default(now())
  updatedAt            DateTime          @updatedAt
  AdoptionRequest      AdoptionRequest[]
}
```
### Adoption Request Model

```
model AdoptionRequest {
  id                     String        @id @default(uuid())
  userId                 String
  user                   User          @relation(fields: [userId], references: [id])
  petId                  String
  pet                    Pet           @relation(fields: [petId], references: [id])
  status                 RequestStatus @default(PENDING)
  petOwnershipExperience String
  createdAt              DateTime      @default(now())
  updatedAt              DateTime      @updatedAt
}

enum RequestStatus {
  PENDING
  APPROVED
  REJECTED
}
```


## 🔗 Server is running on
[(https://assignment-8-theta.vercel.app/)](https://assignment-8-theta.vercel.app/)


## MY Package
- Express.js : Express.js is a minimal and flexible Node.js web application framework. This package is used to interact with web applications and APIs.
- Prisma : Used with Prostgres databases, to facilitate interaction with Prostgres and to work with Prostgres documents. Used for work:
- Object Relational Mapping (ORM)
- superbase cloude server
- Validation of Zod
- Middleware support
- Query building
- TypeScript : TypeScript is a superset of JavaScript that provides static typing in the language.  TypeScript is used to define the type of JavaScript it - uses primarily:
- Static typing
- Code maintainability
- Object-Oriented Programming (OOP)
- Compliant with ECMAScript
- Cors: Used for Cross-Origin Resource Sharing (CORS).
- Zod : Zod is a TypeScript-first schema declaration and validation library. It is commonly used for data validation in TypeScript projects
- dotenv : This package is used  to protect environment variables.
- Moduler Code Pattern 

##  About Me
Hi,I am Md Rifat.I'm a full stack developer.
