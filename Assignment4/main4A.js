/**
 * Template used by Assignment4A.html
 */

const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

/* Function to generate a random number and choose a text */
function randomValueFromArray(array){
    const random = Math.floor(Math.random()*array.length);
    return array[random];
}

/* Constains text string */
const storyText = "It was 94 fahrenheit outside, so :insertx: went for a walk. When " +
    "they got to :inserty:, they stared in horror for a few moments, then :insertz:. " +
    "Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.";
const insertX = ['Willy the Goblin', 'Big Daddy', 'Father Christmas'];
const insertY = ['the soup kitchen', 'Disneyland', 'the White House'];
const insertZ = ['spontaneously combusted', 'melted into a puddle on the sidewalk', 'turned into a slug and crawled away'];

/* Event for the button */
randomize.addEventListener('click', result);

/* Function to replace text*/
function result() {

    // Variables
    let newStory = storyText;
    const xItem = randomValueFromArray(insertX);
    const yItem = randomValueFromArray(insertY);
    const zItem = randomValueFromArray(insertZ);
    newStory = newStory.replaceAll(':insertx:',xItem);
    newStory = newStory.replaceAll(':inserty:',yItem);
    newStory = newStory.replaceAll(':insertz:',zItem);

    // When the user does not enter a value, the name does not change
    if(customName.value !== '') {
        // Get the value from the user typed
        const name = customName.value;
        // Replace the word Bob for the name that user entered
        newStory = newStory.replaceAll('Bob', name);

    }
    // Replace values in the text when the user change the country setting
    if(document.getElementById("uk").checked) {
        // Constants to convert weight and temperature
        const weight = `${Math.round(300*0.0714286)} stone`;
        const temperature =  `${Math.round((94-32) * 5 / 9)} centigrade`;

        // Replace values calculated
        newStory = newStory.replaceAll('94 fahrenheit', temperature);
        newStory = newStory.replaceAll('300 pounds', weight);

    }
    // Send the new text to the page
    story.textContent = newStory;
    story.style.visibility = 'visible';
}