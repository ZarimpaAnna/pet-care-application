# 🐾 Pet Care Application

Pet Care Application is a full-stack web application developed as the final project for the Athens University of Economics and Business (AUEB) Coding Factory 9 program.

The application allows pet owners to manage their pets and keep important health information organized in one place, including vaccinations and medical records.

Users can manage only their own pets and related records, while administrators have access to all application data.

The project consists of a Spring Boot REST API backend, a React frontend, and a PostgreSQL database.

## Features

### User Features
- User registration and login
- View and manage personal pets
- Add, edit, view and delete pets
- Add, edit, view and delete vaccinations
- Add, edit, view and delete medical records
- View vaccination status (Valid, Expired, Upcoming, No Due Date) and identify pets with overdue vaccinations
- View microchip registration status (Registered, Not Registered)

### Administration
- Role-based access control with USER and ADMIN roles
- Administrators can view and manage application data across all users

### Security
- Password encryption using BCrypt
- JWT authentication
- Protected frontend routes
- Backend ownership validation
- Users can access only their own pets and related records
- Owner association is determined by the authenticated user and cannot be manipulated from the frontend

### Additional Features
- Responsive user interface
- Dashboard with application statistics
- Pet profile photos using image URLs
- Form and date validation
- Centralized backend exception handling
- User-friendly validation and authentication error messages
- Swagger / OpenAPI documentation

## Architecture

The application consists of a React frontend, a Spring Boot REST API and a PostgreSQL database.

### Application Architecture

React Frontend  
↓  
REST API  
↓  
Spring Boot Backend  
↓  
PostgreSQL Database

The backend follows a layered architecture:

Controller → Service → Repository → Database

DTOs are used for API data transfer, while JPA entities represent the database model. Business logic, authorization and ownership checks are handled in the service layer.

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
- Maven
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

The database schema is created/updated automatically from the JPA entities.


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

When the backend starts with an empty database, the application automatically initializes the predefined demo users, pets, vaccinations and medical records.

The demo data is created only when the database is empty and is not recreated on subsequent application restarts.

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


If the frontend runs on a different port, its origin must also be added to the CORS configuration in:

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

## API Documentation

The backend REST API is documented using Swagger / OpenAPI.

After starting the backend, Swagger UI is available at:

`http://localhost:8080/swagger-ui/index.html`

Swagger can be used to explore and test the available REST API endpoints.

For protected endpoints, authenticate through the login endpoint and use the generated JWT token with the **Authorize** option.

## Authentication and Authorization

The application uses JWT-based authentication and supports two roles:

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
    - Chronic rhinitis follow-up

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
    - Annual check-up

The dataset provides examples of:
- USER and ADMIN access
- Multiple pets per owner
- Different pet species
- Pets with and without vaccinations
- Medical records
- All supported vaccination statuses

The demo dataset is created automatically only when the database is empty and is intended for testing and demonstration purposes.

## Future Improvements

Possible future extensions include:

- Search and filtering
- Pagination
- Unit and integration tests
- Medication management
- Pet passport management
- File uploads for medical documents