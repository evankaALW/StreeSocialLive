// middleware/authorize.js
const roles = {
    admin: ['read', 'write', 'delete'],
    user: ['read', 'write'],
    guest: ['read']
  };
  
  const authorize = (requiredPermission) => {
    return (req, res, next) => {
      const userRole = req.user.role;
      console.log('User role:', userRole); // Log user role for debugging
      console.log('Required permission:', requiredPermission); // Log required permission
      if (roles[userRole] && roles[userRole].includes(requiredPermission)) {
        next();
      } else {
        res.status(403).send({ error: 'Access denied.' });
      }
    };
  };
  
  module.exports = authorize;
  