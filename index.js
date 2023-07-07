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
    
    brat.animate({
        transform: `translate(${mX - 15}px, ${mY - 15}px) rotate(${(mX-mY)*2.5}deg)`
    }, { duration: 600, fill: "forwards" });

    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX, maxDelta = window.innerWidth / 2;

    const nextPercentage = Math.min(Math.max(parseFloat(track.dataset.prevPercentage) + mouseDelta / maxDelta * -100, -84), 0);

    const yDelta = ((e.clientY - window.innerHeight / 2) / window.innerHeight * 100);

    track.animate({
        transform: `translate(${nextPercentage - 8}%, ${yDelta * 1 / 5 - 50}%)`
    }, { duration: 1200, fill: "forwards" });

    track.dataset.percentage = nextPercentage;

    for (const image of track.getElementsByClassName("image")) {
        image.animate({
            objectPosition: `${nextPercentage + 100}% center`
        }, { duration: 1200, fill: "forwards" });
    }
}

// window.onmousemove = wme => {
//     const mX = wme.clientX/window.innerWidth*100;
//     const mY = wme.clientY/window.innerHeight*100;

//     brat.animate({
//         transform: `translate(${mX}%, ${mY}%)`
//     }, { duration: 1200, fill: "forwards" });
// }