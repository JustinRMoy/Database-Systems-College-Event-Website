var urlBase = 'http://198.199.77.197';
var extension = 'php';

var btnDisplay, commentBoxDisplay, spanDisplay;

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

function getComments(eventId, avgRating, name){
    var jsonPayload = '{"eventId": "' + eventId + '"}';
	var url = urlBase + '/API/searchComments.' + extension;

    var commentBox = createCommentBox(eventId);
    var commentBoxContent = createCommentBoxContent(avgRating, eventId, name);
    var commentList = createCommentList(eventId);
    var userCommentDiv = createUserCommentDiv(eventId);
    var otherUserCommentDiv = createOtherUserCommentDiv(eventId);
    var body = document.getElementById("body");
    

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

                if(comments.error == "No comments found"){
                    commentList.appendChild(userCommentDiv);
                    commentList.appendChild(otherUserCommentDiv);
                     commentBoxContent.appendChild(commentList);
                     commentBox.appendChild(commentBoxContent);
                     body.appendChild(commentBox);
                    return;
                }
				    			
				for (var i = 0; i < comments.results.length; i++)
                {
                    var comment = comments.results[i].Comment;
                    var studentId = comments.results[i].StudentId;
                    var rating = comments.results[i].Rating;
                    var commentId = comments.results[i].CommentId;
                    var loggedUser = localStorage.getItem("StudentId");

                    //if(studentId == loggedUser){ //make sure local storage variable name matches!!!!!!!!!!!!!!!!!!!!!!! this is an errort and needs to bge changed
                        var userCommentCard = createUserCommentCard(comment, studentId, rating, eventId, commentId);
                        userCommentDiv.appendChild(userCommentCard);
                        //userCommentDiv.appendChild(<br></br>); //should add a break!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                    /*}else{
                        var otherCommentCard = createOtherCommentCard(comment, studentId, rating, eventId, commentId);
                        otherUserCommentDiv.appendChild(otherCommentCard);
                        //otherUserCommentDiv.appendChild(<br></br>);
                    }*/

                }

                commentList.appendChild(userCommentDiv);
                commentList.appendChild(otherUserCommentDiv);
                commentBoxContent.appendChild(commentList);
                commentBox.appendChild(commentBoxContent);
                body.appendChild(commentBox);

                localStorage.setItem("editMode", "false");
                return;
			}
		};
 		xhr.send(jsonPayload);
	}
	catch(err)
	{
		window.location.href = "#";
		return;
	}
}

function createCommentBox(eventId){
    var commentCard = document.createElement("div");
    commentCard.className = "commentBox";
    commentCard.setAttribute("id", "commentBox-" + eventId);
    commentCard.setAttribute("name", "commentBox");
    commentBoxDisplay = commentCard;

    return commentCard;
}
function createCommentBoxContent(avgRating, eventId, name){

    var commentBoxContent = document.createElement("div");
    commentBoxContent.className = "commentBox-content";
    commentBoxContent.setAttribute("id", "commentBox-content-" + eventId);

    var ex = document.createElement("span");
    ex.className = "close";
    ex.setAttribute("id", "span-" + eventId);
    ex.innerHTML = "&times;";
    spanDisplay = ex;

    var title = document.createElement("h1");
    title.setAttribute("id", "eventTitle-" + eventId);
    title.setAttribute("data-id", eventId);
    //title.setAttribute("href", "#");
    title.innerHTML = name;

    var eventRating = document.createElement("h2");
    eventRating.setAttribute("id", "eventRating-" + eventId);
    eventRating.setAttribute("data-id", eventId);
    eventRating.innerHTML = "Rating: " + avgRating;

    if(localStorage.getItem("loggedIn") == "true"){
        //var userInput = ;//add code for creating the form/input that allow user to create comments only if logged in !!!!!!!!!!!!!!!!!!!!!!!!!
        var form = document.createElement("form");
        form.setAttribute("id", "form-" + eventId);

        var input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Enter Comment";
        input.setAttribute("id", "userCommentInput-" + eventId);

        form.appendChild(input);
    }
    
    

    commentBoxContent.appendChild(ex);
    commentBoxContent.appendChild(title);
    commentBoxContent.appendChild(eventRating);
    if(localStorage.getItem("loggedIn") == "true") 
        commentBoxContent.appendChild(form);

    return commentBoxContent;
}

function createCommentList(eventId){
    var commentList = document.createElement("div");
    commentList.className = "row mb-3";
    commentList.setAttribute("id", "commentList-" + eventId);

    return commentList;
}

function createUserCommentDiv(eventId){
    var userComment = document.createElement("div");
    userComment.className = "userComment";
    userComment.setAttribute("id", "userComment-" + eventId);

    return userComment;
}

function createOtherUserCommentDiv(eventId){
    var otherUserComments = document.createElement("div");
    otherUserComments.className = "otherUsers";
    otherUserComments.setAttribute("id", "otherUsers-" + eventId);

    return otherUserComments;
}

function createUserCommentCard(comment, studentId, rating, eventId, commentId){
    
    //SIGNIFICANT CHANGES MUST BE MADE TO ALLOW USER TO EDIT THE COMMENT

    var card = document.createElement("div");
    card.className = "card";
    card.setAttribute("id", "card-" + commentId);

    var cardBody = document.createElement("div");
    cardBody.className = "card-body";
    cardBody.setAttribute("id", "card-body-" + commentId);

    var timeStamp = document.createElement("div");
    timeStamp.className = "pull-right";
    timeStamp.setAttribute("id", "timeStamp-" + commentId);

    /*var small = document.createElement("small");
    small.setAttribute("id", "small-" + commentId);
    small.innerHTML = "PLACEHOLDER";//comment table in db doesn't have this !!!!!!!!!!!!!

    timeStamp.appendChild(small);

    var studentName = document.createElement("h4");
    studentName.className = "media-heading user_name";
    studentName.innerHTML = "PLACEHOLDER"; //comment table in DB doesn't have this!!!!!!!!!!!!!!!!*/

    var commentText = document.createElement("p");
    commentText.setAttribute("id", "comment-" + commentId);
    commentText.innerHTML = comment;

    var brk = document.createElement("br");

    //button
    var editButton = document.createElement("button");
    editButton.className = "button";
    editButton.setAttribute("id", "editButton-" + commentId);
    editButton.setAttribute("data-id", commentId);
    /*editButton.onclick = funtion(){

    }*/

    var deleteButton = document.createElement("button");
    deleteButton.className = "button";
    deleteButton.setAttribute("id", "deleteButton-" + commentId);
    deleteButton.setAttribute("data-id", commentId);
    /*deleteButton.onclick = function(){

    }*/
    
    cardBody.appendChild(timeStamp);
    //cardBody.appendChild(studentName);
    cardBody.appendChild(commentText);
    cardBody.appendChild(brk);
    /*cardBody.appendChild(social);
    cardBody.appendChild(like); append the buttons here!!!!!!!!!!!!!!!!
    */
    
    card.appendChild(cardBody);

    return card;
}

function createOtherCommentCard(comment, studentId, rating, eventId, commentId){
    var card = document.createElement("div");
    card.className = "card";
    card.setAttribute("id", "card-" + commentId);

    var cardBody = document.createElement("div");
    cardBody.className = "card-body";
    cardBody.setAttribute("id", "card-body-" + commentId);

    var timeStamp = document.createElement("p");
    timeStamp.className = "pull-right";
    timeStamp.setAttribute("id", "timeStamp-" + commentId);

    /*var small = document.createElement("small");
    small.setAttribute("id", "small-" + commentId);
    small.innerHTML = "PLACEHOLDER";//comment table in db doesn't have this !!!!!!!!!!!!!

    timeStamp.appendChild(small);

    var studentName = document.createElement("h4");
    studentName.className = "media-heading user_name";
    studentName.innerHTML = "PLACEHOLDER"; //comment table in DB doesn't have this!!!!!!!!!!!!!!!!*/

    var commentText = document.createElement("p");
    commentText.setAttribute("id", "comment-" + commentId);
    commentText.innerHTML = comment;

    var brk = document.createElement("br");

    //button
    //span
    //button
    //span append span to buttons

    cardBody.appendChild(timeStamp);
    //cardBody.appendChild(studentName);
    cardBody.appendChild(commentText);
    cardBody.appendChild(brk);
    /*cardBody.appendChild(social);
    cardBody.appendChild(like); append the buttons here!!!!!!!!!!!!!!!!
    */
    
    card.appendChild(cardBody);

    return card;
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

			    if (events.error != "None" && events.error != "No comments found")
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
                    var category = events.results[i].Category;
                    var long = events.results[i].long;
                    var lat = events.results[i].lat;
                    getComments(eventId, avgRating, name);//get the comments for that event
                    var eventCard = createEventCard(name, description, time, date, eventId, "http://198.199.77.197/img/ICpt2.jpg", phone, email, category, long, lat); 
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
		window.location.href = "#";
		return;
	}
}

function createEventCard(name, description, time, date, eventId, imgUrl, phone, email, category, long, lat){
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
    title.innerHTML = name + ": " + category;

    var dateTime = document.createElement("h5");
    dateTime.setAttribute("id", "eventDate-" + eventId);
    dateTime.setAttribute("data-id", eventId);
    dateTime.innerHTML = "on " + date + " at " + time + ", Location: " + long + ", " + lat;

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
    commentButton.innerHTML = "Comments";
    btnDisplay = commentButton;
    showComments(eventId);

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

   // commentBoxDisplay = document.getElementById("commentBox"); //this used to be called modal

    // Get the button that opens the modal
    //btnDisplay = document.getElementById("commentButton-" + eventId);

    // Get the <span> element that closes the modal
    //spanDisplay = document.getElementById("span");

    // When the user clicks the button, open the modal 
    btnDisplay.onclick = function() {
        document.getElementById("commentBox-" + eventId).style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    spanDisplay.onclick = function() {
        document.getElementById("commentBox-" + eventId).style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == document.getElementsByName("commentBox")) {
            document.getElementsByName("commentBox").style.display = "none";
        }
    }
}