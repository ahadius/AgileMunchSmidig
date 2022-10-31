
let input = document.getElementById("input-text");
let text = document.getElementById("form-two");
let btn = document.getElementById("form-button");



let url ='http://localhost:3000/docs';

const sendData = async (e ) =>         {
e.preventDefault();  
 let inputone = input.value.trim(); 
 let inputTwo = text.value.trim();
 
 const data = {
     title: inputone,  
     body: inputTwo,                              
 }   
 await fetch(url, {
 method: 'POST',
 body:JSON.stringify(data),
 headers: {'Content-Type': 'application/json'}                            

})

 window.location.replace('./index.html');                                           

}


btn.onclick = sendData;




