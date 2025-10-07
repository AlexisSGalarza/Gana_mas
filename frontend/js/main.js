/**
 * Ahorrando Gano - JavaScript Principal
 * Sistema de gestión financiera simplificado
 */

// === CONFIGURACIÓN GLOBAL ===
const APP_CONFIG = {
    name: 'Ahorrando Gano',
    version: '1.0.0',
    storage: {
        users: 'ahorro_users',
        currentUser: 'ahorro_current_user',
        transactions: 'ahorro_transactions',
        categories: 'ahorro_categories'
    },
    defaults: {
        categories: [
            { id: 'cat_1', name: 'Alimentación', type: 'expense', color: '#ff6b6b', icon: '🍕' },
            { id: 'cat_2', name: 'Transporte', type: 'expense', color: '#4ecdc4', icon: '🚗' },
            { id: 'cat_3', name: 'Entretenimiento', type: 'expense', color: '#45b7d1', icon: '🎬' },
            { id: 'cat_4', name: 'Salud', type: 'expense', color: '#96ceb4', icon: '💊' },
            { id: 'cat_5', name: 'Educación', type: 'expense', color: '#ffd93d', icon: '📚' },
            { id: 'cat_6', name: 'Salario', type: 'income', color: '#6c5ce7', icon: '💰' },
            { id: 'cat_7', name: 'Otros ingresos', type: 'income', color: '#a29bfe', icon: '💸' }
        ]
    }
};

// === UTILIDADES ===
const Utils = {
    // Generar ID único
    generateId: () => Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
    
    // Formatear moneda
    formatCurrency: (amount) => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN'
        }).format(amount);
    },
    
    // Formatear fecha
    formatDate: (date) => {
        // Crear fecha local para evitar problemas de zona horaria
        const localDate = new Date(date + 'T00:00:00');
        return localDate.toLocaleDateString('es-MX', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },
    
    // Validar email
    isValidEmail: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
    // Hash simple para contraseñas (SOLO PARA DEMO)
    simpleHash: (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash.toString();
    },
    
    // Mostrar notificación elegante
    showNotification: (message, type = 'info') => {
        if (window.Swal && window.Swal.fire) {
            const configs = {
                success: {
                    icon: 'success',
                    title: '¡Perfecto!',
                    text: message,
                    background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                    color: 'white',
                    iconColor: 'white',
                    confirmButtonColor: '#667eea',
                    timer: 3500,
                    timerProgressBar: true,
                    showClass: {
                        popup: 'animate__animated animate__bounceInRight'
                    }
                },
                error: {
                    icon: 'error',
                    title: '¡Oops!',
                    text: message,
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    color: 'white',
                    iconColor: 'white',
                    confirmButtonColor: '#f5576c',
                    timer: 4000,
                    timerProgressBar: true
                },
                warning: {
                    icon: 'warning',
                    title: '¡Atención!',
                    text: message,
                    background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                    color: '#2d3436',
                    confirmButtonColor: '#fdcb6e',
                    timer: 3500,
                    timerProgressBar: true
                },
                info: {
                    icon: 'info',
                    title: 'Información',
                    text: message,
                    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                    color: 'white',
                    iconColor: 'white',
                    confirmButtonColor: '#667eea',
                    timer: 3000,
                    timerProgressBar: true
                }
            };

            const config = configs[type] || configs.info;
            config.position = 'top-end';
            config.toast = false;
            config.showConfirmButton = false;
            config.width = '400px';

            Swal.fire(config);
        } else {
            const symbols = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
            alert(`${symbols[type] || symbols.info} ${message}`);
        }
    },

    // Confirmar acción elegante
    confirmAction: async (message, title = '¿Estás seguro?') => {
        if (window.Swal && window.Swal.fire) {
            const result = await Swal.fire({
                title: title,
                text: message,
                icon: 'question',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                iconColor: 'white',
                showCancelButton: true,
                confirmButtonColor: '#43e97b',
                cancelButtonColor: '#f5576c',
                confirmButtonText: '✓ Sí, continuar',
                cancelButtonText: '✗ Cancelar',
                reverseButtons: true,
                focusCancel: true,
                showClass: {
                    popup: 'animate__animated animate__zoomIn'
                }
            });
            return result.isConfirmed;
        } else {
            return confirm(message);
        }
    },
    
    // Función debounce para filtros de búsqueda
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// === ALMACENAMIENTO LOCAL ===
const Storage = {
    // Guardar datos
    save: (key, data) => {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            return false;
        }
    },
    
    // Obtener datos
    load: (key, defaultValue = null) => {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (error) {
            return defaultValue;
        }
    },
    
    // Eliminar datos
    remove: (key) => {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            return false;
        }
    }
};

// === GESTIÓN DE USUARIOS ===
const UserManager = {
    // Registrar usuario
    register: async (userData) => {
        try {
            const users = Storage.load(APP_CONFIG.storage.users, []);
            
            // Verificar si el email ya existe
            if (users.find(user => user.email === userData.email)) {
                throw new Error('El email ya está registrado');
            }
            
            // Crear nuevo usuario
            const newUser = {
                id: Utils.generateId(),
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                password: Utils.simpleHash(userData.password), // SOLO PARA DEMO
                createdAt: new Date().toISOString(),
                isActive: true
            };
            
            // Guardar usuario
            users.push(newUser);
            Storage.save(APP_CONFIG.storage.users, users);
            
            // Crear categorías por defecto para el usuario
            CategoryManager.initDefaultCategories(newUser.id);
            
            Utils.showNotification('¡Registro exitoso!', 'success');
            return { success: true, user: newUser };
            
        } catch (error) {
            Utils.showNotification(error.message, 'error');
            return { success: false, error: error.message };
        }
    },
    
    // Iniciar sesión
    login: async (email, password) => {
        try {
            const users = Storage.load(APP_CONFIG.storage.users, []);
            const hashedPassword = Utils.simpleHash(password);
            
            const user = users.find(u => u.email === email && u.password === hashedPassword);
            
            if (!user) {
                return { success: false, error: 'Email o contraseña incorrectos' };
            }
            
            // Guardar sesión
            Storage.save(APP_CONFIG.storage.currentUser, user);
            
            return { success: true, user };
            
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
    
    // Actualizar usuario
    updateUser: (userId, updateData) => {
        const users = Storage.load(APP_CONFIG.storage.users, []);
        const index = users.findIndex(u => u.id === userId);
        
        if (index === -1) {
            return { success: false, error: 'Usuario no encontrado' };
        }

        // Actualizar campos
        const user = users[index];
        Object.keys(updateData).forEach(key => {
            if (updateData[key] !== undefined) {
                user[key] = updateData[key];
            }
        });
        
        user.updatedAt = new Date().toISOString();
        
        Storage.save(APP_CONFIG.storage.users, users);
        
        // Si es el usuario actual, actualizar también la sesión
        const currentUser = UserManager.getCurrentUser();
        if (currentUser && currentUser.id === userId) {
            Storage.save(APP_CONFIG.storage.currentUser, user);
        }
        
        return { success: true, user };
    },

    // Eliminar usuario
    deleteUser: (userId) => {
        const users = Storage.load(APP_CONFIG.storage.users, []);
        const index = users.findIndex(u => u.id === userId);
        
        if (index === -1) {
            return { success: false, error: 'Usuario no encontrado' };
        }

        // Eliminar usuario
        const deletedUser = users.splice(index, 1)[0];
        Storage.save(APP_CONFIG.storage.users, users);
        
        // Eliminar transacciones del usuario
        const transactions = Storage.load(APP_CONFIG.storage.transactions, []);
        const filteredTransactions = transactions.filter(t => t.userId !== userId);
        Storage.save(APP_CONFIG.storage.transactions, filteredTransactions);
        
        // Si es el usuario actual, cerrar sesión
        const currentUser = UserManager.getCurrentUser();
        if (currentUser && currentUser.id === userId) {
            UserManager.logout();
        }
        
        return { success: true, user: deletedUser };
    },

    // Establecer usuario actual
    setCurrentUser: (user) => {
        Storage.save(APP_CONFIG.storage.currentUser, user);
    },

    // Cerrar sesión
    logout: () => {
        Storage.remove(APP_CONFIG.storage.currentUser);
        Utils.showNotification('Sesión cerrada correctamente', 'info');
        window.location.href = 'login.html';
    },
    
    // Obtener usuario actual
    getCurrentUser: () => {
        return Storage.load(APP_CONFIG.storage.currentUser);
    },
    
    // Verificar si hay sesión activa
    isLoggedIn: () => {
        const user = UserManager.getCurrentUser();
        return user && user.id;
    }
};

// === GESTIÓN DE CATEGORÍAS ===
const CategoryManager = {
    // Inicializar categorías por defecto
    initDefaultCategories: (userId) => {
        const categories = APP_CONFIG.defaults.categories.map(cat => ({
            ...cat,
            id: Utils.generateId(),
            userId,
            createdAt: new Date().toISOString(),
            isDefault: true
        }));
        
        const existingCategories = Storage.load(APP_CONFIG.storage.categories, []);
        const updatedCategories = [...existingCategories, ...categories];
        Storage.save(APP_CONFIG.storage.categories, updatedCategories);
    },
    
    // Obtener categorías del usuario
    getUserCategories: (userId) => {
        const categories = Storage.load(APP_CONFIG.storage.categories, []);
        return categories.filter(cat => cat.userId === userId);
    },
    
    // Crear nueva categoría
    create: (categoryData) => {
        const user = UserManager.getCurrentUser();
        if (!user) return { success: false, error: 'No hay sesión activa' };
        
        const categories = Storage.load(APP_CONFIG.storage.categories, []);
        const newCategory = {
            id: Utils.generateId(),
            userId: user.id,
            name: categoryData.name,
            type: categoryData.type,
            color: categoryData.color || '#6366f1',
            icon: categoryData.icon || '📁',
            createdAt: new Date().toISOString(),
            isDefault: false
        };
        
        categories.push(newCategory);
        Storage.save(APP_CONFIG.storage.categories, categories);
        
        Utils.showNotification('Categoría creada correctamente', 'success');
        return { success: true, category: newCategory };
    },

    // Obtener todas las categorías
    getCategories: () => {
        return Storage.load(APP_CONFIG.storage.categories, []);
    },

    // Obtener categoría por ID
    getCategoryById: (categoryId) => {
        const categories = Storage.load(APP_CONFIG.storage.categories, []);
        return categories.find(cat => cat.id === categoryId);
    },

    // Crear nueva categoría
    createCategory: (categoryData) => {
        const user = UserManager.getCurrentUser();
        if (!user) return { success: false, error: 'No hay sesión activa' };
        
        const categories = Storage.load(APP_CONFIG.storage.categories, []);
        
        // Verificar si ya existe una categoría con el mismo nombre
        const existingCategory = categories.find(cat => 
            cat.userId === user.id && 
            cat.name.toLowerCase() === categoryData.name.toLowerCase()
        );
        
        if (existingCategory) {
            return { success: false, error: 'Ya existe una categoría con ese nombre' };
        }
        
        const newCategory = {
            id: Utils.generateId(),
            userId: user.id,
            name: categoryData.name,
            type: categoryData.type,
            color: categoryData.color || 'primary',
            icon: categoryData.icon || 'fa-folder',
            description: categoryData.description || '',
            createdAt: new Date().toISOString(),
            isDefault: false
        };
        
        categories.push(newCategory);
        Storage.save(APP_CONFIG.storage.categories, categories);
        
        return { success: true, category: newCategory };
    },

    // Actualizar categoría
    updateCategory: (categoryId, categoryData) => {
        const user = UserManager.getCurrentUser();
        if (!user) return { success: false, error: 'No hay sesión activa' };
        
        const categories = Storage.load(APP_CONFIG.storage.categories, []);
        const categoryIndex = categories.findIndex(cat => 
            cat.id === categoryId && cat.userId === user.id
        );
        
        if (categoryIndex === -1) {
            return { success: false, error: 'Categoría no encontrada' };
        }
        
        // Verificar si el nuevo nombre ya existe (excluyendo la categoría actual)
        const existingCategory = categories.find(cat => 
            cat.userId === user.id && 
            cat.id !== categoryId &&
            cat.name.toLowerCase() === categoryData.name.toLowerCase()
        );
        
        if (existingCategory) {
            return { success: false, error: 'Ya existe una categoría con ese nombre' };
        }
        
        // Actualizar la categoría
        categories[categoryIndex] = {
            ...categories[categoryIndex],
            name: categoryData.name,
            type: categoryData.type,
            color: categoryData.color,
            icon: categoryData.icon,
            description: categoryData.description || '',
            updatedAt: new Date().toISOString()
        };
        
        Storage.save(APP_CONFIG.storage.categories, categories);
        
        return { success: true, category: categories[categoryIndex] };
    },

    // Eliminar categoría
    deleteCategory: (categoryId) => {
        const user = UserManager.getCurrentUser();
        if (!user) return { success: false, error: 'No hay sesión activa' };
        
        const categories = Storage.load(APP_CONFIG.storage.categories, []);
        const categoryIndex = categories.findIndex(cat => 
            cat.id === categoryId && cat.userId === user.id
        );
        
        if (categoryIndex === -1) {
            return { success: false, error: 'Categoría no encontrada' };
        }
        
        // Verificar si hay transacciones usando esta categoría
        const transactions = Storage.load(APP_CONFIG.storage.transactions, []);
        const hasTransactions = transactions.some(transaction => 
            transaction.categoryId === categoryId
        );
        
        if (hasTransactions) {
            return { success: false, error: 'No se puede eliminar una categoría que tiene transacciones asociadas' };
        }
        
        // Eliminar la categoría
        categories.splice(categoryIndex, 1);
        Storage.save(APP_CONFIG.storage.categories, categories);
        
        return { success: true };
    },

    // Aliases para compatibilidad
    update: function(categoryId, categoryData) {
        return this.updateCategory(categoryId, categoryData);
    },

    delete: function(categoryId) {
        return this.deleteCategory(categoryId);
    }
};

// === GESTIÓN DE TRANSACCIONES ===
const TransactionManager = {
    // Crear transacción con validaciones y notificación elegante
    addTransaction: (transactionData) => {
        const user = UserManager.getCurrentUser();
        if (!user) {
            Utils.showNotification('Debes iniciar sesión para crear transacciones', 'error');
            return { success: false, error: 'No hay sesión activa' };
        }

        // Validaciones
        if (!transactionData.amount || parseFloat(transactionData.amount) <= 0) {
            Utils.showNotification('Por favor ingresa un monto válido mayor a 0', 'warning');
            return { success: false, error: 'Monto inválido' };
        }

        if (!transactionData.categoryId) {
            Utils.showNotification('Debes seleccionar una categoría', 'warning');
            return { success: false, error: 'Categoría requerida' };
        }
        
        const transactions = Storage.load(APP_CONFIG.storage.transactions, []);
        const amount = parseFloat(transactionData.amount);
        const newTransaction = {
            id: Utils.generateId(),
            userId: user.id,
            amount: amount,
            description: transactionData.description ? transactionData.description.trim() : '',
            categoryId: transactionData.categoryId,
            type: transactionData.type, // 'income' o 'expense'
            date: transactionData.date || new Date().toISOString(),
            createdAt: new Date().toISOString()
        };
        
        transactions.push(newTransaction);
        Storage.save(APP_CONFIG.storage.transactions, transactions);
        
        // Obtener información de la categoría para la notificación
        const categories = TransactionManager.getCategories();
        const category = categories.find(c => c.id === transactionData.categoryId);
        const categoryName = category ? category.name : 'Sin categoría';
        
        // Notificación elegante según el tipo
        const typeText = transactionData.type === 'income' ? 'ingreso' : 'gasto';
        const message = `${typeText === 'ingreso' ? '💰' : '💸'} ${Utils.formatCurrency(amount)} registrado en ${categoryName}`;
        
        Utils.showNotification(message, 'success');
        
        return { success: true, transaction: newTransaction };
    },

    // Alias para compatibilidad
    create: function(transactionData) {
        return this.addTransaction(transactionData);
    },
    
    // Obtener transacciones del usuario
    getUserTransactions: (userId) => {
        const transactions = Storage.load(APP_CONFIG.storage.transactions, []);
        return transactions.filter(t => t.userId === userId);
    },
    
    // Obtener balance detallado
    getBalance: (userId) => {
        const transactions = TransactionManager.getUserTransactions(userId);
        const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
        const expenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
        
        return {
            income,
            expenses,
            balance: income - expenses,
            totalTransactions: transactions.length
        };
    },

    // Actualizar transacción
    updateTransaction: (transactionId, updateData) => {
        const transactions = Storage.load(APP_CONFIG.storage.transactions, []);
        const index = transactions.findIndex(t => t.id === transactionId);
        
        if (index === -1) {
            Utils.showNotification('Transacción no encontrada', 'error');
            return { success: false, error: 'Transacción no encontrada' };
        }

        // Validaciones similares a addTransaction
        if (updateData.amount && parseFloat(updateData.amount) <= 0) {
            Utils.showNotification('Por favor ingresa un monto válido mayor a 0', 'warning');
            return { success: false, error: 'Monto inválido' };
        }

        // Actualizar campos
        const transaction = transactions[index];
        Object.keys(updateData).forEach(key => {
            if (key === 'amount') {
                transaction[key] = parseFloat(updateData[key]);
            } else if (updateData[key] !== undefined) {
                transaction[key] = updateData[key];
            }
        });
        
        transaction.updatedAt = new Date().toISOString();
        
        Storage.save(APP_CONFIG.storage.transactions, transactions);
        Utils.showNotification('Transacción actualizada correctamente', 'success');
        
        return { success: true, transaction };
    },

    // Eliminar transacción
    deleteTransaction: (transactionId) => {
        const user = UserManager.getCurrentUser();
        if (!user) {
            return { success: false, error: 'No hay sesión activa' };
        }

        const transactions = Storage.load(APP_CONFIG.storage.transactions, []);
        const transactionIndex = transactions.findIndex(t => 
            t.id === transactionId && t.userId === user.id
        );
        
        if (transactionIndex === -1) {
            return { success: false, error: 'Transacción no encontrada' };
        }

        try {
            // Eliminar la transacción
            const deletedTransaction = transactions[transactionIndex];
            transactions.splice(transactionIndex, 1);
            Storage.save(APP_CONFIG.storage.transactions, transactions);
            
            return { success: true, transaction: deletedTransaction };
        } catch (error) {
            return { success: false, error: 'Error al eliminar la transacción' };
        }
    },

    // Obtener categorías
    getCategories: () => {
        const categories = Storage.load(APP_CONFIG.storage.categories, []);
        
        // Si no hay categorías, inicializar con las por defecto
        if (categories.length === 0) {
            Storage.save(APP_CONFIG.storage.categories, APP_CONFIG.defaults.categories);
            return APP_CONFIG.defaults.categories;
        }
        
        return categories;
    },

    // Agregar categoría
    addCategory: (categoryData) => {
        const categories = Storage.load(APP_CONFIG.storage.categories, APP_CONFIG.defaults.categories);
        
        // Validaciones
        if (!categoryData.name || categoryData.name.trim().length === 0) {
            Utils.showNotification('El nombre de la categoría es obligatorio', 'warning');
            return { success: false, error: 'Nombre requerido' };
        }

        // Verificar que no exista una categoría con el mismo nombre y tipo
        const existingCategory = categories.find(c => 
            c.name.toLowerCase() === categoryData.name.toLowerCase() && 
            c.type === categoryData.type
        );

        if (existingCategory) {
            Utils.showNotification('Ya existe una categoría con ese nombre para ese tipo', 'warning');
            return { success: false, error: 'Categoría duplicada' };
        }

        const newCategory = {
            id: Utils.generateId(),
            name: categoryData.name.trim(),
            type: categoryData.type,
            description: categoryData.description || '',
            color: categoryData.color || '#6366f1',
            icon: categoryData.icon || '📂',
            createdAt: new Date().toISOString()
        };

        categories.push(newCategory);
        Storage.save(APP_CONFIG.storage.categories, categories);
        
        Utils.showNotification(`Categoría "${newCategory.name}" creada correctamente`, 'success');
        return { success: true, category: newCategory };
    },

    // Actualizar categoría
    updateCategory: (categoryId, updateData) => {
        const categories = Storage.load(APP_CONFIG.storage.categories, []);
        const index = categories.findIndex(c => c.id === categoryId);
        
        if (index === -1) {
            Utils.showNotification('Categoría no encontrada', 'error');
            return { success: false, error: 'Categoría no encontrada' };
        }

        // Actualizar campos
        const category = categories[index];
        Object.keys(updateData).forEach(key => {
            if (updateData[key] !== undefined) {
                category[key] = updateData[key];
            }
        });
        
        category.updatedAt = new Date().toISOString();
        
        Storage.save(APP_CONFIG.storage.categories, categories);
        Utils.showNotification('Categoría actualizada correctamente', 'success');
        
        return { success: true, category };
    },

    // Eliminar categoría
    deleteCategory: (categoryId) => {
        const categories = Storage.load(APP_CONFIG.storage.categories, []);
        const index = categories.findIndex(c => c.id === categoryId);
        
        if (index === -1) {
            Utils.showNotification('Categoría no encontrada', 'error');
            return { success: false, error: 'Categoría no encontrada' };
        }

        // Verificar si la categoría está en uso
        const transactions = Storage.load(APP_CONFIG.storage.transactions, []);
        const categoryInUse = transactions.some(t => t.categoryId === categoryId);
        
        if (categoryInUse) {
            // Actualizar transacciones para remover la categoría
            transactions.forEach(t => {
                if (t.categoryId === categoryId) {
                    t.categoryId = null;
                }
            });
            Storage.save(APP_CONFIG.storage.transactions, transactions);
        }

        const deletedCategory = categories.splice(index, 1)[0];
        Storage.save(APP_CONFIG.storage.categories, categories);
        
        Utils.showNotification('Categoría eliminada correctamente', 'success');
        return { success: true, category: deletedCategory };
    }
};

// === INICIALIZACIÓN ===
document.addEventListener('DOMContentLoaded', function() {
    
    // Verificar si estamos en una página que requiere autenticación
    const protectedPages = ['dashboard.html', 'transacciones.html', 'categorias.html', 'reportes.html', 'perfil.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (protectedPages.includes(currentPage) && !UserManager.isLoggedIn()) {
        Utils.showNotification('Debes iniciar sesión para acceder', 'warning');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
        return;
    }
    
    // Si estamos en login/registro y ya hay sesión, redirigir al dashboard
    if (['login.html', 'registro.html'].includes(currentPage) && UserManager.isLoggedIn()) {
        window.location.href = 'dashboard.html';
        return;
    }
    
    // Inicializar página específica
    initCurrentPage();
});

// === INICIALIZACIÓN POR PÁGINA ===
function initCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop();
    
    switch (currentPage) {
        case 'login.html':
            initLoginPage();
            break;
        case 'registro.html':
            initRegisterPage();
            break;
        case 'dashboard.html':
            initDashboardPage();
            break;
        case 'transacciones.html':
            initTransactionsPage();
            break;
        case 'categorias.html':
            initCategoriesPage();
            break;
        case 'perfil.html':
            initProfilePage();
            break;
        default:
            // Página no requiere inicialización específica
    }
}

function initLoginPage() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(loginForm);
            const result = await UserManager.login(
                formData.get('email'),
                formData.get('password')
            );
            
            if (result.success) {
                Utils.showNotification(`¡Bienvenido, ${result.user.firstName}!`, 'success');
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            } else {
                Utils.showNotification(result.error, 'error');
            }
        });
    }
}

function initRegisterPage() {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(registerForm);
            
            // Verificar que las contraseñas coincidan
            const password = formData.get('password');
            const confirmPassword = formData.get('confirmPassword');
            
            if (password !== confirmPassword) {
                Utils.showNotification('Las contraseñas no coinciden', 'error');
                return;
            }
            
            const result = await UserManager.register({
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                password: password
            });
            
            if (result.success) {
                // Auto-login después del registro
                const loginResult = await UserManager.login(formData.get('email'), password);
                if (loginResult.success) {
                    Utils.showNotification(`¡Bienvenido, ${loginResult.user.firstName}!`, 'success');
                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 1500);
                }
            }
        });
    }
}

function initDashboardPage() {
    const user = UserManager.getCurrentUser();
    if (!user) return;
    
    // Mostrar nombre del usuario
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
        userNameElement.textContent = user.firstName;
    }
    
    // Mostrar balance
    const balance = TransactionManager.getBalance(user.id);
    const balanceElement = document.getElementById('currentBalance');
    if (balanceElement) {
        balanceElement.textContent = Utils.formatCurrency(balance.balance);
    }
    
    // Mostrar estadísticas
    const incomeElement = document.getElementById('totalIncome');
    const expenseElement = document.getElementById('totalExpenses');
    
    if (incomeElement) incomeElement.textContent = Utils.formatCurrency(balance.income);
    if (expenseElement) expenseElement.textContent = Utils.formatCurrency(balance.expenses);
}

function initTransactionsPage() {
    const user = UserManager.getCurrentUser();
    if (!user) return;
    
    // Cargar transacciones
    loadTransactions();
    
    // Configurar formulario de nueva transacción
    const transactionForm = document.getElementById('transactionForm');
    if (transactionForm) {
        transactionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(transactionForm);
            
            const result = TransactionManager.create({
                amount: formData.get('amount'),
                description: formData.get('description'),
                categoryId: formData.get('categoryId'),
                type: formData.get('type'),
                date: formData.get('date')
            });
            
            if (result.success) {
                transactionForm.reset();
                loadTransactions(); // Recargar lista
            }
        });
    }
}

function loadTransactions() {
    const user = UserManager.getCurrentUser();
    if (!user) return;
    
    const transactions = TransactionManager.getUserTransactions(user.id);
    const categories = CategoryManager.getUserCategories(user.id);
    const transactionsList = document.getElementById('transactionsList');
    
    if (transactionsList) {
        transactionsList.innerHTML = transactions.map(transaction => {
            const category = categories.find(cat => cat.id === transaction.categoryId);
            const categoryName = category ? category.name : 'Sin categoría';
            const typeClass = transaction.type === 'income' ? 'text-success' : 'text-danger';
            const typeSymbol = transaction.type === 'income' ? '+' : '-';
            
            return `
                <div class="transaction-item border-bottom py-3">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="flex-grow-1">
                            <h6 class="mb-1">${transaction.description}</h6>
                            <small class="text-muted">${categoryName} • ${Utils.formatDate(transaction.date)}</small>
                        </div>
                        <div class="d-flex align-items-center gap-3">
                            <div class="fw-bold ${typeClass}">
                                ${typeSymbol}${Utils.formatCurrency(Math.abs(transaction.amount))}
                            </div>
                            <div class="dropdown">
                                <button class="btn btn-sm btn-outline-secondary" type="button" data-bs-toggle="dropdown">
                                    <i class="fas fa-ellipsis-v"></i>
                                </button>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#" onclick="editTransaction('${transaction.id}')">
                                        <i class="fas fa-edit me-2"></i>Editar
                                    </a></li>
                                    <li><a class="dropdown-item text-danger" href="#" onclick="deleteTransaction('${transaction.id}')">
                                        <i class="fas fa-trash me-2"></i>Eliminar
                                    </a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
}

function initCategoriesPage() {
    // Implementar gestión de categorías
}

function initProfilePage() {
    // Implementar perfil de usuario
}

// === EXPORTAR PARA USO GLOBAL ===
window.AhorrandoGano = {
    Utils,
    Storage,
    UserManager,
    CategoryManager,
    TransactionManager,
    APP_CONFIG
};

// === FUNCIONES GLOBALES ÚTILES ===
window.logout = UserManager.logout;
window.showNotification = Utils.showNotification;
window.confirmAction = Utils.confirmAction;

// === FUNCIONES GLOBALES PARA TRANSACCIONES ===
window.editTransaction = async function(transactionId) {
    const transactions = Storage.load(APP_CONFIG.storage.transactions, []);
    const transaction = transactions.find(t => t.id === transactionId);
    
    if (!transaction) {
        Utils.showNotification('Transacción no encontrada', 'error');
        return;
    }
    
    // Mostrar modal de edición o formulario inline
    // Por ahora, mostrar información básica
    Utils.showNotification('Función de edición en desarrollo', 'info');
};

// La función deleteTransaction se maneja localmente en cada página
