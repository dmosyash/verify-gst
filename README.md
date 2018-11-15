Problem:- **Verifying GST numbers.**

Solution: 
Link to the App: http: //dmosyash.github.io/verify-gst
Used React for solving the problem.
1. Read data from a JSON file "companyList.json"
2. Render the data onto the page, where user can edit the data.
3. On clicking on **Verify** button, it checks all numbers.
4. Renders invalid numbers below the button.

Used two components
1. App(parent component): logic of verifying GST is written here.
2. FileDataComponent(child component): fetching data from json file and rendering to DOM with a button.