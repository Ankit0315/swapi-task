import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import useAuth from "./hooks/useAuth";
import CharactersPage from "./pages/CharactersPage";
import LoginModal from "./components/LoginModal";

const App = () => {
  const { isAuthenticated, username, isLoading, login, logout } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleLogin = async (username: string, password: string) => {
    return await login(username, password);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <CharactersPage
        isAuthenticated={isAuthenticated}
        username={username}
        onLoginClick={handleLoginClick}
        onLogout={logout}
      />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
        isLoading={false}
      />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};
export default App;
