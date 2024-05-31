document.addEventListener('DOMContentLoaded', function () {
    // setTimeout(() => {

    function redirectIfNeeded() {
        if (window.innerWidth > 768 || window.innerHeight > 400) {
            window.location.href = './desktop.html';
        }
    }

    // Initial check
    redirectIfNeeded();

    // Check on window resize
    window.addEventListener('resize', function () {
        redirectIfNeeded();
    });
    // }, 1000)
});