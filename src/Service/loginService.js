import { URL_LOGIN, BASE_URL } from "../Constants/Url";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Login = async (email, password) => {
  try {
    const response = await axios.post(
      `${BASE_URL}${URL_LOGIN}`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      const decoded = jwtDecode(response.data.responseData);
      return {
        success: true,
        message: response.data.responseData,
        SuperAdmin: decoded.SuperAdmin,
        email: decoded.email,
      };
    } else {
      return { success: false, message: "Error en las credenciales" };
    }
  } catch (error) {
    console.error("Login Error:", error);

    return {
      success: false,
      message: "Ha ocurrido un error, intente nuevamente",
    };
  }
};

export default Login;
