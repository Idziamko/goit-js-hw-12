# Image Search App

Extended web app to search and view images using Pixabay API, now featuring pagination and smooth scrolling.

## What I Built

- Search form with input validation
- Image gallery with 3 columns
- Click image to see full size
- Loading spinner during search and fetching more results
- Error messages for empty results
- **New:** "Load more" button for pagination (15 images per page)
- **New:** Smooth scrolling after loading new images
- **New:** End-of-collection notifications

## Technologies

- JavaScript (ES6 modules)
- Vite
- Axios for API calls
- SimpleLightbox for image viewing
- iziToast for notifications

## How to Run

npm install
npm run dev

## API Setup

Get your free API key at [Pixabay](https://pixabay.com/api/docs/) and add it to `js/pixabay-api.js`

## Files

- `main.js` - form handling and app logic
- `js/pixabay-api.js` - API requests
- `js/render-functions.js` - display images on page
- `src/css/styles.css` - styling

## What I Learned

- Working with REST APIs
- Refactoring Promises to modern `async/await` syntax
- Implementing pagination with API parameters (`page`, `per_page`)
- Calculating DOM element heights (`getBoundingClientRect`) for smooth scrolling (`window.scrollBy`)
- Modular JavaScript
- Handling async operations and error catching

## Demo

[View Live](https://idziamko.github.io/goit-js-hw-12/)

---

**Assignment:** GoIT Full Stack Developer Course - Homework #12
