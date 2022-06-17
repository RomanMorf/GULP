function scrollObserver(scrollItem = '.scroll_item', animItem = '.anim_item') {
  const scrollItems = document.querySelectorAll(scrollItem)
  const animItems = document.querySelectorAll(animItem)

  const scrollAnimation = ( scrollArr ) => {
    const startLine = (window.innerHeight * 0.9) + window.scrollY; // where animation start (default 90% of window view)
    scrollArr.forEach(el => {
      const scrollOffset = el.offsetTop;
      if (startLine >= scrollOffset) {
        el.classList.add('animation')       // start animation
      } else {
        // el.classList.remove('animation') // uncomment if you want animate backword 
      }
    })
  }

  const onScreenAnimation = ( animateArr ) => {
    const startLine = (window.innerHeight * 0.5) + window.scrollY;
    const finishLine = (window.innerHeight * 0.5) + window.scrollY;

    animateArr.forEach(el => {
      if (startLine >= el.offsetTop && finishLine <= el.offsetTop + el.offsetHeight) { // start of animation
        el.classList.add('animation_play')
      } else {
        el.classList.remove('animation_play')
      }
    })
  }

  const scrollListeners = () => {
    scrollAnimation(scrollItems)
    onScreenAnimation(animItems)
  }

  scrollAnimation(scrollItems)

  document.addEventListener('scroll', () => scrollListeners())

  return {
    destoy() {
      document.removeEventListener('scroll', () => scrollListeners())
    }
  }
}

export { scrollObserver }
