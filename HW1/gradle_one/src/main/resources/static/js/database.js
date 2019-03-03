

// Returns a list of all a users guesses
function getAllUsersGuesses(id)
{
    $.get("http://localhost:8080/users/AllUserGuesses/" + id, function(data){

        var gameOjb = JSON.parse(data)
        alert(data);
    })
}

function getAllGuesses()
{
    $.get("http://localhost:8080/users/AllGuesses", function(data){

        var gameOjb = JSON.parse(data)
        alert(data);
    })
}

function getUserByUsername(username){

    $.get("http://localhost:8080/users/Users/" + username, function(data){

        var gameOjb = JSON.parse(data)
        alert(data);
    })
}


function getUserById(id){

    $.get("http://localhost:8080/users/GetUser/" + id, function(data){

        var gameOjb = JSON.parse(data)
        alert(data);
    })
}

//Gets all of a users games
function getAllUserGames(id){

    $.get("http://localhost:8080/users/AllUserGames/" + id, function(data){

        var gameOjb = JSON.parse(data)
        alert(data);
    })
}

function getAllGames(){

    $.get("http://localhost:8080/users/AllGames", function(data){

        var gameOjb = JSON.parse(data)
        alert(data);
    })

}