import http from "./httpService";

const apiEndpoint = "/pokemon";

export function pokeUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getPokes() {
  return http.get(apiEndpoint);
}

export function getPoke(pokeId) {
  return http.get(pokeUrl(pokeId));
}

export function saveNewPoke(poke) {
  return http.post(apiEndpoint, poke);
}

export function savePoke(poke) {
  let body = { ...poke };
  delete body._id;
  return http.put(pokeUrl(poke._id), body);
}

export function deletePoke(pokeId) {
  return http.delete(pokeUrl(pokeId));
}
