async function lazyLoadImg(attrName = '.lazy-img') {

  const imgScrollObserver = () => {
    const lazyItems = document.querySelectorAll(attrName)
    const startLine = (window.innerHeight * 1.2) + window.scrollY;
    lazyItems.forEach(el => {
      if (startLine >= el.offsetTop) {
        el.src = el.dataset.url
        el.dataset.url = ''
        el.classList.remove('lazy-img')
      }
    })
  }

  imgScrollObserver()

  document.addEventListener('scroll', () => imgScrollObserver())

  return {
    destoy() {
      document.removeEventListener('scroll', () => imgScrollObserver())
    }
  }
}

export { lazyLoadImg }
