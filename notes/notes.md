components can end in .js or .jsx

ES6 snippets:

"rfce" makes and exports a functional component, "\_rfce" does the same without importing React from "react"

"impt" import proptypes

can have component level state (navigation with open and closed state) or app level state (list of feedback items to be displayed and modified)

setState(previousValue => previousValue + 1)

passing function as argument to setState() allows you to access previous value before changing it

with PropTypes.arrayOf(PropTypes.shape({ /_ individual PropTypes _/ })) you can further specify the PropTypes of each item in an array

HTTP Status Codes (general):

- 100's Informational: req received / processing
- 200's Success: req successfully received / processed
- 300's Redirect: further action must be taken
- 400's Client Error: invalid request in some capacity
- 500's Internal Server Error: server unable to fulfill a valid req

Reducers:

- can be used without redux or other third party state management libraries
- accept (state, action) as arguments
- evaluate the action.type, usually through a switch statement
- action object always contains a type property and usually contains a payload object containing data to update state
- copy unchanged properties of state using spread operator, change desired property
- return new state object
- by default (if action.type is not accounted for) return unchanged state

you can return a function inside of the useEffect hook for cleanup purposes (for example, if the component unmounts before an api call is resolved, you can handle this gracefully without throwing an error)

memoization (useMemo hook): caches the results of an expensive function call so that when those same inputs are provided, you can access the results quickly instead of performing the function call again

useCallback hook similar to useMemo, but returns memoized callback function instead of memoized value

both useMemo and useCallback accept a function and dependency array as arguments. both are used to optimize performance
