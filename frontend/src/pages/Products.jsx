import { useEffect, useState } from "react";

function Products({ carrito, setCarrito }) {
  const [productos, setProductos] = useState([]);
  const [categoria, setCategoria] = useState("");
  useEffect(() => {
    fetch("http://localhost:3000/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data));
  }, []);
  const productosFiltrados = categoria
    ? productos.filter((producto) => producto.categoria === categoria)
    : productos;
  const addToCart = (producto) => {
    const nuevoCarrito = [...carrito, producto];

    setCarrito(nuevoCarrito);

    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Productos</h2>

        <select
          onChange={(e) => setCategoria(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Todos</option>
          <option value="iPhone">iPhone</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productosFiltrados.map((producto) => (
          <div
            key={producto.id}
            className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition"
          >
            <h3 className="text-xl font-bold mb-2">{producto.nombre}</h3>

            <p className="text-gray-500 mb-3">{producto.desc}</p>

            <p className="text-2xl font-bold mb-4">${producto.precio}</p>

            <button
              onClick={() => addToCart(producto)}
              className="bg-black text-white w-full py-2 rounded-xl hover:bg-gray-800 transition"
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
