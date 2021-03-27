let eventURL = "http://198.199.77.197/API/createEvent.php";

var userID = -1;
var rsoID;
var uniID;

function readEventInput()
{   
    var eventName = document.getElementById("inputEventName").value;
	var contactEmail = document.getElementById("inputEventEmail").value;
    var contactNumber = document.getElementById("inputEventPhoneNumber").value;
    var description = document.getElementById("inputEventDescription").value;
    var startTime = document.getElementById("inputStartTime").value;
    var endTime = document.getElementById("inputEndTime").value;
    var startDate = document.getElementById("inputStartDate").value;
    var endDate = document.getElementById("inputEndDate").value;
    var category = document.getElementById("inputCategory").value;
		
        var jsonPayload = '{"EventName" : "' + eventName + '", "Email" : "' + contactEmail + '"Description" : "' + description + '","PhoneNumber" : "' + contactNumber + '", "uniID" : "' + uniID + '", "startTime" : "' + startTime + '", "endTime" : "' + endTime + '", "startDate" : "' + startDate + '", "endDate" : "' + endDate + '", "category" : "' + category + '"}';

    	var request = new XMLHttpRequest();
	    request.open("POST", eventURL, true);
	    request.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	    try 
			{
				request.send(jsonPayload);
				
                document.getElementById("inputEventName").innerHTML = "";
                document.getElementById("inputEventEmail").innerHTML = "";
                document.getElementById("inputEventPhoneNumber").innerHTML = "";
                document.getElementById("inputEventDescription").innerHTML = "";
                document.getElementById("inputStartTime").innerHTML = "";
                document.getElementById("inputEndTime").innerHTML = "";
                document.getElementById("inputStartDate").innerHTML = "";
                document.getElementById("inputEndDate").innerHTML = "";
                document.getElementById("inputCategory").innerHTML = "";

            }

	   catch(err)
	   {
            document.getElementById("logstatus").innerHTML = "Error info not sent";
            document.getElementById("logstatus").style.color = "red";
	   }
	
}

function readEventCookie()
{
    var data = document.cookie;
	var splits = data.split(";");
	for(var i = 0; i < splits.length; i++)
	{
		var thisOne = splits[i].trim();
        var tokens = thisOne.split("=");
        
        if (tokens[4] == "userID")
        {
            userID = parseInt(tokens[4].trim());
        }
        
		if( tokens[1] == "uniID")
		{
            uniID = parseInt(tokens[1].trim());
        }
        
        if( tokens[0] == "rsoID")
        {
            rsoID = parseInt(tokens[0].trim());
        }
	}

	// if( userID < 0 )
	// {
	// 	window.location.href = "index.html";
    // }
}