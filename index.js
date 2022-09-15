// varibel setup
let colourPallete = [];
let palleteLen = 0;
let size = 0;

//get HTML canvas to draw to later
const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");

// define rgb class
class rgb {
    constructor(red, green, blue) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }
}

// create array of colours
for (let iBlue = 8; iBlue <= 256; iBlue += 8) {
    for (let iGreen = 8; iGreen <= 256; iGreen += 8) {
        for (let iRed = 8; iRed <= 256; iRed += 8) {
            const newColour = new rgb(iRed, iGreen, iBlue);
            colourPallete.push(newColour);
        }
    }
}

// get number of colours and the size of a square that would fit all colours
palleteLen = colourPallete.length;
size = Math.round(Math.sqrt(palleteLen) / 100) * 100;

// render a randomly generated noise image that only uses all colours and only once
const renderImage = () => {
    let PositionIndex = 0;
    let colourIndex = 0;
    let usedColours = [];

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {

            // if PositionIndex has reached the length of the colour pallete, then stop rendering. 
            // As there are not enough pixels to fill a perfect square, the loop would never really 
            // fill up without repeating pixels.
            if (PositionIndex >= palleteLen) {
                break;
            }

            // get colourIndex for next colour randomly. If it has already been used, keep trying until
            // a unique pixel has been generated
            do {
                colourIndex = Math.floor(Math.random() * ((palleteLen)))
            } while (usedColours.includes(colourIndex))


            // add colourIndex to array of used colours
            usedColours.push(colourIndex);
            

            // draw the pixel to the canvas
            ctx.fillStyle = 
                `rgb(
                    ${colourPallete[colourIndex]?.red}, 
                    ${colourPallete[colourIndex]?.green}, 
                    ${colourPallete[colourIndex]?.blue}
                )`;
            ctx.fillRect(j * 4, i * 4, 4, 4);
    
            PositionIndex++;
        } 
    }

    console.log(findDuplicates(usedColours))
}

// add event listener to the HTML button that will call the renderImage function.
document.getElementById('render-btn').addEventListener('click', ()=>{
    renderImage()
})