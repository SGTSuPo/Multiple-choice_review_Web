async function fetchData() {
  try {
    const response = await fetch(
      "http://localhost:3000/class/created",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    )
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    const classes = data;
    const sidebar = document.getElementById("sidebar");
    const workspace = document.getElementById("workspace");
    classes.forEach((item) => {
      //sidebar
      sidebar.insertAdjacentHTML('beforeend',`<a href="editClass.html?id=${item.id}" class="btn btn-secondary">${item.name}</a>`)
      //room
      workspace.insertAdjacentHTML(
        "beforeend",
        `<div class="m-1 room">
          <div class="card-title">
              <a href="editClass.html?id=${item.id}"><div class="d-flex justify-content-center roomname">${item.name}</div></a>
              <hr class="m-0 bg-light">
              <div class="info-class p-2">
                <div class="info text-light">Subject: ${item.subject}</div>
                <div class="info text-light">Grade: ${item.grade}</div>
                <div class="info text-light">Code: ${item.id}</div>
              </div>
            </div>
        </div>`
      );
    });
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}
fetchData();
// create
document
  .getElementById("create-class-btn")
  .addEventListener("click", function (event) {
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
