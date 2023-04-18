const loadingScreen = document.querySelector('.loading-screen')

const setLoadingScreen = () => {
    if (!loadingScreen) return;
    const loadingImage = '<img loading="lazy" src="favicon.jpg" alt="Loading Image" width="200" height="200">'
    loadingScreen.innerHTML = loadingImage
}

const removeLoadingScreen = () => {
    if (!loadingScreen) return;
    loadingScreen.style.cssText="transform: scale(3); opacity: 0;"
}

loadingScreen.addEventListener('transitionend', () => loadingScreen.remove())

export {
    loadingScreen,
    setLoadingScreen,
    removeLoadingScreen
}