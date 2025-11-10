import { useEffect, useState } from "react";
import { getSpecies, type Character, type Species } from "../api/swapi";
import getCharacterImage from "../utils/getCharacterImage";
import getSpeciesColor from "../utils/getSpeciesColor";

interface CharacterCardProps {
  character: Character;
  onClick: () => void;
}

const CharacterCard = ({ character, onClick }: CharacterCardProps) => {
  const [imageError, setImageError] = useState(false);
  const [speciesName, setSpeciesName] = useState("Unknown");
  const imageUrl = getCharacterImage(character.name);

  const fetchSpecies = async () => {
    if (character.species.length > 0) {
      try {
        const data: Species = await getSpecies(character.species[0]);
        setSpeciesName(data.name);
      } catch {
        setSpeciesName("Unknown");
      }
    } else {
      setSpeciesName("Unknown");
    }
  };

  useEffect(() => {
    fetchSpecies();
  }, [character.url, character.species[0] || ""]);

  const speciesGradient = getSpeciesColor([speciesName]);

  return (
    <div
      onClick={onClick}
      className={`border-2 border-black/20 rounded-xl cursor-pointer overflow-hidden shadow-lg
        hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 transform group
        ${
          speciesGradient
            ? `bg-gradient-to-br ${speciesGradient} text-black`
            : "bg-white text-black"
        }`}
    >
      <div className="h-48 relative overflow-hidden">
        {imageError ? (
          <div className="w-full h-full flex items-center justify-center bg-white">
            <span className="text-black text-4xl font-bold drop-shadow-lg">
              {character.name.charAt(0).toUpperCase()}
            </span>
          </div>
        ) : (
          <>
            <img
              src={imageUrl}
              alt={character.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              onError={() => setImageError(true)}
            />

            <div className="absolute inset-0 bg-white/10 group-hover:bg-white/5 transition-opacity duration-300"></div>
          </>
        )}
      </div>

      <div className="p-5 relative">
        <div className="relative z-10">
          <h3 className="text-lg font-bold mb-3 tracking-tight drop-shadow-md">
            {character.name}
          </h3>
          <div className="text-sm space-y-2">
            <div className="flex items-center justify-between py-1.5 border-b border-black/20">
              <span className="font-medium">Gender:</span>
              <span className="capitalize font-semibold">
                {character.gender || "N/A"}
              </span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-black/20">
              <span className="font-medium">Birth Year:</span>
              <span className="font-semibold">{character.birth_year}</span>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <span className="font-medium">Height:</span>
              <span className="font-semibold">{character.height} cm</span>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <span className="font-medium">Species:</span>
              <span className="font-semibold">{speciesName}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
