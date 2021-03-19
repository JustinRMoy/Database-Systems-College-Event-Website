//Code by Taoufik Laaroussi

var left_cover = document.getElementById("left-cover");
var left_form = document.getElementById("left-form");

var right_cover = document.getElementById("right-cover");
var right_form = document.getElementById("right-form");

var login_btn = document.getElementById("login-btn");
var profile_btn = document.getElementById("profile-btn");

var comment_box = document.getElementById("comment-box");

function switchSignup() {
    right_form.classList.add("fade-in-element");
    left_cover.classList.add("fade-in-element");

    left_form.classList.add("form-hide");
    left_cover.classList.remove("cover-hide");
    right_cover.classList.add("cover-hide");
    right_form.classList.remove("form-hide");
}

function switchLoginBtn() {
	//login_btn.classList.remove();
	profile_btn.classList.add("fade-in-element");
}

function showCommentBox()
{
  	comment_box.classList.add("fade-in-element");
}

function profileDropdown() {
  	document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}