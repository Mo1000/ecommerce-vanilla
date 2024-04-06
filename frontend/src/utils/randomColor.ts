export function randomColor() {
    const color = '#' + Math.random().toString(16).slice(-3);
    if (color.toUpperCase() !== '#FFFFFF' && color.toUpperCase() !== '#000000')
        return color;
    return '#FFFFFF';
}
