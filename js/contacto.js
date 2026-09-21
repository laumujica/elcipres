// contacto.js — formulario de contacto
// Cambia la etiqueta, el placeholder y el tipo del campo
// según el método elegido, y lo oculta si no dejan contacto.

(function () {
  function initContactForm() {
    var select = document.getElementById('metodo');
    var campo = document.getElementById('campoContacto');
    var label = document.getElementById('labelDatoContacto');
    var input = document.getElementById('dato_contacto');

    if (!select || !campo || !label || !input) {
      return;
    }

    var config = {
      mail: {
        label: 'Tu mail',
        placeholder: 'nombre@ejemplo.com',
        type: 'email'
      },
      whatsapp: {
        label: 'Tu WhatsApp',
        placeholder: '+54 9 3541 123456',
        type: 'tel'
      },
      instagram: {
        label: 'Tu Instagram',
        placeholder: '@usuario',
        type: 'text'
      },
      facebook: {
        label: 'Tu Facebook',
        placeholder: 'Nombre o link de perfil',
        type: 'text'
      }
    };

    function actualizar() {
      var metodoElegido = select.value.toLowerCase();

      if (metodoElegido === 'sin_contacto') {
        campo.style.display = 'none';
        input.value = '';
        input.required = false;
        return;
      }

      var datos = config[metodoElegido];

      if (!datos) {
        return;
      }

      campo.style.display = '';
      label.textContent = datos.label;
      input.placeholder = datos.placeholder;
      input.type = datos.type;
      input.required = true;
    }

    select.addEventListener('change', actualizar);
    actualizar();
  }

  document.addEventListener('DOMContentLoaded', initContactForm);
})();