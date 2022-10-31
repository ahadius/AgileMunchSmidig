let blog = document.getElementById("blog");
let id = new URLSearchParams(window.location.search).get('id');
let btn = document.getElementById("btn");

const rendering = async (e) => {
  e.preventDefault();                           
const res = await fetch('http://localhost:3000/docs/' + id);
const data = await res.json();
let showBlogs ='';

showBlogs = `                            
<h1>${data.title}</h1>
<h1>${data.body}</h1>`

blog.innerHTML = showBlogs;
}
window.addEventListener('DOMContentLoaded', rendering)



const deleteFunction = async (e)  => {
  e.preventDefault();                            
 console.log("deleted!!")
 const result = await fetch('http://localhost:3000/docs/' + id,{
   method:'DELETE'

 })
 window.location.replace('./index.html');    
}




btn.onclick = deleteFunction;