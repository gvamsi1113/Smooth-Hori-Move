const track = document.getElementById("image-track");
const brat = document.getElementById("with-mouse");


window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
}

window.onmouseup = e => {
    track.dataset.mouseDownAt = "0";
    track.animate({
        transform: `translate(${Math.round(track.dataset.percentage/19.5*1.545)*19.5/1.545}%, -50%)`
    }, { duration: 800, fill: "forwards" });
    for (const image of track.getElementsByClassName("image")) {
        image.animate({
            objectPosition: `${Math.round(track.dataset.percentage/19.5*1.545)*19.5/1.545 + 100}% center`
        }, { duration: 800, fill: "forwards" });
    }
    
    track.dataset.prevPercentage = Math.round(track.dataset.percentage/19.5*1.545)*19.5/1.545;
}

window.onmousemove = e => {
    const mX = e.clientX;
    const mY = e.clientY;

    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX, maxDelta = window.innerWidth / 2;



    // const nextPercentage = Math.min(Math.max(parseFloat(track.dataset.prevPercentage) + mouseDelta / maxDelta * -100, -63), 0);

    // const limitConst = 41+41+7*3+8*18 = 247;  track(paddingLeft + paddingRight) + (number of gaps * width of each gap) + (number of elements * width of each)
    // So for maxDelta movement of mouse the track should move 248 and should not move more than that so limited to that amount.

    const nextPercentage = Math.min(Math.max(parseFloat(track.dataset.prevPercentage) + mouseDelta / maxDelta * -100, -100+18*100/154.5), 0);

    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    }, { duration: 1200, fill: "forwards" });

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