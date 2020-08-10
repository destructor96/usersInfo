const signUpApiCall = (user) => {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var cPassword = document.getElementById("cPassword").value;
  var user = {
    username,
    password
  };

  if (password === cPassword) {
    axios
      .post("https://d0i36c296b.execute-api.us-east-2.amazonaws.com/dev/signup", user)
      .then((response) => {
        console.log(`Success: `, response);
        window.location.replace("index.html");
      })
      .catch((error) => {
        console.error(error);
        document.getElementById("WrongCreds").style.display = "block";
        document.getElementById("WrongCreds").innerHTML =
          "Failed to Add User.\n" + error.err;
        return false;
      });
  } else {
    document.getElementById("WrongCreds").style.display = "block";
    document.getElementById("WrongCreds").innerHTML = "Passwords do not match.";
  }
};
