var urlBase = 'http://198.199.77.197';
var extension = 'php';

document.addEventListener(`DOMContentLoaded`, function () { //change getEvents to use UniID later
    var UniID = localStorage.getItem("UniversityID");
    getEvents("", 0);
    //getComments("10", 0);
  });

  //delete this function once implementation is finished and button is no longer needed on html
/*function handleSearch(){
    getEvents("", 0);
    return;
}*/

function getComments(eventId, avgRating){
    var jsonPayload = '{"eventId": "' + eventId + '"}';
	var url = urlBase + '/API/searchComments.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				var comments = JSON.parse( xhr.responseText );

			    if (comments.error != "None" && comments.error != "No comments found")
				    window.location.href = "index.html";
				    
				var body = document.getElementsByTagName("body");
				
				
				for (var i = 0; i < comments.results.length; i++)
                {
                    var comment = comments.results[i].Comment;
                    var studentId = comments.results[i].StudentId;
                    var rating = comments.results[i].Rating;
                    var commentBox = createCommentBox(comment, studentId, rating, avgRating);
                    body.appendChild(commentBox);
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

function createCommentBox(comment, studentId, rating){
    var commentCard = document.createElement("div");
    commentCard.className = "commentBox";
    commentCard.setAttribute("data-id", studentId);

    var commentContainer = document.createElement("div");
    commentContainer.className = "commentBoxContainer";
    commentContainer.setAttribute("id", "theEvent-" + studentId);

    var title = document.createElement("h1");
    title.setAttribute("id", "eventTitle-" + eventId);
    title.setAttribute("data-id", eventId);
    title.setAttribute("href", "#");
    title.innerHTML = name;

    var dateTime = document.createElement("h5");
    dateTime.setAttribute("id", "eventDate-" + eventId);
    dateTime.setAttribute("data-id", eventId);
    dateTime.innerHTML = "on " + date + " at " + time;

    var eventDesc = document.createElement("p");
    eventDesc.setAttribute("id", "eventDescription-" + eventId);
    eventDesc.setAttribute("data-id", eventId);
    eventDesc.innerHTML = description;

    var contactInfo = document.createElement("p");
    contactInfo.setAttribute("id", "contactInfo-" + eventId);
    contactInfo.setAttribute("data-id", eventId);
    contactInfo.style = "font-weight: 500 !important;";
    contactInfo.innerHTML = "Contact Coordinator at Phone: " + phone + ", Email: " + email;

    var commentButton = document.createElement("button");
    commentButton.setAttribute("id", "commentButton-" + eventId);
    commentButton.setAttribute("data-id", eventId);
    commentButton.onclick = showComments(eventId); //getComments
    commentButton.innerHTML = "Comments";

    eventContainer.appendChild(title);
    eventContainer.appendChild(dateTime);
    eventContainer.appendChild(eventDesc);
    eventContainer.appendChild(contactInfo);
    eventContainer.appendChild(commentButton);

    eventCard.appendChild(eventImage);
    eventCard.appendChild(eventContainer);

    return eventCard;
}

function getEvents(query, UniversityID)
{
	var jsonPayload = '{"search" : "' + query + '", "UniversityID" : "' + UniversityID + '"}';//change this to include security level
	var url = urlBase + '/API/searchEvents.' + extension;

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
                    var phone = events.results[i].Phone;
                    var email = events.results[i].Email;
                    var avgRating = events.results[i].Avg_Rating;
                    // getComments(eventId, avgRating);//get the comments for that event
                    var eventCard = createEventCard(name, description, time, date, eventId, "http://198.199.77.197/img/ICpt2.jpg", phone, email);
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

function createEventCard(name, description, time, date, eventId, imgUrl, phone, email){
    var eventCard = document.createElement("div");
    eventCard.className = "row mb-3";
    eventCard.setAttribute("data-id", eventId);

    var eventImage = document.createElement("div");
    eventImage.className = "imgPlaceholder";
    eventImage.setAttribute("id", "eventImg-" + eventId);

    var eventContainer = document.createElement("div");
    eventContainer.className = "eventsContainer";
    eventContainer.setAttribute("id", "theEvent-" + eventId);

    var title = document.createElement("h1");
    title.setAttribute("id", "eventTitle-" + eventId);
    title.setAttribute("data-id", eventId);
    title.setAttribute("href", "#");
    title.innerHTML = name;

    var dateTime = document.createElement("h5");
    dateTime.setAttribute("id", "eventDate-" + eventId);
    dateTime.setAttribute("data-id", eventId);
    dateTime.innerHTML = "on " + date + " at " + time;

    var eventDesc = document.createElement("p");
    eventDesc.setAttribute("id", "eventDescription-" + eventId);
    eventDesc.setAttribute("data-id", eventId);
    eventDesc.innerHTML = description;

    var contactInfo = document.createElement("p");
    contactInfo.setAttribute("id", "contactInfo-" + eventId);
    contactInfo.setAttribute("data-id", eventId);
    contactInfo.style = "font-weight: 500 !important;";
    contactInfo.innerHTML = "Contact Coordinator at Phone: " + phone + ", Email: " + email;

    var commentButton = document.createElement("button");
    commentButton.setAttribute("id", "commentButton-" + eventId);
    commentButton.setAttribute("data-id", eventId);
    //commentButton.onclick = showComments(eventId); //getComments
    commentButton.innerHTML = "Comments";

    eventContainer.appendChild(title);
    eventContainer.appendChild(dateTime);
    eventContainer.appendChild(eventDesc);
    eventContainer.appendChild(contactInfo);
    eventContainer.appendChild(commentButton);

    eventCard.appendChild(eventImage);
    eventCard.appendChild(eventContainer);

    return eventCard;
}

function showComments(eventId){

    var commentBox = document.getElementById("commentBox-" + eventId); //this used to be called modal

    // Get the button that opens the modal
    var btn = document.getElementById("commentButton-" + eventId);

    // Get the <span> element that closes the modal
    var span = document.getElementById("span-" + eventId);

    // When the user clicks the button, open the modal 
    btn.onclick = function() {
    commentBox.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    commentBox.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == commentBox) {
            commentBox.style.display = "none";
        }
    }
}