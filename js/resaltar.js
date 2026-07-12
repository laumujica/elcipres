// resaltar.js — recibe ?q=... en la URL (desde el buscador de index.html),
// ubica la pieza correspondiente, hace scroll hasta ella, y marca (subraya
// en color) la frase exacta encontrada, para que se entienda de un vistazo
// dónde empieza y dónde termina lo que se buscó.

(function () {
  function quitarTildes(s) {
    return s
      .replace(/[áàäâã]/gi, 'a')
      .replace(/[éèëê]/gi, 'e')
      .replace(/[íìïî]/gi, 'i')
      .replace(/[óòöôõ]/gi, 'o')
      .replace(/[úùüû]/gi, 'u')
      .replace(/ñ/gi, 'n');
  }

  // Normaliza un texto (minúsculas, sin tildes, espacios/saltos de línea
  // colapsados a uno solo) y devuelve además un "mapa" que indica, para
  // cada carácter del texto normalizado, a qué posición del texto ORIGINAL
  // corresponde. Así, si encontramos una coincidencia en el texto normalizado,
  // podemos recortar el fragmento equivalente del texto original tal cual es,
  // con sus mayúsculas, tildes y saltos de línea reales.
  function normalizarConMapa(original) {
    var norm = '';
    var mapa = [];
    var enEspacio = false;
    for (var i = 0; i < original.length; i++) {
      var ch = original[i];
      if (/\s/.test(ch)) {
        if (!enEspacio) {
          norm += ' ';
          mapa.push(i);
          enEspacio = true;
        }
        continue;
      }
      enEspacio = false;
      norm += quitarTildes(ch).toLowerCase();
      mapa.push(i);
    }
    return { norm: norm, mapa: mapa };
  }

  function normalizarSimple(s) {
    return quitarTildes((s || '').toLowerCase()).replace(/\s+/g, ' ').trim();
  }

  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function init() {
    var params = new URLSearchParams(window.location.search);
    var q = params.get('q');
    if (!q) return;

    var qNorm = normalizarSimple(q);
    if (!qNorm) return;

    var qCorta = qNorm.split(' ').slice(0, 5).join(' ');

    var candidatos = document.querySelectorAll('.texto');
    var elEncontrado = null;
    var posNorm = -1;
    var largoNorm = 0;
    var mapaEncontrado = null;

    for (var i = 0; i < candidatos.length; i++) {
      var el = candidatos[i];
      var res = normalizarConMapa(el.textContent);
      var pos = res.norm.indexOf(qCorta);
      if (pos === -1) pos = res.norm.indexOf(qNorm);
      if (pos !== -1) {
        elEncontrado = el;
        posNorm = pos;
        largoNorm = (res.norm.indexOf(qCorta) !== -1 ? qCorta : qNorm).length;
        mapaEncontrado = res.mapa;
        break;
      }
    }

    if (!elEncontrado) return;

    var origInicio = mapaEncontrado[posNorm];
    var ultimoIndiceMapa = Math.min(posNorm + largoNorm - 1, mapaEncontrado.length - 1);
    var origFin = mapaEncontrado[ultimoIndiceMapa] + 1;

    var textoOriginal = elEncontrado.textContent;
    var antes = textoOriginal.slice(0, origInicio);
    var coincidencia = textoOriginal.slice(origInicio, origFin);
    var despues = textoOriginal.slice(origFin);

    elEncontrado.innerHTML =
      escapeHtml(antes) +
      '<mark class="buscador-marca">' + escapeHtml(coincidencia) + '</mark>' +
      escapeHtml(despues);

    var pieza = elEncontrado.closest('.pieza');
    if (pieza) {
      var reintentosScroll = [0, 200, 500, 1000, 1800];
      reintentosScroll.forEach(function (demora) {
        setTimeout(function () {
          pieza.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, demora);
      });
      pieza.classList.add('pieza-resaltada');
      setTimeout(function () {
        pieza.classList.add('pieza-resaltada-fade');
      }, 4500);
    } else {
      elEncontrado.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
