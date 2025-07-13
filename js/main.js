let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

async function cargarProductos() {
  try {
    const response = await fetch('./productos.json');
    const productos = await response.json();

    const catalogo = document.querySelector('.catalogo');
    catalogo.innerHTML = ''; 

    productos.forEach(producto => {
      const articulo = document.createElement('article');
      articulo.classList.add('producto');

      articulo.innerHTML = `
        <img src="${producto.img}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p class="precio">$${producto.precio.toLocaleString('es-AR')}</p>
        <button class="btn-agregar">Agregar al carrito</button>
      `;

      articulo.querySelector('button').addEventListener('click', () => {
        agregarAlCarrito(producto.id, producto.nombre, producto.precio);
      });

      catalogo.appendChild(articulo);
    });

  } catch (error) {
    console.error('Error al cargar productos:', error);
  }
}

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
  Swal.fire({
    title: '¡Agregado!',
    text: nombre + ' fue agregado al carrito.',
    icon: 'success',
    confirmButtonText: 'OK'
  });
}


document.addEventListener('DOMContentLoaded', cargarProductos);