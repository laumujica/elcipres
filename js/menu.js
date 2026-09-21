// menu.js — menú hamburguesa del sitio
// Pensado para poder sumar más módulos acá (ej: formulario de contacto)
// sin tener que tocar el HTML de cada página.

(function () {
  function initMenu() {
    var boton = document.getElementById('menuBoton');
    var panel = document.getElementById('menuPanel');

    if (!boton || !panel) return; // por si alguna página no tiene menú

    function cerrar() {
      boton.setAttribute('aria-expanded', 'false');
      panel.classList.remove('activo');
    }

    function toggle() {
      var abierto = boton.getAttribute('aria-expanded') === 'true';
      boton.setAttribute('aria-expanded', String(!abierto));
      panel.classList.toggle('activo');
    }

    boton.addEventListener('click', function (e) {
      e.stopPropagation();
      toggle();
    });

    document.addEventListener('click', function (e) {
      if (!boton.contains(e.target) && !panel.contains(e.target)) {
        cerrar();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        cerrar();
        boton.focus();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', initMenu);
})();