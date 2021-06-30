export const magnifyCanvas = () => {
    // const magCanvas = document.querySelector('magnify')
    const magnifyAxis = document.getElementById('magnify')
    const magnifyCtx = magnifyAxis.getContext('2d');
    const can = document.getElementById('main')
    return  [can, magnifyAxis, magnifyCtx]
}

export const mainCanvas = () => {
    const can = document.getElementById('main');
    const mainCtx = can.getContext('2d');
    return mainCtx
}

export const priceCanvas = () => {
    const can = document.getElementById('main');
    const priceAxis = document.getElementById('price');
    const priceCtx = priceAxis.getContext('2d');
    return [can, priceAxis, priceCtx]
}

export const dateCanvas = () => {
    const can = document.getElementById('main');
    const dateAxis = document.getElementById('date');
    const dateCtx = dateAxis.getContext('2d');
    return [can, dateAxis, dateCtx]
}
