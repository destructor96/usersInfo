const signInApiCall = (user) => {
  var email = document.getElementById("LoginEmail").value;
  var pass = document.getElementById("LoginPass").value;
  var user = {
    username: email,
    password: pass,
  };
  axios
    .post("https://d0i36c296b.execute-api.us-east-2.amazonaws.com/dev/login", user)
    .then((response) => {
      
      if (response.status == 200) {
        if (response.data.statusCode == 200) {
          window.location.replace("UserDetails.html?user=" + response['data']['user'])
          console.log(`Success: `, response);
        }
        else if (response.data.statusCode == 401) {
          document.getElementById("WrongCreds").innerHTML = response.data.message;
          document.getElementById("WrongCreds").style.display = "block";
          document.getElementById("WrongCreds").style.color = "#f54245"
          
        }
      }
    })
    .catch((error) => {
      console.error(error);
      document.getElementById("WrongCreds").style.display = "block";
      return false;
    });
};
