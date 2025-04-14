// lib/userData.js

import { getToken } from './authenticate';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchWithAuth(url, method = 'GET') {
  const res = await fetch(url, {
    method,
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  });

  return res.status === 200 ? res.json() : [];
}

export async function getFavourites() {
  return fetchWithAuth(`${API_URL}/favourites`);
}

export async function addToFavourites(id) {
  return fetchWithAuth(`${API_URL}/favourites/${id}`, 'PUT');
}

export async function removeFromFavourites(id) {
  return fetchWithAuth(`${API_URL}/favourites/${id}`, 'DELETE');
}

export async function getHistory() {
  return fetchWithAuth(`${API_URL}/history`);
}

export async function addToHistory(id) {
  return fetchWithAuth(`${API_URL}/history/${id}`, 'PUT');
}

export async function removeFromHistory(id) {
  return fetchWithAuth(`${API_URL}/history/${id}`, 'DELETE');
}
