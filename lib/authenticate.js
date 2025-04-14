export function setToken(token) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', token);
    }
  }
  
  export function getToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_token');
    }
    return null;
  }
  
  export function removeToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
    }
  }
  
  export function readToken() {
    const token = getToken();
    if (!token) return null;
  
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(atob(base64));
    return payload;
  }
  
  export function isAuthenticated() {
    const token = readToken();
    return token ? true : false;
  }
  
  export async function authenticateUser(user, password) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: 'POST',
      body: JSON.stringify({ userName: user, password }),
      headers: { 'Content-Type': 'application/json' }
    });
  
    if (res.status === 200) {
      const data = await res.json();
      setToken(data.token);
      return true;
    }
  
    return false;
  }
  
  export async function registerUser(user, password, password2) {
    console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName: user, password, password2 })
      });
  
      if (res.status === 200) return true;
      return false;
    } catch (err) {
      console.error("Register Error:", err);
      return false;
    }
  }
  