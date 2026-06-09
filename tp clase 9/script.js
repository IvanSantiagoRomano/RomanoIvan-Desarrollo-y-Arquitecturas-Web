// Validaciones para cada campo del formulario
const validaciones = {
    nombre: (valor) => {
        if (valor.length <= 6) return "Debe tener más de 6 letras.";
        if (!valor.includes(' ')) return "Debe contener al menos un espacio.";
        return null;
    },
    email: (valor) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(valor)) return "Debe tener un formato de email válido.";
        return null;
    },
    password: (valor) => {
        if (valor.length < 8) return "Debe tener al menos 8 caracteres.";
        const tieneLetras = /[a-zA-Z]/.test(valor);
        const tieneNumeros = /[0-9]/.test(valor);
        if (!tieneLetras || !tieneNumeros) return "Debe estar formada por letras y números.";
        return null;
    },
    password_rep: (valor) => {
        const pass = document.getElementById('password').value;
        if (valor === "") return "Debe repetir la contraseña.";
        if (valor !== pass) return "Las contraseñas no coinciden.";
        return null;
    },
    edad: (valor) => {
        const num = Number(valor);
        if (!Number.isInteger(num) || num < 18) return "Debe ser un número entero mayor o igual a 18.";
        return null;
    },
    telefono: (valor) => {
        if (valor.length < 7) return "Debe tener al menos 7 dígitos.";
        const regex = /^[0-9]+$/;
        if (!regex.test(valor)) return "No se aceptan espacios, guiones ni letras (solo números).";
        return null;
    },
    direccion: (valor) => {
        if (valor.length < 5) return "Debe tener al menos 5 caracteres.";
        const tieneLetras = /[a-zA-Z]/.test(valor);
        const tieneNumeros = /[0-9]/.test(valor);
        const tieneEspacio = valor.includes(' ');
        if (!tieneLetras || !tieneNumeros || !tieneEspacio) return "Debe contener letras, números y al menos un espacio.";
        return null;
    },
    ciudad: (valor) => {
        if (valor.length < 3) return "Debe tener al menos 3 caracteres.";
        return null;
    },
    cp: (valor) => {
        if (valor.length < 3) return "Debe tener al menos 3 caracteres.";
        return null;
    },
    dni: (valor) => {
        const regex = /^[0-9]{7,8}$/;
        if (!regex.test(valor)) return "Debe ser un número de 7 u 8 dígitos.";
        return null;
    }
};

const campos = Object.keys(validaciones);

// Mostrar un error visualmente
function mostrarError(id, msj) {
    const input = document.getElementById(id);
    const errorDiv = document.getElementById(`error-${id}`);
    input.classList.add('error');
    errorDiv.textContent = msj;
    errorDiv.classList.add('show');
}

// Ocultar un error
function limpiarError(id) {
    const input = document.getElementById(id);
    const errorDiv = document.getElementById(`error-${id}`);
    input.classList.remove('error');
    errorDiv.classList.remove('show');
    errorDiv.textContent = "";
}

// Validar un campo individual
function validarCampo(id) {
    const input = document.getElementById(id);
    const valorAValidar = input.value;

    const error = validaciones[id](valorAValidar);
    if (error) {
        mostrarError(id, error);
        return error;
    } else {
        limpiarError(id);
        return null;
    }
}

// Asignar eventos blur (validar) y focus (limpiar error) a cada input
campos.forEach(id => {
    const input = document.getElementById(id);
    
    input.addEventListener('blur', () => {
        validarCampo(id);
    });

    input.addEventListener('focus', () => {
        limpiarError(id);
    });
});

// Manejo del formulario y el modal
const form = document.getElementById('suscripcionForm');
const modal = document.getElementById('modal');
const closeBtn = document.getElementsByClassName('close')[0];
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');

// Cerrar el modal (click en la X)
closeBtn.onclick = function() {
    modal.style.display = "none";
}

// Evento submit
form.addEventListener('submit', function(e) {
    e.preventDefault();

    let hayErrores = false;
    let listaErrores = [];
    let datosRecolectados = "";

    // Validar todos los campos
    campos.forEach(id => {
        const label = document.querySelector(`label[for="${id}"]`).textContent;
        const error = validarCampo(id);
        
        if (error) {
            hayErrores = true;
            listaErrores.push(`<strong>${label}:</strong> ${error}`);
        } else {
            const input = document.getElementById(id);
            const valor = input.value;
            
            datosRecolectados += `
                <div class="data-item">
                    <div class="data-label">${label}:</div>
                    <div>${valor}</div>
                </div>
            `;
        }
    });

    // Mostrar el modal
    if (hayErrores) {
        modalTitle.textContent = "Errores de Validación";
        modalTitle.style.color = "#e74c3c";
        modalBody.innerHTML = `
            <div class="error-list">
                <h3>Por favor, corrija los siguientes errores:</h3>
                <ul>
                    ${listaErrores.map(err => `<li>${err}</li>`).join('')}
                </ul>
            </div>
        `;
    } else {
        modalTitle.textContent = "¡Suscripción Exitosa!";
        modalTitle.style.color = "#1e6051";
        modalBody.innerHTML = `
            <p style="margin-bottom: 15px; font-size: 16px;">La siguiente información ha sido recibida correctamente:</p>
            ${datosRecolectados}
        `;
    }

    modal.style.display = "block";
});
