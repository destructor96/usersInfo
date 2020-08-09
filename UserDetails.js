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
        document.getElementById("WrongCreds").style.color = "#f54245"
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
    tr += `<td><button type="button" data-toggle="modal" data-target="#edit" data-uid="1" class="update btn btn-warning btn-sm" onclick="getRowId(${user.username.S})"><span class="edit fas fa-edit"></span></button></td>`;
    tr += `<td><button type="button" data-toggle="modal" data-target="#delete" data-uid="1" class="delete btn btn-warning btn-sm" onclick="getRowIdDelete(${user.username.S})"><span class="delete fas fa-trash"></span></button></td>`;
    tr += "</tr>";
    tableRow += tr;
  document.getElementById("user-groups-table").innerHTML = tableRow;
};

const updateUserData = () => {
  let ID = document.getElementById("ID").innerHTML;
  let FullName = document.getElementById("FullName").value;
  let Email = document.getElementById("Email").value;
  let Designation = document.getElementById("Designation").value;
  let UniversityID = document.getElementById("UniversityID").value;
  let user = {
    ID,
    FullName,
    Email,
    Designation,
    UniversityID,
  };
  console.log(user);
  axios
    .post("http://localhost:8080/api/v1/users/update-user-data", user)
    .then((response) => {
      console.log("Success !!! User Data Updated Successfully", response);
      updateMessage("User Data updated Successfully !!!");
      getAllUsers();
    })
    .catch((error) => {
      console.log("Error !!! Can't Update user data.");
      updateMessage("Error !! Unable to update user data, try again.");
    });
  //   updateMessage();
};

const deleteUserData = () => {
  let ID = document
    .getElementById("delete-user-modal")
    .textContent.split(":")[1];
  axios
    .put(`http://localhost:8080/api/v1/users/delete-user/${ID}`)
    .then((response) => {
      console.log("User Deleted Successfully. ", response);
      updateMessage("User Deleted Successfully !!!");
      getAllUsers();
    })
    .catch((error) => {
      console.log("Error !!! Can't Delete user.");
      updateMessage("Error !! Unable to delete user data, try again.");
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

const getRowId = (id) => {
  console.log(id);
  var table = document.getElementById("user-groups-table");
  let row;
  for (var i = 0; i < table.rows.length; i++) {
    if (Number(table.rows[i].id) === id) {
      row = table.rows[i];
      break;
    }
  }
  console.log(row);
  document.getElementById("ID").innerHTML = row.cells[0].textContent;
  document.getElementById("FullName").value = row.cells[1].textContent;
  document.getElementById("Email").value = row.cells[2].textContent;
  document.getElementById("Designation").value = row.cells[3].textContent;
  document.getElementById("UniversityID").value = row.cells[4].textContent;
};

const getRowIdDelete = (id) => {
  console.log(id);
  var table = document.getElementById("user-groups-table");
  let row;
  for (var i = 0; i < table.rows.length; i++) {
    if (Number(table.rows[i].id) === id) {
      row = table.rows[i];
      break;
    }
  }
  console.log(row);
  document.getElementById(
    "delete-user-modal"
  ).innerHTML = `Are you sure you want to delete user with ID:${row.cells[0].textContent}`;
};
