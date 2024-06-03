async function fetchData() {
  try {
    const response = await fetch("http://localhost:5500/frontend/class.json");
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    // console.log(data);
    const sidebar = document.getElementById("sidebar");
    const workspace = document.getElementById("workspace");
    data.forEach((item) => {
      //sidebar
      const classroom = document.createElement("a");
      classroom.href = "class?id=" + item.id;
      classroom.classList.add("btn");
      classroom.classList.add("btn-secondary");
      classroom.innerText = item.name;
      sidebar.appendChild(classroom);
      //room
      const room = document.createElement("div");
      room.classList.add("m-1", "room");
      room.innerHTML = `
            <div class="card-title">
              <a href="class?id=${item.id}"><div class="d-flex justify-content-center roomname">${item.name}</div></a>
              <hr class="m-0 bg-light">
              <div class="info-class p-2">
                <div class="info text-light">Subject: ${item.subject}</div>
                <div class="info text-light">Grade: ${item.grade}</div>
                <div class="info text-light">Teacher: ${item.host.name}</div>
                <div class="info text-light">Code: ${item.id}</div>
              </div>
            </div>
        `;
      workspace.appendChild(room);
    });
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}
fetchData();
// join
document.getElementById("join-class-btn").addEventListener("click", function (event) {
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

// create
document.getElementById("create-class-btn").addEventListener("click", function (event) {
    const createClass = document.getElementById("create-class");
    createClass.classList.toggle("open");
    event.stopPropagation();
  });
document.addEventListener("click", function (event) {
  const createClass = this.getElementById("create-class");
  const isClickInside = createClass.contains(event.target);
  if (!isClickInside) {
    createClass.classList.remove("open");
  }
});
function closeCreateClassBtn() {
  var create = document.getElementById("create-class");
  create.classList.toggle("open");
}
