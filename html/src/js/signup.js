let signUpUrl = '../../API/signup.php';


function signup()
{
    "use strict";
    
    var email = document.getElementById("useremail").value;
    var fullname = document.getElementById("fullname").value;
    var password = document.getElementById("userpass").value;
    var confirmPassword = document.getElementById("confirmpass").value;

    document.getElementById("fullname").innerHTML = "";
    document.getElementById("userpass").innerHTML = "";
    document.getElementById("confirmpass").innerHTML = "";
    document.getElementById("useremail").innerHTML = "";
    document.getElementById("upstatus").innerHTML = "";

 if (validateInput(fullname, email, phoneNumber, password, confirmPassword))
    {
        var hashedPassword = md5(password);
        var json = '{"fullName" : "' + fullname + '", "password" : "' + hashedPassword + '", "email" : "' + email + '"}';
       
        var request = new XMLHttpRequest();
        request.open("POST", "http://198.199.77.197/API/signup.php", true);
        request.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        try {
            request.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200)
            {    
                var jsonObject = JSON.parse(request.responseText);
                var endpointmsg = jsonObject['msg'];
                console.log(endpointmsg);
                var errormsg = endpointmsg.split('customer.').pop();
                console.log(errormsg);
                if (errormsg === "done")
                    {
                        document.getElementById("upstatus").innerHTML = "Signed UP!";
                        document.getElementById("upstatus").style.color = "green";

                        document.getElementById("fullname").value = "";
                        document.getElementById("userpass").value = "";
                        document.getElementById("confirmpass").value = "";
                        document.getElementById("useremail").value = "";

                }

                if (errormsg !== "done")
                    {
                       document.getElementById("upstatus").innerHTML = "Email already used";
                       document.getElementById("upstatus").style.color = "red"; 
                }
            }
        };
            request.responseType="text";
            console.log(json);
            request.send(json);
        }
        catch(error)
        {
            document.getElementById("upstatus").innerHTML = error.message;
            document.getElementById("upstatus").style.color = "red";
        }
    }
}

function checkConfirmPassword(confirmPassword, password)
{
    if (confirmPassword !== password)
    {
        document.getElementById("upstatus").innerHTML = "The two passwords are not matched!";
        document.getElementById("upstatus").style.color = "red";
        return false;
    }
    return true;
}

function checkFullName(name)
{
    "use strict";
    var nameREGEX = /([A-Za-z]{2,} )([A-Za-z]{2,} )?([A-Za-z]{2,})/;
    if (name.length < 1)
    {
        document.getElementById("upstatus").innerHTML = "Full name is required!";
        document.getElementById("upstatus").style.color = "red";
        return false;
    }
    if (!nameREGEX.test(name))
    {
        document.getElementById("upstatus").innerHTML = "Please enter a valid full name!";
        document.getElementById("upstatus").style.color = "red";
        return false;
    }
    if (name.length > 45)
    {
        document.getElementById("upstatus").innerHTML = "First Name should not exceed 45 characters!";
        document.getElementById("upstatus").style.color = "red";
        return false;
    }
    return true;
}

 function checkPassword(password)
{
    "use strict";
    if (password.length === 0) {
        document.getElementById("upstatus").innerHTML = "Password is required!";
        document.getElementById("upstatus").style.color = "red";
        return false;
    }
    if (password.length < 5)
    {
        document.getElementById("upstatus").innerHTML = "Your password must be at least 5 characters long, should not exceed 45 characters!";
        document.getElementById("upstatus").style.color = "red";
        return false;
    }

    return true;
}

function checkEmail(email)
{
    "use strict";
    var emailREGEX = /^[^\s@]+@[^\s@\d]+\.[^\s@\d]+$/;

    if (email.length === 0)
    {
        document.getElementById("upstatus").innerHTML = "Email is required!";
        document.getElementById("upstatus").style.color = "red";
        return false;
    }
    if (email.length > 45)
    {
        document.getElementById("upstatus").innerHTML = "Email is too long!<br>Email should not exceed 45 characters!";
        document.getElementById("upstatus").style.color = "red";
        return false;
    }
    if (!emailREGEX.test(email))
    {
        document.getElementById("upstatus").innerHTML = "Please enter your email address in format:<br>mail@example.com";
        document.getElementById("upstatus").style.color = "red";
        return false;
    }
    return true;
}

function validateInput(fullName, email, phoneNumber, password, confirmPassword )
{
    "use strict";
    if (!checkFullName(fullName)) return false;
    if(!checkEmail(email)) return false;
    if (!checkPassword(password)) return false;
    if (!checkConfirmPassword(confirmPassword, password)) return false;
       
    return true;
}