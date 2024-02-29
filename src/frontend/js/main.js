function SideBar()
{
    var sidebar=document.getElementById('sidebar');
    if (sidebar.style.visibility=='collapse') 
        sidebar.style.visibility='visible';
    else sidebar.style.visibility='collapse'; 
}
function AccountDropdown()
{
    var dropdown=document.getElementById('dropdown-account');
    if (dropdown.style.visibility=='collapse') 
        dropdown.style.visibility='visible';
    else dropdown.style.visibility='collapse'; 
}
function joinClassBtn()
{
    var join=document.getElementById('join-class');
    if (join.style.visibility=='collapse') 
        join.style.visibility='visible'; 
    var sidebar=document.getElementById('sidebar');
    sidebar.style.visibility='collapse';
}
function closeJoinClassBtn()
{
    var join=document.getElementById('join-class');
    join.style.visibility='collapse'; 
}
function createClassBtn()
{
    var create=document.getElementById('create-class');
    if (create.style.visibility=='collapse') 
        create.style.visibility='visible'; 
    var sidebar=document.getElementById('sidebar');
    sidebar.style.visibility='collapse';
}
function closeCreateClassBtn()
{
    var create=document.getElementById('create-class');
    create.style.visibility='collapse'; 
}
function addChapterBtn()
{
    var add=document.getElementById('create-chapter');
    if (add.style.visibility=='collapse') 
        add.style.visibility='visible'; 
}
function closeAddChapterBtn()
{
    var add=document.getElementById('create-chapter');
    add.style.visibility='collapse'; 
}
function addQuestionBtn()
{
    var add=document.getElementById('create-question');
    if (add.style.visibility=='collapse') 
        add.style.visibility='visible'; 
}
function closeAddQuestionBtn()
{
    var add=document.getElementById('create-question');
    add.style.visibility='collapse'; 
}
function deleteQuestionBtn()
{
    var del=document.getElementById('delete-question');
    if (del.style.visibility=='collapse') 
        del.style.visibility='visible'; 
}
function closeDeleteQuestionBtn()
{
    var del=document.getElementById('delete-question');
    del.style.visibility='collapse'; 
}