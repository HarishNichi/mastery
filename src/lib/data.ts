import { Code, Bot, Milestone, PenTool } from "lucide-react";
import type { LearningPath, Topic, Question } from "@/lib/types";
import { slugify } from "@/lib/utils";

const jsTheoretical: Question[] = [
  {
    id: "event-loop",
    type: "theoretical",
    question: "Explain the JavaScript event loop, call stack, and message queue. How do asynchronous operations like setTimeout and Promises fit into this?",
    answer: `
**Answer Guidance:**

- **Call Stack:** A LIFO (Last-In, First-Out) data structure that keeps track of function execution. When a function is called, it's pushed onto the stack. When it returns, it's popped off.
- **Web APIs/Browser APIs:** Environment features (like \`setTimeout\`, DOM events, \`fetch\`) that JavaScript can use. They handle asynchronous tasks and don't block the main thread.
- **Callback Queue (or Task Queue):** A FIFO (First-In, First-Out) queue that holds callback functions from asynchronous operations once their tasks are completed (e.g., \`setTimeout\` timer finished, data from \`fetch\` received).
- **Event Loop:** The continuous process that monitors the Call Stack and the Callback Queue. If the Call Stack is empty, it takes the first callback from the Callback Queue and pushes it onto the Call Stack for execution.
- **Microtask Queue:** This queue has a higher priority than the Callback Queue. Callbacks from Promises (\`.then()\`, \`.catch()\`, \`.finally()\`) and other microtasks are placed here. The event loop will process all microtasks before moving to the next task in the Callback Queue.
- **How it fits together:** When you call \`setTimeout(callback, 2000)\`, the \`setTimeout\` function is put on the call stack and immediately popped off. The browser's Web API handles the timer. After 2 seconds, the \`callback\` is placed in the Callback Queue. The event loop will pick it up and push it to the call stack only when the call stack is empty. For a Promise, when it resolves, its \`.then()\` callback is placed in the Microtask Queue, which will be emptied before the event loop checks the Callback Queue.
`
  },
  {
    id: "promises-async-await",
    type: "theoretical",
    question: "What are Promises, Async/Await, and how do they differ? Discuss the benefits of each for handling asynchronous code.",
    answer: `
**Answer Guidance:**

- **Promises:** Objects representing the eventual completion (or failure) of an asynchronous operation and its resulting value. They have states: \`pending\`, \`fulfilled\`, \`rejected\`. They help avoid "callback hell" by allowing you to chain asynchronous operations with \`.then()\` and handle errors with \`.catch()\`.
- **Async/Await:** Syntactic sugar built on top of Promises. 
  - \`async\` functions implicitly return Promises.
  - \`await\` pauses the execution of an \`async\` function until a Promise resolves, then returns its value. It can only be used inside an \`async\` function.
- **Differences:** Async/Await provides a more synchronous-looking syntax, making asynchronous code easier to read and write. Error handling is simplified using standard \`try...catch\` blocks. Promises are the underlying mechanism that async/await uses.
- **Benefits:**
  - **Promises:** Better error handling than callbacks, avoids callback hell, allows for better control over asynchronous flow.
  - **Async/Await:** More readable, easier to debug, cleaner error handling, improved code structure.
`
  },
  {
    id: 'prototypal-inheritance',
    type: 'theoretical',
    question: "Describe JavaScript's prototypal inheritance. How does it work, and how does class syntax relate to it?",
    answer: `
**Answer Guidance:**

- **Prototypal Inheritance:** In JavaScript, objects inherit properties and methods directly from other objects (their prototypes). There's no traditional class-based inheritance.
- **\__proto__ and prototype:** Every object has an internal \`[[Prototype]]\` property (often accessed via \`__proto__\`). Functions have a \`prototype\` property, which is an object that will be used as the \`[[Prototype]]\` for new objects created by that function (using \`new\`).
- **Inheritance Chain:** When you try to access a property or method on an object, JavaScript looks at the object itself. If it's not found, it looks at its \`[[Prototype]]\`, then its prototype's prototype, and so on, up the chain until it finds the property or reaches the end of the chain (\`null\`).
- **class Syntax:** ES6 classes are syntactic sugar over prototypal inheritance. They provide a cleaner syntax for creating constructor functions and managing prototypes. \`class MyClass { ... }\` is essentially a constructor function with a \`.prototype\` object set up. The \`extends\` keyword sets up the prototype chain.
`
  },
  {
    id: 'equality-operators',
    type: 'theoretical',
    question: "What is the difference between == and ===? When would you use each?",
    answer: `
**Answer Guidance:**

- **== (Equality Operator):** Performs type coercion before comparison. If the operands are of different types, JavaScript tries to convert one or both operands to a common type before making the comparison. Example: \`5 == '5'\` is \`true\`.
- **=== (Strict Equality Operator):** Does not perform type coercion. It checks if both the value AND the type are the same. Example: \`5 === '5'\` is \`false\`.
- **When to use:** You should almost always use \`===\`. It leads to more predictable and less error-prone code. Use \`==\` only if you specifically intend to leverage type coercion, which is rare and often discouraged in modern JavaScript.
`
  },
  {
    id: 'closures',
    type: 'theoretical',
    question: "Explain closures in JavaScript. Provide a practical example of their use.",
    answer: `
**Answer Guidance:**

- **Closure:** A closure is formed when a function remembers and has access to its lexical scope (the scope in which it was declared) even after the outer function has finished executing. The inner function "closes over" the variables of its outer function.
- **How it works:** When a function is defined, it keeps a reference to its surrounding scope chain. When that function is later executed, it can still access those variables.
- **Practical Example (Data Privacy/Encapsulation):**
\`\`\`javascript
function createCounter() {
  let count = 0; // This variable is "closed over" and private

  return {
    increment: function() {
      count++;
      console.log(count);
    },
    getValue: function() {
      return count;
    }
  };
}

const counter1 = createCounter();
counter1.increment(); // Output: 1
counter1.increment(); // Output: 2
console.log(counter1.getValue()); // Output: 2
// You cannot access 'count' directly: console.log(counter1.count) is undefined.
\`\`\`
`
  },
  {
    id: 'this-keyword',
    type: 'theoretical',
    question: "What is the this keyword? How does its value change in different contexts (global, function, method, constructor, arrow function, bind/call/apply)?",
    answer: `
**Answer Guidance:**

\`this\` is a special keyword whose value is determined by how a function is called (its execution context).

- **Global Context:** In the global scope, \`this\` refers to the global object (\`window\` in browsers). In 'use strict' mode, it's \`undefined\`.
- **Function Context (Simple Call):** When a function is called directly (e.g., \`myFunction()\`), \`this\` also refers to the global object (or \`undefined\` in strict mode).
- **Method Context:** When a function is called as a method of an object (e.g., \`obj.myMethod()\`), \`this\` refers to the object itself (\`obj\`).
- **Constructor Context:** When a function is called with the \`new\` keyword, \`this\` refers to the newly created instance object.
- **Arrow Functions:** Arrow functions do not have their own \`this\` binding. They inherit \`this\` from their surrounding (enclosing) lexical context. This is a key difference and makes them useful for callbacks.
- **Explicit Binding:**
  - **.call(thisArg, ...args):** Calls the function with \`this\` set to \`thisArg\`.
  - **.apply(thisArg, [argsArray]):** Same as \`.call\`, but arguments are passed as an array.
  - **.bind(thisArg):** Returns a new function with \`this\` permanently bound to \`thisArg\`.
`
  },
  {
    id: 'object-creation',
    type: 'theoretical',
    question: "Discuss the different ways to create objects in JavaScript. (Object literals, constructors, Object.create(), ES6 classes).",
    answer: `
**Answer Guidance:**

- **Object Literals \`{}\`:** The simplest way to create a single object. \`const obj = { key: 'value' };\`
- **Constructor Functions:** A function used with the \`new\` keyword to create multiple instances of objects.
  \`\`\`javascript
  function Person(name) { this.name = name; }
  const person1 = new Person('Alice');
  \`\`\`
- **Object.create():** Creates a new object, using an existing object as the prototype of the newly created object. This provides direct control over the prototype chain.
  \`\`\`javascript
  const prototype = { greet: () => 'Hello' };
  const obj = Object.create(prototype);
  \`\`\`
- **ES6 Classes:** Syntactic sugar over constructor functions and prototypes, providing a cleaner, more modern syntax.
  \`\`\`javascript
  class Car { constructor(make) { this.make = make; } }
  const myCar = new Car('Toyota');
  \`\`\`
`
  },
  {
    id: 'higher-order-functions',
    type: 'theoretical',
    question: "What are higher-order functions? Give examples (e.g., map, filter, reduce).",
    answer: `
**Answer Guidance:**

A higher-order function is a function that either:
1.  Takes one or more functions as arguments.
2.  Returns a function as its result.

This is possible because functions are "first-class citizens" in JavaScript.

**Examples:**
- **\`Array.prototype.map()\`:** Takes a callback function and applies it to every element in an array, returning a new array with the results.
- **\`Array.prototype.filter()\`:** Takes a callback function that returns a boolean. It returns a new array containing only the elements for which the callback returned \`true\`.
- **\`Array.prototype.reduce()\`:** Takes a callback function (the "reducer") and executes it on each element of the array, resulting in a single output value.
- **Function returning a function (Closures):**
  \`\`\`javascript
  function multiplyBy(factor) {
    return function(number) {
      return number * factor;
    };
  }
  const double = multiplyBy(2);
  console.log(double(5)); // 10
  \`\`\`
`
  },
  {
    id: 'immutability',
    type: 'theoretical',
    question: "Explain immutability in JavaScript. Why is it important, especially in frameworks like React/Vue?",
    answer: `
**Answer Guidance:**

- **Immutability:** The concept that data, once created, cannot be changed. Instead of modifying existing data (an object or array), you create a new copy with the desired changes.
- **In JavaScript:** Primitive types (string, number, boolean) are immutable. Objects and arrays are mutable by default. To achieve immutability with objects/arrays, you create new ones instead of changing them.
  \`\`\`javascript
  // Mutable
  const person = { name: 'John' };
  person.age = 30; // Mutating the original object

  // Immutable
  const person = { name: 'John' };
  const olderPerson = { ...person, age: 30 }; // Creating a new object
  \`\`\`
- **Why it's important in React/Vue:**
  - **Change Detection:** Frameworks like React rely on state changes to trigger re-renders. By creating a new object/array, you change its reference. React can quickly check if the reference has changed (\`oldState !== newState\`), which is much faster than doing a deep comparison of all properties. If you mutate the original object, the reference stays the same, and React might not detect the change, failing to re-render the UI.
  - **Predictable State:** Immutable state leads to more predictable code. You can be sure that data passed to a component won't be changed by it, preventing side effects.
  - **Time-Travel Debugging:** Tools like Redux DevTools rely on immutable state to keep a history of state changes, allowing you to "time-travel" through them.
`
  },
  {
    id: 'let-const-var',
    type: 'theoretical',
    question: "What is the difference between let, const, and var? Discuss scope and hoisting.",
    answer: `
**Answer Guidance:**

- **\`var\`:**
  - **Scope:** Function-scoped. It is not block-scoped.
  - **Hoisting:** Declarations are hoisted to the top of their scope and initialized with \`undefined\`.
  - **Re-declaration:** Can be re-declared in the same scope.

- **\`let\`:**
  - **Scope:** Block-scoped (within \`{}\` blocks like \`if\`, \`for\`).
  - **Hoisting:** Hoisted, but not initialized. They are in a "temporal dead zone" (TDZ) until the declaration, causing a \`ReferenceError\` if accessed before.
  - **Re-declaration:** Cannot be re-declared in the same scope.

- **\`const\`:**
  - **Scope:** Block-scoped (like \`let\`).
  - **Hoisting:** Hoisted and in the TDZ (like \`let\`).
  - **Re-assignment:** Cannot be re-assigned. For objects/arrays, the contents can be mutated, but the variable's reference cannot be changed.

**Best Practice:** Use \`const\` by default. Use \`let\` if you know the variable needs to be reassigned. Avoid \`var\` in modern JavaScript.
`
  },
  {
    id: 'event-delegation',
    type: 'theoretical',
    question: "Describe the concept of event delegation. What are its advantages?",
    answer: `
**Answer Guidance:**

- **Event Delegation:** A pattern where you attach a single event listener to a parent element instead of attaching individual listeners to multiple child elements. When an event occurs on a child, it "bubbles up" to the parent. The parent's listener can then use \`event.target\` to identify which child triggered the event.
- **Advantages:**
  - **Performance:** Reduces the number of event listeners, which improves performance and memory usage, especially for large lists.
  - **Dynamic Content:** Automatically works for elements added to the DOM after the initial page load. You don't need to manually attach listeners to new elements.
  - **Simplicity:** Can simplify code by managing events in one central place.
\`\`\`html
<ul id="parent-list">
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
<script>
  document.getElementById('parent-list').addEventListener('click', function(event) {
    if (event.target && event.target.nodeName === "LI") {
      console.log('Clicked on:', event.target.textContent);
    }
  });
</script>
\`\`\`
`
  },
  {
    id: 'error-handling',
    type: 'theoretical',
    question: "What are the various ways to handle errors in JavaScript? (try-catch, Promise .catch(), error events).",
    answer: `
**Answer Guidance:**

- **\`try...catch...finally\`:** The primary mechanism for synchronous error handling.
  - **\`try\`:** Block of code to monitor for errors.
  - **\`catch(error)\`:** Block executed if an error occurs in the \`try\` block.
  - **\`finally\`:** Block executed regardless of whether an error occurred, useful for cleanup.
- **Promise \`.catch()\`:** For handling errors (rejections) in Promises.
  \`\`\`javascript
  fetchData().then(processData).catch(error => console.error(error));
  \`\`\`
- **Async/Await with \`try...catch\`:** The preferred way to handle errors with async/await, using standard synchronous error handling syntax.
  \`\`\`javascript
  async function myFunc() {
    try {
      const data = await fetchData();
    } catch (error) {
      console.error(error);
    }
  }
  \`\`\`
- **Error Events:** Some APIs and DOM elements emit specific error events.
  - **\`window.onerror\`:** A global handler for uncaught exceptions.
  - **\`window.addEventListener('unhandledrejection', event => ...)\`:** For catching unhandled Promise rejections.
  - **Element-specific errors:** e.g., \`<img onerror="...">\`.
`
  },
  {
    id: 'module-pattern-es-modules',
    type: 'theoretical',
    question: "Explain the Module Pattern and ES Modules (import/export). What are the differences and benefits?",
    answer: `
**Answer Guidance:**

- **Module Pattern (IIFE-based):** An older pattern using Immediately Invoked Function Expressions (IIFEs) to create private scope and expose only a public API.
  \`\`\`javascript
  const myModule = (function() {
    let privateVar = 'secret';
    return { publicMethod: () => console.log(privateVar) };
  })();
  \`\`\`
- **ES Modules (import/export):** The modern, standard way to create modules in JavaScript.
  \`\`\`javascript
  // utils.js
  export const PI = 3.14;

  // main.js
  import { PI } from './utils.js';
  \`\`\`
- **Differences & Benefits:**
  - ES Modules are a native language feature, while the Module Pattern is a code pattern.
  - ES Modules have static analysis, allowing for better optimization (like tree-shaking) and tooling.
  - ES Modules provide a clearer syntax for managing dependencies.
  - ES Modules are the standard and should be used in all modern projects.
`
  },
  {
    id: 'dom-manipulation',
    type: 'theoretical',
    question: "What is DOM manipulation? Discuss efficient ways to update the DOM.",
    answer: `
**Answer Guidance:**

- **DOM Manipulation:** The process of changing the structure, style, or content of the Document Object Model (DOM) tree using JavaScript.
- **Efficient Ways to Update:** Direct DOM manipulation is slow.
  - **Minimize DOM Access:** Read elements once, store them, and then update.
  - **Batch Updates:** Perform multiple updates at once.
  - **\`DocumentFragment\`:** Create a lightweight DOM node to hold other nodes. Build your structure in a DocumentFragment off-screen and then append the entire fragment to the live DOM in a single operation.
  - **Virtual DOM (React/Vue):** Frameworks use a Virtual DOM to calculate the most efficient way to update the actual DOM (diffing algorithm).
  - **CSS Classes:** Instead of manipulating individual styles, toggle CSS classes on elements.
`
  },
  {
    id: 'web-workers',
    type: 'theoretical',
    question: "What are Web Workers? When would you use them?",
    answer: `
**Answer Guidance:**

- **Web Workers:** JavaScript scripts that run in the background on a separate thread from the main execution thread of a web page.
- **Purpose:** They allow you to perform computationally intensive tasks without blocking the UI, keeping the web page responsive.
- **How they work:** You create a separate JS file for the worker. Communication between the main thread and the worker happens via \`postMessage()\` and the \`onmessage\` event. Workers do not have direct access to the DOM or the \`window\` object.
- **When to use them:**
  - Heavy computations: Complex calculations, data processing, image manipulation.
  - Background tasks: Polling APIs, real-time data processing.
  - Any long-running task that might cause the UI to freeze.
`
  },
  {
    id: 'truthy-falsy',
    type: 'theoretical',
    question: "Explain the concept of 'truthy' and 'falsy' values in JavaScript.",
    answer: `
**Answer Guidance:**

In JavaScript, some values are considered "truthy" (evaluate to true in a boolean context like an \`if\` statement) and others are "falsy" (evaluate to false).

- **Falsy Values:** There are exactly eight falsy values:
  - \`false\`
  - \`0\` (the number zero)
  - \`-0\` (negative zero)
  - \`0n\` (BigInt zero)
  - \`""\` (empty string)
  - \`null\`
  - \`undefined\`
  - \`NaN\` (Not-a-Number)
- **Truthy Values:** All other values are truthy, including:
  - Non-empty strings (\`'hello'\`)
  - Numbers other than zero (\`1\`, \`-10\`)
  - Objects (\`{}\`)
  - Arrays (\`[]\`)
  - Functions
`
  },
  {
    id: 'arrow-functions-diff',
    type: 'theoretical',
    question: "What are arrow functions? What are their key differences from regular functions (especially regarding this)?",
    answer: `
**Answer Guidance:**

- **Arrow Functions (\`=>\`):** A concise syntax for writing function expressions.
- **Key Differences:**
  - **Concise Syntax:** Implicit return for single expressions, optional parentheses for single parameters.
  - **\`this\` Binding:** This is the most important difference. Arrow functions do not have their own \`this\`. They lexically inherit \`this\` from their surrounding scope. Regular functions get their \`this\` value based on how they are called.
  - **No \`arguments\` object:** Arrow functions don't have a built-in \`arguments\` object. Use rest parameters (\`...args\`) instead.
  - **Cannot be used as Constructors:** You cannot use \`new\` with an arrow function.
`
  },
  {
    id: 'memory-management',
    type: 'theoretical',
    question: "Discuss JavaScript memory management and garbage collection. What are common memory leaks to watch out for?",
    answer: `
**Answer Guidance:**

- **Memory Management:** JavaScript has automatic memory management. The engine allocates memory when objects are created and frees it when they are no longer needed (garbage collection).
- **Garbage Collection (GC):** The process of automatically reclaiming memory. The most common algorithm is Mark and Sweep, which finds all reachable objects from a "root" (like the global object) and frees the memory of unreachable objects.
- **Common Memory Leaks:**
  - **Accidental Global Variables:** Declaring variables without \`let\` or \`const\` can create global variables that are never collected.
  - **Forgotten Timers/Intervals:** \`setInterval\` or \`setTimeout\` callbacks that are never cleared (\`clearInterval\`, \`clearTimeout\`) can keep references to objects alive.
  - **Detached DOM Elements:** Removing a DOM element but still holding a reference to it in JavaScript.
  - **Closures Holding Unnecessary References:** A closure might keep references to large objects that are no longer needed.
  - **Event Listeners Not Removed:** Attaching event listeners but never removing them with \`removeEventListener\`.
`
  },
  {
    id: 'generators-iterators',
    type: 'theoretical',
    question: "What are Generators and Iterators? How can they be used?",
    answer: `
**Answer Guidance:**

- **Iterators:** An object that knows how to access items from a collection one at a time. It has a \`next()\` method that returns an object with \`value\` and \`done\` properties.
- **Generators (\`function*\`):** A special type of function that can be paused and resumed. They create iterators.
  - The \`yield\` keyword is used to pause execution and return a value. When \`next()\` is called again, execution resumes from where it left off.
- **How they can be used:**
  - **Lazy evaluation:** Generate values on demand, saving memory.
  - **Infinite sequences:** Create sequences that can theoretically go on forever.
  - **Complex iteration logic:** Simplify complex iteration patterns.
  - **State machines.**
  - **Async programming:** They were the basis for async/await.
\`\`\`javascript
function* numberGenerator() {
  yield 1;
  yield 2;
}
const gen = numberGenerator();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: undefined, done: true }
\`\`\`
`
  },
  {
    id: 'shadow-virtual-dom',
    type: 'theoretical',
    question: "Explain the concepts of Shadow DOM and Virtual DOM.",
    answer: `
**Answer Guidance:**

- **Virtual DOM:**
  - **Concept:** An in-memory representation (a JavaScript object tree) of the actual DOM. It's a lightweight copy.
  - **How it works:** When state changes, a new Virtual DOM tree is created and compared ("diffed") with the previous one. React calculates the minimal set of changes and applies them to the real DOM.
  - **Purpose:** To optimize DOM manipulation and provide a declarative API.
  - **Used by:** React, Vue.js.

- **Shadow DOM:**
  - **Concept:** A web standard that allows for encapsulated DOM trees to be attached to elements. It creates a separate, isolated DOM tree.
  - **Key Features:** Styles and scripts are encapsulated. Styles don't leak in or out.
  - **Purpose:** To create self-contained, reusable components (Web Components) with their own internal structure and styling.
  - **Used by:** Web Components, and internally by some browser elements like \`<video>\`.
`
  }
];
const jsCoding: Question[] = [
  {
    id: slugify("Implement a function to flatten a nested array."),
    type: "coding",
    question: "Implement a function to flatten a nested array. Example: `[1, [2, [3, 4]], 5] -> [1, 2, 3, 4, 5]`",
    answer: `
**Approach 1: Using built-in \`Array.prototype.flat()\` (Modern & Simplest)**

This is the most straightforward way in modern JavaScript.
\`\`\`javascript
function flattenArray(arr) {
  // Use Infinity to handle arbitrarily deep nesting.
  return arr.flat(Infinity);
}

const nested = [1, [2, [3, 4]], 5];
console.log(flattenArray(nested)); // [1, 2, 3, 4, 5]
\`\`\`

**Approach 2: Recursive**

This approach manually checks for nested arrays and flattens them.
\`\`\`javascript
function flattenArrayRecursive(arr) {
  let result = [];
  arr.forEach(item => {
    if (Array.isArray(item)) {
      result = result.concat(flattenArrayRecursive(item));
    } else {
      result.push(item);
    }
  });
  return result;
}

const nested = [1, [2, [3, 4]], 5];
console.log(flattenArrayRecursive(nested)); // [1, 2, 3, 4, 5]
\`\`\`
`
  },
  {
    id: slugify("Write a function to find the first non-repeated character in a string."),
    type: "coding",
    question: "Write a function to find the first non-repeated character in a string.",
    answer: `
**Logic/Approach:**

1.  Use a Map or an object to store the frequency of each character.
2.  Iterate through the string once to populate the frequency map.
3.  Iterate through the string a second time. For each character, check its count in the map. The first character with a count of 1 is the answer.

\`\`\`javascript
function firstNonRepeatedChar(str) {
  const charCount = new Map();

  // Count character frequencies
  for (const char of str) {
    charCount.set(char, (charCount.get(char) || 0) + 1);
  }

  // Find the first character with a count of 1
  for (const char of str) {
    if (charCount.get(char) === 1) {
      return char;
    }
  }

  return null; // Or an appropriate indicator if no non-repeated char is found
}

console.log(firstNonRepeatedChar("leetcode")); // "l"
console.log(firstNonRepeatedChar("stress")); // "t"
console.log(firstNonRepeatedChar("aabbcc")); // null
\`\`\`
`
  },
  {
    id: slugify("Implement a debounce function."),
    type: "coding",
    question: "Implement a debounce function. This is a function that limits how often another function can be called.",
    answer: `
**Logic/Approach:**

Debouncing ensures a function is only called after a certain amount of time has passed without it being called again.

1.  Return a new function that wraps the original function.
2.  Maintain a \`timeoutId\` variable in the closure.
3.  When the debounced function is called, clear the previous timeout.
4.  Set a new timeout that will execute the original function after the specified delay.

\`\`\`javascript
function debounce(func, delay) {
  let timeoutId;

  return function(...args) {
    const context = this; // Capture 'this' context

    // Clear any existing timeout
    clearTimeout(timeoutId);

    // Set a new timeout
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

// Example usage:
function handleInput(event) {
  console.log('Searching for:', event.target.value);
}

const debouncedHandleInput = debounce(handleInput, 300);

// Attach to an input field:
// <input oninput="debouncedHandleInput(event)" />
\`\`\`
`
  },
  {
    id: slugify("Implement a throttle function."),
    type: "coding",
    question: "Implement a throttle function. This is a function that ensures another function is called at most once within a specified time period.",
    answer: `
**Logic/Approach:**

Throttling ensures a function is called at most once within a specified time interval.

1.  Maintain a flag (\`canRun\`) or a timestamp of the last execution.
2.  When the throttled function is called, check if the cooldown period has passed.
3.  If it has, execute the function and update the timestamp/flag.
4.  If it hasn't, do nothing.

\`\`\`javascript
function throttle(func, delay) {
  let canRun = true;

  return function(...args) {
    if (!canRun) {
      return; // Do nothing if we are in the cooldown period
    }
    
    canRun = false;
    const context = this;
    
    // Execute the function
    func.apply(context, args);
    
    // Set a timeout to reset the 'canRun' flag after the delay
    setTimeout(() => {
      canRun = true;
    }, delay);
  };
}

// Example usage:
function onScroll() {
  console.log('Scroll event handled!');
}

const throttledScrollHandler = throttle(onScroll, 200);

// Attach to scroll event:
// window.addEventListener('scroll', throttledScrollHandler);
\`\`\`
`
  },
  {
    id: slugify("Write a function to reverse a string."),
    type: "coding",
    question: "Write a function to reverse a string.",
    answer: `
**Approach 1: Using built-in methods (Most Common)**

\`\`\`javascript
function reverseString(str) {
  return str.split('').reverse().join('');
}

console.log(reverseString("hello")); // "olleh"
\`\`\`

**Approach 2: Iterative**

\`\`\`javascript
function reverseStringIterative(str) {
  let reversed = '';
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}

consolelog(reverseStringIterative("world")); // "dlrow"
\`\`\`
`
  },
  {
    id: slugify("Implement a deep clone function for a JavaScript object."),
    type: "coding",
    question: "Implement a deep clone function for a JavaScript object.",
    answer: `
**Logic/Approach:**

A deep clone must create new copies of all nested objects and arrays.

1.  Handle primitives, which are copied by value.
2.  Create a new empty object or array.
3.  Iterate over the keys/elements of the input.
4.  Recursively call the clone function on each value and assign it to the new object/array.
5.  A more robust solution should handle circular references (using a \`Map\` to track visited objects).

**Simple Recursive Example (without circular reference handling):**
\`\`\`javascript
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // Handle Arrays
  if (Array.isArray(obj)) {
    const clonedArray = [];
    for (let i = 0; i < obj.length; i++) {
      clonedArray[i] = deepClone(obj[i]);
    }
    return clonedArray;
  }

  // Handle Objects
  const clonedObj = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clonedObj[key] = deepClone(obj[key]);
    }
  }
  return clonedObj;
}

const original = { a: 1, b: { c: 2 } };
const cloned = deepClone(original);
cloned.b.c = 99;

console.log(original.b.c); // 2 (original is unchanged)
console.log(cloned.b.c);   // 99
\`\`\`
`
  },
  {
    id: slugify("Write a function to check if a string is a palindrome."),
    type: "coding",
    question: "Write a function to check if a string is a palindrome.",
    answer: `
**Approach 1: Compare with Reversed**

This is a very readable approach.
\`\`\`javascript
function isPalindrome(str) {
  // Optional: Normalize string for case and non-alphanumeric chars
  const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  const reversedStr = cleanStr.split('').reverse().join('');
  return cleanStr === reversedStr;
}
\`\`\`

**Approach 2: Two Pointers**

This approach can be more memory efficient as it doesn't create a new reversed string.
\`\`\`javascript
function isPalindromeTwoPointers(str) {
  const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0;
  let right = cleanStr.length - 1;

  while (left < right) {
    if (cleanStr[left] !== cleanStr[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}

console.log(isPalindromeTwoPointers("A man, a plan, a canal: Panama")); // true
console.log(isPalindromeTwoPointers("racecar")); // true
console.log(isPalindromeTwoPointers("hello")); // false
\`\`\`
`
  },
  {
    id: slugify("Implement a function to sort an array of objects by a specific key."),
    type: "coding",
    question: "Implement a function to sort an array of objects by a specific key.",
    answer: `
**Logic/Approach:**

Use the built-in \`Array.prototype.sort()\` method with a custom comparison function.

The comparison function takes two arguments (\`a\`, \`b\`) and should return:
- A negative number if \`a\` should come before \`b\`.
- A positive number if \`a\` should come after \`b\`.
- Zero if their order doesn't matter.

\`\`\`javascript
function sortObjectsByKey(arr, key) {
  // Using slice() to create a shallow copy to avoid mutating the original array.
  return arr.slice().sort((a, b) => {
    const valueA = a[key];
    const valueB = b[key];

    if (valueA < valueB) {
      return -1;
    }
    if (valueA > valueB) {
      return 1;
    }
    return 0;
  });
}

const people = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 35 }
];

console.log(sortObjectsByKey(people, 'age'));
// Output: [{ name: 'Bob', age: 25 }, { name: 'Alice', age: 30 }, { name: 'Charlie', age: 35 }]
\`\`\`
`
  },
  {
    id: slugify("Write a function to find the intersection of two arrays."),
    type: "coding",
    question: "Write a function to find the intersection of two arrays.",
    answer: `
**Logic/Approach:**

The most efficient approach uses a \`Set\` for fast lookups.

1.  Convert one array to a \`Set\` for O(1) average time complexity on lookups.
2.  Iterate through the second array.
3.  For each element in the second array, check if it exists in the \`Set\`.
4.  If it does, add it to a result array. To avoid duplicates in the result, wrap the result in a Set and convert back to an array.

\`\`\`javascript
function intersection(arr1, arr2) {
  const set1 = new Set(arr1);
  const result = [];

  for (const element of arr2) {
    if (set1.has(element)) {
      result.push(element);
    }
  }
  
  // To ensure the result has unique values
  return [...new Set(result)];
}

const arrayA = [1, 2, 3, 4, 5];
const arrayB = [4, 5, 6, 7, 8];
console.log(intersection(arrayA, arrayB)); // [4, 5]
\`\`\`
`
  },
  {
    id: slugify("Implement a simple memoization decorator."),
    type: "coding",
    question: "Implement a simple memoization decorator.",
    answer: `
**Logic/Approach:**

Memoization is an optimization technique where the results of expensive function calls are cached.

1.  Create a higher-order function that takes the original function (\`fn\`) as input.
2.  Inside, create a cache (e.g., a \`Map\`).
3.  Return a new function that:
    - Creates a cache key from its arguments.
    - Checks if the result for this key is in the cache. If yes, return it.
    - If not, call the original function, store the result in the cache, and then return it.

\`\`\`javascript
function memoize(fn) {
  const cache = new Map();

  return function(...args) {
    // A simple key for primitive arguments. For objects, JSON.stringify would be better.
    const key = args.join('-');

    if (cache.has(key)) {
      console.log('Fetching from cache...');
      return cache.get(key);
    }
    
    console.log('Calculating result...');
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

function slowAdd(a, b) {
  // Simulate slow calculation
  for (let i = 0; i < 1e8; i++) {}
  return a + b;
}

const memoizedAdd = memoize(slowAdd);
memoizedAdd(2, 3); // Calculates
memoizedAdd(2, 3); // Fetches from cache
\`\`\`
`
  },
  {
    id: slugify("Write a function to check if an object has a circular reference."),
    type: "coding",
    question: "Write a function to check if an object has a circular reference.",
    answer: `
**Logic/Approach:**

Traverse the object graph and keep track of objects already visited during the traversal. If you encounter an object that has already been visited in the current path, you have found a cycle.

1.  Use a \`Set\` or a \`WeakSet\` to store visited objects.
2 tribulations. Create a recursive helper function that takes the current object and the set of visited objects.
3.  In the helper, add the current object to the set.
4.  Iterate through the properties. If a property's value is an object and has already been seen in the set, return \`true\`.
5.  If not, recursively call the helper on that property's value.

\`\`\`javascript
function hasCircularReference(obj) {
  const visited = new Set();

  function traverse(current) {
    if (current === null || typeof current !== 'object') {
      return false;
    }

    if (visited.has(current)) {
      return true; // Cycle detected
    }

    visited.add(current);

    for (const key in current) {
      if (Object.prototype.hasOwnProperty.call(current, key)) {
        if (traverse(current[key])) {
          return true;
        }
      }
    }

    // This is a simplified version. For a more robust solution, you might
    // remove 'current' from 'visited' after checking its children to correctly
    // handle separate branches of the object graph.
    
    return false;
  }

  return traverse(obj);
}

const obj1 = { a: 1 };
obj1.b = obj1; // Circular reference
console.log(hasCircularReference(obj1)); // true

const obj2 = { a: 1, b: { c: 2 } };
console.log(hasCircularReference(obj2)); // false
\`\`\`
`
  },
  {
    id: slugify("Implement a function to create a promise that resolves after a given delay."),
    type: "coding",
    question: "Implement a function to create a promise that resolves after a given delay.",
    answer: `
**Logic/Approach:**

1.  The function should return a new \`Promise\`.
2.  The Promise constructor takes a function with a \`resolve\` argument.
3.  Use \`setTimeout\` within the Promise constructor.
4.  After the specified delay, call the \`resolve()\` function.

\`\`\`javascript
function delay(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      // You can optionally resolve with a value
      resolve(\`Resolved after \${ms}ms\`);
    }, ms);
  });
}

// Example usage with async/await
async function testDelay() {
  console.log("Starting...");
  const result = await delay(2000); // Pauses execution for 2 seconds
  console.log(result);
  console.log("Finished.");
}

testDelay();
\`\`\`
`
  },
  {
    id: slugify("Given an array of numbers, find the sum of all even numbers."),
    type: "coding",
    question: "Given an array of numbers, find the sum of all even numbers.",
    answer: `
**Approach 1: \`filter()\` and \`reduce()\` (Functional)**

This is a modern and expressive way to solve the problem.
\`\`\`javascript
function sumEvenNumbers(numbers) {
  return numbers
    .filter(num => num % 2 === 0) // Keep only even numbers
    .reduce((sum, currentNum) => sum + currentNum, 0); // Sum them up
}

console.log(sumEvenNumbers([1, 2, 3, 4, 5, 6])); // 12
\`\`\`

**Approach 2: Simple Loop**

This approach is straightforward and can be slightly more performant on very large arrays as it only iterates once.
\`\`\`javascript
function sumEvenNumbersLoop(numbers) {
  let sum = 0;
  for (const num of numbers) {
    if (num % 2 === 0) {
      sum += num;
    }
  }
  return sum;
}

console.log(sumEvenNumbersLoop([1, 2, 3, 4, 5, 6])); // 12
\`\`\`
`
  },
  {
    id: slugify("Implement Promise.all and Promise.race from scratch."),
    type: "coding",
    question: "Implement Promise.all and Promise.race from scratch.",
    answer: `
**\`Promise.all\` Implementation**

Logic: Resolves when all input Promises resolve. Rejects if any input Promise rejects.

\`\`\`javascript
function customPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completedCount = 0;
    if (promises.length === 0) {
      resolve([]);
      return;
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(value => {
        results[index] = value;
        completedCount++;
        if (completedCount === promises.length) {
          resolve(results);
        }
      }).catch(reject); // Reject immediately if any promise rejects
    });
  });
}
\`\`\`

**\`Promise.race\` Implementation**

Logic: Settles (resolves or rejects) as soon as the first input Promise settles.

\`\`\`javascript
function customPromiseRace(promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      // A promise that never settles is standard for an empty array
      return;
    }
    promises.forEach(promise => {
      Promise.resolve(promise).then(resolve, reject);
    });
  });
}
\`\`\`
`
  },
  {
    id: slugify("Write a function that takes an array of strings and groups them by their first letter."),
    type: "coding",
    question: "Write a function that takes an array of strings and groups them by their first letter.",
    answer: `
**Logic/Approach:**

1.  Use a \`Map\` or an object to store the groups.
2.  Iterate through the array of strings.
3.  For each string, get its first letter (and optionally normalize it to lowercase).
4 tribulations. If the first letter is not yet a key in your map/object, create a new entry with an array containing the current string.
5.  If the first letter is already a key, push the current string into the existing array.

\`\`\`javascript
function groupByFirstLetter(strings) {
  const groups = {}; // Using a plain object

  for (const str of strings) {
    if (str.length === 0) continue;

    const firstLetter = str[0].toLowerCase();

    if (!groups[firstLetter]) {
      groups[firstLetter] = [];
    }
    groups[firstLetter].push(str);
  }
  return groups;
}

const words = ["Apple", "Banana", "Avocado", "Bear", "Cat"];
console.log(groupByFirstLetter(words));
// Output: { a: ["Apple", "Avocado"], b: ["Banana", "Bear"], c: ["Cat"] }
\`\`\`
`
  },
  {
    id: slugify("Create a function that fetches data from multiple URLs concurrently and returns the results when all have completed."),
    type: "coding",
    question: "Create a function that fetches data from multiple URLs concurrently and returns the results when all have completed.",
    answer: `
**Logic/Approach:**

This is a perfect use case for \`Promise.all()\`.

1.  Map each URL in the input array to a \`fetch\` Promise. Inside the \`.then()\` of each fetch, parse the response (e.g., as JSON).
2.  Use \`Promise.all()\` to wait for all of these fetch Promises to resolve.
3.  The result of \`Promise.all()\` will be an array containing the resolved values (the parsed data) from all the URLs, in the same order.
4.  Use \`async/await\` for cleaner syntax.

\`\`\`javascript
async function fetchDataFromUrls(urls) {
  try {
    const fetchPromises = urls.map(url =>
      fetch(url).then(response => {
        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        return response.json();
      })
    );

    const results = await Promise.all(fetchPromises);
    return results;
  } catch (error) {
    console.error("Error fetching data:", error);
    // Depending on requirements, you might want to return null, an empty array, or re-throw.
    throw error;
  }
}

// Example usage:
const API_URLS = [
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2'
];

fetchDataFromUrls(API_URLS)
  .then(data => console.log("Fetched data:", data))
  .catch(err => console.error("Failed to fetch all data."));
\`\`\`
`
  },
  {
    id: slugify("Implement a function to validate an email address using a regular expression."),
    type: "coding",
    question: "Implement a function to validate an email address using a regular expression.",
    answer: `
**Logic/Approach:**

1.  Use a regular expression that matches common email formats. Note that a perfect, RFC-compliant email regex is extremely complex. A practical one is usually sufficient.
2 tribulations. Use the \`test()\` method of the RegExp object, which returns \`true\` if there is a match and \`false\` otherwise.

\`\`\`javascript
function isValidEmail(email) {
  // This regex is a good balance of accuracy and simplicity for most use cases.
  // It checks for:
  // - one or more characters before the @
  // - an @ symbol
  // - one or more characters for the domain name
  // - a period
  // - at least two characters for the top-level domain
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
  
  return emailRegex.test(email);
}

console.log(isValidEmail("test@example.com")); // true
console.log(isValidEmail("test.name+alias@example.co.uk")); // true
console.log(isValidEmail("test@example")); // false
console.log(isValidEmail("invalid-email@")); // false
console.log(isValidEmail("")); // false
\`\`\`
`
  },
  {
    id: slugify("Write a function to calculate the factorial of a number (recursive and iterative)."),
    type: "coding",
    question: "Write a function to calculate the factorial of a number (recursive and iterative).",
    answer: `
**Iterative Approach:**

This approach uses a loop and is often more memory-efficient for large numbers.
\`\`\`javascript
function factorialIterative(n) {
  if (n < 0) return undefined; // Factorial is not defined for negative numbers
  if (n === 0) return 1;
  
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}
\`\`\`

**Recursive Approach:**

This approach is more declarative but can lead to stack overflow errors for very large numbers.
\`\`\`javascript
function factorialRecursive(n) {
  if (n < 0) return undefined; // Base case for invalid input
  if (n === 0) return 1; // Base case for recursion
  
  return n * factorialRecursive(n - 1); // Recursive step
}
\`\`\`

console.log(factorialIterative(5)); // 120
console.log(factorialRecursive(5)); // 120
`
  },
  {
    id: slugify("Implement a basic data structure like a Queue or Stack."),
    type: "coding",
    question: "Implement a basic data structure like a Queue or Stack.",
    answer: `
**Stack (LIFO - Last-In, First-Out):**

Uses an array's \`push\` and \`pop\` methods.
\`\`\`javascript
class Stack {
  constructor() {
    this.items = [];
  }
  
  push(element) { this.items.push(element); }
  pop() { return this.items.pop(); }
  peek() { return this.items[this.items.length - 1]; }
  isEmpty() { return this.items.length === 0; }
  size() { return this.items.length; }
}
\`\`\`

**Queue (FIFO - First-In, First-Out):**

Uses an array's \`push\` and \`shift\` methods. Note: \`shift()\` can be inefficient for large arrays.
\`\`\`javascript
class Queue {
  constructor() {
    this.items = [];
  }
  
  enqueue(element) { this.items.push(element); }
  dequeue() { return this.items.shift(); }
  front() { return this.items[0]; }
  isEmpty() { return this.items.length === 0; }
  size() { return this.items.length; }
}
\`\`\`
`
  },
  {
    id: slugify("Given a binary tree, implement a function to perform a Breadth-First Search (BFS) or Depth-First Search (DFS)."),
    type: "coding",
    question: "Given a binary tree, implement a function to perform a Breadth-First Search (BFS) or Depth-First Search (DFS).",
    answer: `
Assume a tree node structure: \`class TreeNode { constructor(val, left = null, right = null) { this.val = val; this.left = left; this.right = right; } }\`

**Breadth-First Search (BFS):**

Explores the tree level by level. Uses a queue.
\`\`\`javascript
function bfs(root) {
  if (!root) return [];
  
  const queue = [root];
  const result = [];
  
  while (queue.length > 0) {
    const currentNode = queue.shift(); // Dequeue
    result.push(currentNode.val);
    
    if (currentNode.left) queue.push(currentNode.left);
    if (currentNode.right) queue.push(currentNode.right);
  }
  return result;
}
\`\`\`

**Depth-First Search (DFS - Pre-order traversal, recursive):**

Explores as far as possible along each branch.
\`\`\`javascript
function dfs(root) {
  const result = [];
  
  function traverse(node) {
    if (!node) return;
    
    result.push(node.val); // Process node (Pre-order)
    traverse(node.left);
    traverse(node.right);
  }
  
  traverse(root);
  return result;
}
\`\`\`
`
  }
];

const jsPath: Topic[] = [
  { id: "js-theoretical", title: "Theoretical Questions", questions: jsTheoretical },
  { id: "js-coding", title: "Coding Questions", questions: jsCoding },
];

const reactTheoretical: Question[] = [
  {
    id: "virtual-dom-react",
    type: "theoretical",
    question: "What is the Virtual DOM? How does React use it for efficient UI updates?",
    answer: `**Answer Guidance:**

- **Virtual DOM:** An in-memory representation (a JavaScript object tree) of the actual DOM. It's a lightweight copy.
- **How React Uses It:**
  1.  **State Change:** When a component's state or props change, React creates a new Virtual DOM tree.
  2.  **Diffing:** React compares this new Virtual DOM tree with the previous one. This process is called "reconciliation" or "diffing."
  3.  **Batching & DOM Update:** React calculates the minimal set of changes needed and applies them in a batch to the actual browser DOM. This minimizes direct, costly DOM manipulation, leading to better performance.
    `
  },
  {
    id: 'class-vs-functional-components',
    type: 'theoretical',
    question: 'Explain the difference between Class Components and Functional Components. What are the advantages of functional components with Hooks?',
    answer: `**Answer Guidance:**

- **Class Components:**
  - ES6 classes that extend \`React.Component\`.
  - Have a \`render()\` method.
  - Manage state with \`this.state\` and \`this.setState()\`.
  - Use lifecycle methods (e.g., \`componentDidMount\`).
- **Functional Components with Hooks:**
  - Simple JavaScript functions.
  - Use Hooks to "hook into" React features.
  - \`useState\`: Manages state.
  - \`useEffect\`: Handles side effects (replaces lifecycle methods).
- **Advantages of Functional Components with Hooks:**
  - **Readability:** Code is often more concise and easier to understand.
  - **Reusability of Logic:** Custom Hooks allow you to extract and reuse stateful logic.
  - **No \`this\` binding:** Avoids the complexity of the \`this\` keyword.
  - **Easier to test.**`
  },
];

const reactCoding: Question[] = [
  {
    id: slugify("Create a simple counter component with increment and decrement buttons."),
    type: "coding",
    question: "Create a simple counter component with increment and decrement buttons.",
    answer: `**Answer using Functional Component and \`useState\` Hook:**

\`\`\`jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  const decrement = () => {
    setCount(prevCount => prevCount - 1);
  };

  return (
    <div>
      <h2>Counter</h2>
      <p>Current Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}

export default Counter;
\`\`\`
`
  },
  {
    id: slugify("Build a form component that handles input changes and submission."),
    type: "coding",
    question: "Build a form component that handles input changes and submission.",
    answer: `**Answer using \`useState\` for a single input:**

\`\`\`jsx
import React, { useState } from 'react';

function SimpleForm() {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload
    alert(\`Submitted value: \${inputValue}\`);
    setInputValue(''); // Reset input after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={inputValue} onChange={handleChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default SimpleForm;
\`\`\`
`
  }
];

const reactPath: Topic[] = [
  { id: "react-theoretical", title: "Theoretical Questions", questions: reactTheoretical },
  { id: "react-coding", title: "Coding Questions", questions: reactCoding },
];

const vueTheoretical: Question[] = [
    {
    id: "vue-lifecycle",
    type: "theoretical",
    question: "What is the Vue.js instance lifecycle? Explain the key hooks.",
    answer: `**Answer Guidance:**

Each Vue component instance goes through a series of initialization steps. Lifecycle hooks are functions that give you the opportunity to run code at specific stages.

- **Creation:** Run before the DOM is created. Good for setup that doesn't involve the DOM.
  - \`beforeCreate\`: Instance initialized, data/events not yet set up.
  - \`created\`: Instance created. Data, computed properties, methods, watchers are set up. DOM not yet mounted. Good for API calls.
- **Mounting:** Run before and after the initial render.
  - \`beforeMount\`: Template compiled, but not yet attached to the DOM.
  - \`mounted\`: Instance is mounted to the DOM. You can now access the DOM.
- **Updating:** Run when reactive data changes, causing a re-render.
  - \`beforeUpdate\`: Data has changed, but the DOM has not been re-rendered yet.
  - \`updated\`: DOM has been re-rendered with the new data.
- **Destruction:** Run when a component is being torn down.
  - \`beforeUnmount\`: Component is still fully functional. Good for cleanup (e.g., clearing timers, removing event listeners).
  - \`unmounted\`: Component has been completely removed from the DOM.
`
  },
  {
    id: "options-vs-composition-api",
    type: "theoretical",
    question: "Explain the difference between Options API and Composition API. What are the advantages of Composition API?",
    answer: `**Answer Guidance:**

- **Options API (Vue 2 style):** Organizes component code by options: \`data\`, \`methods\`, \`computed\`, \`watch\`, lifecycle hooks, etc. Logic for a single feature can be spread across multiple options.
- **Composition API (Vue 3 style):** Allows you to group code by logical concern. Uses functions like \`ref\`, \`reactive\`, \`computed\`, \`watch\`, and \`onMounted\` inside a \`setup()\` function (or \`<script setup>\`).
- **Advantages of Composition API:**
  - **Better Organization:** Logic for a single feature is co-located, making components easier to read and maintain as they grow.
  - **Better Reusability:** Logic can be extracted into reusable "Composable" functions, which are more flexible than Mixins.
  - **Better Type Inference:** Provides much better TypeScript support.
  - **Smaller Bundle Size:** More friendly to tree-shaking.
`
  }
];

const vueCoding: Question[] = [
  {
    id: slugify("Create a simple counter component in Vue with increment and decrement buttons."),
    type: "coding",
    question: "Create a simple counter component in Vue with increment and decrement buttons.",
    answer: `**Answer using Composition API (\`<script setup>\`):**

\`\`\`vue
<template>
  <div>
    <h2>Counter</h2>
    <p>Current Count: {{ count }}</p>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const count = ref(0);

const increment = () => {
  count.value++;
};

const decrement = () => {
  count.value--;
};
</script>
\`\`\`
`
  },
  {
    id: slugify("Build a form component in Vue that handles input changes and submission."),
    type: "coding",
    question: "Build a form component in Vue that handles input changes and submission.",
    answer: `**Answer using \`v-model\` for two-way data binding:**

\`\`\`vue
<template>
  <form @submit.prevent="handleSubmit">
    <label>
      Name:
      <input type="text" v-model="inputValue" />
    </label>
    <button type="submit">Submit</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';

const inputValue = ref('');

const handleSubmit = () => {
  alert(\`Submitted value: \${inputValue.value}\`);
  inputValue.value = ''; // Reset input
};
</script>
\`\`\`
`
  },
];

const vuePath: Topic[] = [
  { id: "vue-theoretical", title: "Theoretical Questions", questions: vueTheoretical },
  { id: "vue-coding", title: "Coding Questions", questions: vueCoding },
];

const systemDesignTheoretical: Question[] = [
  {
    id: "url-shortener",
    type: "theoretical",
    question: "Design a URL shortener service. (Consider data storage, request handling, redirection).",
    answer: `**Answer Guidance:**

- **Core Functionality:**
  - **Generation:** Accept a long URL, return a short, unique URL.
  - **Redirection:** Accept a short URL, redirect to the original long URL.
- **Key Components:**
  - **API Gateway/Load Balancer:** Handles incoming requests.
  - **Application Servers:** Stateless servers handling the logic.
  - **Database:** Key-value store (like Redis or DynamoDB) is ideal for fast lookups: \`{ short_key -> long_url }\`.
- **Short URL Generation:**
  - Use a central counter to generate a unique integer ID.
  - Convert this ID to a short string using base62 encoding (\`[0-9a-zA-Z]\`). This is more efficient and predictable than hashing.
- **Redirection Logic:**
  - Client requests \`short.ly/xyz123\`.
  - Server looks up \`xyz123\` in the database.
  - If found, issue an HTTP 301 (Permanent) or 302 (Temporary) redirect to the long URL.
- **Scalability:**
  - **Read Heavy:** The system will be very read-heavy (redirections). Optimize for reads by caching popular URLs in memory (e.g., Redis).
  - **ID Generation:** The counter must be highly available and scalable.
`
  },
  {
    id: "twitter-feed",
    type: "theoretical",
    question: "Design a Twitter feed or Instagram feed. (Consider real-time updates, content delivery, scalability).",
    answer: `**Answer Guidance:**

- **Core Functionality:** Display a chronological list of posts from followed users.
- **Data Model:** Users, Posts, Follows.
- **Feed Generation Strategy (The Hard Part):**
  - **Fan-out on Write (Push Model):** When a user posts, push that post to a "feed list" for each of their followers. Stored in a cache like Redis.
    - **Pros:** Fast reads. The feed is pre-computed.
    - **Cons:** Slow for users with millions of followers (the "celebrity problem").
  - **Fan-out on Read (Pull Model):** When a user requests their feed, query posts from all users they follow, sort, and merge.
    - **Pros:** Simple, no celebrity problem.
    - **Cons:** Very slow reads for users who follow many people.
  - **Hybrid Approach:** Use fan-out on write for most users. For celebrities, don't fan out. When a user requests their feed, fetch their pre-computed feed and merge in posts from any celebrities they follow on-the-fly.
- **Real-time Updates:** Use WebSockets to push new posts to connected clients.
- **Scalability:**
  - **Databases:** Shard databases by user ID or post ID.
  - **Caching:** Aggressively cache feeds, user data, and post counts.
  - **CDN:** Serve all media (images, videos) from a CDN.
  - **Message Queues:** Use queues (like Kafka) for the fan-out process to handle load spikes.
`
  }
];

const systemDesignPath: Topic[] = [
  { id: "system-design-theoretical", title: "Theoretical Questions", questions: systemDesignTheoretical }
];

export const learningPaths: LearningPath[] = [
  {
    id: "javascript",
    title: "JavaScript (Core & Advanced)",
    description: "Deepen your understanding of JavaScript, from the event loop to advanced patterns and data structures.",
    icon: Code,
    topics: jsPath,
  },
  {
    id: "react",
    title: "React.js",
    description: "Master the most popular front-end library, from component fundamentals to advanced state management and performance.",
    icon: PenTool,
    topics: reactPath,
  },
  {
    id: "vue",
    title: "Vue.js",
    description: "Explore the progressive JavaScript framework, covering the Options and Composition APIs, reactivity, and ecosystem.",
    icon: PenTool,
    topics: vuePath,
  },
  {
    id: "system-design",
    title: "System Design",
    description: "Learn to architect scalable, resilient, and performant applications, from URL shorteners to large-scale social feeds.",
    icon: Milestone,
    topics: systemDesignPath,
  },
];

export const allCodingChallenges = learningPaths.flatMap(path =>
  path.topics
    .filter(topic => topic.id.endsWith('-coding'))
    .flatMap(topic => topic.questions)
);
