
// let loginUrl = '../../API/login.php';

var userID = -1;
var userLevel = '';
var userName = '';
var uniID = -1;
var rsoID = -1;

function login()
{   
    "use strict";
	var u_fullName = "";

	var loginName = document.getElementById("username").value;
	var password = document.getElementById("userpassword").value;
   	var loginPassword = md5(password);

	document.getElementById("logstatus").innerHTML = "";

	if (checkEmaillog(loginName) && checkPasswordlog(password)){
		 loginPassword = md5(password);
		
		 var jsonPayload = '{"Email" : "' + loginName + '", "Password" : "' + loginPassword + '"}';

    	var request = new XMLHttpRequest();
	    request.open("POST", "http://198.199.77.197/API/login.php", true);
	    request.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	    try 
			{
				request.onreadystatechange = function()
				{
					if (this.readyState == 4 && this.status == 200)
					{
						var jsonObj = JSON.parse(request.responseText);
						if (jsonObj.Users === 0)
						{
							var error = jsonObj.error;
							document.getElementById("logstatus").innerHTML = error;
						}

						else
						{
							//userLevel = jsonObj.User_level;
							userName = jsonObj.Name;
							uniID = jsonObj.Uni;
							//rsoID = jsonObj.RSO;
							userID = jsonObj.Users;

							saveCookie();
							window.location.href = "index.html";
						}
					}
				};

				request.send(jsonPayload);
      }

	   catch(err)
	   {
			document.getElementById("logstatus").innerHTML = err.message;
	   }
	   localStorage.setItem("loggedIn", "true");
	}
}


function logout()
{
	customer_id = 0;
	document.cookie = "customer_id= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
	localStorage.setItem("loggedIn", "false");
}

function saveCookie()
{
	var minutes = 20;
	var date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));
	document.cookie = "rsoID=" + rsoID + ";expires=" + date.toGMTString();
	document.cookie = "uniID=" + uniID + ";expires=" + date.toGMTString();
	document.cookie = "userName=" + userName + ";expires=" + date.toGMTString();
	document.cookie = "userID=" + userID + ";expires=" + date.toGMTString();
	document.cookie = "userLevel=" + userLevel + ";expires=" + date.toGMTString();
}

// var userID = -1;
// var userLevel = '';
// var name = '';
// var uniID = -1;
// var rsoID = -1;

function readCookie()
{
	var data = document.cookie;
	var splits = data.split(";");
	for(var i = 0; i < splits.length; i++)
	{
		var thisOne = splits[i].trim();
		var tokens = thisOne.split("=");

		if( tokens[0] == "customer_id" )
		{
			customer_id = parseInt( tokens[1].trim() );
		}
	}

	if( customer_id < 0 )
	{
		window.location.href = "../index.html";
	}
}

function checkEmaillog(email)
{
    "use strict";
    var emailREGEX = /^[^\s@]+@[^\s@\d]+\.[^\s@\d]+$/;
    if (email.length > 50)
    {
        document.getElementById("logstatus").innerHTML = "Email is too long!<br>Email should not exceed 45 characters!";
        document.getElementById("logstatus").style.color = "red";
        return false;
    }
    if (email.length === 0)
    {
        document.getElementById("logstatus").innerHTML = "Email is required!";
        document.getElementById("logstatus").style.color = "red";
        return false;
    }
    if (!emailREGEX.test(email))
    {
        document.getElementById("logstatus").innerHTML = "Please enter your email address in format:<br>mail@example.com";
        document.getElementById("logstatus").style.color = "red";
        return false;
    }
    return true;
}


function checkPasswordlog(password)
{
    "use strict";
    if (password.length === 0) {
        document.getElementById("logstatus").innerHTML = "Password is required!";
        document.getElementById("logstatus").style.color = "red";
        return true;
    }
    if (password.length < 5)
    {
        document.getElementById("logstatus").innerHTML = "Your password must be at least 5 characters long, should not exceed 45 characters!";
        document.getElementById("logstatus").style.color = "red";
        return true;
    }

    return true;
}