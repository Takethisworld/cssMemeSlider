window.addEventListener('DOMContentLoaded', () => {
    const sliderMain = document.querySelector('.slider__cont'),
        sliderCont = document.querySelectorAll('.slide__item'),
        sliderNext = document.querySelector('.slide__next'),
        sliderPrev = document.querySelector('.slide__prev'),
        sliderInner = document.querySelector('.slide'),
        sliderWrapper = document.querySelector('.wrapper'),
        width = window.getComputedStyle(sliderWrapper).width,
        currentSlide = document.querySelector('#current'),
        totalSelector = document.querySelector('#total')

    let sliderIndex = 1;
    let offset = 0;
    let dots = []

    sliderInner.style.width = 100 * sliderCont.length + '%';
    sliderInner.style.display = 'flex';
    sliderInner.style.transition = '0.5s all ease-in-out';

    sliderWrapper.style.overflow = 'hidden';

    sliderCont.forEach(item => {
        item.style.width = width;
    });

    function sliderCount() {
        if (sliderCont.length < 10) {
            currentSlide.textContent = `0${sliderIndex}`;
        } else {
            currentSlide.textContent = sliderIndex
        }
    };

    function stringToNumber(str) {
        return +str.replace(/\D/g, '');
    }

    function sliderOffset() {
        if (offset == stringToNumber(width) * (sliderCont.length - 1)) {
            offset = 0;
        } else {
            offset += stringToNumber(width);
        }
    };

    function dotsTrans() {
        dots.forEach(dot => { dot.style.opacity = '.5' });
        dots[sliderIndex - 1].style.opacity = 1;
    }

    sliderNext.addEventListener('click', () => {
        console.log('click');

        sliderCount();
        sliderInner.style.transform = `translateX(-${offset}px)`;

        sliderOffset();

        if (sliderIndex == sliderCont.length) {
            sliderIndex = 1;
        } else {
            sliderIndex++;
        }

        dotsTrans();
    });

    sliderPrev.addEventListener('click', () => {

        sliderOffset()

        sliderInner.style.transform = `translateX(-${offset}px)`;

        if (sliderIndex == 1) {
            sliderIndex = sliderCont.length;
        } else {
            sliderIndex--;
        }

        sliderCount();
        dotsTrans();
    });

    /*Slider navigation */

    sliderMain.style.position = 'relative';

    const dotIndicator = document.createElement('ol')
    dotIndicator.classList.add('carousel-indicators');
    dotIndicator.style.cssText = `
    position: relative;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
`
    sliderMain.append(dotIndicator);

    for (let i = 0; i < sliderCont.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        dot.style.cssText = `
        box-sizing: content-box;
    flex: 0 1 auto;
    width: 30px;
    height: 30px;
    margin-right: 3px;
    margin-left: 3px;
    cursor: pointer;
    background-color: black;
    background-clip: padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-radius:50%;
    opacity: .5;
    transition: background-color .6s ease-in-out;
    }`

        if (i === 0) {
            dot.style.opacity = 1;
        }
        dotIndicator.append(dot);
        dots.push(dot)
    }

    dots.forEach(dot => {

        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            sliderIndex = slideTo;

            offset = stringToNumber(width) * (slideTo - 1);

            sliderInner.style.transform = `translateX(-${offset}px)`;
            dotsTrans();
            sliderCount();
        })
    })
})