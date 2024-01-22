import axios from "axios";
import {getAccessToken} from "../utils"
const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1NiIsIkhldEhhblN0cmluZyI6IjI1LzA0LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcxNDAwMzIwMDAwMCIsIm5iZiI6MTY4MzMwNjAwMCwiZXhwIjoxNzE0MTUwODAwfQ.4kX1rB3Flu3UAMyzUxN5Iu1_zKMNahLuhAHkwdSzOx0";
export let https = axios.create({
  baseURL: "https://jiranew.cybersoft.edu.vn",
  headers: {
    TokenCybersoft: TOKEN_CYBERSOFT,
    Authorization: 'Bearer ' + getAccessToken(),
  },
  
});

// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1NiIsIkhldEhhblN0cmluZyI6IjAzLzA0LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcxMjEwMjQwMDAwMCIsIm5iZiI6MTY4MzMwNjAwMCwiZXhwIjoxNzEyMjUwMDAwfQ.YeDhc_oSixV2XtFPDzcpxFhBos5832JpQpndHNoqZLk";



