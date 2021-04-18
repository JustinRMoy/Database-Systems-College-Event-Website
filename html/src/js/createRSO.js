let rsoURL = "http://198.199.77.197/API/createRSO.php";

var userID = -1;
var uniID = -1; // This needs a value to work

function readRSOInput()
{   
    "use strict";

    var rsoName = document.getElementById("inputRSOName").value;
    var description = document.getElementById("inputRSODescription").value;
    var members = document.getElementsByClassName("members");
    var membersJSON = JSON.stringify(members);
		
        var jsonPayload = '{"rsoName" : "' + rsoName + '", "description" : "' + description + '", "students" : "' + membersJSON + '"}';

    	var request = new XMLHttpRequest();
	    request.open("POST", rsoURL, true);
	    request.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	    try 
        {

            request.onreadystatechange = function() 
            {
                if (this.readyState == 4 && this.status == 200)
                {
                    var jsonObj = JSON.parse(request.responseText);

                    if (jsonObj.msg === "done")
                    {
                        document.getElementById("logstatus").innerHTML = jsonObj.msg;
                        document.getElementById("logstatus").style.color = "green";
                    }

                    else
                    {
                        document.getElementById("logstatus").innerHTML = jsonObj.msg;
                        document.getElementById("logstatus").style.color = "red";
                    }
                }

                document.getElementById("inputRSOName").value = "";
                document.getElementById("inputRSODescription").value = "";
                document.getElementsByClassName("members").value = "";
            }

            request.send(jsonPayload);

        }

	   catch(err)
	   {
            document.getElementById("logstatus").innerHTML = "Error info not sent";
            document.getElementById("logstatus").style.color = "red";
	   }
	
}

function readRSOCookie()
{
    var data = document.cookie;
	var splits = data.split(";");
	for(var i = 0; i < splits.length; i++)
	{
		var thisOne = splits[i].trim();
        var tokens = thisOne.split("=");
        
        if (tokens[0] == "userID")
        {
            userID = parseInt(tokens[1].trim());
        }
        
		else if( tokens[0] == "uniID")
		{
            uniID = parseInt(tokens[1].trim());
        }
        
        else if( tokens[0] == "rsoID")
        {
            rsoID = parseInt(tokens[1].trim());
        }
	}

	// if( userID < 0 )
	// {
	// 	window.location.href = "index.html";
    // }
}

var count = 5;
function addMember()
{
    var memberList = document.getElementById("rsoMembers");

    memberList.innerHTML += `<input type="text" class="members form-control" id="inputMemberName`+ count +`" placeholder="Member ` + count + ` Email..." required="required" maxlength="50">`;
    count++;
}

function resetMembers()
{

    var memberList = document.getElementById("rsoMembers");

    memberList.innerHTML = `<label for="inputCategory">RSO Members</label>
                    <input type="text" class="members form-control" id="inputMemberName1" placeholder="Member 1 Email..." required="required" maxlength="50">
                    <input type="text" class="members form-control" id="inputMemberName2" placeholder="Member 2 Email..." required="required" maxlength="50">
                    <input type="text" class="members form-control" id="inputMemberName3" placeholder="Member 3 Email..." required="required" maxlength="50">
                    <input type="text" class="members form-control" id="inputMemberName4" placeholder="Member 4 Email..." required="required" maxlength="50">`;
    count = 5;
}