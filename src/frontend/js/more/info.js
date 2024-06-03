async function fetchData() {
  try {//
    const response = await fetch("http://localhost:3000/auth/data",
      {
        method: "GET",
        credentials: "include",
      });
    const data = await response.json();
    const nav = document.getElementsByClassName('navbar');
    nav[0].insertAdjacentHTML('afterbegin',
      `<button type="button" class="btn btn-secondary" onclick="backHome(${data.role})">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
          <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"></path>
        </svg>
      </button>`
    )
    const workspace = document.getElementById("workspace");
    workspace.insertAdjacentHTML(
      "beforeend",
      `<table class="info">
          <tr>
              <th class="text-primary">First Name</th>
              <td><div class="m-2">${data.firstName}</div></td>
          </tr>
          <tr>
              <th class="text-primary">Last Name</th>
              <td><div class=" m-2">${data.lastName}</div></td>
          </tr>
          <tr>
              <th class="text-primary">Date of Birth</th>
              <td><div class=" m-2">${data.dob}</div></td>
          </tr>
          <tr>
              <th class="text-primary">Address</th>
              <td><div class=" m-2">${data.address}</div></td>
          </tr>
          <tr>
              <th class="text-primary">Phone Number</th>
              <td><div class=" m-2">${data.phone}</div></td>
          </tr>
          <tr>
              <th class="text-primary">Role</th>
              <td><div class=" m-2">${data.role == "1" ? "Student" : "Teacher"}</div></td>
          </tr>
          </table>`
    );
  } catch (error) {
    // console.error("There has been a problem with your fetch operation:", error);
    console.log(error)
    // alert('Error')
  }
}
fetchData();
function backHome(data) {
  if (data == "1") window.location.href = "studentHome.html" 
  else window.location.href = "teacherHome.html";
}