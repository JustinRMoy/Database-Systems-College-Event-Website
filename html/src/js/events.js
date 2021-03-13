var urlBase = '198.199.77.197';
var extension = 'php';

function getEvents(query, security)
{
	var jsonPayload = '{"search" : "' + query + '", "security" : "' + security + '"}';
	var url = urlBase + '/API/search.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				var events = JSON.parse( xhr.responseText );

			    if (events.error != "None" && events.error != "No events found")
				    window.location.href = "Events.html";
				    
				var eventList = document.getElementById("eventList");
				
				
				for (var i = 0; i < events.results.length; i++)
                {
                    var name = events.results[i].Name;
                    var description = events.results[i].Description;
                    var time = events.results[i].Time;
                    var date = events.results[i].Date;
                    var eventId = events.results[i].eventId;
                    var eventCard = createEventCard(name, description, time, date, eventId);
                    eventList.appendChild(eventCard);
                }
                localStorage.setItem("editMode", "false");
                return;
			}
		};
 		xhr.send(jsonPayload);
	}
	catch(err)
	{
		window.location.href = "index.html";
		return;
	}
}

function createEventCard(name, description, time, date, eventId, imgUrl){
    var eventCard = document.createElement("div");
    eventCard.className = "row mb-3";
    eventCard.setAttribute("data-id", eventId);

    var eventImage = document.createElement("div");
    eventImage.className = "imgPlaceholder";
    eventImage.setAttribute("id", "eventImg-" + eventId);
    eventImage.style = "float: left; width: 20%; height: 200px; background-image: url(" + imgUrl + "); box-sizing: border-box; margin-top: 20px; margin-left: 40px; margin-right: 0px; background-repeat: no-repeat; background-position: center;";

    var eventContainer = document.createElement("div");
    eventContainer.className = "eventsContainer";
    document.setAttribute("id", "theEvent-" + eventId);
}