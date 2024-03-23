
import Cookies from "js-cookie";

const logout = (setIsAuthenticated) => {

  Cookies.remove("token");
  Cookies.remove("superadmin");
  Cookies.remove("email");

  setIsAuthenticated(false);

};

export { logout };
