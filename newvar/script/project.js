const contents = document.querySelectorAll(".c_content");
const children_contents = document.querySelectorAll(".c_content_title");
const bg = document.querySelector(".c_bg");

for(let i = 0; i < children_contents.length; i++) {
    children_contents[i].addEventListener("click", () => {
        contents[i].classList.toggle("show");
    })
}

bg.addEventListener("click", function() {
    for(let i = 0; i < contents.length; i++) {
        contents[i].classList.remove("show");
    }
})