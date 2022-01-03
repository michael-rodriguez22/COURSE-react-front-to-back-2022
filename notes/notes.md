components can end in .js or .jsx

ES6 snippets:

"rfce" makes and exports a functional component, "\_rfce" does the same without importing React from "react"

"impt" import proptypes

can have component level state (navigation with open and closed state) or app level state (list of feedback items to be displayed and modified)

setState(previousValue => previousValue + 1)

passing function as argument to setState() allows you to access previous value before changing it

with PropTypes.arrayOf(PropTypes.shape({ /_ individual PropTypes _/ })) you can further specify the PropTypes of each item in an array
