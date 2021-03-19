let resendCodeUrl = '../src/resendCode.php';


function resendCode()
{
    "use strict";
    
    var resemail = document.getElementById("emailconf").value;
    
    document.getElementById("emailconf").innerHTML = "";
    document.getElementById("confCode").innerHTML = "";
    document.getElementById("confStatus").innerHTML = "";

 if (validateInput2(resemail))
    {
        var json = '{"email" : "' + resemail + '"}';
      // console.log(resemail); 
        var request = new XMLHttpRequest();
        request.open("POST", resendCodeUrl, true);
        request.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        console.log(request);
        try {
            request.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200)
            { 

                //console.log(request);   
                var jsonObject = JSON.parse(request.responseText);
                //console.log(endpointmsg);
                var endpointmsg = jsonObject.msg;
                
                if (endpointmsg == "done")
                    {
                        document.getElementById("confStatus").innerHTML = "Code sent! Please check you email.<br> Note: if email not found in inbox check junk mail ";
                        document.getElementById("confStatus").style.color = "green";                       

                        document.getElementById("emailconf").innerHTML = "";
                        document.getElementById("confCode").innerHTML = "";
                }

                if (endpointmsg == "Profileisalreadyactivated")
                    {
                       document.getElementById("confStatus").innerHTML = "Profile is already activated";
                       document.getElementById("confStatus").style.color = "red"; 
                   }
                if (endpointmsg == "Emailnotfound")
                  {
                       document.getElementById("confStatus").innerHTML = "Email not found";
                       document.getElementById("confStatus").style.color = "red"; 
                  }
        }
        
        };
           // console.log(request);
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



function checkEmailResend(resemail)
{
    "use strict";
    var emailREGEX = /^[^\s@]+@[^\s@\d]+\.[^\s@\d]+$/;

    if (resemail.length === 0)
    {
        document.getElementById("confStatus").innerHTML = "Email is required!";
        document.getElementById("confStatus").style.color = "red";
        return false;
    }
    if (resemail.length > 45)
    {
        document.getElementById("confStatus").innerHTML = "Email is too long!<br>Email should not exceed 45 characters!";
        document.getElementById("confStatus").style.color = "red";
        return false;
    }
    if (!emailREGEX.test(resemail))
    {
        document.getElementById("confStatus").innerHTML = "Please enter your email address in format:<br>mail@example.com";
        document.getElementById("confStatus").style.color = "red";
        return false;
    }
    return true;
}

function validateInput2(resemail)
{
    "use strict";
    if(!checkEmailResend(resemail)) return false;

    return true;
}