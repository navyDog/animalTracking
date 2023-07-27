import React, { useState } from 'react'
import vautourGeopoints from "../data/vs1pr-ti115.json";
import axios from 'axios';

const jean = [];
const jeanD = [];
vautourGeopoints.map((e) => {    
    jean.push([Number(e.DecimalLatitude),Number(e.DecimalLongitude)]);
    jeanD.push(Date(e['Date(UTC)']));
    });
    // console.log(jean);
    // console.log(jeanD);
const CreateAnimal = () => {

    const [values, setValues] = useState({
        name: 'tepu1904',
        type: 'vautour',
        date: jeanD,
        coord: jean 
    });
    // setValues({...values, coord: jean});

    axios.defaults.withCredentials = true;
    const [error, setError] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log(values);
        axios.post('http://localhost:3000/api/animal/', values)
         .then(res => {
            console.log(res);
            alert(res.data.message);
        }).catch(err => {
            console.log(err);
            setError(err);
        });
    }


  return (
    <div>            
        <form onSubmit={handleSubmit}>
             <h2>Sign up</h2>
            <button>Sign up</button>
        </form>
    </div>
  )
}

export default CreateAnimal