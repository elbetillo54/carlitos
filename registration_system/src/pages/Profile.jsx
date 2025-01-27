import React, { useContext, useEffect, useState } from "react";
import {useParams} from "react-router-dom"
import { doc,getDoc } from "firebase/firestore";
import firebase from "../firebase";


const Profile = ()=> {
    const {id} =useParams();
    const [bene, setbene]= useState(null)
    const [load,setload]=useState(true);

    useEffect(()=>{
        const loadbene = async () =>{
            if (!id) return;
            const docRef = doc(firebase.db, "beneficiarios",id)
            const docSnap = await getDoc(docRef);

            if(docSnap.exists()){
                setbene(docSnap.data())
            }else{
                console.error("No se encuantra la informacion")
            }
            setload(false);
        };
        loadbene();
    },[id])

    if(load){
        return<p>Crgando la informacion...</p>
    }

    if(!bene){
        return<p>No se encontraron los datos</p>
    }
    return(
        <div>
         <h2>nombre{beneficiario.nombre}</h2>
         <h2>apellido{beneficiario.apellido}</h2>
        </div>
    )
}


export default Profile
