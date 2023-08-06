  // utils/jwtUtils.js
  const jwt = require('jsonwebtoken');

  // Utility function to decode JWT token
  const decodeToken = (token) => {
    try {
      const decodedToken = jwt.decode(token);
      return decodedToken;
    } catch (error) {
      console.error('Error decoding JWT token:', error.message);
      return null;
    }
  };

  export default decodeToken;
