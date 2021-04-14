var urlBase = 'http://198.199.77.197';
var extension = 'php';


document.addEventListener(`DOMContentLoaded`, function () { //change getEvents to use UniID later
    var UniversityID = localStorage.getItem("UniversityID");
    getRsos(0);
  });


function getRsos(uniId)
{
	var jsonPayload = '{"uniID" : "' + uniID + '"}';//change this to include security level
	var url = urlBase + '/API/getRSOList.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				var rso = JSON.parse( xhr.responseText );

			    if (rso.error != "None")
				    window.location.href = "index.html";
				    
				var rsoList = document.getElementById("rsoList");
				
				
				for (var i = 0; i < rso.results.length; i++)
                {
                    var name = rso.results[i].Name;
                    var description = rso.results[i].Description;
                    var rsoId = rso.results[i].ID;
                    var rsoCard = createRsoCard(name, description, rsoId, "http://198.199.77.197/img/ICpt2.jpg"); 
                    rsoList.appendChild(rsoCard);
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

function createRsoCard(name, description, rsoId, imgUrl){
    var rsoCard = document.createElement("div");
    rsoCard.className = "row mb-3";
    rsoCard.setAttribute("data-id", rsoId);

    var rsoImage = document.createElement("div");
    rsoImage.className = "imgPlaceholder";
    rsoImage.setAttribute("id", "rsoImg-" + rsoId);

    var rsoContainer = document.createElement("div");
    rsoContainer.className = "rsoContainer";
    rsoContainer.setAttribute("id", "theRso-" + rsoId);

    var title = document.createElement("h1");
    title.setAttribute("id", "rsoTitle-" + rsoId);
    title.setAttribute("data-id", rsoId);
    title.setAttribute("href", "#");
    title.innerHTML = name;

    var rsoDesc = document.createElement("p");
    rsoDesc.setAttribute("id", "rsoDescription-" + rsoId);
    rsoDesc.setAttribute("data-id", rsoId);
    rsoDesc.innerHTML = description;

    var joinButton = document.createElement("button");
    joinButton.setAttribute("class", "btn col-md-2");
    joinButton.setAttribute("data-id", rsoId);
    joinButton.setAttribute("id", "joinButton-" + rsoId);
    joinButton.setAttribute("data-id", rsoId);
    joinButton.setAttribute("onclick", "joinRso(" + rsoId + ")")
    joinButton.innerHTML = "Join Here";

    rsoContainer.appendChild(title);
    rsoContainer.appendChild(rsoDesc);
    rsoContainer.appendChild(joinButton);

    rsoCard.appendChild(rsoImage);
    rsoCard.appendChild(rsoContainer);

    return rsoCard;
}

function joinRso(rsoId){

    var jsonPayload = '{"rsoId" : "' + rsoId + '"}';//change this to include security level
    var url = urlBase + '/API/joinRSO.' + extension;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
        xhr.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200) 
            {
                var rso = JSON.parse( xhr.responseText );
                    
                
                if (rso.error != "None")
                    window.location.href = "index.html";
                
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