// ----------------------------
/*FOR PROJECT-CARD*/

let cards = {
    logo_img: [
        './Project-1/img/logo/logo.png',
         './Project-2/img/logo.png',
         './Project-3/img/logo.png',
         './Project-4/img/logo.png',
         './Project-5/img/logo.png',
        ],
    title: [
        'HTML Cheatsheet',
        'HTML Landing Page',
        'Fruit Knowledge',
        'My Coffee',
        'Design The Layout',
    ],
    desc:[
        'HTML Cheatsheet serves as a quick reference guide for essential HTML elements and syntax',
        'HTML Landing Page is a simple yet effective landing page created entirely using HTML.',
        'Fruit Knowledge, This page combines HTML and CSS to showcase information about various fruits.',
        'A webpage introducing My!Coffee with navigation, a welcome message, and buttons for exploration and support.',
        'In the Layout Design Project a webpage layout created using HTML, CSS, and Bootstrap. The design is based on a Figma PNG file',
    ],
    tech: [
        ["HTML5"],
        ["HTML5"],
        ["HTML5", "CSS3"],
        ["HTML5", "CSS3"],
        ["HTML5", "CSS3", "BOOTSTRAP"],
    ],
    view: [
        './Project-1/details.html',
        './Project-2/readme.html',
        './Project-3/readme.html',
        './Project-4/readme.html',
        './Project-5/readme.html',
    ]
}

Array.from(cards.logo_img).forEach((element, index) => {
    let logo = element;
    let title = cards.title[index];
    let desc = cards.desc[index];
    let view = cards.view[index];
    let badges = ''
    Array.from(cards.tech[index]).forEach((element) => {
        badges += `<span class="badge">${element}</span>`
    })

    let project = document.createElement('div');
    project.classList.add('project-card');
    project.innerHTML = `
        <div class="title">
            <img src="${logo}" alt="Project 1 Thumbnail">
            <h3>${title}</h3>
        </div>
        <p>${desc}</p>
        <div class="tech-stack">
            ${badges}
        </div>
        <a href="${view}" class="btn">View Project</a>
    `;

    let container = document.body.querySelector('.container');
    container.insertBefore(project, container.firstChild);
});

{/* <div class="project-card">
                <div class="title">
                    <img src="./img/RP.jpg" alt="Project 1 Thumbnail">
                    <h3>Project 1 Title</h3>
                </div>
                <p>A brief description of Project 1. Lorem ipsum dolor sit amet...</p>
                <div class="tech-stack">
                    <span class="badge">HTML5</span>
                    <span class="badge">CSS3</span>
                </div>
                <a href="projects/project1/" class="btn">View Project</a>
            </div> */}