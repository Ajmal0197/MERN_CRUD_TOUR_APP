import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

//will be accessed by this middleware in api -> server/middlewares/auth.js
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const signIn = (formData) => API.post("/users/signin", formData);

export const signUp = (formData) => API.post("/users/signup", formData);

export const googleSignIn = (res) => API.post("/users/googleSignIn", res);

export const createTour = (tourData) => API.post("/tour", tourData);

export const getTours = (page = 1, pageSize = 3) =>
  API.get(`/tour?page=${page}&pageSize=${pageSize}`);

export const getTour = (id) => API.get(`/tour/${id}`);

export const getToursByUser = (userId) => API.get(`/tour/userTours/${userId}`);

export const deleteTour = (id) => API.delete(`/tour/userTours/${id}`);

export const updateTour = (updateTourData, id) =>
  API.patch(`/tour/userTours/${id}`, updateTourData);

export const getToursBySearch = (searchQuery) =>
  API.get(
    `/tour/searchByTitle/search?searchQuery=${encodeURIComponent(searchQuery)}`
  );

export const getToursByTag = (tag) => API.get(`/tour/searchByTag/${tag}`);

export const getRelatedTours = (tags) => API.post(`/tour/relatedTours`, tags);

export const likeDislikeTour = (id) => API.patch(`/tour/likeDislike/${id}`);
