// Attach scroll event listener to the window or document
window.addEventListener("scroll", function () {
    var images = document.querySelectorAll(".bg-image");

    var arr = [];

    // Use a for loop to populate the array with eight images
    for (var i = 1; i < 8; i++) {
        arr.push(document.getElementById(i.toString()).getBoundingClientRect());
    }

  const changeBg = 400;
// Check if the div is scrolled off the screen vertically
for (var i = 0; i < 8; i++) {
    if (i === 8 && arr[7].bottom < changeBg) {
        images[i].classList.remove("fade-out");
    } 
    else if (i === 7 && arr[6].bottom < changeBg) {
        images[i].classList.remove("fade-out");
    } 
    else if (i === 6 && arr[5].bottom < changeBg) {
        images[i].classList.remove("fade-out");
    } 
    else if (i === 5 && arr[4].bottom < changeBg) {
        images[i].classList.remove("fade-out");
    } 
    else if (i === 4 && arr[3].bottom < changeBg) {
        images[i].classList.remove("fade-out");
    } 
    else if (i === 3 && arr[2].bottom < changeBg) {
        images[i].classList.remove("fade-out");
    } 
    else if (i === 2 && arr[1].bottom < changeBg) {
        images[i].classList.remove("fade-out");
    } 
    else if (i === 1 && arr[0].bottom < changeBg) {
        images[i].classList.remove("fade-out");
    } 
    else {
        images[i].classList.add("fade-out");
        images[0].classList.remove("fade-out");
    }
}
});
