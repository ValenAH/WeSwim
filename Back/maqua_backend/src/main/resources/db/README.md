# Scripts SQL - Base de datos maqua

## Tabla y datos de roles

1. **Crear la tabla de roles**
   ```bash
   mysql -u root -p maqua < src/main/resources/db/01-create-role-table.sql
   ```

2. **Insertar los 3 roles (Administrador, Profesor, Estudiante)**
   ```bash
   mysql -u root -p maqua < src/main/resources/db/02-insert-roles.sql
   ```

Desde la raíz del proyecto `Back/maqua_backend`:
```bash
mysql -u root -p maqua < src/main/resources/db/01-create-role-table.sql
mysql -u root -p maqua < src/main/resources/db/02-insert-roles.sql
```

