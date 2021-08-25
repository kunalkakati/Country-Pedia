const arow = document.querySelector(".go-home a i");
const home_button = document.querySelector(".go-home a");

home_button.addEventListener("mouseover", ()=>{
    arow.classList.add("arow-ani");
});
home_button.addEventListener("mouseleave", ()=>{
    arow.classList.remove("arow-ani");
});

