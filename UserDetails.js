const getAllUsers = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get('user');
  let body = {
    username
  }
  axios
    .post("https://d0i36c296b.execute-api.us-east-2.amazonaws.com/dev/user-details", body)
    .then((response) => {
      console.log(`Success: `, response);
      if (response.data.success) {
        populateUsersTable(response.data.userDetails);
      }
      else {
        document.getElementById("WrongCreds").innerHTML = response.data.message;
        document.getElementById("WrongCreds").style.display = "block";
        document.getElementById("WrongCreds").style.color = "#f54245";
        document.getElementById("UserInputButton").style.display = "block";
      }
    })
    .catch((error) => {
      console.error(error);
      return false;
    });
};

const populateUsersTable = (user) => {
  var tableRow = "";
    var tr = `<tr id=${user.username.S}>`;
    tr += "<td>" + user.fullname.S + "</td>";
    tr += "<td>" + user.email.S + "</td>";
    tr += "<td>" + user.occupation.S + "</td>";
    tr += "<td>" + user.dob.S + "</td>";
    tr += `<td><button type="button" data-toggle="modal" data-target="#edit" data-uid="1" class="update btn btn-warning btn-sm" onclick="getRowId()"><span class="edit fas fa-edit"></span></button></td>`;
    tr += "</tr>";
    tableRow += tr;
  document.getElementById("user-groups-table").innerHTML = tableRow;
};

const updateUserData = () => {
  const urlParams = new URLSearchParams(window.location.search);
  let username = urlParams.get('user');
  let fullname = document.getElementById("FullName").value;
  let email = document.getElementById("Email").value;
  let occupation = document.getElementById("Occupation").value;
  let dob = document.getElementById("DOB").value;
  let user = {
    username,
    fullname,
    email,
    occupation,
    dob
  };
  console.log(user);
  axios
    .post("https://d0i36c296b.execute-api.us-east-2.amazonaws.com/dev/update-user-data", user)
    .then((response) => {
      console.log("Success !!! User Data Updated Successfully", response);
      updateMessage("User Data updated Successfully !!!");
      document.getElementById("UserInputButton").style.display = "none";
      document.getElementById("WrongCreds").style.display = "none";
      getAllUsers();
    })
    .catch((error) => {
      console.log("Error !!! Can't Update user data.");
      updateMessage("Error !! Unable to update user data, try again.");
    });
};

const updateMessage = (message) => {
  var x = document.getElementById("snackbar");
  x.innerHTML = message;
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
};

const getRowId = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get('user');
  var table = document.getElementById("user-groups-table");
  let row;
  console.log(table.rows.length)
  for (var i = 0; i < table.rows.length; i++) {
    if (table.rows[i].id === username) {
      row = table.rows[i];
      break;
    }
  }
  console.log(row);
  document.getElementById("FullName").value = row.cells[0].textContent;
  document.getElementById("Email").value = row.cells[1].textContent;
  document.getElementById("Occupation").value = row.cells[2].textContent;
  document.getElementById("DOB").value = row.cells[3].textContent;
};