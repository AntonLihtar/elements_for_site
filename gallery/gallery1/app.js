function pluginSlides(indexSlide = 0) {
    const slides = document.querySelectorAll('.slide')
    slides[indexSlide].classList.add('active')
    for (const slide of slides) {
        slide.addEventListener('click', () => {
            clearActiveClasses()
            slide.classList.add('active')
        })
    }

    function clearActiveClasses() {
        slides.forEach((el) => el.classList.remove('active'))
    }
}

pluginSlides(2)