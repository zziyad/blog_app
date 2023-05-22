import { makeRequest } from "./makeRequest";


export async function getPosts(param) {
  return makeRequest('post', 'getPosts', param);
}

export async function getPost(id) {
  return makeRequest('post', 'getPost', id);
}