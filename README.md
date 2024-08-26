# Wikipedia game

## Functional requirements

### User Facing

- User is provided with a random source wikipedia page (date as seed)
- User is provided with a random destination wikipedia page (date as seed)
- User can see all links on the wikipedia page
- User can click on a link to take them to the wikipedia page.
- User can select a link on the current page as their next guess.
- As the user clicks on links, there is a counter that keeps track of how many pages they have viewed
- The user can filter the links on the current page via search functionality.

### Internal

- Maintain history of guesses for a given session.
- Page data structure
  - Title
  - Page
  - href
