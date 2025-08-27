// src/api.js
import axios from 'axios';

// Atenção: substitua pelo IP da sua máquina na mesma rede do celular/Expo Go000000.
// Ex.: http://192.168.0.10:3000
export const API_BASE_URL = 'http://192.168.1.27.:3000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
  headers: { 'Content-Type': 'application/json' },
});
