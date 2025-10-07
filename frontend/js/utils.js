/**
 * Utilidades adicionales para Ahorrando Gano
 * Funciones complementarias y helpers
 */

// === DESCARGA DE LIBRERÍAS ===
const LibraryManager = {
    // URLs de las librerías
    libraries: {
        bootstrap: {
            css: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
            js: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js'
        },
        sweetalert2: {
            css: 'https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css',
            js: 'https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.js'
        },
        fontawesome: {
            css: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
        }
    },

    // Mostrar instrucciones de descarga
    showDownloadInstructions: () => {
        if (window.Swal && window.Swal.fire) {
            Swal.fire({
                title: '📥 Descargar Librerías',
                html: `
                    <div style="text-align: left; line-height: 1.8;">
                        <p><strong>Para obtener la funcionalidad completa, descarga estas librerías:</strong></p>
                        
                        <h6 style="color: #6366f1; margin-top: 20px;">🎨 Bootstrap 5.3.2</h6>
                        <small>Reemplaza: <code>frontend/lib/bootstrap/bootstrap.min.css</code></small><br>
                        <small>Reemplaza: <code>frontend/lib/bootstrap/bootstrap.bundle.min.js</code></small><br>
                        <a href="${LibraryManager.libraries.bootstrap.css}" target="_blank" style="font-size: 12px;">Descargar CSS</a> |
                        <a href="${LibraryManager.libraries.bootstrap.js}" target="_blank" style="font-size: 12px;">Descargar JS</a>
                        
                        <h6 style="color: #10b981; margin-top: 15px;">🍭 SweetAlert2</h6>
                        <small>Reemplaza: <code>frontend/lib/sweetalert2/sweetalert2.min.css</code></small><br>
                        <small>Reemplaza: <code>frontend/lib/sweetalert2/sweetalert2.min.js</code></small><br>
                        <a href="${LibraryManager.libraries.sweetalert2.css}" target="_blank" style="font-size: 12px;">Descargar CSS</a> |
                        <a href="${LibraryManager.libraries.sweetalert2.js}" target="_blank" style="font-size: 12px;">Descargar JS</a>
                        
                        <h6 style="color: #f59e0b; margin-top: 15px;">🎯 Font Awesome 6.4.0</h6>
                        <small>Reemplaza: <code>frontend/lib/fontawesome/css/all.min.css</code></small><br>
                        <a href="${LibraryManager.libraries.fontawesome.css}" target="_blank" style="font-size: 12px;">Descargar CSS</a>
                        
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-top: 20px;">
                            <strong>💡 Alternativa fácil:</strong><br>
                            <small>Cambia las referencias en los HTML para usar los CDN directamente</small>
                        </div>
                    </div>
                `,
                confirmButtonText: 'Entendido',
                width: '600px',
                confirmButtonColor: '#6366f1'
            });
        } else {
            alert(`
📥 Descargar Librerías

Para funcionalidad completa, descarga:

Bootstrap 5.3.2:
- ${LibraryManager.libraries.bootstrap.css}
- ${LibraryManager.libraries.bootstrap.js}

SweetAlert2:
- ${LibraryManager.libraries.sweetalert2.css}
- ${LibraryManager.libraries.sweetalert2.js}

Font Awesome 6.4.0:
- ${LibraryManager.libraries.fontawesome.css}

O usa los CDN directamente en los HTML.
            `);
        }
    }
};

// === VALIDACIONES MEJORADAS ===
const ValidationUtils = {
    // Validar email con mejor regex
    email: (email) => {
        const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return {
            isValid: regex.test(email),
            message: 'Por favor ingresa un email válido'
        };
    },

    // Validar contraseña
    password: (password) => {
        const minLength = 6;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        
        if (password.length < minLength) {
            return {
                isValid: false,
                message: `La contraseña debe tener al menos ${minLength} caracteres`
            };
        }
        
        return {
            isValid: true,
            message: 'Contraseña válida',
            strength: password.length >= 8 && hasUpperCase && hasNumbers ? 'strong' : 'medium'
        };
    },

    // Validar nombre
    name: (name) => {
        const trimmed = name.trim();
        if (trimmed.length < 2) {
            return {
                isValid: false,
                message: 'El nombre debe tener al menos 2 caracteres'
            };
        }
        
        return {
            isValid: true,
            message: 'Nombre válido'
        };
    },

    // Validar monto
    amount: (amount) => {
        const num = parseFloat(amount);
        if (isNaN(num) || num <= 0) {
            return {
                isValid: false,
                message: 'Por favor ingresa un monto válido mayor a 0'
            };
        }
        
        if (num > 999999999) {
            return {
                isValid: false,
                message: 'El monto es demasiado grande'
            };
        }
        
        return {
            isValid: true,
            message: 'Monto válido'
        };
    }
};

// === FORMATEO AVANZADO ===
const FormatUtils = {
    // Formatear moneda con diferentes opciones
    currency: (amount, options = {}) => {
        const defaults = {
            locale: 'es-MX',
            currency: 'USD',
            minimumFractionDigits: 2
        };
        
        const config = { ...defaults, ...options };
        
        return new Intl.NumberFormat(config.locale, {
            style: 'currency',
            currency: config.currency,
            minimumFractionDigits: config.minimumFractionDigits
        }).format(amount);
    },

    // Formatear fecha con opciones
    date: (date, format = 'long') => {
        const dateObj = new Date(date);
        
        const formats = {
            short: { day: '2-digit', month: '2-digit', year: 'numeric' },
            long: { day: 'numeric', month: 'long', year: 'numeric' },
            relative: null // Se maneja por separado
        };
        
        if (format === 'relative') {
            return FormatUtils.relativeDate(dateObj);
        }
        
        return dateObj.toLocaleDateString('es-MX', formats[format] || formats.long);
    },

    // Fecha relativa (hace X días)
    relativeDate: (date) => {
        const now = new Date();
        const diffTime = now - date;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return 'Hoy';
        if (diffDays === 1) return 'Ayer';
        if (diffDays < 7) return `Hace ${diffDays} días`;
        if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semana(s)`;
        if (diffDays < 365) return `Hace ${Math.floor(diffDays / 30)} mes(es)`;
        
        return `Hace ${Math.floor(diffDays / 365)} año(s)`;
    },

    // Truncar texto
    truncate: (text, maxLength = 50) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength - 3) + '...';
    },

    // Capitalizar primera letra
    capitalize: (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }
};

// === EXPORTAR DATOS ===
const ExportUtils = {
    // Exportar transacciones a CSV
    transactionsToCSV: (transactions, categories) => {
        const headers = ['Fecha', 'Descripción', 'Categoría', 'Tipo', 'Monto'];
        const rows = transactions.map(t => {
            const category = categories.find(c => c.id === t.categoryId);
            return [
                FormatUtils.date(t.date, 'short'),
                t.description,
                category ? category.name : 'Sin categoría',
                t.type === 'income' ? 'Ingreso' : 'Gasto',
                t.amount
            ];
        });
        
        const csvContent = [headers, ...rows]
            .map(row => row.map(field => `"${field}"`).join(','))
            .join('\n');
        
        return csvContent;
    },

    // Descargar archivo
    downloadFile: (content, filename, type = 'text/csv') => {
        const blob = new Blob([content], { type });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        window.URL.revokeObjectURL(url);
    }
};

// === ANIMACIONES Y EFECTOS ===
const AnimationUtils = {
    // Fade in element
    fadeIn: (element, duration = 300) => {
        element.style.opacity = '0';
        element.style.display = 'block';
        
        let opacity = 0;
        const timer = setInterval(() => {
            opacity += 50 / duration;
            if (opacity >= 1) {
                clearInterval(timer);
                opacity = 1;
            }
            element.style.opacity = opacity;
        }, 50);
    },

    // Slide down
    slideDown: (element, duration = 300) => {
        element.style.height = '0px';
        element.style.overflow = 'hidden';
        element.style.display = 'block';
        
        const targetHeight = element.scrollHeight;
        let height = 0;
        
        const timer = setInterval(() => {
            height += targetHeight * 50 / duration;
            if (height >= targetHeight) {
                clearInterval(timer);
                height = targetHeight;
                element.style.overflow = '';
                element.style.height = '';
            }
            element.style.height = height + 'px';
        }, 50);
    },

    // Efecto de carga para botones
    buttonLoading: (button, loading = true) => {
        if (loading) {
            button.disabled = true;
            button.dataset.originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Cargando...';
        } else {
            button.disabled = false;
            button.innerHTML = button.dataset.originalText || button.innerHTML;
        }
    }
};

// === HELPERS DE UI ===
const UIUtils = {
    // Mostrar/ocultar elementos
    toggle: (element) => {
        const isHidden = element.style.display === 'none' || !element.style.display;
        element.style.display = isHidden ? 'block' : 'none';
    },

    // Crear elemento con clases
    createElement: (tag, classes = '', content = '') => {
        const element = document.createElement(tag);
        if (classes) element.className = classes;
        if (content) element.innerHTML = content;
        return element;
    },

    // Debounce para optimizar eventos
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
    },

    // Copiar texto al portapapeles
    copyToClipboard: async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            // Fallback para navegadores sin soporte
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return true;
        }
    }
};

// === MODO DEMO ===
const DemoUtils = {
    // Crear datos de ejemplo
    createSampleData: () => {
        const user = {
            id: 'demo_user',
            firstName: 'Demo',
            lastName: 'Usuario',
            email: 'demo@ejemplo.com',
            password: Utils.simpleHash('demo123'),
            createdAt: new Date().toISOString(),
            isActive: true
        };

        const transactions = [
            {
                id: 'demo_t1',
                userId: 'demo_user',
                amount: 2500,
                description: 'Salario Universidad',
                categoryId: 'cat_6',
                type: 'income',
                date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                createdAt: new Date().toISOString()
            },
            {
                id: 'demo_t2',
                userId: 'demo_user',
                amount: 45.50,
                description: 'Comida cafetería',
                categoryId: 'cat_1',
                type: 'expense',
                date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                createdAt: new Date().toISOString()
            },
            {
                id: 'demo_t3',
                userId: 'demo_user',
                amount: 120,
                description: 'Libros semestre',
                categoryId: 'cat_5',
                type: 'expense',
                date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
                createdAt: new Date().toISOString()
            }
        ];

        return { user, transactions };
    },

    // Activar modo demo
    enableDemo: () => {
        const { user, transactions } = DemoUtils.createSampleData();
        
        // Guardar usuario demo
        const users = Storage.load(APP_CONFIG.storage.users, []);
        if (!users.find(u => u.email === user.email)) {
            users.push(user);
            Storage.save(APP_CONFIG.storage.users, users);
        }

        // Guardar transacciones demo
        const allTransactions = Storage.load(APP_CONFIG.storage.transactions, []);
        transactions.forEach(t => {
            if (!allTransactions.find(at => at.id === t.id)) {
                allTransactions.push(t);
            }
        });
        Storage.save(APP_CONFIG.storage.transactions, allTransactions);

        Utils.showNotification('Datos de demostración cargados', 'success');
    }
};

// === INICIALIZACIÓN ===
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si las librerías están cargadas correctamente
    const missingLibraries = [];
    
    if (!window.bootstrap) missingLibraries.push('Bootstrap');
    if (!window.Swal || !window.Swal.fire) missingLibraries.push('SweetAlert2');
    
    if (missingLibraries.length > 0) {
        // Librerías faltantes detectadas
        
        // Mostrar aviso después de un breve delay
        setTimeout(() => {
            const showInstructions = confirm(
                `⚠️ Algunas librerías no están completamente cargadas (${missingLibraries.join(', ')}).\n\n¿Quieres ver las instrucciones de descarga?`
            );
            
            if (showInstructions) {
                LibraryManager.showDownloadInstructions();
            }
        }, 2000);
    }

    // Agregar botón de ayuda si no existe
    if (!document.querySelector('.help-button')) {
        const helpButton = UIUtils.createElement('button', 'btn btn-info btn-sm position-fixed help-button', 
            '<i class="fas fa-question-circle"></i>');
        
        helpButton.style.cssText = 'bottom: 20px; right: 20px; z-index: 1000; border-radius: 50%; width: 50px; height: 50px;';
        helpButton.onclick = LibraryManager.showDownloadInstructions;
        
        document.body.appendChild(helpButton);
    }
});

// === EXPORTAR UTILIDADES ===
window.LibraryManager = LibraryManager;
window.ValidationUtils = ValidationUtils;
window.FormatUtils = FormatUtils;
window.ExportUtils = ExportUtils;
window.AnimationUtils = AnimationUtils;
window.UIUtils = UIUtils;
window.DemoUtils = DemoUtils;
