const track = document.getElementById("image-track");
const trackWidth = +((track.offsetWidth / window.innerWidth * 100).toFixed(1))
const numberOfProjects = +track.childElementCount;
// const firstProject = document.querySelector('#image-track :nth-child(1)');
const firstProject = track.children.item(0);
const imageWidth = +((firstProject.offsetWidth / window.innerWidth * 100).toFixed(1));
const trackGap = +(window.getComputedStyle(track).getPropertyValue('gap').slice(0, -3) / innerWidth * 100).toFixed(1);
const anchoringConst = 100 * (imageWidth + trackGap) / trackWidth;
const dummyScroller = document.getElementById("dummy-scroll");
const limitMax = -100 + anchoringConst + (3 * trackGap / 4 - imageWidth / 2) * 100 / trackWidth;
const scrollLimitMax = -100 + anchoringConst + trackGap * 100 / trackWidth;
const limitMin = anchoringConst - (3 * trackGap / 4 + imageWidth / 2) * 100 / trackWidth;
// console.log(limitMax, limitMin);
// console.log(dummyScroller.scrollTop);
// console.log(numberOfProjects, imageWidth, trackGap, anchoringConst, trackWidth, (numberOfProjects*(imageWidth+trackGap)-trackGap));

window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
    if (e.clientY >= window.innerHeight / 2 + 30 / 2 * window.innerWidth / 100 || e.clientY <= window.innerHeight / 2 - 30 / 2 * window.innerWidth / 100) track.dataset.mouseDownAt = 0;
    // if statement deregisters the e.clientX if the mousedown happens outside the middle area

}

window.onmouseup = e => {
    track.dataset.mouseDownAt = "0";
    track.animate({
        transform: `translate(${Math.round(track.dataset.percentage / anchoringConst) * anchoringConst}%, -50%)`
    }, { duration: 600, fill: "forwards" });

    for (const image of track.getElementsByClassName("image")) {
        image.animate({
            objectPosition: `${Math.round(track.dataset.percentage / anchoringConst) * anchoringConst + 100}% center`
        }, { duration: 500, fill: "forwards" });
    }

    track.dataset.prevPercentage = Math.round(track.dataset.percentage / anchoringConst) * anchoringConst;

    dummyScroller.scrollTo(0, -track.dataset.prevPercentage / 100 * dummyScroller.offsetHeight)

}

dummyScroller.onscroll = e => {
    const scrollPercentage = Math.min(dummyScroller.scrollTop / dummyScroller.offsetHeight * 100, -scrollLimitMax);
    // console.log(scrollPercentage);
    track.animate({
        transform: `translate(${-scrollPercentage}%, -50%)`
    }, { duration: 1200, fill: "forwards" });

    for (const image of track.getElementsByClassName("image")) {
        image.animate({
            objectPosition: `${-scrollPercentage + 100}% center`
        }, { duration: 1200, fill: "forwards" });
    }
    track.dataset.percentage = -scrollPercentage;
}

dummyScroller.onscrollend = e => {
    if (dummyScroller.scrollTop / dummyScroller.offsetHeight * 100 > -scrollLimitMax) {
        dummyScroller.scrollTop = -scrollLimitMax / 100 * dummyScroller.offsetHeight;
    }
    track.animate({
        transform: `translate(${Math.round(track.dataset.percentage / anchoringConst) * anchoringConst}%, -50%)`
    }, { duration: 600, fill: "forwards" });

    for (const image of track.getElementsByClassName("image")) {
        image.animate({
            objectPosition: `${Math.round(track.dataset.percentage / anchoringConst) * anchoringConst + 100}% center`
        }, { duration: 500, fill: "forwards" });
    }
    track.dataset.prevPercentage = Math.round(track.dataset.percentage / anchoringConst) * anchoringConst;

}

window.onmousemove = e => {

    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX, maxDelta = window.innerWidth / 2;

    // for maxDelta of mouse the track should move 248px and should not move more than that so limited to that amount.

    const nextPercentage = Math.min(Math.max(parseFloat(track.dataset.prevPercentage) + mouseDelta / maxDelta * -100, limitMax), limitMin);

    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
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