async function fetchData() {
  try {
    const response = await fetch("http://localhost:3000/class/joined",
      {
        method: "GET",
        credentials: "include",
      });
    // if (!response.ok) {
    //   throw new Error("Network response was not ok " + response.statusText);
    // }
    const data = await response.json();
    const classes = data;
    const sidebar = document.getElementById("sidebar");
    const workspace = document.getElementById("workspace");
    classes.forEach((item) => {
      //sidebar
      sidebar.insertAdjacentHTML('beforeend', `<a href="joinClass.html?id=${item.id}" class="btn btn-secondary">${item.name}</a>`)
      //room
      workspace.insertAdjacentHTML(
        "beforeend",
        `<div class="m-1 room">
          <div class="card-title">
              <a href="joinClass.html?id=${item.id}"><div class="d-flex justify-content-center roomname">${item.name}</div></a>
              <hr class="m-0 bg-light">
              <div class="info-class p-2">
                <div class="info text-light">Subject: ${item.subject}</div>
                <div class="info text-light">Grade: ${item.grade}</div>
                <div class="info text-light">Teacher: ${item.hostName}</div>
                <div class="info text-light">Code: ${item.id}</div>
              </div>
            </div>
        </div>`
      );
    });
  } catch (error) {
    // console.error("There has been a problem with your fetch operation:", error);
    console.log(error)
    // alert('Error')
  }
}
fetchData();
// join class

document
  .getElementById("join-class-btn")
  .addEventListener("click", function (event) {
    const joinClass = document.getElementById("join-class");
    joinClass.classList.toggle("open");
    event.stopPropagation();
  });
document.addEventListener("click", function (event) {
  const joinClass = this.getElementById("join-class");
  const isClickInside = joinClass.contains(event.target);
  if (!isClickInside) {
    joinClass.classList.remove("open");
  }
});
function closeJoinClassBtn() {
  var join = document.getElementById("join-class");
  join.classList.toggle("open");
}
const joinButton = document.getElementById("join")
const classID = document.getElementById("classID")
join.addEventListener("click", async function (e) {
  e.preventDefault()
  const response = await fetch(`http://localhost:3000/class/join?id=${classID.value}`,
    {
      method: "GET",
      credentials: "include",
    });
  const data = await response.json()
  alert(data)
  window.location.href = "studentHome.html"
})