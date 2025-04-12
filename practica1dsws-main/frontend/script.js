const API_URL = "http://localhost:3000/api/gestos";

// Leer todos los gestos
const getGestos = async () => {
  const res = await fetch(API_URL);
  const data = await res.json();
  document.getElementById("lista").innerHTML = data.map(g =>
    `<li>${g.nombre} - ${g.descripcion}
      <button onclick="editar(${g.id})">✏️</button>
      <button onclick="eliminar(${g.id})">🗑️</button>
    </li>`).join('');
};

// Crear gesto
const crearGesto = async () => {
  const nombre = document.getElementById("nombre").value;
  const descripcion = document.getElementById("descripcion").value;
  const id = Date.now();
  await fetch(API_URL, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, nombre, descripcion })
  });
  getGestos();
};

// Eliminar gesto
const eliminar = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  getGestos();
};

// Editar gesto
let gestoEditando = null;
const editar = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  const gesto = await res.json();
  document.getElementById("nombre").value = gesto.nombre;
  document.getElementById("descripcion").value = gesto.descripcion;
  gestoEditando = id;
};

const actualizarGesto = async () => {
  if (!gestoEditando) return;
  await fetch(`${API_URL}/${gestoEditando}`, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nombre: document.getElementById("nombre").value,
      descripcion: document.getElementById("descripcion").value
    })
  });
  gestoEditando = null;
  getGestos();
};

document.getElementById("crearBtn").onclick = crearGesto;
document.getElementById("actualizarBtn").onclick = actualizarGesto;

getGestos();
  