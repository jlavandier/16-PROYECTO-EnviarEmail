document.addEventListener('DOMContentLoaded', function() {

    const email = {
        email: '',
        cc: '',
        asunto: '',
        mensaje: ''
    }

    // Elementos de interfaz
    const inputEmail = document.querySelector('#email');
    const inputCC = document.querySelector('#cc');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    // Asignar Eventos
    inputEmail.addEventListener('input', validar)
    inputCC.addEventListener('input', validar)
    inputAsunto.addEventListener('input', validar)
    inputMensaje.addEventListener('input', validar)

    formulario.addEventListener('submit', enviarEmail)

    btnReset.addEventListener('click', function(event) {
        event.preventDefault();
        reiniciarFormulario();
        eliminarAlertas()
    })

    function enviarEmail(event) {
        event.preventDefault();
        
        spinner.classList.add('flex')
        spinner.classList.remove('hidden')

        setTimeout(() => {
            spinner.classList.remove('flex')
            spinner.classList.add('hidden')

            reiniciarFormulario()
            // Mostrar que se envio
            const alertaEmailEnviado = document.createElement('P')
            alertaEmailEnviado.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');

            alertaEmailEnviado.textContent = 'Mensaje enviado correctamente';

            formulario.appendChild(alertaEmailEnviado);

            setTimeout(() => {
                alertaEmailEnviado.remove();
            }, 3000);

        }, 3000);
    }

    // Funciones
    function validar(event) {
        if(event.target.value.trim() === '' && event.target.id !== 'cc') {
            mostrarAlerta(`El campo ${event.target.id} es obligatorio`, event.target.parentElement);
            email[event.target.name] = '';
            comprobarEmail()
            return;
        }

        if(event.target.id === 'email' && !validarEmail(event.target.value)) {
            mostrarAlerta('El email no es valido', event.target.parentElement);
            email[event.target.name] = '';
            comprobarEmail();
            return;
        }

        if (event.target.id === 'cc') { // Si el campo cc tiene un valor, validar el email
            if (event.target.value !== '' && !validarEmail(event.target.value)) {
                mostrarAlerta('El destinatario agregado no es valido', event.target.parentElement);
                email[event.target.name] = event.target.value.trim().toLowerCase();
                comprobarEmail();
                return;
            }
            event.target.value.trim();
        }
        
        limpiarAlerta(event.target.parentElement);
        // Asignar los valores
        email[event.target.name] = event.target.value.trim().toLowerCase();

        // Comprobar el objeto de email
        comprobarEmail();
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
        if(email['email'] === '' || email['asunto'] === '' || email['mensaje'] === '' || email['cc'] !== '' && !validarEmail(email['cc'])) { 
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;
        }
        // comprobarEmailCC()
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
    }

    function reiniciarFormulario() {
        // Reiniciar el objeto
        email.email = '';
        email.cc = '';
        email.asunto = '';
        email.mensaje = '';

        formulario.reset();
        comprobarEmail();
    }

    function eliminarAlertas() {
        const alertas = formulario.querySelectorAll('.bg-red-600');
        alertas.forEach(alerta => {
            alerta.remove();
        });
    }
})

