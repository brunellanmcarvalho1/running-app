import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_DEPLOYMENT_URL,
});

const signUp = ({ email, password, name }) => {
  return api
    .post("/auth/signup", { email, password, name })
    .then((response) => response.data)
    .catch((err) => console.error(err));
};

const logIn = ({ email, password }) => {
  return api
    .post("/auth/login", { email, password })
    .then((response) => response.data)
    .catch((err) => console.error(err));
};

const verifyToken = (storedToken) => {
  return api
    .get("/auth/verify", {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
    .then((response) => response.data)
    .catch((err) => console.error(err));
};

const getCurrentUser = () => {
  const storedToken = localStorage.getItem("authToken");
  return api
    .get("/auth/users", {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
    .then((response) => response.data)
    .catch((err) => console.error(err));
};

const editUser = ({ email, password, name }) => {
  return api.put("/api/users", { email, password, name });
};

const getUserTrainings = () => {
  const storedToken = localStorage.getItem("authToken");
  return api
    .get("/trainings", {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
    .then((response) => response.data)
    .catch((err) => console.error(err));
};

const authMethods = {
  signUp,
  logIn,
  verifyToken,
  getCurrentUser,
  editUser,
  getUserTrainings,
};

export default authMethods;
