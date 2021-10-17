let form = document.forms["nameForm"];

//if a name is already stored on startup, the window is automatically changed to the game
if (window.localStorage.getItem("name") != null) window.location.replace("game.html");



form.onsubmit = function (e){
    //When forms are submitted the page is refreshed by default,
    //this circumvents that
    e.preventDefault();

    //saves the name and changes window
    let name = form["name"].value;
    window.localStorage.setItem("name",name);

    window.location.replace("game.html");
}