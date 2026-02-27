import type { AppDispatch } from "@/src/app/providers/store";
import { logoutSession, sessionStorage } from "@/src/entities/session";
import { useDispatch } from "react-redux";

export function useLogout() {
  const dispatch = useDispatch<AppDispatch>();

  const logout = async () => {
    try {
      console.log("logout start");
      await sessionStorage.clearSession();
      console.log("storage cleared");
      dispatch(logoutSession());
      console.log("dispatched logoutSession");
    } catch (e) {
      console.log("logout error", e);
    }
  };

  return { logout };
}
