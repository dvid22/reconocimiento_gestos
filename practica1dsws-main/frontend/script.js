document.addEventListener('DOMContentLoaded', () => {
  const gestosForm = document.getElementById('gestos-form');
  const gestosList = document.getElementById('gestos-list');
  const videoElement = document.getElementById('video');
  const resultsDiv = document.getElementById('results');

  // Cargar gestos al inicio
  cargarGestos();

  // Guardar nuevo gesto (CREATE)
  gestosForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const imagenInput = document.getElementById('imagen');

    if (imagenInput.files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const nuevoGesto = {
          id: Date.now().toString(),
          nombre,
          descripcion,
          imagenUrl: e.target.result
        };
        guardarGesto(nuevoGesto);
        gestosForm.reset();
      };
      reader.readAsDataURL(imagenInput.files[0]);
    } else {
      alert('¡Sube una imagen del gesto!');
    }
  });

  // Cargar gestos (READ)
  function cargarGestos() {
    const gestos = obtenerGestos();
    gestosList.innerHTML = '';
    gestos.forEach(gesto => {
      const li = document.createElement('li');
      li.innerHTML = `
        <h3>${gesto.nombre}</h3>
        <p>${gesto.descripcion}</p>
        <img src="${gesto.imagenUrl}" width="100">
        <button onclick="editarGesto('${gesto.id}')">Editar</button>
        <button onclick="eliminarGesto('${gesto.id}')">Eliminar</button>
      `;
      gestosList.appendChild(li);
    });
  }

  // Iniciar cámara (simulación)
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoElement.srcObject = stream;
        setInterval(() => {
          resultsDiv.textContent = "Simulación: Gesto detectado 'Hola'";
        }, 2000);
      });
  }
});

// Funciones CRUD con localStorage
function obtenerGestos() {
  return JSON.parse(localStorage.getItem('gestos')) || [];
}

function guardarGesto(gesto) {
  const gestos = obtenerGestos();
  gestos.push(gesto);
  localStorage.setItem('gestos', JSON.stringify(gestos));
  cargarGestos();
}

// Funciones globales para editar/eliminar
window.editarGesto = (id) => {
  const gestos = obtenerGestos();
  const gesto = gestos.find(g => g.id === id);
  const nombre = prompt('Nuevo nombre:', gesto.nombre);
  const descripcion = prompt('Nueva descripción:', gesto.descripcion);

  if (nombre && descripcion) {
    gesto.nombre = nombre;
    gesto.descripcion = descripcion;
    localStorage.setItem('gestos', JSON.stringify(gestos));
    location.reload();
  }
};

window.eliminarGesto = (id) => {
  if (confirm('¿Eliminar este gesto?')) {
    const gestos = obtenerGestos().filter(g => g.id !== id);
    localStorage.setItem('gestos', JSON.stringify(gestos));
    location.reload();
  }
};