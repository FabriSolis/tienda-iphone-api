import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);

        alert("Login exitoso");

        window.location.reload();
      } else {
        setMensaje(data.mensaje || "Credenciales inválidas");
      }
    } catch (error) {
      console.error(error);
      setMensaje("Error al iniciar sesión");
    }
  };

  const cerrarSesion = () => {
    localStorage.removeItem("token");

    alert("Sesión cerrada");

    window.location.reload();
  };

  const token = localStorage.getItem("token");

  return (
    <div className="bg-white p-6 rounded shadow mb-8">
      <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>

      {token ? (
        <div>
          <p className="text-green-600 mb-4 font-semibold">
            Usuario autenticado
          </p>

          <button
            onClick={cerrarSesion}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Cerrar sesión
          </button>
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo electrónico"
            className="border p-2 w-full mb-3 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            className="border p-2 w-full mb-3 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Ingresar
          </button>
        </form>
      )}

      {mensaje && <p className="mt-3 text-red-500">{mensaje}</p>}
    </div>
  );
}

export default Login;
