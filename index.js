const track = document.getElementById("image-track");
const brat = document.getElementById("with-mouse");


window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
}

window.onmouseup = e => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}

window.onmousemove = e => {
    const mX = e.clientX;
    const mY = e.clientY;

    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX, maxDelta = window.innerWidth / 2;

    const nextPercentage = Math.min(Math.max(parseFloat(track.dataset.prevPercentage) + mouseDelta / maxDelta * -100, -84), 0);

    track.animate({
        transform: `translate(${nextPercentage - 8}%, -50%)`
    }, { duration: 1500, fill: "forwards" });

    track.dataset.percentage = nextPercentage;

    for (const image of track.getElementsByClassName("image")) {
        image.animate({
            objectPosition: `${nextPercentage + 100}% center`
        }, { duration: 1500, fill: "forwards" });
    }
}

// window.onmousemove = wme => {
//     const mX = wme.clientX/window.innerWidth*100;
//     const mY = wme.clientY/window.innerHeight*100;

//     brat.animate({
//         transform: `translate(${mX}%, ${mY}%)`
//     }, { duration: 1200, fill: "forwards" });
// }