import { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../firebase";
import firebase from "../firebase";
import {useNavigate} from "react-router-dom"
//import {db} from ""

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

  const redirect = (id)=>{
    navigate(`/profile/${id}`)
   }

  // Filtrar beneficiarios según el término de búsqueda
  const filteredBeneficiarios = beneficiarios.filter((beneficiario) =>
    beneficiario.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    
    <div className="p-4">
      <h1 className="text-2xl text-center uppercase font-bold">User Page</h1>
      <div className="mt-4">
        
        <h2 className="text-xl font-bold mb-4">Beneficiarios</h2>

        {/* Input para búsqueda */}
        
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded w-full mb-4"
        />
        

        {/* Lista de beneficiarios filtrados */}
        <ul className="mt-1">
          <div></div>
          {filteredBeneficiarios.map((beneficiario) => (
          
          <li key={beneficiario.id} className="p-6 border-b">
              <div className="">


                <div className="" style={{
                
                position:"fixed",
                right:"40px",
                
              }}><button onClick={()=>redirect(beneficiario.id)} className="rounded-md w-40 bg-blue-500 text-white p-3 " >Perfil</button> 
        
        
        
        </div>


              <p>
                <strong>Nombre:</strong> {beneficiario.nombre}
              </p>
              <p>
                <strong>Apellido:</strong> {beneficiario.apellido}
              </p>
              </div>
              
            </li>
          ))}
        </ul>

        {/* Mensaje si no hay resultados */}
        {filteredBeneficiarios.length === 0 && (
          <p className="text-center text-gray-500">No se encontraron beneficiarios.</p>
        )}
      </div>
    </div>
  );
};

export default UserPage;
