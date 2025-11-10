import { useEffect, useState } from "react";
import type { Character, Homeworld, Species } from "../api/swapi";
import formatDate from "../utils/formatDate";
import { getHomeworld, getSpecies } from "../api/swapi";
import getCharacterImage from "../utils/getCharacterImage";
import getSpeciesColor from "../utils/getSpeciesColor";

interface CharacterModalProps {
  character: Character | null;
  isOpen: boolean;
  onClose: () => void;
}

const CharacterModal = ({
  character,
  isOpen,
  onClose,
}: CharacterModalProps) => {
  const [homeworld, setHomeworld] = useState<Homeworld | null>(null);
  const [loadingHomeworld, setLoadingHomeworld] = useState(false);
  const [homeworldError, setHomeworldError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const [speciesName, setSpeciesName] = useState<string | null>(null);

  const fetchHomeworld = async () => {
    if (isOpen && character && character.homeworld) {
      setLoadingHomeworld(true);
      setHomeworldError(null);

      try {
        const data = await getHomeworld(character.homeworld);
        setHomeworld(data);
      } catch (err) {
        setHomeworldError(
          err instanceof Error ? err.message : "Failed to load homeworld"
        );
      } finally {
        setLoadingHomeworld(false);
      }
    } else {
      setHomeworld(null);
      setHomeworldError(null);
    }
  };

  useEffect(() => {
    fetchHomeworld();
  }, [isOpen, character?.url, character?.homeworld]);

  useEffect(() => {
    const fetchSpecies = async () => {
      if (character && character.species.length > 0) {
        try {
          const data: Species = await getSpecies(character.species[0]);
          setSpeciesName(data.name);
        } catch (error) {
          setSpeciesName(null);
        }
      } else {
        setSpeciesName(null);
      }
    };

    if (isOpen && character) {
      fetchSpecies();
    }
  }, [isOpen, character?.url, character?.species[0] || ""]);

  if (!isOpen || !character) {
    return null;
  }

  const heightInMeters =
    character.height !== "unknown"
      ? (parseFloat(character.height) / 100).toFixed(2)
      : "unknown";

  const imageUrl = getCharacterImage(character.name);
  const speciesGradient = speciesName ? getSpeciesColor([speciesName]) : null;
  const hasSpecies = speciesGradient !== null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4"
      onClick={onClose}
      data-testid="modal-backdrop"
    >
      <div
        data-testid="character-modal"
        className="bg-white max-w-2xl w-full max-h-[90vh] sm:max-h-[95vh] overflow-hidden rounded-lg sm:rounded-xl shadow-2xl border-2 sm:border-4 border-gray-300 mx-2 sm:mx-0"
        onClick={(e) => e.stopPropagation()}
      >
        {hasSpecies && (
          <div
            className={`h-0.5 sm:h-1 bg-gradient-to-r ${speciesGradient}`}
          ></div>
        )}

        <div
          className={`bg-gradient-to-r from-gray-800 to-gray-900 text-white relative overflow-hidden`}
        >
          {hasSpecies && (
            <div
              className={`absolute inset-0 bg-gradient-to-br ${speciesGradient} opacity-20`}
            ></div>
          )}
          <div className="relative p-3 sm:p-4 md:p-5 flex items-center gap-2 sm:gap-3 md:gap-4">
            <div
              className={`w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 md:border-4 ${
                hasSpecies
                  ? "border-white/30 bg-gradient-to-br " + speciesGradient
                  : "border-gray-300 bg-gray-200"
              } flex-shrink-0 shadow-lg`}
            >
              {imageError ? (
                <div
                  className={`w-full h-full flex items-center justify-center ${
                    hasSpecies
                      ? `bg-gradient-to-br ${speciesGradient}`
                      : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`${
                      hasSpecies ? "text-white" : "text-gray-600"
                    } text-base sm:text-xl md:text-2xl font-bold`}
                  >
                    {character.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              ) : (
                <img
                  src={imageUrl}
                  alt={character.name}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight truncate">
                {character.name}
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 mt-0.5 sm:mt-1">
                Character Details
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white text-xl sm:text-2xl md:text-3xl font-bold w-8 h-8 sm:w-9 sm:h-9 md:w-8 md:h-9 flex items-center justify-center  duration-200 flex-shrink-0 cursor-pointer "
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-3 sm:p-4 md:p-6 bg-gradient-to-b from-white to-gray-50 overflow-y-auto max-h-[calc(90vh-120px)] sm:max-h-[calc(90vh-160px)] md:max-h-[calc(90vh-200px)] scrollbar-hide">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
            <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
              <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide mb-1 sm:mb-2 font-semibold">
                Height
              </p>
              <p className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
                {heightInMeters} m
              </p>
            </div>

            <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
              <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide mb-1 sm:mb-2 font-semibold">
                Mass
              </p>
              <p className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
                {character.mass} kg
              </p>
            </div>

            <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
              <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide mb-1 sm:mb-2 font-semibold">
                Date Added
              </p>
              <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 break-words">
                {formatDate(character.created)}
              </p>
            </div>

            <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
              <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide mb-1 sm:mb-2 font-semibold">
                Number of Films
              </p>
              <p className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
                {character.films.length}
              </p>
            </div>

            <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
              <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide mb-1 sm:mb-2 font-semibold">
                Birth Year
              </p>
              <p className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
                {character.birth_year}
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-3 sm:p-4 md:p-5 rounded-lg border border-blue-200 shadow-sm hover:shadow-md transition-shadow duration-200 sm:col-span-2">
              <p className="text-[10px] sm:text-xs text-blue-600 uppercase tracking-wide mb-2 sm:mb-3 font-bold">
                Homeworld
              </p>
              {loadingHomeworld ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-blue-600"></div>
                  <p className="text-xs sm:text-sm text-gray-600">Loading...</p>
                </div>
              ) : homeworldError ? (
                <p className="text-xs sm:text-sm text-red-600 font-medium break-words">
                  {homeworldError}
                </p>
              ) : homeworld ? (
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-1.5 sm:pb-2 border-b border-blue-200 gap-1 sm:gap-0">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium">
                      Name:
                    </span>
                    <span className="text-sm sm:text-base font-bold text-gray-900 break-words">
                      {homeworld.name}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-1.5 sm:py-2 border-b border-blue-200 gap-1 sm:gap-0">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium">
                      Terrain:
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-gray-800 break-words">
                      {homeworld.terrain}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-1.5 sm:py-2 border-b border-blue-200 gap-1 sm:gap-0">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium">
                      Climate:
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-gray-800 break-words">
                      {homeworld.climate}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-1.5 sm:pt-2 gap-1 sm:gap-0">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium">
                      Population:
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-gray-800 break-words">
                      {homeworld.population}
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-xs sm:text-sm text-gray-500">
                  Not available
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CharacterModal;
