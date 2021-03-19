

let confirmCodeUrl = '../src/confirmCode.php';


function confirmCode()
{
    "use strict";
    
    var confemail = document.getElementById("emailconf").value;
    var confirmCode = document.getElementById("confCode").value;
    
    document.getElementById("emailconf").innerHTML = "";
    document.getElementById("confCode").innerHTML = "";
    document.getElementById("confStatus").innerHTML = "";

 if (validateInput1(confemail, confirmCode))
    {
        var json = '{"email" : "' + confemail + '", "confirmCode" : "' + confirmCode + '"}';
        console.log(json); 
        var request = new XMLHttpRequest();
        request.open("POST", confirmCodeUrl, true);
        request.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        try {
            request.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200)
            { 

                console.log(request);   
                var jsonObject = JSON.parse(request.responseText);
                console.log(endpointmsg);
                var endpointmsg = jsonObject.msg;
                
                if (endpointmsg === "AccountActivated")
                    {
                        document.getElementById("confStatus").innerHTML = "Email confirmed!";
                        document.getElementById("confStatus").style.color = "green";                       

                        document.getElementById("emailconf").innerHTML = "";
                        document.getElementById("confCode").innerHTML = "";
                }

                if (endpointmsg === "Codedoesnotmuchourrecords")
                    {
                       document.getElementById("confStatus").innerHTML = "Code does not much our records";
                       document.getElementById("confStatus").style.color = "red"; 
                  }
                if (endpointmsg === "Profileisalreadyactivated")
                    {
                       document.getElementById("confStatus").innerHTML = "Profile is already activated";
                       document.getElementById("confStatus").style.color = "green"; 
                   }
                if (endpointmsg === "Emailnotfound")
                  {
                       document.getElementById("confStatus").innerHTML = "Email not found";
                       document.getElementById("confStatus").style.color = "red"; 
                  }
            }
        };
            request.responseType="text";
            request.send(json);
        }
        catch(error)
        {
            document.getElementById("confStatus").innerHTML = error.message;
            document.getElementById("confStatus").style.color = "red";
        }
    }
}


function checkCode(confirmCode)
{
    "use strict";
    
    if (confirmCode.length === 0)
    {
        document.getElementById("confStatus").innerHTML = "Code is required!";
        document.getElementById("confStatus").style.color = "red";
        return false;
    }

    if (confirmCode.length !== 6)
    {
        document.getElementById("confStatus").innerHTML = "Please enter a valid code!";
        document.getElementById("confStatus").style.color = "red";
        return false;
    }
    var i = 0;
    for (i = 0; i < 6; i += 1)
    {
        if (confirmCode.charAt(i) < '0' || confirmCode.charAt(i) > '9')
        {
            document.getElementById("confStatus").innerHTML = "Please enter six digits code!";
            document.getElementById("confStatus").style.color = "red";
            return false;
        }
    }
    return true;
}

function checkEmailStatus(confemail)
{
    "use strict";
    
    var emailREGEX = /^[^\s@]+@[^\s@\d]+\.[^\s@\d]+$/;

    if (confemail.length === 0)
    {
        document.getElementById("confStatus").innerHTML = "Email is required!";
        document.getElementById("confStatus").style.color = "red";
        return false;
    }
    if (confemail.length > 45)
    {
        document.getElementById("confStatus").innerHTML = "Email is too long!<br>Email should not exceed 45 characters!";
        document.getElementById("confStatus").style.color = "red";
        return false;
    }
    if (!emailREGEX.test(confemail))
    {
        document.getElementById("confStatus").innerHTML = "Please enter a valid email format: mail@example.com";
        document.getElementById("confStatus").style.color = "red";
        return false;
    }
    return true;
}

function validateInput1(confemail, confirmCode)
{
    "use strict";
    
    if(!checkEmailStatus(confemail)) return false;
    if (!checkCode(confirmCode)) return false;

    return true;
}