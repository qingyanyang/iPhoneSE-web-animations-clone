
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
const displayElements = {
    phone1: document.querySelector('#display ul li:nth-child(1) img'),
    phone2: document.querySelector('#display ul li:nth-child(2) img'),
    phone3: document.querySelector('#display ul li:nth-child(3) img'),
    halfTextRed: document.querySelector('#display .half-text')
};

window.addEventListener('scroll', handleScrollEffects);
function handleScrollEffects() {
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
    slideEffect(scrollPosition);

    // display phones effect
    displayEffect(scrollPosition);
}

function headerEffect(scrollPosition, height) {
    if (scrollPosition > height) {
        iphoneSE.classList.add('fix');
        space[0].classList.add('space-height1');
    } else {
        iphoneSE.classList.remove('fix');
        space[0].classList.remove('space-height1');
    }
}


function linearInterpolation(startValue, endValue, progress) {
    return startValue + (endValue - startValue) * progress;
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
    const stopPosition = 600;

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
        const translateX = linearInterpolation(transformStart.translateX, transformEnd.translateX, progress) + '%';
        const translateY = linearInterpolation(transformStart.translateY, transformEnd.translateY, progress) + '%';
        const scale = linearInterpolation(transformStart.scale, transformEnd.scale, progress);
        const rotate = linearInterpolation(transformStart.rotate, transformEnd.rotate, progress) + 'deg';

        zoomImg.style.transform = `translateX(${translateX}) translateY(${translateY}) scale(${scale}) rotate(${rotate})`;
        zoom.style.top = `${scrollPosition - startPosition}px`;

        // Handling text opacity from specific scroll position
        if (scrollPosition >= textShownPosition) {
            const textProgress = (scrollPosition - textShownPosition) / (endPosition - textShownPosition);
            const opacity = linearInterpolation(textOpacityStart, textOpacityEnd, textProgress);
            zoomH.style.opacity = opacity;
        }
    }

    if (scrollPosition > endPosition && scrollPosition <= stopPosition) {
        zoom.style.top = `${scrollPosition - startPosition}px`;
    }
}

function slideEffect(scrollPosition) {
    const ranges = [
        { start: 945, end: 1160, translateStart: 10, translateEnd: 0 },
        { start: 1000, end: 1200, translateStart: 24, translateEnd: 0 },
        { start: 1050, end: 1300, translateStart: 38, translateEnd: 0 },
        { start: 1100, end: 1400, translateStart: 52, translateEnd: 0 },
        { start: 1150, end: 1500, translateStart: 66, translateEnd: 0 }
    ];
    const staticPosition = 1160;
    const endPosition = 2300;
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
        const elements = Array.from(fasterText);
        if (scrollPosition < range.start) {
            elements[index].style.opacity = 0;
            elements[index].style.transform = `translateX(0%)`;
        } else if (scrollPosition >= range.start && scrollPosition <= range.end) {
            const progress = (scrollPosition - range.start) / (range.end - range.start);
            const translateX = linearInterpolation(range.translateStart, range.translateEnd, progress) + '%';
            const opacity = linearInterpolation(0, 1, progress);
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

function displayEffect(scrollPosition) {
    const imgs = [
        { widthStart: 42, widthEnd: 25, toptart: 0, topEnd: 1, leftStart: 33, leftEnd: 33 },
        { widthStart: 42, widthEnd: 23.5, toptart: 0, topEnd: 3, leftStart: 33, leftEnd: 26 },
        { widthStart: 42, widthEnd: 22, toptart: 0, topEnd: 5, leftStart: 33, leftEnd: 20 }
    ];

    const halfText = {
        leftStart: 33,
        leftEnd: 58
    }

    const startPosition = 2800;
    const endPosition = 3100;
    if (scrollPosition >= startPosition && scrollPosition <= endPosition) {
        const progress = (scrollPosition - startPosition) / (endPosition - startPosition);

        const width1 = linearInterpolation(imgs[0].widthStart, imgs[0].widthEnd, progress);
        const width2 = linearInterpolation(imgs[1].widthStart, imgs[1].widthEnd, progress);
        const width3 = linearInterpolation(imgs[2].widthStart, imgs[2].widthEnd, progress);
        const left1 = linearInterpolation(imgs[0].leftStart, imgs[0].leftEnd, progress);
        const left2 = linearInterpolation(imgs[1].leftStart, imgs[1].leftEnd, progress);
        const left3 = linearInterpolation(imgs[2].leftStart, imgs[2].leftEnd, progress);
        const top1 = linearInterpolation(imgs[0].toptart, imgs[0].topEnd, progress);
        const top2 = linearInterpolation(imgs[1].toptart, imgs[1].topEnd, progress);
        const top3 = linearInterpolation(imgs[2].toptart, imgs[2].topEnd, progress);
        const textLeft = linearInterpolation(halfText.leftStart, halfText.leftEnd, progress);

        displayElements.phone1.style.width = width1 + 'rem';
        displayElements.phone2.style.width = width2 + 'rem';
        displayElements.phone3.style.width = width3 + 'rem';
        displayElements.phone1.style.left = left1 + '%';
        displayElements.phone2.style.left = left2 + '%';
        displayElements.phone3.style.left = left3 + '%';
        displayElements.phone1.style.top = top1 + 'rem';
        displayElements.phone2.style.top = top2 + 'rem';
        displayElements.phone3.style.top = top3 + 'rem';
        displayElements.halfTextRed.style.left = textLeft + '%';

    }
    if (scrollPosition > endPosition) {
        displayElements.phone1.style.width = imgs[0].widthEnd + 'rem';
        displayElements.phone2.style.width = imgs[1].widthEnd + 'rem';
        displayElements.phone3.style.width = imgs[2].widthEnd + 'rem';
        displayElements.phone1.style.left = imgs[0].leftEnd + '%';
        displayElements.phone2.style.left = imgs[1].leftEnd + '%';
        displayElements.phone3.style.left = imgs[2].leftEnd + '%';
        displayElements.phone1.style.top = imgs[0].topEnd + 'rem';
        displayElements.phone2.style.top = imgs[1].topEnd + 'rem';
        displayElements.phone3.style.top = imgs[2].topEnd + 'rem';
        displayElements.halfTextRed.style.left = halfText.leftEnd + '%';
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

