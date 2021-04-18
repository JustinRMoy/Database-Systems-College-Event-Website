let eventURL = "http://198.199.77.197/API/createEvent.php";

var userID = -1;
var uniID = 1; // This needs a value to work

function readEventInput()
{   
    "use strict";

    var eventName = document.getElementById("inputEventName").value;
	var contactEmail = document.getElementById("inputEventEmail").value;
    var contactNumber = document.getElementById("inputEventPhoneNumber").value;
    var description = document.getElementById("inputEventDescription").value;
    var startTime = document.getElementById("inputStartTime").value;
    var endTime = document.getElementById("inputEndTime").value;
    var startDate = formatDate(document.getElementById("start").value);
    var endDate = formatDate(document.getElementById("end").value);
    var longitude = document.getElementById("inputEventLongitude").value;
    var latitude = document.getElementById("inputEventLatitude").value;
    var category = document.getElementById("inputCategory").value;
    var rsoName = document.getElementById("inputRSO").value;

    if (category == "RSO" && rsoName == "None")
    {
        document.getElementById("logstatus").innerHTML = "You must pick an RSO to create an RSO event.";
        document.getElementById("logstatus").style.color = "red";
        return;
    }

    else if (category != "RSO" && rsoName != "None")
    {
        document.getElementById("logstatus").innerHTML = "Your event type must be 'RSO' if you want to create an RSO event.";
        document.getElementById("logstatus").style.color = "red";
        return;
    }
		
        var jsonPayload = '{"userID" : ' + userID + ', "EventName" : "' + eventName + '", "Email" : "' + contactEmail + '", "Description" : "' + description + '", "PhoneNumber" : "' + contactNumber + '", "uniID" : ' + uniID + ' , "startTime" : "' + startTime + '", "endTime" : "' + endTime + '", "startDate" : "' + startDate + '", "endDate" : "' + endDate + '", "category" : "' + category + '", "longitude" : "' + longitude + '", "latitude" : "' + latitude + '", "rsoName" : "' + rsoName + '"}';

    	var request = new XMLHttpRequest();
	    request.open("POST", eventURL, true);
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

                document.getElementById("inputEventName").value = "";
                document.getElementById("inputEventEmail").value = "";
                document.getElementById("inputEventPhoneNumber").value = "";
                document.getElementById("inputEventDescription").value = "";
                document.getElementById("inputStartTime").value = "";
                document.getElementById("inputEndTime").value = "";
                document.getElementById("start").value = "";
                document.getElementById("end").value = "";
                document.getElementById("inputEventLongitude").value = "";
                document.getElementById("inputEventLatitude").value = "";
            }

            request.send(jsonPayload);

        }

	   catch(err)
	   {
            document.getElementById("logstatus").innerHTML = "Error info not sent";
            document.getElementById("logstatus").style.color = "red";

            document.getElementById("inputEventName").value = "";
            document.getElementById("inputEventEmail").value = "";
            document.getElementById("inputEventPhoneNumber").value = "";
            document.getElementById("inputEventDescription").value = "";
            document.getElementById("inputStartTime").value = "";
            document.getElementById("inputEndTime").value = "";
            document.getElementById("start").value = "";
            document.getElementById("end").value = "";
            document.getElementById("inputEventLongitude").value = "";
            document.getElementById("inputEventLatitude").value = "";
	   }
	
}

function getRSOList()
{
    var jsonPayload = '{ "userID" :' + userID + '}';
    var request = new XMLHttpRequest();

    request.open("POST", "http://198.199.77.197/API/getUserRSOList.php", true);
    request.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try 
    {

        request.onreadystatechange = function() 
        {
            if (this.readyState == 4 && this.status == 200)
            {
                document.getElementById("inputRSO").innerHTML = this.responseText;
            }
        }
        request.send(jsonPayload);
    }

    catch(err)
    {}
}

function readEventCookie()
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
	}

	// if( userID < 0 )
	// {
	// 	window.location.href = "index.html";
    // }
}

function formatDate(date)
{
    var tokens = date.split("-");
    return tokens[2] + "-" + tokens[1] + "-" + tokens[0];
}