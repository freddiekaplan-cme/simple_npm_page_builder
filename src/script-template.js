// $(function() {
	
// $("#nav").on("click", function() {
// 	$(".menu").toggleClass("active");
// });



// })
const scriptTemplate = `document.addEventListener("DOMContentLoaded", function() {
	var nav = document.querySelector("#nav");
	var menu = document.querySelector(".menu");
  
	nav.addEventListener("click", function() {
	  menu.classList.toggle("active");
	});
  });`
  
  export default scriptTemplate