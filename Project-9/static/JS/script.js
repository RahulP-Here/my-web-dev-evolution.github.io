// Get the save button element
const saveBtn = document.getElementById('save'); 

// Array of month abbreviations
const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]; 

// Variable to hold the current note's key for updating
let currKey; 

/**
 * Show a notification with the given message
 * @param {string} msg - The message to display in the notification
 */

const showNotification = (msg) => {
    // Set the message text in the toast notification
    document.querySelector('.toast-body').textContent = msg;

    // Use Bootstrap toast to show the notification
    const toastLiveExample = document.getElementById('liveToast'); 
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample); // Bootstrap toast instance
    toastBootstrap.show(); 
};

/**
 * Save a new note or update an existing note
 */
saveBtn.addEventListener('click', () => {
    // Get the title and note content from the input fields
    let title = document.querySelector('#myTitle').value; 
    let note = document.querySelector('#myNote').value; 

    // Check if the note content is not empty
    if (note.trim()) {
        let d = new Date();
        let msg;

        // If there is a current note key, update the note
        if (currKey) {
            localStorage.removeItem(currKey);
            currKey = NaN;
            msg = "Note Updated SuccesFully!"; // Update message
        } else {
            // Otherwise, save a new note
            msg = "Note Saved SuccesFully!"; // Save message
        }

        // Generate a unique key for the note using the current timestamp
        let key = d.getTime();

        // Create the note object with timestamp, title, and content
        let value = JSON.stringify({
            l: `${(d.getHours() < 10) ? '0' + d.getHours() : d.getHours()}:${(d.getMinutes() < 10) ? '0' + d.getMinutes() : d.getMinutes()} | ${months[d.getMonth()]} ${d.getDate()}`,
            t: title,
            n: note
        });

        localStorage.setItem(key, value); // Save note to localStorage

        // Clear input fields
        document.querySelector('#myTitle').value = "";
        document.querySelector('#myNote').value = "";

        toggleEffect(); // Toggle form visibility

        showNotification(msg); // Show notification
    }

    // Refresh note list
    fectchNote(); 
});

/**
 * Fetch and display all notes from localStorage
 */
const fectchNote = () => {
    // Clear current note list
    document.querySelector('.noteList').innerHTML = ""; 

    // Check if there are no notes in localStorage
    if (localStorage.length == 0) {
        document.querySelector('.noteList').innerHTML = `
        <div class="card text-bg-dark">
            <div class="card-header">
                &plus;
            </div>
            <div class="card-body">
                <blockquote class="blockquote mb-0">
                    <p>No Notes Found</p>
                    <footer class="blockquote-footer">Please Add Notes
                    </footer>
                </blockquote>
            </div>
        </div>`;
    }

    // Iterate over all notes in localStorage & display them
    for (let index = 0; index < localStorage.length; index++) {
        let key = localStorage.key(index);
        let content = JSON.parse(localStorage.getItem(key));
        
        let note = (content.n).replaceAll('\n', '<br>'); //replace new line with <br> tag
       
        let div = document.createElement('div');
        div.classList.add('card');
        div.classList.add('text-bg-dark');
        div.innerHTML = `
            <div class="card-header" data-key="${key}">
            ${content.t ? content.t : "Untitled"}
              <div class="btns">
                <button title="Delete Note" class="del" onclick="del(event)"><img src="./static/svg/delete.svg"></button>
                <button title="Edit Note" class="edit" onclick="edit(event)"><img src="./static/svg/edit.svg"></button>
              </div>
            </div>
            <div class="card-body">
              <blockquote class="blockquote mb-0">
                <p>${note}</p>
                <footer class="blockquote-footer">${content.l}</footer>
              </blockquote>
            </div>`;

        // Prepend the note card to the note list (to show newest first)
        document.querySelector('.noteList').prepend(div); // Add note card to list
    }
};

// Fetch and display notes on page load
fectchNote();

/**
 * Toggle the visibility of the form for adding/editing notes
 */
const toggleEffect = async () => {
    // Clear input fields
    document.querySelector('#myTitle').value = "";
    document.querySelector('#myNote').value = "";

    let form = document.querySelector('.form');
    form.classList.toggle('form-toggle');

    let form_c = document.querySelector('.form-container');
    form_c.classList.toggle('invisible');

    // Change the add button image based on the form visibility
    let img = document.querySelector('.add img');
    if (form.classList.contains('form-toggle')) { 
        if (currKey) { 
            currKey = NaN; // Reset current key
        }
        img.src = "./static/svg/addnote.svg"; // Set add note image
        document.querySelector('.noteList').style = 'z-index: 0;'; 
    } else { 
        img.src = "./static/svg/close.svg"; // Set close image
        document.querySelector('.noteList').style = 'pointer-events: none; z-index: -1;';
    }
};

// Get the add button element and attach the click event listener
let addBtn = document.querySelector('.add');
addBtn.addEventListener('click', toggleEffect);

/**
 * Delete a note
 * @param {Event} e - The event object from the click event
 */
const del = (e) => {
    // Get the key of the note to be deleted
    let key = e.target.closest('.card-header').dataset.key; 

    // Remove the note from localStorage
    localStorage.removeItem(key);

    // Fetch and display the updated list of notes
    fectchNote(); 

    // Show notification
    showNotification("Note Deleted SuccesFully!");
};

/**
 * Edit a note
 * @param {Event} e - The event object from the click event
 */
const edit = async (e) => {
    // Get the key of the note to be edited
    currKey = e.target.closest('.card-header').dataset.key; 
    
    // Get the note content from localStorage
    let content = JSON.parse(localStorage.getItem(currKey));

    // Toggle the form visibility to show the edit form
    await toggleEffect();

    // Populate form with note content
    document.querySelector('#myTitle').value = content.t;
    document.querySelector('#myNote').value = content.n;
};
