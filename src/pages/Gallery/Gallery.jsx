import { useEffect, useState } from "react";
import { getTattoos } from "../../services/apiCalls";
import { TattooCard } from "../../common/TattooCard/TattooCard";

import "./Gallery.css";

export const Gallery = () => {
  const [tattoos, setTattoos] = useState([]);

  useEffect(() => {
    if (tattoos.length === 0) {
      getTattoos()
        .then((response) => {
          setTattoos(response.data);
          
        })
        .catch((error) => {
          console.error("Error fetching tattoos:", error);
        });
    }
  },);
  
  console.log(tattoos.Images)
 
  return (
    <div className="Gallery">
      {tattoos.length > 0 ? (
        <div className="tattooRoster">
          {tattoos.map((tattoo) => (
            <TattooCard key={tattoo.id} image={tattoo.image.image_url} />
          ))}
        </div>
      ) : (
        <div>Aún no han venido</div>
      )}
    </div>
  );
};