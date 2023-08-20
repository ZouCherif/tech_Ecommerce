// const authHeader = req.headers.authorization || req.headers.Authorization;
// if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
// const token = authHeader.split(" ")[1];

// Use cookies for authentication tokens instead of local storage
// Modify your authentication logic to use cookies and handle token expiration
// Encrypt sensitive data before storing in local storage, if necessary

// Implement token renewal and refresh mechanisms to replace expired tokens

// Implement token revocation logic on logout or session expiration

// Configure CORS headers and set SameSite attribute on cookies

// Implement a strict CSP in your server-side responses to prevent XSS attacks

// Validate and sanitize user input before displaying it on your app
