let blog = document.getElementById("blog");

let url ='http://localhost:3000/docs';
const actionFunction = async () => {
const res = await fetch(url);
const data = await res.json();
let showBlogs ='';
data.forEach(elm => {
showBlogs += `<div>
<p>${elm.title}</p>
<p>${elm.body.slice(0,200)}</p>
<a href="./details.html?id=${elm.id}">read more...</a>
</div>`                       
});
blog.innerHTML = showBlogs;
}

 window.addEventListener('DOMContentLoaded', actionFunction)

