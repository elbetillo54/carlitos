import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import firebase from '../firebase';

const RegistartionUserPage = () => {

    const validationSchema = Yup.object({
        nombre: Yup.string().required('El nombre es obligatorio'),
        apellido: Yup.string().required('El apellido es obligatorio'),
        edad: Yup.number().required('La edad es obligatoria').positive('Debe der un numero positivo').integer('Debe de ser un numero entero'),
        telefono: Yup.string().required('El teléfono es obligatorio'),
        direccion: Yup.string().required('La dirección es obligatoria'),
        dependientes: Yup.number().required('El número de dependientes es obligatorio').positive().integer(),
        tiempoCalle: Yup.string().required('El tiempo en situación de calle es obligatorio'),
        genero: Yup.string().required('El género es obligatorio'),
        estadoCivil: Yup.string().required('El estado civil es obligatorio'),
        identificacion: Yup.string().required('El número de identificación es obligatorio'),
    });

    // Valores iniciales para el formulario
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
    };

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const db = firebase.db;
            await db.collection("beneficiarios").add(values);
            alert("Beneficiario registrado correctamente");
            resetForm();
        } catch (error) {
            console.error("Error al guardar el beneficiario:", error);
            alert("Hubo un error al registrar el beneficiario.");
        }
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
                            {({ errors, touched }) => (
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
                                                <label className='text-lg'>Dependinetes a Cargo</label>
                                                <Field
                                                    className='w-full mt-2 rounded-md h-10 gap-3 p-2'
                                                    type='text'
                                                    name='dependientes'
                                                    placeholder='Ingresa el numero de dependinetes a cargo'
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


}

export default RegistartionUserPage;