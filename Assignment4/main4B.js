/**
 * Template used by Assignment4B.html
 */
// Variables to manage the pictures 
const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');
// Variables to send actions with the button darken
const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const pictures = ['pic1.jpg', 'pic2.jpg','pic3.jpg','pic4.jpg','pic5.jpg'];

/* Declaring the alternative text for each image file */
const pictureText = {
  'pic1.jpg' : 'Blue eyes',
  'pic2.jpg' : 'Beautiful colors on the rocks',
  'pic3.jpg' : 'Purple and white flowers',
  'pic4.jpg' : 'Egyptian art',
  'pic5.jpg' : 'A butterfly on a leaf'
}

/* Looping through images */
for (const i of pictures)
{
  const newImage = document.createElement('img');
  newImage.setAttribute('src', `images/${i}`);
  newImage.setAttribute('alt', pictureText[i]);
  // Send images below bigest image
  thumbBar.appendChild(newImage);
  newImage.addEventListener
  // When user click image display it bigger than others
  ('click', e => 
    {
      displayedImage.src = e.target.src;
      displayedImage.alt = e.target.alt;
    }
  )
}

/* Wiring up the Darken/Lighten button */
btn.addEventListener
('click', () => 
  {
    const btnClass = btn.getAttribute('class');
    // When class button is equal to dark the image becomes light and change class to light
    if (btnClass === 'dark') {
      btn.setAttribute('class','light');
      btn.textContent = 'Lighten';
      overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    // When class button is equal to light the image becomes dark and change class to dark
    } else {
      btn.setAttribute('class','dark');
      btn.textContent = 'Darken';
      overlay.style.backgroundColor = 'rgba(0,0,0,0)';
    }
  }
);