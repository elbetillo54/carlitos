import firebase, { FirebaseContext } from "./firebase/index";
import { Router, Routes, Route } from "react-router-dom";
import RegistartionUserPage from "./pages/RegistartionUserPage";
import UserPage from "./pages/UserPage";
import Profile  from "./pages/Profile"
import Services from "./pages/Services";



function App() {
  // Esquema de validación con Yup
  return (
    
    <FirebaseContext.Provider value={{ firebase }}>
      <div>
        <Services />
      </div>
    </FirebaseContext.Provider>
    
  );
}

export default App;
