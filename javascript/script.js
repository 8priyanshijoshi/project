function show(target){
    let tar = document.getElementById(target)
    tar.classList.add("show-sidebar")
}

function hide(target){
    let tar = document.getElementById(target)
    tar.classList.remove("show-sidebar")
}

let index = 0;

slideshow(index)
function changeslide(x){
    slideshow(index += x)
}

setInterval(() => {
    changeslide(1)
}, 5000);

function slideshow(n){
    let slide = document.getElementsByClassName("slide")
    if (n < 0){
        index = slide.length -1
    }
    if (n == slide.length){
        index = 0
    }
    for (const img of slide){
        img.style.display = "none"
    }
    slide[index].style.display = "block"
}



