## 1) Difference between var, let, and const

- **var**  
  - Old way to declare a variable.  
  - Function scoped (not block scoped).  
  - Can be redeclared and updated.  

- **let**  
  - Modern way to declare a variable.  
  - Block scoped (inside `{}` only).  
  - Can be updated but **cannot be redeclared** in the same scope.  

- **const**  
  - Block scoped.  
  - **Cannot be updated or redeclared**.  
  - Must be initialized while declaring. 


## 2) Difference between map(), forEach(), and filter()

### forEach()
- Goes through each item in an array.  
- Does something with each item (like printing).  
- Does **not** return a new array.  

### map()
- Goes through each item in an array.  
- Returns a **new array** with modified values.  

### filter()
- Goes through each item in an array.  
- Returns a **new array** with only items that meet a condition. 


## 3) What are arrow functions in ES6?

- Arrow functions are a **shorter way to write functions** in JavaScript.  
- Use `=>` instead of the `function` keyword.  
- Automatically handle `this` in objects. 


## 4) How does destructuring assignment work in ES6?

- Destructuring makes it **easy to extract values** from arrays or objects into variables.  

**Example with arrays:**
```javascript
const [a, b] = [1, 2, 3];
console.log(a, b);


## 5) Explain template literals in ES6. How are they different from string concatenation?

- Template literals use **backticks `` ` ``** instead of quotes `" "` or `' '`.  
- You can **insert variables** easily using `${variable}`.  
- Supports **multi-line strings** without `\n`.  