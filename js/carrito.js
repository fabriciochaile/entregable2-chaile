function mostrarCarrito() {
  const carritoGuardado = localStorage.getItem("carrito");
  let carrito = [];

  if (carritoGuardado !== null) {
    carrito = JSON.parse(carritoGuardado);
  }

  const contenedor = document.getElementById("carrito-items");
  const totalCarrito = document.getElementById("total-carrito");
  let total = 0;

  contenedor.innerHTML = "";

  for (let i = 0; i < carrito.length; i++) {
    const producto = carrito[i];
    const subtotal = producto.precio * producto.cantidad;
    total = total + subtotal;

    const fila =
      "<tr>" +
      "<td>" + producto.nombre + "</td>" +
      "<td>$" + producto.precio + "</td>" +
      "<td>" + producto.cantidad + "</td>" +
      "<td>$" + subtotal + "</td>" +
      "<td><button onclick='eliminarProducto(" + i + ")'>Eliminar</button></td>" +
      "</tr>";

    contenedor.innerHTML += fila;
  }

  totalCarrito.innerText = "$" + total;
}

function eliminarProducto(indice) {
  const carritoGuardado = localStorage.getItem("carrito");
  let carrito = [];

  if (carritoGuardado !== null) {
    carrito = JSON.parse(carritoGuardado);
  }

  carrito.splice(indice, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));

  mostrarCarrito();
}

// Mostrar carrito apenas se carga el archivo
mostrarCarrito();