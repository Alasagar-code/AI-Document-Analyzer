import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

// Re-export a convenient hook that consumes AuthContext.
export function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;
