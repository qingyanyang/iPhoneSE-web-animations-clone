
const iphoneSE = document.getElementById('iphoneSE');
const space = document.getElementsByClassName('space');
const ad = document.getElementById('ad');
const adSlogan = document.querySelector('#ad .slogan');
const buy = document.querySelector('#ad .slogan span a');
const zoomImg = document.querySelector('#zoom img');
const zoom = document.getElementById('zoom');
const zoomH = document.querySelector('#zoom h2');
const fasterText = document.querySelectorAll('#slide li');
const fasterTexts = document.querySelector('#slide ul');
const fasterP = document.querySelector('#slide .desc-text');
const slide = document.getElementById('slide');
const iphoneSide = document.getElementById('iphone-side');
const mask = document.querySelector('#slide .mask');
const halfText = document.querySelector('#slide .half-text');


// get scroll position
window.addEventListener('scroll', () => {
    // common vars
    const scrollPosition = window.scrollY;
    const height = 52;
    // debug
    console.log(scrollPosition);

    // header effect
    headerEffect(scrollPosition, height);

    // zoom effect
    zoomEffect(scrollPosition, height);

    // slide effect
    slideEffect(scrollPosition, height);
});

function headerEffect(scrollPosition, height) {
    if (scrollPosition > height) {
        iphoneSE.classList.add('fix');
        space[0].classList.add('space-height1');
    } else {
        iphoneSE.classList.remove('fix');
        space[0].classList.remove('space-height1');
    }
}

/*
    scrollPosition: from 104 -> 404
    translateX: from 100% -> 15%
    translateY: from -126.5% -> 22%
    scale: from 5.3 -> 0.78
    rotate: from 0 -> 90
*/
function zoomEffect(scrollPosition, height) {
    // Define start and end values
    const startPosition = height * 2;
    const endPosition = 404;
    const textShownPosition = 350;
    const zoomTopInitial = 0;

    // Define transformations and opacity starts and ends
    const transformStart = {
        translateX: 100,  // Percentage
        translateY: -126.5,  // Percentage
        scale: 5.3,
        rotate: 0  // Degrees
    };

    const transformEnd = {
        translateX: 15,  // Percentage
        translateY: 22,  // Percentage
        scale: 0.78,
        rotate: 90  // Degrees
    };

    const textOpacityStart = 0;
    const textOpacityEnd = 1;

    // Applying transformations and opacity based on scroll position
    if (scrollPosition < startPosition) {
        // Before animation starts
        zoomImg.style.transform = `translateX(${transformStart.translateX}%) translateY(${transformStart.translateY}%) scale(${transformStart.scale}) rotate(${transformStart.rotate}deg)`;
        zoomH.style.opacity = textOpacityStart;
        zoom.style.top = `${zoomTopInitial}px`;
    } else if (scrollPosition > endPosition) {
        // After animation ends
        zoomImg.style.transform = `translateX(${transformEnd.translateX}%) translateY(${transformEnd.translateY}%) scale(${transformEnd.scale}) rotate(${transformEnd.rotate}deg)`;
        zoomH.style.opacity = textOpacityEnd;
    } else {
        // During animation
        const progress = (scrollPosition - startPosition) / (endPosition - startPosition);
        let translateX = linearInterpolation(transformStart.translateX, transformEnd.translateX, progress) + '%';
        let translateY = linearInterpolation(transformStart.translateY, transformEnd.translateY, progress) + '%';
        let scale = linearInterpolation(transformStart.scale, transformEnd.scale, progress);
        let rotate = linearInterpolation(transformStart.rotate, transformEnd.rotate, progress) + 'deg';

        zoomImg.style.transform = `translateX(${translateX}) translateY(${translateY}) scale(${scale}) rotate(${rotate})`;
        zoom.style.top = `${scrollPosition - startPosition}px`;

        // Handling text opacity from specific scroll position
        if (scrollPosition >= textShownPosition) {
            const textProgress = (scrollPosition - textShownPosition) / (endPosition - textShownPosition);
            const opacity = linearInterpolation(textOpacityStart, textOpacityEnd, textProgress);
            zoomH.style.opacity = opacity;
        }
    }
}

function linearInterpolation(startValue, endValue, progress) {
    return startValue + (endValue - startValue) * progress;
}

function slideEffect(scrollPosition) {
    let ranges = [
        { start: 945, end: 1160, translateStart: 10, translateEnd: 0 },
        { start: 1000, end: 1200, translateStart: 24, translateEnd: 0 },
        { start: 1050, end: 1300, translateStart: 38, translateEnd: 0 },
        { start: 1100, end: 1400, translateStart: 52, translateEnd: 0 },
        { start: 1150, end: 1500, translateStart: 66, translateEnd: 0 }
    ];
    let staticPosition = 1160;
    let endPosition = 2300;
    const textShownPosition = 1550;
    const textEndPosition = 1650;
    const slideShownPosition = 1700;
    const textDiscardStartPosition = 1800;
    const textDiscardEndPosition = 1872;// text removed; mask show; slogan show
    const slideStopPosition = 2200;
    const slideStartLeft = 720;
    const slideEndLeft = 0;
    const maskStartWidth = 484;
    const maskEndWidth = 13;


    ranges.forEach((range, index) => {
        let elements = Array.from(fasterText);
        if (scrollPosition < range.start) {
            elements[index].style.opacity = 0;
            elements[index].style.transform = `translateX(0%)`;
        } else if (scrollPosition >= range.start && scrollPosition <= range.end) {
            let progress = (scrollPosition - range.start) / (range.end - range.start);
            let translateX = linearInterpolation(range.translateStart, range.translateEnd, progress) + '%';
            let opacity = linearInterpolation(0, 1, progress);
            elements[index].style.transform = `translateX(${translateX})`;
            elements[index].style.opacity = opacity;
        } else if (scrollPosition > range.end) {
            elements[index].style.transform = `translateX(0%)`;
            elements[index].style.opacity = 1;
        }
    });

    if (scrollPosition >= staticPosition && scrollPosition <= endPosition) {
        slide.style.top = `${scrollPosition - staticPosition}px`;
    }

    if (scrollPosition >= textShownPosition) {
        const textProgress = (scrollPosition - textShownPosition) / (textEndPosition - textShownPosition);
        const opacity = linearInterpolation(0, 1, textProgress);
        fasterP.style.opacity = opacity;
    }

    if (scrollPosition < textShownPosition) {
        fasterP.style.opacity = 0;
    }
    if (scrollPosition > textEndPosition) {
        fasterP.style.opacity = 1;
    }

    // disappear
    if (scrollPosition >= slideShownPosition && scrollPosition <= slideStopPosition) {
        if (scrollPosition >= textDiscardStartPosition && scrollPosition <= textDiscardEndPosition) {
            const textProgress = (scrollPosition - textDiscardStartPosition) / (textDiscardEndPosition - textDiscardStartPosition);
            const opacity = linearInterpolation(1, 0, textProgress);
            fasterP.style.opacity = opacity;
            fasterTexts.style.opacity = opacity;
        }
        if (scrollPosition > textDiscardEndPosition) {
            fasterP.style.opacity = 0;
            fasterTexts.style.opacity = 0;
        }


        iphoneSide.style.opacity = 1;
        const iphoneProgress = (scrollPosition - slideShownPosition) / (slideStopPosition - slideShownPosition);
        const left = linearInterpolation(slideStartLeft, slideEndLeft, iphoneProgress);
        iphoneSide.style.left = left + 'px';
        if (scrollPosition >= textDiscardEndPosition) {
            mask.style.opacity = 1;
            const maskProgress = (scrollPosition - textDiscardEndPosition) / (slideStopPosition - textDiscardEndPosition);
            const width = linearInterpolation(maskStartWidth, maskEndWidth, maskProgress);
            mask.style.width = width + 'px';
            halfText.style.opacity = 1;
        }

    }
    if (scrollPosition < textDiscardEndPosition) {
        mask.style.opacity = 0;
        halfText.style.opacity = 0;
    }
    if (scrollPosition < slideShownPosition) {
        iphoneSide.style.opacity = 0;
    }
    if (scrollPosition > slideStopPosition) {
        fasterP.style.opacity = 0;
        fasterTexts.style.opacity = 0;
    }
}


// ad show up
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        adSlogan.style.transform = 'translateY(0)';
    }, 0);

    setTimeout(() => {
        adSlogan.style.backgroundColor = 'white';
        adSlogan.style.color = 'black';
        buy.style.color = '#0171E3';
    }, 1200);
});

