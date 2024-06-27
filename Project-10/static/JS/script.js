// INSERTING Question Block Dynamically
let QA = {
    q: [
        'What is Netflix?',
        'How much does Netflix cost?',
        'Where can I watch?',
        'How do I cancel?',
        'What can I watch on Netflix?',
        'Is Netflix good for kids?'
    ],

    a: [
        [
            "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more – on thousands of internet-connected devices.",
            "You can watch as much as you want, whenever you want, without a single ad – all for one low monthly price. There's always something new to discover, and new TV shows and movies are added every week!"
        ],

        "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹149 to ₹649 a month. No extra costs, no contracts.",

        [
            "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.",
            "You can also download your favourite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere."
        ],

        "Netflix is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.",

        "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.",

        [
            "The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and films in their own space.",
            "Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see."
        ]

    ]

}

for (let index = 0; index < Array.from(QA.q).length; index++) {
    // Create A Div
    let div = document.createElement("div");
    div.classList.add('q');
    div.addEventListener("click", display);

    let ans = QA.a[index];
    let hiddenCont = "";

    if (typeof (ans) != "string") {
        Array.from(ans).forEach((element, index) => {
            ans[index] = '<p>' + element + '</p>';
        });

        hiddenCont = (Array.from(ans)).join(' <br> ');
    }
    else {
        hiddenCont = '<p>' + ans + '</p>';
        // console.log(hiddenCont);
    }

    div.innerHTML = `
    <div class="show">
        <p>${Array.from(QA.q)[index]}</p>
        <p>+</p>
    </div>
    <div class="hide">
        ${hiddenCont}
    </div>
    `

    // Insert It
    document.body.querySelector('.Questions').appendChild(div);
}


// For Handel Click Event 
let lastClick = null;
function display(event) {
    let clickedEl = event.currentTarget;

    // If Element Clicked Twice
    if (lastClick === clickedEl) {
        let nothiddenEl = clickedEl.querySelector('.hide');
        nothiddenEl.style = 'max-height:0px; padding: 0rem 2rem;';
        
        let crossToPlus = clickedEl.querySelector('.show > p:nth-child(2)')
        crossToPlus.style = 'transform: rotate(0deg);';
        
        lastClick = null;
    }

    // If Element Clicked After Another Element was Clicked
    else if ((lastClick !== clickedEl) && (lastClick != null)) {

        // TO Show The Element
        let hiddenEl = clickedEl.querySelector('.hide');
        hiddenEl.style = 'max-height:1000px; padding: 2rem 2rem;';

        let plusToCross = clickedEl.querySelector('.show > p:nth-child(2)')
        plusToCross.style = 'transform: rotate(45deg);';

        // TO Hide The Element
        let nothiddenEl = lastClick.querySelector('.hide');
        nothiddenEl.style = 'max-height:0px; padding: 0 2rem;';

        let crossToPlus = lastClick.querySelector('.show > p:nth-child(2)')
        crossToPlus.style = 'transform: rotate(0deg);';

        // Update The LastClicked Element
        lastClick = clickedEl;
    }

    // If First Element Clicked
    else {
        let hiddenEl = clickedEl.querySelector('.hide');
        hiddenEl.style = 'max-height:1000px; padding: 2rem 2rem;';

        let plusToCross = clickedEl.querySelector('.show > p:nth-child(2)')
        plusToCross.style = 'transform: rotate(45deg);';

        lastClick = clickedEl;
    }
}