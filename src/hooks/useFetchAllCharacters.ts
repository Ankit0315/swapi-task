import { useEffect, useState, useCallback } from "react";
import { getAllCharacters } from "../api/swapi";
import type { Character } from "../api/swapi";

export const useFetchAllCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllCharacters = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const allCharacters = await getAllCharacters();
      setCharacters(allCharacters);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch characters";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllCharacters();
  }, [fetchAllCharacters]);

  return { characters, loading, error, refetch: fetchAllCharacters };
};

export default useFetchAllCharacters;
