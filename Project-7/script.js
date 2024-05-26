// Flag to stop infinite loop
let toStop = false;

// Function to simulate sleep using async/await
const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Object containing details of different stages of hacking process
const stages = {
    stage_1: {
        start: "Reading Your Files",
        end: "Private Files Detected."
    },
    stage_2: {
        start: "Sending All Files to Server",
        end: "Successfully Sent All Files to Server."
    },
    stage_3: {
        start: "Cleaning Up",
        end: "Cleaning Up"
    },
    stage_4: {
        start: "Completing the Hacking",
        end: NaN
    }
}

// Function to display initial process
async function showInitialProcess(stage_name = "Initializing Hacking") {
    return new Promise((resolve, reject) => {
        let divs = document.querySelectorAll('div');
        divs[0].innerHTML = stage_name;

        let a = setInterval(() => {
            divs[0].innerHTML += ".";
        }, 500);

        setTimeout(() => {
            clearInterval(a);
            resolve(455);
        }, 2000);
    })
}

// Function to display stage process
async function showStageProcess(stage_name) {
    return new Promise((resolve, reject) => {
        let divs = document.querySelectorAll('div');
        divs[divs.length - 1].innerHTML = stage_name;

        let a = setInterval(() => {
            divs[divs.length - 1].innerHTML += ".";
        }, 100);

        setTimeout(() => {
            clearInterval(a);
            resolve(455);
        }, 500);
    })
}

// Function to simulate each stage from start to end
async function stageStartToEnd(stage_details, end) {
    let randomNum = Math.floor(4 + 6 * Math.random());
    let divs = document.querySelectorAll('div');

    // Starting of stage
    if (stage_details == undefined) {
        // Infinite loop to show initial process
        for (let i = 0; i < 4; i--) {
            if (toStop == false) {
                await showInitialProcess();
            }
            else {
                break; // To stop infinite loop
            }
        }
    }
    else {
        start = stage_details.start;
        end = stage_details.end;

        // Starting of stage
        for (let i = 0; i < randomNum; i++) {
            await showStageProcess(start);
        }

        // Ending of stage
        divs[divs.length - 1].innerHTML = end;
    }
}

// Function to create a stage
const createStage = async (stage_details) => {
    let new_div = document.createElement('div')
    document.body.appendChild(new_div);

    await stageStartToEnd(stage_details);
}

// Function to simulate child stages
async function childStages() {
    await sleep(2000);
    keys = Object.keys(stages);

    for (let i = 0; i < keys.length - 1; i++) {
        await sleep(1000);
        await createStage(stages[keys[i]]);
    }
}

// Main function to initiate hacking simulation
async function main() {
    document.body.innerHTML = "";

    Promise.race([createStage(), childStages()]).then(() => {
        toStop = true;
        document.body.innerHTML = "";

        let p = createStage(stages.stage_4);
        p.then(() => {
            document.body.innerHTML = "⚠️ !! Your System Hacked !! ⚠️";
            document.body.classList.remove('after');
            document.body.style = `
            display: flex;
            height: 100vh;
            justify-content: center;
            align-items: center;
            font-size: 3rem;
            color: #ff0f0f;
            background-color: #000;        
            `;

            let alertSound = new Audio('./assets/sounds/alertSound.mp3')
            alertSound.currentTime = 1;
            alertSound.play();
        })
    })
}

// Event listener to start the hacking simulation
document.body.addEventListener('click', function start(event){
    document.body.removeEventListener('click', start);

    let preDiv = document.querySelector('.main');
    preDiv.classList.add('glitch');
    
    let glitchSound = new Audio('./assets/sounds/glitchSound.mp3');
    glitchSound.currentTime = 0.8;
    glitchSound.play();
    
    setTimeout(() => {
        document.body.innerHTML = "Hacking in progress...";
        document.body.classList.add('after');
        document.title = '⚠️⚠️⚠️';
        glitchSound.pause();
        main();
    }, 3000);
})
