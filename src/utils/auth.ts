const TOKEN_KEY = "jwt_token";
const TOKEN_EXPIRY_KEY = "token_expiry";
const USERNAME_KEY = "username";

const MOCK_CREDENTIALS = {
  username: "admin",
  password: "password123",
};

const TOKEN_DURATION = 30 * 60 * 1000;

function generateMockToken(): string {
  return `mock_jwt_token_${Date.now()}_${Math.random().toString(36).substring(7)}`;
}

export const authService = {
  login: (username: string, password: string): boolean => {
    if (username === MOCK_CREDENTIALS.username && password === MOCK_CREDENTIALS.password) {
      const token = generateMockToken();
      const expiry = Date.now() + TOKEN_DURATION;   
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(TOKEN_EXPIRY_KEY, expiry.toString());
      localStorage.setItem(USERNAME_KEY, username);
      
      return true;
    }
    return false;
  },

  logout: (): void => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_EXPIRY_KEY);
    localStorage.removeItem(USERNAME_KEY);
  },

  isAuthenticated: (): boolean => {
    const token = localStorage.getItem(TOKEN_KEY);
    const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
    
    if (!token || !expiry) {
      return false;
    }
    
    if (Date.now() > parseInt(expiry)) {
      authService.logout();
      return false;
    }
    
    return true;
  },

  getUsername: (): string | null => {
    return localStorage.getItem(USERNAME_KEY);
  },

  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },

  refreshToken: (): boolean => {
    if (authService.isAuthenticated()) {
      // const oldToken = localStorage.getItem(TOKEN_KEY);
      const token = generateMockToken();
      const expiry = Date.now() + TOKEN_DURATION;
      
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(TOKEN_EXPIRY_KEY, expiry.toString());
      
      return true;
    }
    return false;
  },
};

setInterval(() => {
  if (authService.isAuthenticated()) {
    const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
    if (expiry) {
      const expiryTime = parseInt(expiry);
      const timeUntilExpiry = expiryTime - Date.now();
      const fiveMinutes = 5 * 60 * 1000;
      
      if (timeUntilExpiry < fiveMinutes && timeUntilExpiry > 0) {
        authService.refreshToken();
      }
    }
  }
}, 60 * 1000);
