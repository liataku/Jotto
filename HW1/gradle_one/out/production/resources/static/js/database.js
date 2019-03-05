

// Returns a list of all a users guesses
function getAllUsersGuesses(id)
{
    $.get("http://localhost:8080/users/AllUserGuesses/" + id, function(data){

        var gameOjb = JSON.parse(data);
        console.log(data);
    })
}

function getAllGuesses()
{
    $.get("http://localhost:8080/users/AllGuesses", function(data){

        var gameOjb = JSON.parse(data);
        console.log(data);
    })
}

function getUserByUsername(username){

    $.get("http://localhost:8080/users/Users/" + username, function(data){

        var gameOjb = JSON.parse(data);
        console.log(data);
    })
}


function getUserById(id){

    $.get("http://localhost:8080/users/GetUser/" + id, function(data){

        var gameOjb = JSON.parse(data);
        console.log(data);
    })
}

//Gets all of a users games
function getAllUserGames(id){

    $.get("http://localhost:8080/users/AllUserGames/" + id, function(data){

        var gameOjb = JSON.parse(data);
        console.log(data);
    })
}
//<tr>
//    <td>
//
//    </td>
//    <td>
//
//    </td>
//    <td>
//
//    </td>
//    <td>
//        <div class="pastGames">
//            <div class ="past_player_guesses">
//            </div>
//        </div>
//    </td>
//    <td>
//        <div class="pastGames">
//            <div class ="past_CPU_guesses">
//            </div>
//        </div>
//    </td>
//</tr>
function getAllGames(callback){
    $.get("http://localhost:8080/users/AllGames", function(data){
        console.log(data);
        var i = 0, j = 0, k = 0, p_guesses = "", c_guesses = "", rows = "", entry, guesses;
        for (i = 0; i < data.length; i++) {
            entry = data[i];
            if (entry != null) {
                rows += "<tr>";
                rows += "<td><div class=\"username\">" + entry.playerName + "</div></td>";
                rows += "<td><div class=\"past_player_word\">" + entry.player_Word + "</div></td>";
                rows += "<td><div class=\"past_CPU_word\">" + entry.cpu_Word + "</div></td>";
                p_guesses = "";
                c_guesses = "";
                guesses = entry.guesses;
                for (j = 0; j < guesses.length; j++) {
                    if (guesses[j].type == "player") {
                        p_guesses += "<p>";
                        for (k = 0; k < 5; k++) {
                            if (guesses[j].correct_Array[k] == "true") {
                                p_guesses += "<mark style=\"background-color:#55a866\">" + guesses[j].guess.charAt(k) + "</mark>";
                            } else if (guesses[j].correct_Array[k] == "false") {
                                p_guesses += "<mark style=\"background-color:#a85555\">" + guesses[j].guess.charAt(k) + "</mark>";
                            }
                        }
                        p_guesses += "</p>";
                    } else if (guesses[j].type == "cpu") {
                        c_guesses += "<p>";
                        for (k = 0; k < 5; k++) {
                            if (guesses[j].correct_Array[k] == "true") {
                                c_guesses += "<mark style=\"background-color:#55a866\">" + guesses[j].guess.charAt(k) + "</mark>";
                            } else if (guesses[j].correct_Array[k] == "false") {
                                c_guesses += "<mark style=\"background-color:#a85555\">" + guesses[j].guess.charAt(k) + "</mark>";
                            }
                        }
                        c_guesses += "</p>";
                    }
                }
                rows += "<td><div class=\"pastGames\"><div class=\"past_player_guesses\">"
                    + p_guesses
                    + "</div></div></td>";
                rows += "<td><div class=\"pastGames\"><div class=\"past_CPU_guesses\">"
                    + c_guesses
                    + "</div></div></td>";
                rows += "</tr>";
            }
        }
        callback(rows);
    })

}