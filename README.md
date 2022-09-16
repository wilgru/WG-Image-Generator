# Image Generation Challenge

## Description
This small web app generates a noise image using unique colours, made from a combination of RGB values. Each RGB value is a combination of values from 0 to 256 with 32 steps per colour channel. In total there are 32,768 colours in the palette for the image generation process to use,  with no repetition or reuse of colours. 

## Algorithm Processes
### Generating the colour palette
This algorithm is based on three nested loops, one for each colour channel, where the index for each loop is used as the colour value, thus each loop counts in increments of 8 until they reach the max colour value of 256 (32 steps). The inner most loop (blue) must generate a colour with all 32 steps/ variations in the blue channel before going up a step in value in the next colour (green) in the corresponding outer loop. The same logic applies for the outer most loop (red), where that loop must wait for all iterations of the "green" loop before incrementing.

### Rendering Image
This algorithm first calculates the size (length in pixels for the side of a square) of a canvas that can accommodate all the colours of the colour palette comfortably. With the size calculated, a loop nested within another loop is used to map over the surface of the canvas, where the incrementing values are used as x/y coordinates when drawing pixels to the canvas. for each iteration, a random colour is selected from the colour palette, and if it hadn’t been used yet it will be used. If it has been used, then a new colour will be randomly selected until an unused colour is selected.

For the offset rendering option, the algorithm will iterate over the palette, but in steps selected by the user using the slider. whenever the iterator exceeds the length of the colour palette, the iterator will start again from the beginning but this time offset by 1 position, to ensure no colours are being used twice.

## Installation
You can clone the repo onto your computer using the following command:

```
git@github.com:wilgru/WG-Image-Generation-Challenge.git
```

As this is a simple web app that is purely front-end, you can get the app running simply by opening the index.html file in your default browser.

## Link
Alternatively, you can follow this link to a deployed version of the app, linked here:
https://wilgru.github.io/WG-Image-Generation-Challenge/


