## To Run

Please Run:

$ npm install

$ npm start

The page should load on http://localhost:3000/


## Explanation

This project was created on React with some minimal extra dependencies. I didn't want to use any big dependency like React-Table to create a whole Dashboard, because the exercise was mostly to show a demo pull info from the API and to display on the site.

I used the framework d3 for the graphics.

## Needs Work

- This is a MVP showing some basic elements from the API in an easy to navigate and to understand.
- Because the size of the project I didn't implemented SCSS. For a bigger product and to make the design more consistent this could be a good idea.
- The API is limited to content mostly around 2018. If you want to see some data, you need to pick the correct range.
- The API was limited to one filter by request. It was impossible to filter Positive Reviews on Specific games, or number of Reviews by Game on the specific dates. This would be possible to do directly on the frontend, but I believe this data manipulation should be done in the backend to reduce the server load.