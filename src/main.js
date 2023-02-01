const toggleModeBtn = document.querySelector("#toggle-mode-btn");
const body = document.querySelector("body");

toggleModeBtn.addEventListener("click", function() {
    if (body.classList.contains("light-mode")) {
        body.classList.remove("light-mode");
        body.classList.add("dark-mode");
    } else {
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");
    }
});