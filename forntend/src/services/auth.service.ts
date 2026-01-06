import { api } from "../services/api";

interface RegisterUser {
  name: string;
  email: string;
  password: string;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
}

interface LoginUser {
  email: string;
  password: string;
}

interface UserResponse {
  user: {
    _id: string;
    name: string;
    email: string;
  };
  token: string;
}

export const registerUser = (data: RegisterUser) => {
  return api.post<UserResponse>("/auth/register", data);
};
export const loginUser = (data: LoginUser) => {
  return api.post<UserResponse>("/auth/login", data);
};
// export const getprofile = (data) => {
//   api.get<UserResponse>("/auth/profile/:id");
// };
