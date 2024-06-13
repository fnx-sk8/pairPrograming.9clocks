


function setup() {
    createCanvas(800, 1200);
    textAlign(CENTER, CENTER);
    textSize(60);
   
}

function draw() {
    background('#E24672');


    fill('white')
    text('World Time Zones', width / 2, 150);

    let hour = hours; 
    let minute = minutes();
    let second = seconds();

    fill(51); 
    noStroke();

    ellipse(150, 350, 200, 200); // Top Left - LOS ANGELES -8


    ellipse(400, 350, 200, 200); // Top Midddle - Central USA -6  


    ellipse(650, 350, 200, 200); // Top Right -  Bolivia -4

    ellipse(150, 600, 200, 200); // Middle Left - Greenland -2
    ellipse(400, 600, 200, 200); // Middle Middle - Greenwhich England - 0 
    ellipse(650, 600, 200, 200); // Middle Right - SOuth Africa +2


    ellipse(150, 850, 200, 200); // Bottom Left - Oman +4
    ellipse(400, 850, 200, 200); // Bottom Middle - India +6 
    ellipse(650, 850, 200, 200); // Bottom Right - China/Australia +8



// Group Project - Eli Fenix, Maddie Leyva, Erin Lee. 
   


}

