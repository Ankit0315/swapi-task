import { useState } from "react";
import Input from "./Input";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (username: string, password: string) => Promise<boolean>;
  isLoading: boolean;
}

const LoginModal = ({
  isOpen,
  onClose,
  onLogin,
  isLoading,
}: LoginModalProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const success = await onLogin(username, password);
    if (success) {
      setUsername("");
      setPassword("");
      onClose();
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white max-w-md w-full border border-gray-300 rounded-lg mx-2 sm:mx-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-3 sm:p-4 md:p-5">
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-2 sm:mb-3">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3">
            <Input
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
            {error && (
              <p className="text-xs sm:text-sm text-red-500 break-words">
                {error}
              </p>
            )}
            <div className="text-[10px] sm:text-xs text-gray-500 break-words">
              Demo: username: <strong>admin</strong>, password:{" "}
              <strong>password123</strong>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm md:text-base bg-gray-200 text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-300 cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm md:text-base bg-yellow-400 text-gray-900 border border-yellow-500 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:bg-yellow-500 transition-colors"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginModal;
