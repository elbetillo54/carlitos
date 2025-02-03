import { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../firebase";
import firebase from "../firebase";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const [beneficiarios, setBeneficiarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el filtro de búsqueda
  const { db } = useContext(FirebaseContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBeneficiarios = async () => {
      try {
        const querySnapshot = await firebase.db.collection("beneficiarios").get();
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBeneficiarios(data);
      } catch (error) {
        console.error("Error al obtener los beneficiarios:", error);
      }
    };

    fetchBeneficiarios();
  }, [db]);

  const redirect = (id) => {
    navigate(`/profile/${id}`);
  };

  // Filtrar beneficiarios según el término de búsqueda
  const filteredBeneficiarios = beneficiarios.filter((beneficiario) =>
    beneficiario.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-3xl text-center uppercase font-extrabold mb-6">User Page</h1>
      <div className="mt-4">
        <h2 className="text-2xl font-bold mb-6">Beneficiarios</h2>

        {/* Input para búsqueda */}
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 border rounded w-full mb-6 focus:ring focus:ring-blue-300"
        />

        {/* Lista de beneficiarios filtrados */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredBeneficiarios.map((beneficiario) => (
            <div key={beneficiario.id} className="p-6 border rounded-lg shadow-md bg-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">{beneficiario.nombre} {beneficiario.apellido}</h3>
                <button
                  onClick={() => redirect(beneficiario.id)}
                  className="rounded-md bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition"
                >
                  Perfil
                </button>
              </div>
              <p><strong>Edad:</strong> {beneficiario.edad}</p>
              <p><strong>Género:</strong> {beneficiario.genero}</p>
              <p><strong>Identificación:</strong> {beneficiario.identificacion}</p>
              <p><strong>Teléfono:</strong> {beneficiario.telefono}</p>
              <p><strong>Dirección:</strong> {beneficiario.direccion}</p>
              <p><strong>Estado Civil:</strong> {beneficiario.estadoCivil}</p>
              <p><strong>Dependientes:</strong> {beneficiario.dependientes}</p>
              <p><strong>Tiempo en Calle:</strong> {beneficiario.tiempoCalle}</p>
              {beneficiario.imagenUrl && (
                <div className="mt-4">
                  <strong>Imagen:</strong>
                  <div className="w-full h-32 overflow-hidden rounded-md">
                    <img
                      src={beneficiario.imagenUrl}
                      alt={`Foto de ${beneficiario.nombre}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mensaje si no hay resultados */}
        {filteredBeneficiarios.length === 0 && (
          <p className="text-center text-gray-500 mt-6">No se encontraron beneficiarios.</p>
        )}
      </div>
    </div>
  );
};

export default UserPage;
