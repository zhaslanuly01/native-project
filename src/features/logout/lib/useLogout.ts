import type { AppDispatch } from "@/src/app/providers/store";
import { logoutSession, sessionStorage } from "@/src/entities/session";
import { useDispatch } from "react-redux";

export function useLogout() {
  const dispatch = useDispatch<AppDispatch>();

  const logout = async () => {
    try {
      await sessionStorage.clearSession();
      dispatch(logoutSession());
    } catch (e) {
      console.log("logout error", e);
    }
  };

  return { logout };
}
