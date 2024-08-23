let clocks = [];
let cosOffset = 0;
let sinOffset = 0;
let images = []; // Array to store images

function preload() {
    // Load images from the 'images' folder
    for (let i = 0; i < 9; i++) {
        let imgPath = `images/image${i}.png`;
        console.log(`Loading image: ${imgPath}`);
        images[i] = loadImage(imgPath,
            () => console.log(`Image loaded: ${imgPath}`),
            () => console.log(`Failed to load image: ${imgPath}`)
        );
    }
}

function setup() {
    let canvas = createCanvas(800, 1200);
    canvas.parent('canvas-container'); // Attach canvas to the div in the clocks.html
    textAlign(CENTER, CENTER);
    noSmooth();

    let names = [
        'Johannesburg, South Africa-SAST',
        'Muscat, Oman-GST',
        'New Delhi, India-IST',
        'Beijing, China-CST',
        'Los Angeles, USA-PST',
        'Chicago, USA-CST',
        'La Paz, Bolivia-BOT',
        'Nuuk, Greenland-WGT',
        'London, England-GMT'
    ];

    let offsets = [9, 10, 12, 15, 0, 2, 3, 6, 8];

    let additionalTexts = [
        'The largest city in South Africa.',
        'Known for its stunning coastal scenery.',
        'Home to the world’s tallest brick minaret.',
        'One of the world’s oldest cities.',
        'Founded by the Spanish in 1781.',
        'Famous for its architecture.',
        'Highest capital city in the world.',
        'One of the world’s northernmost capitals.',
        'Home to Big Ben clock tower.'
    ];

    for (let i = 0; i < 9; i++) {
        let x = 150 + (i % 3) * 250;
        let y = 350 + Math.floor(i / 3) * 300;
        cosOffset = i + 20 / (i + 1);
        sinOffset = i + 20 / (i + 1);
        clocks.push(new Clock(x, y, names[i], offsets[i], cosOffset, sinOffset, images[i], additionalTexts[i]));
    }
}

function draw() {
    textSize(60);
    background('#E24672');

    noStroke();
    fill('white');
    text('World Time Zones', width / 2, 50);

    for (let clock of clocks) {
        clock.update();
        clock.display();
        if (clock.isMouseOver()) {
            clock.displayImageAndText();
        }
    }
}

class Clock {
    constructor(x, y, name, offset, cosOffset, sinOffset, img, additionalText) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.offset = offset;
        this.cosOffset = cosOffset;
        this.sinOffset = sinOffset;
        this.img = img; // Store the image
        this.additionalText = additionalText; // Store the additional text
    }

    update() {
        // Update clock logic if needed
    }

    display() {
        // Set fill color to black for the clock
        fill(0);
        noStroke();
        ellipse(this.x, this.y, 200, 200);

        for (let i = 0; i < 60; i++) {
            let angle = map(i, 0, 60, 0, TWO_PI) - HALF_PI;
            let x1 = this.x + cos(angle) * 92;
            let y1 = this.y + sin(angle) * 92;
            let x2 = this.x + cos(angle) * 99;
            let y2 = this.y + sin(angle) * 99;
            stroke(255);
            strokeWeight(2);
            line(x1, y1, x2, y2);
        }

        noStroke();
        fill('white');
        textSize(15);
        text(this.name, this.x, this.y - -150);

        let s = second();
        let m = minute();
        let h = hour();

        h = (h + this.offset + 24) % 24;

        let formattedTime = nf(h, 2) + ':' + nf(m, 2) + ':' + nf(s, 2);
        textSize(24);
        text(formattedTime, this.x, this.y + 120);

        let secondAngle = map(s, 0, 60, 0, TWO_PI) - HALF_PI;
        let minuteAngle = map(m, 0, 60, 0, TWO_PI) - HALF_PI;
        let hourAngle = map(h % 12, 0, 12, 0, TWO_PI) - HALF_PI;

        stroke('red');
        strokeWeight(2);
        line(this.x, this.y, this.x + cos(secondAngle) * 75, this.y + sin(secondAngle) * 75);

        stroke(255);
        strokeWeight(4.5);
        line(this.x, this.y, this.x + cos(minuteAngle) * 60, this.y + sin(minuteAngle) * 60);

        stroke(255);
        strokeWeight(6.5);
        line(this.x, this.y, this.x + cos(hourAngle) * 50 - this.cosOffset, this.y + sin(hourAngle) * 50 - this.sinOffset);
    }

    isMouseOver() {
        let d = dist(mouseX, mouseY, this.x, this.y);
        return d < 100; // Check if the mouse is within the ellipse
    }

    displayImageAndText() {
        let imgX, imgY, textY;
        let imgWidth = 200;
        let imgHeight = (this.img.height / this.img.width) * imgWidth; // Calculate height to maintain aspect ratio

        if (this.y - 300 < 0) { // If near the top of the canvas
            imgX = this.x - imgWidth / 2;
            imgY = this.y + 100;
            textY = imgY + imgHeight + 20;
        } else {
            imgX = this.x - imgWidth / 2;
            imgY = this.y - 300;
            textY = imgY - 20;
        }

        // Display the image with rounded corners and a subtle shadow
        noFill();
        stroke(255);
        strokeWeight(4);
        image(this.img, imgX, imgY, imgWidth, imgHeight);

        // Draw the white background box with rounded corners
        fill('white');
        noStroke();
        rectMode(CENTER);
        rect(this.x, textY, 320, 60, 20);

        // Display the additional text with word wrapping
        fill('black');
        textSize(18);
        textAlign(CENTER, CENTER);

        let wrappedText = this.wrapText(this.additionalText, 280); // Wrap the text to fit within the rectangle
        text(wrappedText, this.x, textY); // Display the wrapped text
    }

    // Helper function to wrap text
    wrapText(text, maxWidth) {
        let words = text.split(' ');
        let wrappedText = '';
        let line = '';

        for (let i = 0; i < words.length; i++) {
            let testLine = line + words[i] + ' ';
            let testWidth = textWidth(testLine);
            if (testWidth > maxWidth && i > 0) {
                wrappedText += line + '\n';
                line = words[i] + ' ';
            } else {
                line = testLine;
            }
        }
        wrappedText += line;
        return wrappedText;
    }
}
