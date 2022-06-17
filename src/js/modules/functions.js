export const isWebp = () => {
  var checkWebp = function(){
    try{
      return (document
        .createElement('canvas')
        .toDataURL('image/webp')
        .indexOf('data:image/webp') == 0)
    } catch(err) {
        return  false;
    }
  }
  const isWebp = checkWebp()

  let className = isWebp ? 'webp' : 'no-webp'
  document.documentElement.classList.add(className)
}