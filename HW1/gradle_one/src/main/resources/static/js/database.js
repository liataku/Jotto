

// Returns a list of all a users guesses
function getGuesses()
{

}

function getAllUsers(){

    var userList = $.get("http://localhost:8080/users/AllUsers", function(data)
    {
        var password = data["password"]
        alert(password);
    })



$("#addUserButton").click(saveUser())



function getUser(){}

function getAllUserGames(){}

function getAllGames(){

    $.get("http://localhost:8080/")
}