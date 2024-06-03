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

  } catch (error) {
    // console.error("There has been a problem with your fetch operation:", error);
    console.log(error)
    // alert('Error')
  }
}
fetchData();

document.getElementById('changePassword').addEventListener('submit', function (event) {
  event.preventDefault();
  const formData = new FormData(this);
  const req = {};
  formData.forEach((value, key) => {
    req[key] = value;
  });
  console.log(req)
  if (req.newpw !== req.confirmpw){
    alert("Mật khẩu mới không trùng khớp")
  } else {
    // alert("OK")
  }
  // async function postPassword(url = 'http://localhost:3000/user/change-password', data = req) {
  //     const response = await fetch(url, {
  //         method: 'POST', // Phương thức POST
  //         headers: {
  //             'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify(data) // Chuyển đổi dữ liệu thành chuỗi JSON
  //     }).then((response) => {
  //         if (response.status == "200") {
  //           response.json().then((data) => {
  //             console.log(data)
  //             if (data.roleID == "1") {
  //               window.location.href = "studentHome.html"
  //             } else {
  //                 window.location.href = "teacherHome.html"
  //             }
  //             alert("Succeed change password");
  //           });
  //         } else alert("Can not send request");
  //       }).catch((error) => {
  //         console.error("Lỗi khi gửi yêu cầu:", error);
  //       });
  // };
})
function backHome(data) {
  if (data == "1") window.location.href = "studentHome.html"
  else window.location.href = "teacherHome.html";
}