async function fetchData() {
  try {
    const queryString = window.location.search;
    const response = await fetch(`http://localhost:3000/question${queryString}`,
      {
        method: "GET",
        credentials: "include",
      });
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    // console.log(data)
    if (data.message) {
      alert(data.message)
      window.location.href = "studentHome.html"
    }
    else {
      const chapter = data.chapter;
      const questions = data.questions;
      const sidebar = document.getElementById("sidebar");
      sidebar.insertAdjacentHTML('afterbegin',
        `<a href="studentHome.html" class="btn bg-secondary">Home</a>`);
      sidebar.insertAdjacentHTML('afterbegin',
        `<a href="joinClass.html?id=${chapter.classID}" class="btn bg-secondary">Class</a>`);
      //
      const workspace = document.getElementById("workspace");
      workspace.insertAdjacentHTML(
        "afterbegin",
        `<div class="chapter-title w-100 mb-2">
              <h2>${chapter.name}</h2>
          </div>`
      );
      questions.forEach((item) => {
        //question
        workspace.insertAdjacentHTML(
          "beforeend",
          `<div class="question w-100 p-3 bg-dark border-light border-bottom text-light text-left">
              <div class="detail-question">
                <p>[${item.type}] ${item.detail}</p>
              </div>
              <div class="selections">
                <div class="seletion">
                  <input class="m-1" type="radio" name="${item.id}" value="${answer("A", item.ans)}">${item.A}
                </div>
                <div class="seletion">
                  <input class="m-1" type="radio" name="${item.id}" value="${answer("B", item.ans)}">${item.B}
                </div>
                <div class="seletion">
                  <input class="m-1" type="radio" name="${item.id}" value="${answer("C", item.ans)}">${item.C}
                </div>
                <div class="seletion">
                  <input class="m-1" type="radio" name="${item.id}" value="${answer("D", item.ans)}">${item.D}
                </div>
              </div>
              <div class="hide explain text-left text-primary">
                  <p class="m-0">Answer: ${item.ans} <br> ${item.explain}</p>
              </div>
          </div>`
        );
      });
      workspace.insertAdjacentHTML('beforeend',
        `<div class="mt-2 ">
              <button id="show-answer-btn" class="btn bg-primary text-light" type="button" onclick="showAnsBtn()">Show Answer</button>
          </div>`
      )
    }
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}
fetchData();
function answer(sel, ans) {
  return (sel === ans) ? 1 : 0;
}

function showAnsBtn() {
  const ans = document.querySelectorAll('.explain')
  const btn = document.getElementById("show-answer-btn")
  ans.forEach(answer => {
    btn.innerText = 'Hide Answer';
    answer.classList.toggle('hide')
  })
}