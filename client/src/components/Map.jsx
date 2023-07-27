import React, { useEffect, useState } from 'react';
import {MapContainer, ZoomControl } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import Layers from './Layers';
import axios from 'axios';

const Map = () => {



  const [animals, setAnimals] = useState();
  const [checkedState, setCheckedState] = useState([]);
  const [data, setData] = useState([]);

  const updateData = () => {
    console.log('prout');
    setData([]);
     animals.map((animal,index) => {
       if (checkedState[index]==true) {
         setData(oldArray => [...oldArray, animal]);
       }
     })
}; 

console.log(checkedState);
  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };


  useEffect(() => {
    axios.get('http://localhost:3000/api/animal/')
    .then(animals => {
      setAnimals(animals.data);
      setCheckedState(new Array(animals.data.length).fill(false));
    })
    .catch(err => console.log(err))

  }, []);
  


  return (
<section>
	<div className="dark:bg-violet-400">
		<div className="container flex flex-col items-center px-4 py-16 pb-24 mx-auto text-center lg:pb-56 md:py-32 md:px-10 lg:px-32 dark:text-gray-900">
			<h1 className="text-5xl font-bold leadi sm:text-6xl xl:max-w-3xl dark:text-gray-900">Animal Tracking</h1>
			<p className="mt-6 mb-8 text-lg sm:mb-12 xl:max-w-3xl dark:text-gray-900">Phase test alpha tango </p>
			<div className="flex flex-wrap justify-center">
      <div>
      {animals && animals.map((animal,index) => (
            <div key={index} className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
            <input
              type="checkbox"
              id="checkboxDefault" 
              checked={checkedState[index]}
              onChange={() => handleOnChange(index)}
              />
            <label
              className="inline-block pl-[0.15rem] hover:cursor-pointer"
              htmlFor="checkboxDefault">
              {animal.name}
            </label>
          </div>
        ))}
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={updateData}>
          Button
        </button>
        </div>

        
			</div>
		</div>
	</div>
	<div className="w-5/6 mx-auto mb-12 -mt-20 rounded-lg shadow-md lg:-mt-40 dark:bg-gray-500">
  <MapContainer className="w-5/6 mx-auto mb-12 -mt-20 rounded-lg shadow-md lg:-mt-40 dark:bg-gray-500"
    center={[51.5, -0.02]} 
    zoom={11} 
    zoomControl={false} 
    style={{ height: '100vh', width: '100%' }}
  >
    <Layers data={data} />
    <ZoomControl position='topright'/>
  </MapContainer>
  </div>
</section>




  )
}

export default Map