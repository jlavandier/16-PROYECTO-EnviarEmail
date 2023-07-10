document.addEventListener('DOMContentLoaded', function() {

    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    // Elementos de interfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]')

    // Asignar Eventos
    inputEmail.addEventListener('input', validar)
    inputAsunto.addEventListener('input', validar)
    inputMensaje.addEventListener('input', validar)

    function validar(event) {
        if(event.target.value.trim() === '') {
            mostrarAlerta(`El campo ${event.target.id} es obligatorio`, event.target.parentElement);
            email[event.target.name] = '';
            comprobarEmail()
            return;
        } 

        if(event.target.id === 'email' && !validarEmail(event.target.value)) {
            mostrarAlerta('El email no es valido', event.target.parentElement);
            email[event.target.name] = '';
            comprobarEmail()
            return;
        }
        
        limpiarAlerta(event.target.parentElement);

        // Asignar los valores
        email[event.target.name] = event.target.value.trim().toLowerCase();

        // Comprobar el objeto de email
        comprobarEmail()
    }

    function mostrarAlerta(mensaje, referencia) {
        limpiarAlerta(referencia)
        
        // Generar alerta en HTML
        const error = document.createElement('P');
        error.textContent = mensaje
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center')
        
        // Inyectar el error al formulario
        referencia.appendChild(error)
    }
    
    function limpiarAlerta(referencia) {
        // Comprueba si ya existe una alerta
        const alerta = referencia.querySelector('.bg-red-600')
        if(alerta) {
            alerta.remove()
        }
    }

    function validarEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/; 
        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarEmail() {
        if(Object.values(email).includes('')) { 
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;
        }
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
    }

});


// Habilitar boton de enviar