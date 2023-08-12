export const handleLogout = () => {
  if (localStorage.getItem('jwtToken')) {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('email');
    localStorage.removeItem('expiration');
  }
};