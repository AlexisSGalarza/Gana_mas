# 💰 Aplicación de Finanzas Personales

Una aplicación web completa para la gestión de finanzas personales, diseñada específicamente para estudiantes universitarios. Permite el registro de gastos e ingresos con categorización inteligente y análisis financiero.

## 🚀 Características Principales

### ✅ **Registro e Inicio de Sesión**
- ✨ Registro de nuevos usuarios con validación completa
- 🔐 Inicio de sesión seguro con validación de credenciales
- 📧 Sistema de recuperación de contraseñas por email (simulado)
- 👤 Gestión de sesiones con localStorage

### ✅ **Gestión de Transacciones**
- ⚡ **Registro Rápido**: Agregar gastos en máximo 2 clics
- 📝 **Registro Completo**: Transacciones detalladas con descripción
- ✏️ **Edición**: Modificar transacciones existentes
- 🗑️ **Eliminación**: Borrar registros con confirmación
- 📊 **Visualización**: Lista completa con filtros y ordenamiento
- 💰 **Balance**: Cálculo automático de ingresos, gastos y balance

### ✅ **Sistema de Categorías**
- 🏷️ **Categorías Predefinidas**: 
  - **Gastos**: Comida, Transporte, Ocio, Recargas, Material Escolar, Suscripciones
  - **Ingresos**: Salario, Freelance, Ventas
- 🎨 **Categorías Personalizadas**: Crear categorías propias con iconos y colores
- 📊 **Análisis por Categoría**: Ver gastos agrupados por categoría

### ✅ **Dashboard Intuitivo**
- 📈 Resumen financiero mensual
- 🎯 Estado de gastos (atrasados, del día, próximos)
- 📋 Transacciones recientes
- 🏆 Categorías con mayor gasto
- 🔔 Notificaciones en tiempo real

## 📁 Estructura del Proyecto

```
├── 📄 login.html           # Página de inicio de sesión
├── 📄 registro.html        # Página de registro
├── 📄 inicio.html          # Dashboard principal
├── 📄 transacciones.html   # Gestión de transacciones
├── 📄 categorias.html      # Gestión de categorías
├── 📄 reportes.html        # Página de reportes (próximamente)
├── 📄 perfil.html          # Perfil del usuario
├── 📂 css/
│   ├── 🎨 auth.css         # Estilos de autenticación
│   ├── 🎨 dashboard.css    # Estilos del dashboard
│   ├── 🎨 modal.css        # Estilos de modales
│   ├── 🎨 transactions.css # Estilos de transacciones
│   └── 🎨 categories.css   # Estilos de categorías
└── 📂 js/
    ├── 🔧 auth.js          # Gestión de autenticación
    ├── 🔧 dashboard.js     # Lógica del dashboard
    ├── 🔧 transactions.js  # Gestión de transacciones
    ├── 🔧 transactions-page.js # Página de transacciones
    └── 🔧 categories.js    # Gestión de categorías
```

## 🚀 Cómo Usar la Aplicación

### 1️⃣ **Primer Uso**
1. Abrir `login.html` en el navegador
2. Hacer clic en "Regístrate aquí"
3. Completar el formulario de registro
4. Iniciar sesión con las credenciales creadas

### 2️⃣ **Navegación Principal**
- **📊 Dashboard**: Vista general de finanzas
- **💳 Transacciones**: Gestionar ingresos y gastos
- **🏷️ Categorías**: Crear y gestionar categorías
- **📈 Reportes**: Análisis avanzados (próximamente)
- **👤 Perfil**: Configuración de la cuenta

### 3️⃣ **Agregar Transacciones**
**Método Rápido** (⚡ Registro Rápido):
1. Clic en "⚡ Registro Rápido"
2. Ingresar monto, tipo y categoría
3. Clic en "Agregar"

**Método Completo** (+ Nueva Transacción):
1. Clic en "+ Nueva Transacción" / "+ Gastos"
2. Completar todos los campos
3. Agregar descripción opcional
4. Clic en "Guardar Transacción"

### 4️⃣ **Gestionar Categorías**
1. Ir a la página "🏷️ Categorías"
2. Cambiar entre tabs "Gastos" e "Ingresos"
3. Crear nuevas categorías con "+ Nueva Categoría"
4. Personalizar icono y color
5. Editar o eliminar categorías personalizadas

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Diseño responsive con variables CSS y Flexbox/Grid
- **JavaScript ES6+**: Lógica de la aplicación con clases y módulos
- **LocalStorage**: Persistencia de datos sin base de datos
- **Responsive Design**: Compatible con dispositivos móviles

## 🎨 Características del Diseño

- **🎯 Diseño Modular**: Componentes reutilizables y mantenibles
- **📱 Responsive**: Adaptable a todos los tamaños de pantalla
- **🌈 Colores Consistentes**: Sistema de colores basado en variables CSS
- **⚡ Animaciones Suaves**: Transiciones y micro-interacciones
- **🔔 Notificaciones**: Feedback visual en tiempo real
- **♿ Accesibilidad**: Etiquetas semánticas y navegación por teclado

## 🔒 Seguridad y Datos

- Los datos se almacenan localmente en el navegador (localStorage)
- No se requiere conexión a internet después de la carga inicial
- Los datos persisten entre sesiones
- Opción de exportar datos como backup
- Función de limpieza completa de datos

## 📊 Funcionalidades Clave

### Validaciones Implementadas:
- ✅ Formato de email válido
- ✅ Contraseñas de al menos 6 caracteres
- ✅ Confirmación de contraseña coincidente
- ✅ Campos obligatorios completados
- ✅ Montos positivos en transacciones
- ✅ Selección de categoría obligatoria
- ✅ Nombres únicos de categorías

### Características Avanzadas:
- 🔍 Filtrado de transacciones por tipo, categoría y fecha
- 📊 Ordenamiento por fecha y monto
- 📄 Paginación de resultados
- 💾 Exportación de datos en formato JSON
- 📈 Cálculos financieros automáticos
- 🎨 Editor visual de categorías con iconos
- 🔔 Sistema de notificaciones contextual

## 🚀 Próximas Características

- 📊 Gráficos interactivos de gastos
- 📈 Proyecciones financieras
- 🎯 Objetivos de ahorro
- 📅 Recordatorios de pagos
- 💹 Análisis de tendencias
- 📱 Aplicación móvil nativa

## 🛡️ Consideraciones de Seguridad

Esta es una aplicación de demostración que utiliza localStorage para persistencia de datos. En un entorno de producción real, se implementarían:

- 🔐 Autenticación con JWT tokens
- 🛡️ Cifrado de datos sensibles
- 🔒 Validaciones del lado del servidor
- 👨‍💻 Auditoría de seguridad
- 🌐 HTTPS obligatorio

---

**Desarrollado como proyecto académico para la materia de Interacción Humano-Computadora**

*Universidad: Semestre 5 - Octubre 2025*
