var userID = -1;
var uniID = -1; // This needs a value to work
var userLevel = '';

function showNavBar()
{
  console.log(userLevel);

	if (userLevel == "Student" || userLevel == "Admin")
	{
		console.log(showLoggedInButtons());
	}
	else
	{
		console.log(showLoggedOutButtons());
	}
}

function showLoggedInButtons()
{
	document.getElementById("navbarList").innerHTML = `
	<a class="navbar-brand" href="index.html"><img src="img/UCFLogo.png" class="" width="50" height="50" alt="">&nbsp;Event Management Site
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="d-flex justify-content-end collapse navbar-collapse mr-4" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" style="color: #123C69" href="Events.html">Events </a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" style="color: #123C69" href="planning.html">Plan</a>
            </li>
            <li class="nav-item active dropdown">
              <a class="nav-link dropdown-toggle" style="color: #123C69" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                RSOs
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="createRSO.html">Create RSO</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="rsos.html">Join RSO</a>
              </div>
            </li>
            <li class="nav-item active">
              <a class="nav-link" style="color: #123C69" onclick="logout();">Logout</a>
            </li>
          </ul>
        </div> `;

      return "logged in";

}

function showLoggedOutButtons()
{
	document.getElementById("navbarList").innerHTML = `
	<a class="navbar-brand" href="index.html"><img src="img/UCFLogo.png" class="" width="50" height="50" alt="">&nbsp;Event Management Site
        </a>
        <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="d-flex justify-content-end collapse navbar-collapse mr-4" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" style="color: #123C69" href="Events.html">Events </a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" style="color: #123C69" href="rsos.html" aria-haspopup="true" aria-expanded="false">
                RSOs
              </a>

            </li>
            <li class="nav-item active">
              <a class="nav-link" style="color: #123C69" href="login.html">Login</a>
            </li>
          </ul>
        </div> `;

      return "logged out";
}

function readNavCookie()
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