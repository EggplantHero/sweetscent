import http from "../services/httpService";
const apiUrl = "https://pokeapi.co/api/v2/pokemon/";

export async function getPoke(input) {
  return await http.get(`${apiUrl}${input}`);
}

export async function getImg(input) {
  if (!input) return;
  const poke = await getPoke(input);
  return poke.data.sprites.front_default;
}

export async function getAllPokes() {
  return await http.get(`${apiUrl}?limit=2000`);
}
