import React, { useEffect, useState } from 'react';
import {LayersControl, Polyline, TileLayer, useMapEvents } from 'react-leaflet';
import newGeoPoints from "../data/gson1.json";
import vautourGeopoints from "../data/vs1pr-ti115.json";
//import vautourGeopoints from "../data/geo-location.json";
import Tracker from './Tracker';


let cursor = 0;


const Layers = ({data}) => {

     const [animalData, setAnimalData] = useState(newGeoPoints);
     const [vautourData, setvautourData] = useState(vautourGeopoints);
    
     const [currentTrack, setCurrentTrack] = useState({
        "DecimalLatitude": 22.2974883,
        "DecimalLongitude": 73.2067383,
        "speed": 17.2786,
        "altitude": 47,
        "devicetime": "2022-03-31T20:28:46.000Z",
        "color": "red"
      });
    
      console.log(data);
    //  useEffect(() => {
    //    setCurrentTrack(vautourGeopoints[cursor]);
       
    //    const interval = setInterval(() => {
    //      if (cursor === vautourGeopoints.length - 1) {
    //        cursor = 0;
    //        setCurrentTrack(vautourGeopoints[cursor]);
    //        return;
    //      }
    //      cursor += 1;
    //      setCurrentTrack(vautourGeopoints[cursor]);
         
         
    //    }, 1000);
    //    return () => {
    //      clearInterval(interval);
    //    };
    //  }, []);
    


    // const map = useMapEvents({
    //     zoomend: () => {
    //       console.log(map.getZoom())
    //     },
    //     moveend: () => {
    //       console.log(map.getBounds())
    //     }
    //   });

  return (
    
    <LayersControl position="topright">
    <LayersControl.BaseLayer key='1' checked name="Basic Map">
      <TileLayer key='1' 
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </LayersControl.BaseLayer>
    <LayersControl.BaseLayer key='2' name="Topo Map">
      <TileLayer key="2"
        attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
      />
    </LayersControl.BaseLayer>
    {/* <Polyline positions={newGeoPoints} color="red" /> */}
      {data.map((ani) => {
        const geojson = ani.coord;
        const animalName = ani.name;
        return(
            <LayersControl.Overlay key={data.id} checked name={animalName}>
                <Polyline key={data.id} positions={geojson} />
            </LayersControl.Overlay>
        )})};

        {/* {vautourData.map((data) => {

            return(
                <LayersControl.Overlay checked name='vautourDeThomas'>
                    <Marker position={[data.DecimalLatitude,data.DecimalLongitude]}>
                        <Popup>
                            A pretty CSS3 popup
                        </Popup>
                    </Marker>
                </LayersControl.Overlay>
            )})}; */}
        {/* <LayersControl.Overlay checked name="vautourdeThomas">
             <Tracker data={currentTrack}/>  
            <Polyline positions={jean} weight={0.5} color="red" />
        </LayersControl.Overlay> */}
        
  </LayersControl>
  )
}

export default Layers