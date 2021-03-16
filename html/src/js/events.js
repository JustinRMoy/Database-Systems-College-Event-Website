var urlBase = 'http://198.199.77.197';
var extension = 'php';
function handleSearch(){
    document.getElementById("eventList").innerHTML = "";
    getEvents("", 0);
    return;
}
function getEvents(query, UniversityID)
{
	var jsonPayload = '{"search" : "' + query + '", "UniversityID" : "' + UniversityID + '"}';
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
				    window.location.href = "index.html";
				    
				var eventList = document.getElementById("eventList");
				
				
				for (var i = 0; i < events.results.length; i++)
                {
                    var name = events.results[i].Name;
                    var description = events.results[i].Description;
                    var time = events.results[i].Time;
                    var date = events.results[i].Date;
                    var eventId = events.results[i].eventId;
                    var eventCard = createEventCard(name, description, time, date, eventId, "http://198.199.77.197/img/ICpt2.jpg");
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
    //eventImage.style = "float: left; width: 20%; height: 200px; background-image: url(" + imgUrl + "); box-sizing: border-box; margin-top: 20px; margin-left: 40px; margin-right: 0px; background-repeat: no-repeat; background-position: center;";

    var eventContainer = document.createElement("div");
    eventContainer.className = "eventsContainer";
    eventContainer.setAttribute("id", "theEvent-" + eventId);
    //eventContainer.style = "float: left; width: 75%; margin-top: 20px; margin-left: 0px; border-left: solid black; border-radius: 0px; box-sizing: border-box;";

    var title = document.createElement("a");
    title.className = "eventsContainer a";
    title.setAttribute("id", "eventTitle-" + eventId);
    title.setAttribute("data-id", eventId);
    title.setAttribute("href", "#");
    title.innerHTML = name;
    //title.style = "font-weight: bold; font-size: 40px; color: black; text-decoration: none;";

    var dateTime = document.createElement("h5");
    dateTime.setAttribute("id", "eventDate-" + eventId);
    dateTime.setAttribute("data-id", eventId);
    dateTime.innerHTML = "on " + date + " at " + time;

    var eventDesc = document.createElement("p");
    eventDesc.setAttribute("id", "eventDescription-" + eventId);
    eventDesc.setAttribute("data-id", eventId);
    eventDesc.innerHTML = description;

    eventContainer.appendChild(title);
    eventContainer.appendChild(dateTime);
    eventContainer.appendChild(eventDesc);

    eventCard.appendChild(eventImage);
    eventCard.appendChild(eventContainer);

    return eventCard;
}