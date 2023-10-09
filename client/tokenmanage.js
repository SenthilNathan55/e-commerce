const getToken = () => {
    return localStorage.getItem("token");
  };
  
  const tokenLoader = () => {
    return getToken();
  };
  
  const tokenPayload = () => {
    const token = getToken();
    if (!token) {
      return;
    }
    return JSON.parse(atob(token.split(".")[1]));
  };

const setToken=(tok)=>
{
   localStorage.setItem("token",tok.token);
   const expiration=new Date();
   expiration.setHours(expiration.getHours()+1);
   localStorage.setItem("expirationTime",expiration);
};
