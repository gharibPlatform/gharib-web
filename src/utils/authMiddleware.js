"use client";

const authMiddleware = {
  checkAuth: (redirectUrl = '/login') => {
    if (typeof window === 'undefined') return true;
    
    try {
      // Get token from localStorage
      const token = localStorage.getItem('access_token'); // adjust key as needed
      
      if (!token) {
        console.log('No token found, redirecting to login');
        window.location.href = redirectUrl;
        return false;
      }

      // Check if token expired
      if (authMiddleware.isTokenExpired(token)) {
        console.log('Token expired, removing from storage and redirecting');
        localStorage.removeItem('authToken');
        window.location.href = redirectUrl;
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error checking authentication:', error);
      window.location.href = redirectUrl;
      return false;
    }
  },

  isTokenExpired: (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      
      if (!payload.exp) {
        console.warn('Token does not have expiration claim');
        return false; 
      }

      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp < currentTime;
    } catch (error) {
      console.error('Error decoding token:', error);
      return true; 
    }
  },

//   getUserFromToken: () => {
//     if (typeof window === 'undefined') return null;
    
//     try {
//       const token = localStorage.getItem('authToken');
//       if (!token || authMiddleware.isTokenExpired(token)) {
//         return null;
//       }
      
//       const payload = JSON.parse(atob(token.split('.')[1]));
//       return payload;
//     } catch (error) {
//       console.error('Error getting user from token:', error);
//       return null;
//     }
//   },

};

export default authMiddleware;