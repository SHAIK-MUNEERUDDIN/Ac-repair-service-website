// js to initialize aos library
AOS.init({
    duration: 1200,
});

//javascript to navigate on home section on reload
window.onload = function () {
    window.setTimeout(
        function () { window.scrollTo(0, 0); },
        10
    );
};

const navBar = document.querySelector("nav");
const sticky = navBar.offsetTop;
// js Function to stick the nav bar 
function myFunction() {
    if (window.pageYOffset > sticky) {
        navBar.classList.add("sticky")
    }
    else {
        navBar.classList.remove("sticky");
    }
}

// Call myFunction() to initialize the navbar
myFunction();

// Attach the onscroll event to the window
window.onscroll = function () { myFunction() };