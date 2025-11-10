import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { authService } from "../utils/auth";

const useAuth=() => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  
  const checkAuth = () => {
    const authenticated = authService.isAuthenticated();
    setIsAuthenticated(authenticated);
    setUsername(authenticated ? authService.getUsername() : null);
    setIsLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);
  
  useEffect(() => {
    const interval = setInterval(checkAuth, 1000);
    return () => clearInterval(interval);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    const success = authService.login(username, password);
    if (success) {
      setIsAuthenticated(true);
      setUsername(username);
      toast.success(`Welcome back, ${username}!`, {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      toast.error("Invalid username or password", {
        position: "top-right",
        autoClose: 3000,
      });
    }
    return success;
  };

  const logout = (): void => {
    const currentUsername = username;
    authService.logout();
    setIsAuthenticated(false);
    setUsername(null);
    toast.info(`Goodbye, ${currentUsername || "User"}! You have been logged out.`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  return {
    isAuthenticated,
    username,
    isLoading,
    login,
    logout,
  };
}
export default useAuth;