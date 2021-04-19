var urlBase = 'http://198.199.77.197';
var extension = 'php';
var userID = -1;
var uniID = -1;


function getRsos()
{
	var jsonPayload = '{"uniID" : ' + uniID + '}';//change this to include security level
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

			    if (rso.length == 0)
				    window.location.href = "index.html";
				    
				var rsoList = document.getElementById("rsoList");
				
				
				for (var i = 0; i < rso.length; i++)
                {
                    var name = rso[i].Name;
                    var description = rso[i].Description;
                    var rsoId = rso[i].ID;
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

    var logstatus = document.createElement("p");
    logstatus.setAttribute("id", "rsoLogstatus-" + rsoId);
    logstatus.setAttribute("style", "font-size: 1.0em;");

    rsoContainer.appendChild(title);
    rsoContainer.appendChild(rsoDesc);
    rsoContainer.appendChild(joinButton);

    rsoCard.appendChild(rsoImage);
    rsoCard.appendChild(rsoContainer);
    rsoCard.appendChild(logstatus);

    return rsoCard;
}

function joinRso(rsoID){


    var jsonPayload = '{"rsoId" : ' + rsoID + ', "userID" : ' + userID + '}';//change this to include security level
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
                    
                
                if (rso.msg != "Successfully joined RSO!")
                {
                    document.getElementById("rsoLogstatus-" + rsoID).innerHTML = rso.msg;
                    document.getElementById("rsoLogstatus-" + rsoID).style.color = "red";
                }

                else
                {
                    document.getElementById("rsoLogstatus-" + rsoID).innerHTML = rso.msg;
                    document.getElementById("rsoLogstatus-" + rsoID).style.color = "green";
                }
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

function readCookie()
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
        
        else if( tokens[0] == "userLevel")
        {
            userLevel = tokens[1].trim();
        }
	}
}