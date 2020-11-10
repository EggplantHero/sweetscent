import http from "./httpService";

const apiEndpoint = "/users";

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.username.toLowerCase(),
    password: user.password,
    name: user.name,
  });
}
