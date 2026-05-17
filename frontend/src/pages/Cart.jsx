function Cart({ carrito, setCarrito }) {
  const eliminarProducto = (id) => {
    const nuevoCarrito = carrito.filter((producto) => producto.id !== id);

    setCarrito(nuevoCarrito);

    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const comprar = async () => {
    if (carrito.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    const nuevaVenta = {
      cliente: "Fabricio",
      productos: carrito,
      fecha: new Date(),
    };

    try {
      const response = await fetch("http://localhost:3000/ventas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaVenta),
      });

      await response.json();

      alert("Compra realizada");

      localStorage.removeItem("carrito");

      setCarrito([]);
    } catch (error) {
      console.log(error);

      alert("Error al realizar compra");
    }
  };
  const total = carrito.reduce((acc, producto) => acc + producto.precio, 0);
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-10">
      <h2 className="text-2xl font-bold mb-6">Carrito</h2>

      {carrito.length === 0 ? (
        <p className="text-gray-500">El carrito está vacío</p>
      ) : (
        <div className="space-y-4">
          {carrito.map((producto) => (
            <div
              key={producto.id}
              className="flex justify-between items-center border-b pb-4"
            >
              <div>
                <h3 className="font-bold">{producto.nombre}</h3>

                <p className="text-gray-500">${producto.precio}</p>
              </div>

              <button
                onClick={() => eliminarProducto(producto.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
              >
                Eliminar
              </button>
            </div>
          ))}

          <div className="flex justify-between items-center mt-6">
            <h3 className="text-2xl font-bold">Total: ${total}</h3>

            <button
              onClick={comprar}
              className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
            >
              Finalizar compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
