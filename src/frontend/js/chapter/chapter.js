
// add
document.getElementById('add-question-btn').addEventListener('click', function(event) {
    const addChapter = document.getElementById('add-question');
    addChapter.classList.toggle('open');
    event.stopPropagation();
});
document.getElementById('add-question-btn-sidebar').addEventListener('click', function(event) {
    const addChapter = document.getElementById('add-question');
    addChapter.classList.toggle('open');
    event.stopPropagation();
});
document.addEventListener('click', function(event) {
    const addQuestion = this.getElementById('add-question');
    if (!addQuestion.contains(event.target)) {
        addQuestion.classList.remove('open');
    }
});
function closeAddQuestionBtn()
{
    var add=document.getElementById('add-question');
    add.classList.remove('open'); 
}   
function closeDeleteQuestionBtn()
{
    var del=document.getElementById('delete-question');
    del.checkVisibility(); 
}
