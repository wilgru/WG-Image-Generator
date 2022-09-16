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

// find duplicates in an array
const findDuplicates = array => array.filter((item, index) => array.indexOf(item) !== index)

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
const renderImage = (colourpalette, renderType, modifier=1) => {   

    paletteLen = colourpalette.length;
    size = Math.round(Math.sqrt(paletteLen) / 100) * 100; // get number of colours and the size of a square that would fit all the colours as pixels

    let PositionI = 0;
    let colourI = 0;
    let usedColours = [];

    let algoI = 0;
    let algoIOffset = 0;

    // loop over canvas x and y positions
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {

            // if PositionI has reached the length of the colour palette, then stop rendering
            if (PositionI >= paletteLen || usedColours.length >= paletteLen) {
                
                break;
            }

            // use the rendering alogithm chosen by the user
            switch (renderType) {
                case "noise": // generate random colourI for next colour until a unique one has been generated
                    do {
                        colourI = Math.floor(Math.random() * ((paletteLen)))
                    } while (usedColours.includes(colourI)); 
                    break;

                case "offset": // Iterate through palette in user defined steps multiple times, with each iterate offset by 1 (to ensure usage of all unique colours)
                    if (colourI >= paletteLen) {
                        algoI = 0;
                        algoIOffset++;
                    }

                    colourI = (algoI * modifier) + algoIOffset;
                    algoI++;
                    console.log(colourI)
                    break;

                case "linear": // Iterate through palette in a linear fashion
                    colourI = PositionI;
                    break;
            }

            usedColours.push(colourI);
            
            // draw the pixel to the canvas
            ctx.fillStyle = 
                `rgb(
                    ${colourpalette[colourI]?.red}, 
                    ${colourpalette[colourI]?.green}, 
                    ${colourpalette[colourI]?.blue}
                )`;
            ctx.fillRect(j * 4, i * 4, 4, 4);
    
            PositionI++;
        } 
    }

    console.log("duplcates found:", findDuplicates(usedColours))
}

// add event listener to the HTML button that will call the renderImage function.
document.getElementById('render-noise-btn').addEventListener('click', () => {
    const cp = generatePalette();
    renderImage(cp, "noise");
})

document.getElementById('render-linear-btn').addEventListener('click', () => {
    const cp = generatePalette();
    renderImage(cp, "linear");
})

document.getElementById('render-offset-btn').addEventListener('click', () => {
    let sliderVal = document.getElementById('render-offset-slider').value
    const cp = generatePalette();
    console.log(sliderVal)
    renderImage(cp, "offset", sliderVal);
})

// for (let i = 0; i < a.length; i++) {
//     let count = i*4
//     console.log("count " + count)
//     //console.log(Math.floor((count)/a.length))
//     console.log((count%a.length)+Math.floor((count)/a.length))
// }