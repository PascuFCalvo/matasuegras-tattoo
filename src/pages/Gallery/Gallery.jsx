import { useEffect, useState } from "react";
import { getTattoos } from "../../services/apiCalls";
import { TattooCard } from "../../common/TattooCard/TattooCard";
import { FooterBlack } from "../../common/FooterBlack/FooterBlack";

import "./Gallery.css";

export const Gallery = () => {
  const [tattoos, setTattoos] = useState([]);

  useEffect(() => {
    if (tattoos.length === 0) {
      getTattoos()
        .then((response) => {
          setTattoos(response.data.Images);
        })
        .catch((error) => {
          console.error("Error fetching tattoos:", error);
        });
    }
  }, [tattoos.length]);

  // const images = tattoos.Images
  console.log(tattoos);

  return (
    <div>
      <div className="Gallery">
        {tattoos.length > 0 ? (
          <div className="tattooRoster">
            {tattoos.map((tattoo) => (
              <TattooCard key={tattoo.id} image={tattoo.image_url} />
            ))}
          </div>
        ) : (
          <div>Aún no han venido</div>
        )}
      </div>
      <FooterBlack />
    </div>
  );
};
