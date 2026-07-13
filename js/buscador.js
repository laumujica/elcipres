// buscador.js — búsqueda en vivo dentro de las 4 colecciones de poemas/haikus/textos.
// Ignora mayúsculas y tildes al buscar y al marcar coincidencias.
// Cada resultado linkea a blogs/<pagina>.html?q=<fragmento>, que después
// resaltar.js usa para saltar y marcar el lugar exacto en la página destino.

(function () {
  var INDEX_URL = 'search-index.json';
  var indice = null;
  var cargando = null;

  function quitarTildes(s) {
    return s
      .replace(/[áàäâã]/gi, 'a')
      .replace(/[éèëê]/gi, 'e')
      .replace(/[íìïî]/gi, 'i')
      .replace(/[óòöôõ]/gi, 'o')
      .replace(/[úùüû]/gi, 'u')
      .replace(/ñ/gi, 'n');
  }

  function normalizar(s) {
    return quitarTildes((s || '').toLowerCase()).replace(/\s+/g, ' ').trim();
  }

  // Igual que en resaltar.js: normaliza pero guarda un mapa de posiciones
  // para poder recortar el texto ORIGINAL (con tildes/mayúsculas reales)
  // en el lugar exacto donde matchea la versión normalizada.
  function normalizarConMapa(original) {
    var norm = '';
    var mapa = [];
    var enEspacio = false;
    for (var i = 0; i < original.length; i++) {
      var ch = original[i];
      if (/\s/.test(ch)) {
        if (!enEspacio) { norm += ' '; mapa.push(i); enEspacio = true; }
        continue;
      }
      enEspacio = false;
      norm += quitarTildes(ch).toLowerCase();
      mapa.push(i);
    }
    return { norm: norm, mapa: mapa };
  }

  function escapeHtml(s) {
    return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function cargarIndice() {
    if (indice) return Promise.resolve(indice);
    if (cargando) return cargando;
    cargando = fetch(INDEX_URL)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        data.forEach(function (item) {
          item._titulo_n = normalizar(item.t);
          item._texto_n = normalizar(item.x);
        });
        indice = data;
        return indice;
      });
    return cargando;
  }

  function buscar(query, items) {
    var tokens = normalizar(query).split(/\s+/).filter(Boolean);
    if (!tokens.length) return [];

    var resultados = [];
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var enTitulo = tokens.every(function (t) { return item._titulo_n.indexOf(t) !== -1; });
      var enTexto = tokens.every(function (t) { return item._texto_n.indexOf(t) !== -1; });
      if (!enTitulo && !enTexto) continue;

      var pos = item._texto_n.indexOf(tokens[0]);
      if (pos === -1) pos = 0;
      var inicio = Math.max(0, pos - 45);
      var contexto = item.x.slice(inicio, pos + 90).trim();
      if (inicio > 0) contexto = '\u2026' + contexto;
      if (inicio + contexto.length < item.x.length) contexto += '\u2026';

      var palabras = item.x.slice(pos, pos + 60).split(/\s+/).slice(0, 8).join(' ');

      resultados.push({
        item: item,
        score: (enTitulo ? 10 : 0) + 1,
        contexto: contexto,
        fragmento: palabras || item.x.slice(0, 40)
      });
    }
    resultados.sort(function (a, b) { return b.score - a.score; });
    return resultados.slice(0, 40);
  }

  // Encuentra todas las apariciones de los tokens en "texto" (ignorando
  // tildes/mayúsculas) y devuelve el mismo texto, escapado para HTML,
  // con <mark> alrededor de cada coincidencia real (con sus tildes propias).
  function marcarCoincidencias(texto, query) {
    var tokens = normalizar(query).split(' ').filter(function (t) { return t.length >= 2; });
    if (!tokens.length) return escapeHtml(texto);

    var res = normalizarConMapa(texto);
    var rangos = [];

    tokens.forEach(function (t) {
      var desde = 0;
      var p;
      while ((p = res.norm.indexOf(t, desde)) !== -1) {
        var origInicio = res.mapa[p];
        var ultimoIndice = Math.min(p + t.length - 1, res.mapa.length - 1);
        var origFin = res.mapa[ultimoIndice] + 1;
        rangos.push([origInicio, origFin]);
        desde = p + t.length;
      }
    });

    if (!rangos.length) return escapeHtml(texto);

    rangos.sort(function (a, b) { return a[0] - b[0]; });
    var fusionados = [rangos[0]];
    rangos.slice(1).forEach(function (r) {
      var ultimo = fusionados[fusionados.length - 1];
      if (r[0] <= ultimo[1]) { ultimo[1] = Math.max(ultimo[1], r[1]); }
      else { fusionados.push(r); }
    });

    var out = '';
    var cursor = 0;
    fusionados.forEach(function (r) {
      out += escapeHtml(texto.slice(cursor, r[0]));
      out += '<mark>' + escapeHtml(texto.slice(r[0], r[1])) + '</mark>';
      cursor = r[1];
    });
    out += escapeHtml(texto.slice(cursor));
    return out;
  }

  function render(resultados, query, contenedor) {
    if (!query.trim()) {
      contenedor.innerHTML = '';
      contenedor.classList.remove('activo');
      return;
    }
    if (!resultados.length) {
      contenedor.innerHTML = '<div class="buscador-vacio">No encontré nada con "' + escapeHtml(query) + '". Probá con otra palabra.</div>';
      contenedor.classList.add('activo');
      return;
    }

    var html = '<div class="buscador-contador">' + resultados.length + ' resultado' + (resultados.length === 1 ? '' : 's') + '</div>';
    html += resultados.map(function (r) {
      var item = r.item;
      var url = item.p + '?q=' + encodeURIComponent(r.fragmento);
      return (
        '<a class="buscador-resultado" href="' + url + '">' +
          '<span class="buscador-tag" style="background:var(' + item.a + ')">' + escapeHtml(item.c) + '</span>' +
          (item.t ? '<span class="buscador-titulo">' + escapeHtml(item.t) + '</span>' : '') +
          '<span class="buscador-fecha">' + item.f + '</span>' +
          '<span class="buscador-snippet">' + marcarCoincidencias(r.contexto, query) + '</span>' +
        '</a>'
      );
    }).join('');
    contenedor.innerHTML = html;
    contenedor.classList.add('activo');
  }

  function initBuscador() {
    var input = document.getElementById('buscadorInput');
    var contenedor = document.getElementById('buscadorResultados');
    if (!input || !contenedor) return;

    var timer = null;
    input.addEventListener('input', function () {
      var query = input.value;
      clearTimeout(timer);
      timer = setTimeout(function () {
        cargarIndice().then(function (items) {
          render(buscar(query, items), query, contenedor);
        });
      }, 150);
    });

    document.addEventListener('click', function (e) {
      if (!input.contains(e.target) && !contenedor.contains(e.target)) {
        contenedor.classList.remove('activo');
      }
    });
    input.addEventListener('focus', function () {
      if (input.value.trim()) contenedor.classList.add('activo');
    });
  }

  document.addEventListener('DOMContentLoaded', initBuscador);
})();
