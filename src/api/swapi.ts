import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "https://swapi.dev/api";

export interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export interface CharactersResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Character[];
}

export interface Homeworld {
  name: string;
  terrain: string;
  climate: string;
  population: string;
}

export interface Species {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  skin_colors: string;
  hair_colors: string;
  eye_colors: string;
  average_lifespan: string;
  homeworld: string | null;
  language: string;
  people: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export interface Film {
  title: string;
  episode_id: number;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  url: string;
}

export async function getListOfCharacters(
  page: number = 1
): Promise<CharactersResponse> {
  try {
    const response = await axios.get(`${API_URL}/people/?page=${page}`);
    return response.data;
  } catch (error) {
    toast.error("Failed to fetch characters");
    throw error;
  }
}

export async function getHomeworld(url: string): Promise<Homeworld> {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    toast.error("Failed to fetch homeworld");
    throw error;
  }
}

export async function getSpecies(url: string): Promise<Species> {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    toast.error("Failed to fetch species");
    throw error;
  }
}

export async function getAllCharacters(): Promise<Character[]> {
  try {
    const allCharacters: Character[] = [];
    let nextUrl: string | null = `${API_URL}/people/`;

    while (nextUrl) {
      const response: { data: CharactersResponse } =
        await axios.get<CharactersResponse>(nextUrl);
      const data = response.data;
      allCharacters.push(...data.results);
      nextUrl = data.next;
    }

    return allCharacters;
  } catch (error) {
    toast.error("Failed to fetch all characters");
    throw error;
  }
}
export async function getFilm(url: string): Promise<Film> {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    toast.error("Failed to fetch film");
    throw error;
  }
}

export async function getAllFilms(): Promise<Film[]> {
  try {
    const allFilms: Film[] = [];
    let nextUrl: string | null = `${API_URL}/films/`;

    while (nextUrl) {
      const response: { data: { results: Film[]; next: string | null } } =
        await axios.get<{ results: Film[]; next: string | null }>(nextUrl);
      allFilms.push(...response.data.results);
      nextUrl = response.data.next;
    }

    return allFilms;
  } catch (error) {
    toast.error("Failed to fetch films");
    throw error;
  }
}

export async function getAllSpecies(): Promise<Species[]> {
  try {
    const allSpecies: Species[] = [];
    let nextUrl: string | null = `${API_URL}/species/`;

    while (nextUrl) {
      const response: { data: { results: Species[]; next: string | null } } =
        await axios.get<{ results: Species[]; next: string | null }>(nextUrl);
      allSpecies.push(...response.data.results);
      nextUrl = response.data.next;
    }

    return allSpecies;
  } catch (error) {
    toast.error("Failed to fetch species");
    throw error;
  }
}

export async function getAllPlanets(): Promise<Homeworld[]> {
  try {
    const allPlanets: Homeworld[] = [];
    let nextUrl: string | null = `${API_URL}/planets/`;

    while (nextUrl) {
      const response: { data: { results: Homeworld[]; next: string | null } } =
        await axios.get<{ results: Homeworld[]; next: string | null }>(nextUrl);
      allPlanets.push(...response.data.results);
      nextUrl = response.data.next;
    }

    return allPlanets;
  } catch (error) {
    toast.error("Failed to fetch planets");
    throw error;
  }
}
