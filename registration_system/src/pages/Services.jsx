import { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import firebase from "../firebase";

const Services = () => {
  const [servicios, setServicios] = useState([]);
  const [editService, setEditService] = useState(null);

  // Esquema de validación con Yup
  const validationSchema = Yup.object({
    nombreServicio: Yup.string().required("El nombre del servicio es obligatorio"),
    descripcion: Yup.string().required("La descripción es obligatoria"),
  });

  // Valores iniciales del formulario
  const initialValues = {
    nombreServicio: "",
    descripcion: "",
  };

  // Generar un ID único manualmente
  const generateUniqueId = () => {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 10000);
    return `servicio-${timestamp}-${randomNum}`;
  };

  // Manejar el envío del formulario
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const db = firebase.db;

      if (editService) {
        // Actualizar servicio existente
        await db.collection("servicios").doc(editService.id).update(values);
        alert("Servicio actualizado correctamente");
        setEditService(null);
      } else {
        // Agregar nuevo servicio
        const id = generateUniqueId();
        await db.collection("servicios").doc(id).set({ id, ...values });
        alert("Servicio agregado correctamente");
      }

      resetForm();
      fetchServices();
    } catch (error) {
      console.error("Error al guardar el servicio:", error);
      alert("Hubo un error al registrar o actualizar el servicio.");
    }
  };

  // Eliminar un servicio
  const handleDelete = async (id) => {
    try {
      const db = firebase.db;
      await db.collection("servicios").doc(id).delete();
      alert("Servicio eliminado correctamente");
      fetchServices();
    } catch (error) {
      console.error("Error al eliminar el servicio:", error);
      alert("Hubo un error al eliminar el servicio.");
    }
  };

  // Editar un servicio
  const handleEdit = (servicio) => {
    setEditService(servicio);
  };

  // Obtener los servicios desde Firebase
  const fetchServices = async () => {
    try {
      const db = firebase.db;
      const snapshot = await db.collection("servicios").get();
      const serviciosData = snapshot.docs.map((doc) => doc.data());
      setServicios(serviciosData);
    } catch (error) {
      console.error("Error al obtener los servicios:", error);
    }
  };

  // Obtener los servicios al montar el componente
  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {/* Formulario del lado izquierdo */}
      <div>
        <h1 className="text-3xl font-bold text-center uppercase mb-6">
          {editService ? "Editar Servicio" : "Gestión de Servicios"}
        </h1>
        <Formik
          initialValues={editService || initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ errors, touched }) => (
            <Form className="max-w-lg mx-auto">
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Nombre del Servicio</label>
                <Field
                  name="nombreServicio"
                  type="text"
                  placeholder="Nombre del servicio"
                  className={`w-full p-2 border rounded ${
                    errors.nombreServicio && touched.nombreServicio
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {errors.nombreServicio && touched.nombreServicio && (
                  <p className="text-red-500 text-sm mt-1">{errors.nombreServicio}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Descripción</label>
                <Field
                  name="descripcion"
                  as="textarea"
                  placeholder="Descripción del servicio"
                  className={`w-full p-2 border rounded ${
                    errors.descripcion && touched.descripcion
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {errors.descripcion && touched.descripcion && (
                  <p className="text-red-500 text-sm mt-1">{errors.descripcion}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                {editService ? "Actualizar Servicio" : "Guardar Servicio"}
              </button>
              {editService && (
                <button
                  type="button"
                  onClick={() => setEditService(null)}
                  className="w-full mt-2 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
                >
                  Cancelar
                </button>
              )}
            </Form>
          )}
        </Formik>
      </div>

      {/* Lista de servicios del lado derecho */}
      <div>
        <h2 className="text-3xl font-bold text-center uppercase mb-6">
          Lista de Servicios
        </h2>
        {servicios.length === 0 ? (
          <p className="text-center text-gray-500">No hay servicios registrados</p>
        ) : (
          <ul className="space-y-4">
            {servicios.map((servicio) => (
              <li
                key={servicio.id}
                className="p-4 border rounded shadow-sm bg-white hover:bg-gray-50"
              >
                <h3 className="text-lg font-bold">{servicio.nombreServicio}</h3>
                <p className="text-sm text-gray-600">{servicio.descripcion}</p>
                <div className="mt-2 flex gap-4">
                  <button
                    onClick={() => handleEdit(servicio)}
                    className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(servicio.id)}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Services;
