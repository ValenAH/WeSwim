# MAQUA – Backend (WeSwim)

API REST del backend de MAQUA: gestión de usuarios, profesores, clientes/alumnos, planes, clases, pagos y transacciones.

## Stack

- **Java 17**
- **Spring Boot 3.1** (Web, Data JPA, Data REST)
- **MySQL 8** (conector `mysql-connector-j`)
- **Gradle** (build y tests)
- **JUnit 5** + JaCoCo (tests y cobertura)

## Requisitos

- JDK 17+
- MySQL 8 (o compatible)
- Gradle (opcional; se puede usar el wrapper `./gradlew`)

## Ejecución

```bash
# Desde la raíz del backend (Back/maqua_backend)
./gradlew bootRun
```

El servidor queda en **http://localhost:9009**.

## Tests

```bash
./gradlew test
./gradlew jacocoTestReport   # informe de cobertura en build/reports/jacoco/
```

## API principal (base: `http://localhost:9009/api/`)

| Recurso | Base path | Descripción |
|--------|-----------|-------------|
| **Usuarios** | `/users` | CRUD usuarios, `POST /users/login` (auth) |
| **Clientes** | `/CustomerAPI` | CRUD clientes, `customersWithLastPayment`, `customersByTeacher?userId=` |
| **Profesores** | `/teacherCustomAPI` | CRUD profesores |
| **Transacciones** | `/transactionAPI` | CRUD transacciones, `getAllTransactions`, `getTransactionByUser/{idUser}` |
| **Planes** | (PlanController) | CRUD planes (con `teacherId` para asignar profesor) |
| **Clases (PlanClass)** | (PlanClassController) | CRUD clases de plan |
| **Planes de pago** | `/paymentPlans` | CRUD planes de pago |
| **Bancos** | `/bankCustomAPI` | CRUD bancos |
| **Tipos de cuenta** | (AccountTypeController) | CRUD tipos de cuenta |

### Autenticación

- **POST** `/api/users/login`  
  Body: `{ "username": "...", "password": "..." }`  
  Respuesta 200: `{ "id", "username", "roleId" }` (sin contraseña).  
  401 si las credenciales son incorrectas.

### Clientes por rol

- **GET** `/api/CustomerAPI/customersWithLastPayment`  
  Lista de clientes con campo `lastPaymentDate` (fecha del último pago). Uso: administrador.

- **GET** `/api/CustomerAPI/customersByTeacher?userId={idUser}`  
  Clientes asignados a los planes del profesor cuyo `userid` es `userId`. Uso: profesor (“mis alumnos”).

## Estructura del proyecto

```
src/main/java/com/backmaqua/
├── controller/   # REST (user, customer, teacher, transaction, plan, planClass, paymentPlan, bank, accountType)
├── entities/     # JPA (User, Customer, Teacher, Transaction, Plan, PlanStudent, PlanClass, Role, etc.)
├── repository/   # Spring Data (CRUD y consultas por rol/teacherId)
src/main/resources/
├── application.properties
└── db/           # Scripts SQL (tabla maqua_role e inserts de roles)
```

## Notas

- La entidad **Plan** incluye `teacherId` para asociar un plan a un profesor; así el profesor ve solo “sus” alumnos vía `customersByTeacher`.
- La tabla de roles es **maqua_role** (id, name). Los usuarios tienen `rolId` 1=Administrador, 2=Profesor, 3=Estudiante.
- CORS está configurado con `@CrossOrigin(origins = "*", allowedHeaders = "*")` en los controladores para consumo desde el frontend.
