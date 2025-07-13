document.addEventListener('DOMContentLoaded', () => {
 
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
      total += subtotal;

      const fila =
        "<tr>" +
        "<td>" + producto.nombre + "</td>" +
        "<td>$" + producto.precio.toLocaleString("es-AR") + "</td>" +
        "<td>" +
          "<button onclick='cambiarCantidad(" + i + ", -1)'>-</button> " +
          producto.cantidad +
          " <button onclick='cambiarCantidad(" + i + ", 1)'>+</button>" +
        "</td>" +
        "<td>$" + subtotal.toLocaleString("es-AR") + "</td>" +
        "<td><button onclick='eliminarProducto(" + i + ")'>Eliminar</button></td>" +
        "</tr>";

      contenedor.innerHTML += fila;
    }

    totalCarrito.innerText = "$" + total.toLocaleString("es-AR");
  }

  
  window.eliminarProducto = function(indice) {
    const carritoGuardado = localStorage.getItem("carrito");
    let carrito = [];

    if (carritoGuardado !== null) {
      carrito = JSON.parse(carritoGuardado);
    }

    carrito.splice(indice, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
  };

  window.cambiarCantidad = function(indice, cambio) {
    const carritoGuardado = localStorage.getItem("carrito");
    let carrito = [];

    if (carritoGuardado !== null) {
      carrito = JSON.parse(carritoGuardado);
    }

    carrito[indice].cantidad += cambio;


    if (carrito[indice].cantidad <= 0) {
      carrito.splice(indice, 1);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
  };

 
  mostrarCarrito();

  
  const formCompra = document.getElementById('form-compra');

  formCompra.addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = formCompra.nombre.value.trim();
    const email = formCompra.email.value.trim();
    const telefono = formCompra.telefono.value.trim();
    const direccion = formCompra.direccion.value.trim();

    if (!nombre || !email || !telefono || !direccion) {
      Swal.fire({
        icon: 'warning',
        title: 'Completa todos los campos',
        text: 'Por favor, completa todos los datos para poder finalizar la compra.'
      });
      return;
    }

    const carritoGuardado = localStorage.getItem('carrito');
    let carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];

    if (carrito.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'El carrito está vacío',
        text: 'Agrega productos antes de finalizar la compra.'
      });
      return;
    }

    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

    Swal.fire({
      title: 'Compra confirmada',
      html: `
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Dirección:</strong> ${direccion}</p>
        <p><strong>Total a pagar:</strong> $${total.toLocaleString('es-AR')}</p>
      `,
      icon: 'success'
    });

    localStorage.removeItem('carrito');
    mostrarCarrito();
    formCompra.reset();
  });
});
