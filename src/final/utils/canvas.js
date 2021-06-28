export const zoomCanvas = () => {
    const zoom = document.getElementById('zoom')
    const zoomCtx = zoom.getContext('2d');
    const can = document.getElementById('main')
    return  [can, zoomCtx]
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
    return [can, priceCtx]
}

export const dateCanvas = () => {
    const can = document.getElementById('main');
    const dateAxis = document.getElementById('date');
    const dateCtx = dateAxis.getContext('2d');
    return [can, dateCtx]
}
