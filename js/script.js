// ----------------------------
/*FOR PROJECT-CARD*/

let cards = {
    logo_img: [
        './Project-1/img/logo/logo.png',
         './Project-2/img/logo.png',
         './Project-3/img/logo.png',
         './Project-4/img/logo.png',
         './Project-5/img/logo.png',
         './Project-6/img/logo.png',
         './Project-7/assets/logo.jpg',
         './Project-8/assets/calculator.svg',
        ],
    title: [
        'HTML Cheatsheet',
        'HTML Landing Page',
        'Fruit Knowledge',
        'My Coffee',
        'Design The Layout',
        'YouTube Home Page UI Clone',
        'Hacker\'s Terminal',
        'My! Calc',
    ],
    desc:[
        'HTML Cheatsheet serves as a quick reference guide for essential HTML elements and syntax',
        'HTML Landing Page is a simple yet effective landing page created entirely using HTML.',
        'Fruit Knowledge, This page combines HTML and CSS to showcase information about various fruits.',
        'A webpage introducing My!Coffee with navigation, a welcome message, and buttons for exploration and support.',
        'In the Layout Design Project a webpage layout created using HTML, CSS, and Bootstrap. The design is based on a Figma PNG file',
        'Implements a layout with a header, navbar, main page content, and footer. The layout is responsive and follows a clean and modern design, leveraging the Bootstrap framework for enhanced styling and components.',
        'A simulation of a hacker terminal interface featuring glitch effects, dynamic text animations, and a staged hacking process.',
        'A fully functional calculator with basic arithmetic operations, error handling, and interactive button design.',
    ],
    tech: [
        ["HTML5"],
        ["HTML5"],
        ["HTML5", "CSS3"],
        ["HTML5", "CSS3"],
        ["HTML5", "CSS3", "BOOTSTRAP"],
        ["HTML5", "CSS3"],
        ["HTML5", "CSS3", "JS"],
        ["HTML5", "CSS3", "JS"],
    ],
    view: [
        './Project-1/details.html',
        './Project-2/readme.html',
        './Project-3/readme.html',
        './Project-4/readme.html',
        './Project-5/readme.html',
        './Project-6/readme.html',
        './Project-7/readme.html',
        './Project-8/readme.html',
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