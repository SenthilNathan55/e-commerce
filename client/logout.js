const getTokenDuration = () => {
    const now = new Date();
    const storedTime = new Date(localStorage.getItem("expirationTime"));
    const time = storedTime.getTime() - now.getTime();
    console.log(time);
    if (time < 0) {
      return "EXPIRED";
    }
    return time;
  };

function logout()
{
    console.log("logout");
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    // alert("Session Expired");
    const userConfirmed = window.confirm("Session Expired. Click OK to logout.");
    if(userConfirmed)
   {window.location.replace("./Login.html");}

}
console.log(getTokenDuration());

setTimeout(()=>{
    logout();
},getTokenDuration());



