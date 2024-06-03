//check login
fetch(
  "http://localhost:3000/auth/check",
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }
)
  .then((response) => {
    if (response.status == "200") {
      console.log("auth")
    } else {
      alert("Something went wrong");
      window.location.href = "login.html"
    }
  })

// authorzication
fetch(
  "http://localhost:3000/auth/role",
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }
)
  .then(async (response) => {
    if (response.status == "200") {
      const role = await response.json()
      const path = window.location.pathname
      if (path.includes("teacher") && role != 2){
        alert("Something went wrong");
        window.location.href = 'studentHome.html'
      }
      if (path.includes("student") && role != 1){
        alert("Something went wrong");
        window.location.href = 'teacherHome.html'
      }

    } else {
      alert("Something went wrong");
    }
  })

// logout
const logout = (e) =>{  
  e.preventDefault();
  fetch(
    "http://localhost:3000/auth/logout",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  )
  window.location.href = "login.html"
}

// Sidebar button
document.addEventListener("DOMContentLoaded", function () {
  const toggleSidebarButton = document.getElementById("toggle");
  const sidebar = document.getElementById("sidebar");

  toggleSidebarButton.addEventListener("click", function () {
    sidebar.classList.toggle("active");
  });

  document.addEventListener("click", function (event) {
    const isClickInside =
      sidebar.contains(event.target) ||
      toggleSidebarButton.contains(event.target);
    if (!isClickInside) {
      sidebar.classList.remove("active");
    }
  });
});
// Dropdown button
document
  .getElementById("dropdown-btn")
  .addEventListener("click", function (event) {
    event.stopPropagation();
    var object = document.getElementById("dropdown-account");
    object.classList.toggle("open");
  });
document.addEventListener("click", function () {
  var object = document.getElementById("dropdown-account");
  if (object.classList.contains("open")) {
    object.classList.toggle("open");
  }
});

