import { useState } from "react";
import Products from "./pages/Products";
import Cart from "./pages/Cart";

function App() {
  const [carrito, setCarrito] = useState(() => {
    return JSON.parse(localStorage.getItem("carrito")) || [];
  });

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center mb-10">Tienda Online</h1>

      <div className="max-w-6xl mx-auto">
        <Products carrito={carrito} setCarrito={setCarrito} />

        <Cart carrito={carrito} setCarrito={setCarrito} />
      </div>
    </div>
  );
}

export default App;
