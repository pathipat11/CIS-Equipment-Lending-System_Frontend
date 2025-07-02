// useAuth composable
import service from "../service";

export const useAuth = () => {
  const isLoading = ref(false);

  const sendAuth = async (payload) => {
    try {
      const response = await service.auth.sendLogin(payload);
      console.log("Login successfully!", response.data);

      return {
        success: true,
        token: response.data.token,
        user: response.data.user, // 👈 ต้องส่งกลับ user ที่มี role
      };
    } catch (err) {
      console.error("Login failed:", err);
      return {
        success: false,
        token: null,
        user: null,
        message: err?.response?.data?.message || "Login failed",
      };
    }
  };

  const sendLogout = async () => {
    try {
      await service.auth.sendLogout();
      console.log("Logout successfully!");
    } catch (err) {
      console.error("Logout failed");
    }
  };

  const sendRegister = async (payload) => {
    try {
      await service.auth.sendRegister(payload);
      console.log("Register successfully");
    } catch (err) {
      console.error("Register failed");
    }
  };

  return {
    sendAuth,
    sendLogout,
    sendRegister
  };
};
