import { useState, useCallback, useMemo } from "react";
import type { Character } from "../api/swapi";
import CharacterCard from "../components/CharacterCard";
import CharacterModal from "../components/CharacterModal";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import Search from "../components/Search";
import useFetchCharacters from "../hooks/useFetchCharacters";

interface CharactersPageProps {
  isAuthenticated: boolean;
  username: string | null;
  onLoginClick: () => void;
  onLogout: () => void;
}

const CharactersPage = ({
  isAuthenticated,
  username,
  onLoginClick,
  onLogout,
}: CharactersPageProps) => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { characters, next, previous, currentPage, loading, error, fetchPage } =
    useFetchCharacters();

  const filteredCharacters = useMemo(() => {
    if (!searchQuery.trim()) {
      return characters;
    }
    const query = searchQuery.toLowerCase();
    return characters.filter((c) => c.name.toLowerCase().includes(query));
  }, [characters, searchQuery]);

  const handleCharacterClick = useCallback((character: Character) => {
    setSelectedCharacter(character);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedCharacter(null);
  }, []);

  const handleNextPage = useCallback(() => {
    if (next) {
      const nextPage = new URL(next).searchParams.get("page");
      if (nextPage) fetchPage(parseInt(nextPage, 10));
    }
  }, [next, fetchPage]);

  const handlePreviousPage = useCallback(() => {
    if (previous) {
      const prevPage = new URL(previous).searchParams.get("page");
      if (prevPage) fetchPage(parseInt(prevPage, 10));
    }
  }, [previous, fetchPage]);

  const handleRetry = useCallback(() => {
    fetchPage(currentPage);
  }, [fetchPage, currentPage]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Star Wars Characters</h1>
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <span className="text-sm">Welcome, {username}</span>
              <button
                onClick={onLogout}
                className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="px-3 py-1 bg-yellow-400 text-gray-900 text-sm rounded hover:bg-yellow-500 transition-colors cursor-pointer"
            >
              Login
            </button>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {loading ? (
          <Loader />
        ) : error ? (
          <div className="text-center py-12">
            <ErrorMessage message={error} onRetry={handleRetry} />
          </div>
        ) : (
          <>
            <Search value={searchQuery} onChange={setSearchQuery} />

            {filteredCharacters.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No characters found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredCharacters.map((character: Character) => (
                  <CharacterCard
                    key={character.url}
                    character={character}
                    onClick={() => handleCharacterClick(character)}
                  />
                ))}
              </div>
            )}
          </>
        )}

        <div className="flex justify-center items-center mt-6 gap-4">
          <button
            onClick={handlePreviousPage}
            disabled={!previous || loading}
            className={`px-4 py-2 rounded border ${
              previous && !loading
                ? "bg-gray-200 hover:bg-gray-300 cursor-pointer"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Previous
          </button>

          <span className="text-sm font-medium text-gray-700">
            Page {currentPage}
          </span>

          <button
            onClick={handleNextPage}
            disabled={!next || loading}
            className={`px-4 py-2 rounded border ${
              next && !loading
                ? "bg-gray-200 hover:bg-gray-300 cursor-pointer"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Next
          </button>
        </div>
      </main>

      <CharacterModal
        character={selectedCharacter}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default CharactersPage;
