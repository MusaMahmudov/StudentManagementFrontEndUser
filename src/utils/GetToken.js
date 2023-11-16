import jwtDecode from "jwt-decode";
import { Cookies } from "react-cookie";

export const getToken = () => {
  const cookies = new Cookies();
  const token = cookies.get("tokenStudent") || cookies.get("tokenTeacher");
  if (token) {
    console.log(token, "tokenCheck");
    return token;
  }
  return null;
};
export const getDecodedToken = () => {
  const token = getToken();

  if (token) {
    const decodedToken = jwtDecode(token);
    console.log("Decoded", decodedToken);
    return decodedToken;
  }
  return null;
};
export const removeToken = () => {
  const cookie = new Cookies();
  var token = getToken();
  if (token) {
    cookie.remove(cookie.get("tokenStudent") ? "tokenStudent" : "tokenTeacher");
    return true;
  }
  return false;
};
export const removeExpireDate = () => {
  const cookie = new Cookies();
  const token = getToken();
  if (token) {
    cookie.remove(
      cookie.get("tokenStudent") ? "expireDateStudent" : "expireDateTeacher"
    );
    return true;
  }
  return false;
};
export const getExpireDateToken = () => {
  const cookies = new Cookies();
  var expireDate =
    cookies.get("expireDateStudent") || cookies.get("expireDateTeacher");

  if (expireDate) {
    return expireDate;
  }
  return null;
};
