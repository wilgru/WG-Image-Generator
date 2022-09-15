const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");
let colourpalette = [];
let paletteLen = 0;
let size = 0;

// define rgb class
class rgb {
    constructor(red, green, blue) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }
}

// create array of colours
const generatePalette = () => {
    colourpalette = [];

    // loop over each colour channel in increments of 8
    for (let iBlue = 8; iBlue <= 256; iBlue += 8) {
        for (let iGreen = 8; iGreen <= 256; iGreen += 8) {
            for (let iRed = 8; iRed <= 256; iRed += 8) {
                const newColour = new rgb(iRed, iGreen, iBlue);
                colourpalette.push(newColour);
            }
        }
    }

    return colourpalette
}

// render a randomly generated noise image that uses all colours only once
const renderImage = (colourpalette) => {
    let PositionIndex = 0;
    let colourIndex = 0;
    let usedColours = [];

    // get number of colours and the size of a square that would fit all the colours as pixels
    paletteLen = colourpalette.length;
    size = Math.round(Math.sqrt(paletteLen) / 100) * 100;

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {

            // if PositionIndex has reached the length of the colour palette, then stop rendering
            if (PositionIndex >= paletteLen) {
                break;
            }

            // generate random colourIndex for next colour until a unique one has been generated
            do {
                colourIndex = Math.floor(Math.random() * ((paletteLen)))
            } while (usedColours.includes(colourIndex))

            usedColours.push(colourIndex);
            
            // draw the pixel to the canvas
            ctx.fillStyle = 
                `rgb(
                    ${colourpalette[colourIndex]?.red}, 
                    ${colourpalette[colourIndex]?.green}, 
                    ${colourpalette[colourIndex]?.blue}
                )`;
            ctx.fillRect(j * 4, i * 4, 4, 4);
    
            PositionIndex++;
        } 
    }
}

// add event listener to the HTML button that will call the renderImage function.
document.getElementById('render-btn').addEventListener('click', () => {
    const cp = generatePalette();
    renderImage(cp);
})