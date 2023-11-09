import jwtDecode from "jwt-decode";
import { Cookies } from "react-cookie";

export const getToken = () => {
  const cookies = new Cookies();
  const token = cookies.get("tokenStudent") || cookies.get("tokenTeacher");
  if (token) {
    return token;
  }
  return null;
};
export const getDecodedToken = () => {
  const cookies = new Cookies();
  const token = cookies.get("tokenStudent") || cookies.get("tokenTeacher");
  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken;
  }
  return null;
};
