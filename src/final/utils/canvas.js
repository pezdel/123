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
