import { useState, useEffect, useCallback } from "react";
import { getListOfCharacters } from "../api/swapi";
import type { CharactersResponse, Character } from "../api/swapi";

export const useFetchCharactersPage = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [next, setNext] = useState<string | null>(null);
  const [previous, setPrevious] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPage = useCallback(async (page: number) => {
    try {
      setLoading(true);
      setError(null);
      const data: CharactersResponse = await getListOfCharacters(page);
      setCharacters(data.results);
      setNext(data.next);
      setPrevious(data.previous);
      setCurrentPage(page);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch characters");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPage(1);
  }, [fetchPage]);

  return {
    characters,
    next,
    previous,
    currentPage,
    loading,
    error,
    fetchPage,
  };
};

export default useFetchCharactersPage;
