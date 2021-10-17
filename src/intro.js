let form = document.forms["nameForm"];


//if a name is already stored on startup, the window is automatically changed to the game
if (window.localStorage.getItem("storedName") != null) window.location.replace("game.html");



form.onsubmit = function (e){
    //When forms are submitted the page is refreshed by default,
    //this circumvents that
    e.preventDefault();

    //saves the name and changes window
    let name = form["name"].value;
    console.log(name);
    window.localStorage.setItem("storedName",name);
    window.localStorage.setItem("lastScore",JSON.stringify(0));

    window.location.replace("game.html");
}