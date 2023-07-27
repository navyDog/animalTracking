import { useEffect, useState } from "react";
import { LeafletTrackingMarker } from "react-leaflet-tracking-marker";
import L, { Popup } from "leaflet";
import eagle from "../assets/eagle.png";



const icon = L.icon({
  iconSize: [45, 45],
  popupAnchor: [2, -20],
  iconUrl: eagle
});



const Tracker = ({ data }) => {
    // data =        {
    //     "lat": 22.2974883,
    //     "lng": 73.2067383,
    //     "speed": 17.2786,
    //     "altitude": 47,
    //     "devicetime": "2022-03-31T20:28:46.000Z",
    //     "color": "red"
    //   }
    const { DecimalLatitude, DecimalLongitude } = data;
    const lat = DecimalLatitude; 
    const lng = DecimalLongitude;
    const [prevPos, setPrevPos] = useState([lat, lng]);
  
    useEffect(() => {
      if (prevPos[1] !== lng && prevPos[0] !== lat) setPrevPos([lat, lng]);
    }, [lat, lng, prevPos]);
    return (
        <LeafletTrackingMarker
          icon={icon}
          position={[lat, lng]}
          previousPosition={prevPos}
          duration={1000}
          keepAtCenter={true}
        />
    );



}

export default Tracker