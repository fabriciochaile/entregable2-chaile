const carrito = [];

function agregarAlCarrito(id, nombre, precio) {
  let productoExistente = false;

  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].id === id) {
      carrito[i].cantidad += 1;
      productoExistente = true;
      break;
    }
  }

  if (!productoExistente) {
    carrito.push({ id: id, nombre: nombre, precio: precio, cantidad: 1 });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert(nombre + " fue agregado al carrito.");
}
