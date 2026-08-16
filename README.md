# 🐾 Pet Care Application

Pet Care Application is a full-stack web application developed as the final project for the Athens University of Economics and Business (AUEB) Coding Factory 9 program.

The application allows pet owners to manage their pets and keep important health information organized in one place, including vaccinations and medical records.

Users can manage only their own pets and related records, while administrators can access pets, vaccinations and medical records across all users and can view registered users and owners.

The project consists of a Spring Boot REST API backend, a React frontend, and a PostgreSQL database.

## Features

### User Features
- User registration with automatic Owner profile creation
- User login and logout
- View and manage personal pets
- Add, edit, view and delete pets
- Add, edit, view and delete vaccinations
- Add, edit, view and delete medical records
- View vaccination status (Valid, Expired, Upcoming, No Due Date) and identify pets with overdue vaccinations
- View microchip registration status (Registered, Not Registered)

### Administration
- Role-based access control with USER and ADMIN roles
- Administrators can access and manage pets, vaccinations and medical records across all users and view registered users and owners.

### Security
- Password encryption using BCrypt
- JWT authentication
- Protected frontend routes
- Backend ownership validation
- Users can access only their own pets and related records
- Owner association is determined by the authenticated user and cannot be manipulated from the frontend
- Invalid, missing or expired JWT tokens return HTTP 401, while authenticated users attempting unauthorized operations receive HTTP 403
- Expired or invalid sessions are automatically cleared and redirected to the login page.

### Additional Features
- Responsive user interface
- Dashboard with application statistics
- Pet profile photos using image URLs
- Form and date validation, including prevention of future birth, vaccination and medical visit dates
- Vaccination due-date validation to ensure the next due date is later than the vaccination date
- Centralized backend exception handling
- User-friendly validation and authentication error messages
- Swagger / OpenAPI documentation

## Architecture

The application consists of a React frontend, a Spring Boot REST API and a PostgreSQL database.

### Application Architecture

```text
React Frontend  
     ↓  
  REST API  
     ↓  
Spring Boot Backend  
     ↓  
PostgreSQL Database
```

The backend follows a layered architecture:

Controller → Service → Repository → Database

DTOs are used for API data transfer, while JPA entities represent the database model. Business logic, including computed vaccination and microchip statuses, as well as authorization and ownership checks, is handled in the service layer.

Authentication is handled using Spring Security and JWT. The React frontend communicates with the backend through protected REST API endpoints.

## Domain Model

The main domain entities and their relationships are:

```text
AppUser
└── Owner (One-to-One)
    └── Pets (One-to-Many)
        ├── Vaccinations (One-to-Many)
        └── Medical Records (One-to-Many)
```

- **AppUser** stores authentication information such as username, encrypted password and role.
- **Owner** stores the pet owner's personal information and is associated with an AppUser.
- **Pet** represents a pet belonging to an Owner.
- **Vaccination** stores vaccination information for a specific Pet.
- **MedicalRecord** stores medical history and veterinary visit information for a specific Pet.

### Business Logic

The application includes computed health-related information that is derived dynamically rather than stored in the database:

- **Vaccination Status**
  - `NO_DUE_DATE` — no next due date is defined
  - `EXPIRED` — the next due date has passed
  - `UPCOMING` — the next due date is today or within the next 30 days
  - `VALID` — the vaccination does not fall into any of the above categories
- **Microchip Status**
  - `REGISTERED` — a microchip number is present
  - `NOT_REGISTERED` — no microchip number is present
- **Overdue Vaccinations**
  - Each pet indicates whether it has at least one vaccination with a past due date.

## Tech Stack

### Backend
- Java 21
- Spring Boot
- Spring Data JPA
- Spring Security
- JWT
- Maven
- Swagger / OpenAPI

### Frontend
- React
- JavaScript
- React Router
- Axios
- Vite
- CSS

### Database
- PostgreSQL
- Docker

### Development Tools
- IntelliJ IDEA
- Visual Studio Code
- Git / GitHub

## Build and Run

### Prerequisites

Before running the application, make sure the following are installed:

- Java 21
- Node.js and npm
- Docker Desktop
- Git

The application consists of three parts:

1. PostgreSQL database running in Docker
2. Spring Boot backend
3. React frontend

### 1. Clone the Repository

Clone the project and navigate to the project directory:

```bash
git clone https://github.com/ZarimpaAnna/pet-care-application.git
cd pet-care-application
```

### 2. Start the PostgreSQL Database

The PostgreSQL database runs in Docker.

From the project directory, run:

```bash
docker compose up -d
```

This will start a PostgreSQL 17 container with the following configuration:

- Database: `petcare`
- Username: `postgres`
- Password: `postgres`
- Port: `5432`

The database container is named `petcare-postgres`.

Database data is persisted using a Docker volume named `postgres_data`.


### 3. Backend Configuration

The Spring Boot backend connects to PostgreSQL using the following configuration:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/petcare
spring.datasource.username=postgres
spring.datasource.password=postgres
```

The JWT secret can be provided through the `JWT_SECRET` environment variable.

```properties
jwt.secret=${JWT_SECRET:ThisIsADemoSecretKeyForLocalDevelopmentOnly2026}
```

If no `JWT_SECRET` environment variable is provided, the application uses the default development value shown above.

For production environments, a secure `JWT_SECRET` environment variable should be provided instead of using the default development value.

Hibernate is configured with:

```properties
spring.jpa.hibernate.ddl-auto=update
```

For local development, the database schema is created/updated automatically from the JPA entities.


### 4. Run the Backend

Navigate to the backend project directory and run:

```bash
cd petcare_backend

# Windows:
.\mvnw.cmd clean spring-boot:run

# macOS/Linux:
./mvnw clean spring-boot:run
```

Alternatively, the application can be started directly from IntelliJ IDEA by running the main Spring Boot application class.

#### Demo Data Initialization

When the backend starts with an empty database, the application automatically initializes the predefined demo users, owners, pets, vaccinations and medical records.

The demo data is initialized only when no users exist and is not recreated on subsequent application restarts.

The predefined demo accounts can be used to immediately test both USER and ADMIN functionality.

### 5. Install Frontend Dependencies

Open a new terminal from the project root and navigate to the frontend directory:

```bash
cd petcare_frontend
npm install
```

### 6. Run the Frontend

Start the Vite development server:

```bash
npm run dev
```

The frontend will be available at the local URL displayed by Vite, typically:

`http://localhost:5173`

The backend CORS configuration allows the default Vite development (http://localhost:5173) and preview (http://localhost:4173) origins. If Vite starts on a different port, the corresponding origin must be added to the CORS configuration.

`petcare_backend/src/main/java/gr/aueb/cf9/petcare/config/SecurityConfig.java`

For example:

```java
configuration.setAllowedOrigins(List.of(
        "http://localhost:5173",
        "http://localhost:4173"
));
```

### 7. Build the Frontend

To create a production build of the React application, run:

```bash
npm run build
```

The generated production files will be created in the `dist/` directory.

### 8. Preview the Production Build

To preview the production build locally, run:

```bash
npm run preview
```

The preview server will typically be available at:

`http://localhost:4173`

## API Documentation

The backend REST API is documented using Swagger / OpenAPI.

After starting the backend, Swagger UI is available at:

`http://localhost:8080/swagger-ui/index.html`

Swagger can be used to explore and test the available REST API endpoints.

For protected endpoints, authenticate through the login endpoint and use the generated JWT token with the **Authorize** option.

## Authentication and Authorization

The application uses JWT-based authentication and supports two roles:

### Registration

- Public registration automatically creates a USER account together with its associated Owner profile. The role cannot be selected during registration. Usernames and owner email addresses must be unique.

### USER
- Can access and manage only their own pets
- Can manage vaccinations and medical records only for their own pets
- Cannot access another user's data by modifying URLs or request data
- Owner association is automatically determined from the authenticated user

### ADMIN
- Can access data across all users
- Can manage pets, vaccinations and medical records across the application
- Can view registered users and owners

Authorization and ownership rules are enforced by the backend and do not rely only on frontend restrictions.

## Demo Data

The application includes a small demo dataset designed to demonstrate different users, pets, ownership rules and vaccination statuses.

### Demo Accounts

| Username | Password | Role |
|----------|----------|------|
| admin1 | 0000 | ADMIN |
| user1 | 0000 | USER |
| user2 | 0000 | USER |

### Demo Dataset

- **admin1**
  - Pico
    - Rabies — VALID
    - Routine check-up — Chronic rhinitis

- **user1**
  - Luna
    - Tricat — VALID
    - Healthy
  - Nova
    - First examination
    - No recorded vaccinations

- **user2**
  - Rex
    - DHPPiL — VALID
    - Rabies — EXPIRED
    - FeLV — NO_DUE_DATE
    - FVRCP — UPCOMING
    - Annual health check

The dataset provides examples of:
- USER and ADMIN access
- Multiple pets per owner
- Different pet species
- Pets with and without vaccinations
- Medical records
- Different vaccination statuses based on due dates

The demo dataset is created automatically only when no users exist and is intended for testing and demonstration purposes.

## Future Improvements

Possible future extensions include:

- Search and filtering
- Pagination
- Unit and integration tests
- Medication management
- Pet passport management
- File uploads for medical documents
- User profile management and password changes
- Direct pet photo uploads