import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import firebase from '../firebase';
import { useState } from 'react';
import axios from 'axios';

const RegistartionUserPage = () => {
    const [imageUrl, setImageUrl] = useState(null);

    const validationSchema = Yup.object({
        nombre: Yup.string().required('El nombre es obligatorio'),
        apellido: Yup.string().required('El apellido es obligatorio'),
        edad: Yup.number().required('La edad es obligatoria').positive('Debe ser un número positivo').integer('Debe ser un número entero'),
        telefono: Yup.string().required('El teléfono es obligatorio'),
        direccion: Yup.string().required('La dirección es obligatoria'),
        dependientes: Yup.number().required('El número de dependientes es obligatorio').positive().integer(),
        tiempoCalle: Yup.string().required('El tiempo en situación de calle es obligatorio'),
        genero: Yup.string().required('El género es obligatorio'),
        estadoCivil: Yup.string().required('El estado civil es obligatorio'),
        identificacion: Yup.string().required('El número de identificación es obligatorio'),
        imagen: Yup.mixed().required('La imagen es obligatoria'),
    });

    const initialValues = {
        nombre: '',
        apellido: '',
        edad: '',
        genero: 'hombre',
        identificacion: '',
        telefono: '',
        direccion: '',
        estadoCivil: 'soltero',
        dependientes: '',
        tiempoCalle: '',
        imagen: null,
    };

    const uploadImageToImgBB = async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
                params: {
                    key: '39b7962cab3be3ea95d9a65b2f43aed5', // Reemplaza con tu API key de ImgBB
                },
            });

            if (response.data && response.data.data) {
                return response.data.data.url; // Retorna la URL de la imagen subida
            }
        } catch (error) {
            console.error('Error al subir la imagen a ImgBB:', error);
            throw error;
        }
    };

    const handleSubmit = async (values, { resetForm }) => {
    try {
        // Subir la imagen a ImgBB
        const imageUrl = await uploadImageToImgBB(values.imagen);

        // Crear el objeto de datos sin el campo "imagen" (que es un File)
        const beneficiarioData = {
            nombre: values.nombre,
            apellido: values.apellido,
            edad: values.edad,
            genero: values.genero,
            identificacion: values.identificacion,
            telefono: values.telefono,
            direccion: values.direccion,
            estadoCivil: values.estadoCivil,
            dependientes: values.dependientes,
            tiempoCalle: values.tiempoCalle,
            imagenUrl: imageUrl, // Solo guardamos la URL de la imagen
        };

        // Guardar los datos en Firestore
        const db = firebase.db;
        await db.collection("beneficiarios").add(beneficiarioData);

        alert("Beneficiario registrado correctamente");
        resetForm();
        setImageUrl(null); // Limpiar la imagen después de guardar
    } catch (error) {
        console.error("Error al guardar el beneficiario:", error);
        alert("Hubo un error al registrar el beneficiario.");
    }
};

    const handleImageChange = (event, setFieldValue) => {
        const file = event.currentTarget.files[0];
        setFieldValue("imagen", file);

        // Mostrar la imagen después de cargarla
        const reader = new FileReader();
        reader.onload = (e) => {
            setImageUrl(e.target.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className='pt-4'>
            <h1 className="text-3xl font-bold text-center uppercase">
                Registro beneficiario
            </h1>

            <div className='flex mt-10'>
                <div className='bg-blue-100 w-full px-5 py-5 mx-16 rounded-lg shadow-xl'>
                    <div className='rounded-md bg-yellsw-200 h-full w-full'>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ errors, touched, setFieldValue }) => (
                                <Form>
                                    <legend className='text-center uppercase font-bold pt-2 text-3xl' >
                                        Registro Inicial
                                    </legend>

                                    <div className='p-10'>
                                        <div className='md:flex md:gap-6'>
                                            <div className='mt-6 w-full h-full gap-3'>
                                                <label className='text-lg'>Nombre</label>
                                                <Field
                                                    className='w-full mt-2 rounded-md h-10 gap-3 p-2'
                                                    type='text'
                                                    name='nombre'
                                                    placeholder='Ingresa su nombre'
                                                />
                                                {errors.nombre && touched.nombre && (
                                                    <div className="text-red-500">{errors.nombre}</div>
                                                )}
                                            </div>
                                            <div className='mt-6 w-full h-full'>
                                                <label className='text-lg'>Apellido</label>
                                                <Field
                                                    className='w-full mt-2 rounded-md h-10 p-2'
                                                    type='text'
                                                    name='apellido'
                                                    placeholder='Ingresa su apellido'
                                                />
                                                {errors.apellido && touched.apellido && (
                                                    <div className="text-red-500">{errors.apellido}</div>
                                                )}
                                            </div>
                                        </div>

                                        <div className='md:flex md:gap-6'>
                                            <div className='mt-6 w-full h-full gap-3'>
                                                <label className='text-lg'>Edad</label>
                                                <Field
                                                    className='w-full mt-2 rounded-md h-10 gap-3 p-2'
                                                    type='text'
                                                    name='edad'
                                                    placeholder='Ingresa su edad'
                                                />
                                                {errors.edad && touched.edad && (
                                                    <div className="text-red-500">{errors.edad}</div>
                                                )}
                                            </div>
                                            <div className='mt-6 w-full h-full'>
                                                <label className='text-lg'>Genero</label>
                                                <Field
                                                    as="select"
                                                    className='w-full h-10 p-2 rounded-md bg-white mt-2'
                                                    name='genero'
                                                >
                                                    <option value="hombre">Hombre</option>
                                                    <option value="mujer">Mujer</option>
                                                    <option value="No Especificado">No Especificado</option>
                                                </Field>
                                                {errors.genero && touched.genero && (
                                                    <div className="text-red-500">{errors.genero}</div>
                                                )}
                                            </div>
                                        </div>

                                        <div className='md:flex md:gap-6'>
                                            <div className='mt-6 w-full h-full gap-3'>
                                                <label className='text-lg'>Numero de Identificación</label>
                                                <Field
                                                    className='w-full mt-2 rounded-md h-10 gap-3 p-2'
                                                    type='text'
                                                    name='identificacion'
                                                    placeholder='Ingresa su Numero de Identificación'
                                                />
                                                {errors.identificacion && touched.identificacion && (
                                                    <div className="text-red-500">{errors.identificacion}</div>
                                                )}
                                            </div>
                                            <div className='mt-6 w-full h-full'>
                                                <label className='text-lg'>Teléfono</label>
                                                <Field
                                                    className='w-full mt-2 rounded-md h-10 p-2'
                                                    type='text'
                                                    name='telefono'
                                                    placeholder='Ingresa su Numero Teléfonico'
                                                />
                                                {errors.telefono && touched.telefono && (
                                                    <div className="text-red-500">{errors.telefono}</div>
                                                )}
                                            </div>
                                        </div>

                                        <div className='md:flex md:gap-6'>
                                            <div className='mt-6 w-full h-full gap-3'>
                                                <label className='text-lg'>Dirección</label>
                                                <Field
                                                    className='w-full mt-2 rounded-md h-10 gap-3 p-2'
                                                    type='text'
                                                    name='direccion'
                                                    placeholder='Ingresa su Dirección'
                                                />
                                                {errors.direccion && touched.direccion && (
                                                    <div className="text-red-500">{errors.direccion}</div>
                                                )}
                                            </div>
                                            <div className='mt-6 w-full h-full'>
                                                <label className='text-lg'>Estado Cívil</label>
                                                <Field
                                                    as="select"
                                                    className='w-full h-10 p-2 rounded-md bg-white mt-2'
                                                    name='estadoCivil'
                                                >
                                                    <option value="soltero">Soltero(a)</option>
                                                    <option value="casado">Casado(a)</option>
                                                    <option value="viudo">Viudo(a)</option>
                                                    <option value="Divorciado">Divorciado(a)</option>
                                                </Field>
                                                {errors.estadoCivil && touched.estadoCivil && (
                                                    <div className="text-red-500">{errors.estadoCivil}</div>
                                                )}
                                            </div>
                                        </div>

                                        <div className='md:flex md:gap-6'>
                                            <div className='mt-6 w-full h-full gap-3'>
                                                <label className='text-lg'>Dependientes a Cargo</label>
                                                <Field
                                                    className='w-full mt-2 rounded-md h-10 gap-3 p-2'
                                                    type='text'
                                                    name='dependientes'
                                                    placeholder='Ingresa el numero de dependientes a cargo'
                                                />
                                                {errors.dependientes && touched.dependientes && (
                                                    <div className="text-red-500">{errors.dependientes}</div>
                                                )}
                                            </div>
                                            <div className='mt-6 w-full h-full'>
                                                <label className='text-lg'>Tiempo en situación de calle</label>
                                                <Field
                                                    className='w-full mt-2 rounded-md h-10 p-2'
                                                    type='text'
                                                    name='tiempoCalle'
                                                    placeholder='Ej. 5 meses'
                                                />
                                                {errors.tiempoCalle && touched.tiempoCalle && (
                                                    <div className="text-red-500">{errors.tiempoCalle}</div>
                                                )}
                                            </div>
                                        </div>

                                        <div className='mt-6 w-full h-full'>
                                            <label className='text-lg'>Imagen</label>
                                            <input
                                                type="file"
                                                onChange={(event) => handleImageChange(event, setFieldValue)}
                                                className='w-full mt-2 rounded-md h-10 p-2'
                                            />
                                            {errors.imagen && touched.imagen && (
                                                <div className="text-red-500">{errors.imagen}</div>
                                            )}
                                            {imageUrl && (
                                                <div className="mt-4">
                                                    <img src={imageUrl} alt="Preview" className="w-32 h-32 object-cover rounded-md" />
                                                </div>
                                            )}
                                        </div>

                                        <div className='mt-6'>
                                            <button
                                                type="submit"
                                                className="w-full bg-blue-500 text-white p-3 rounded-md"
                                            >
                                                Registrar
                                            </button>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistartionUserPage;