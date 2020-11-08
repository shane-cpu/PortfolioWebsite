
let Checkers = document.getElementById("Chec");
Checkers.addEventListener("click", function() {
    location.replace("Checkers.html")
});
Checkers.addEventListener("mouseenter", function() {
    document.getElementById("Chec").style.borderColor = "orange";
});
Checkers.addEventListener("mouseleave", function() {
    document.getElementById("Chec").style.borderColor = "white";
});

let Slap = document.getElementById("Slap");
Slap.addEventListener("click", function() {
    location.replace("Slap.html")
});
Slap.addEventListener("mouseenter", function() {
    document.getElementById("Slap").style.borderColor = "orange";
});
Slap.addEventListener("mouseleave", function() {
    document.getElementById("Slap").style.borderColor = "white";
});

let Tank = document.getElementById("Tank");
Tank.addEventListener("click", function() {
    location.replace("Tank.html")
});
Tank.addEventListener("mouseenter", function() {
    document.getElementById("Tank").style.borderColor = "orange";
});
Tank.addEventListener("mouseleave", function() {
    document.getElementById("Tank").style.borderColor = "white";
});