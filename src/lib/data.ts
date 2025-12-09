import { Code, Bot, Milestone, PenTool, Database, Server, Cloud, Cpu } from "lucide-react";
import type { LearningPath, Topic, Question } from "@/lib/types";
import { slugify } from "@/lib/utils";
import { aiTheoretical, aiCoding } from "@/lib/ai-data";
import { dsaPath } from "@/lib/dsa-data";
import { nodePath } from "@/lib/node-data";
import { dbPath } from "@/lib/db-data";
import { devopsPath } from "@/lib/devops-data";

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
  ,
  {
    id: 'map-set-weakmap-weakset',
    type: 'theoretical',
    question: "Explain Map, Set, WeakMap, and WeakSet. When should you use them over objects and arrays?",
    answer: `
**Answer Guidance:**

- **Map:** A collection of keyed data items, similar to an Object.
  - **Keys:** Can be of any type (objects, functions, primitives), unlike Objects where keys are strings/symbols.
  - **Order:** Maintains insertion order.
  - **Size:** Has a \`size\` property.
  - **Use:** When keys are unknown/dynamic or non-string, or when frequent additions/removals occur.
- **Set:** A collection of unique values.
  - **Uniqueness:** Guarantees no duplicates.
  - **Use:** To remove duplicates from an array or check for existence of a value efficiently.
- **WeakMap:** A Map where keys must be objects and are held "weakly".
  - **GC:** If there are no other references to the key object, it can be garbage collected.
  - **Use:** Storing private data for objects or metadata without preventing garbage collection.
- **WeakSet:** A Set where values must be objects and are held "weakly".
  - **Use:** Storing a collection of objects (like "visited" nodes) without preventing GC.
`
  },
  {
    id: 'currying-partial-application',
    type: 'theoretical',
    question: "What is Currying in JavaScript? How does it differ from Partial Application?",
    answer: `
**Answer Guidance:**

- **Currying:** Transforming a function that takes multiple arguments \`f(a, b, c)\` into a sequence of functions that each take a single argument \`f(a)(b)(c)\`.
  \`\`\`javascript
  const sum = a => b => a + b;
  sum(1)(2); // 3
  \`\`\`
- **Partial Application:** Creating a new function by fixing some arguments of an existing function. The result doesn't necessarily take one argument at a time.
  \`\`\`javascript
  const add = (a, b, c) => a + b + c;
  const add5 = add.bind(null, 5); // Fix 'a' to 5
  add5(10, 20); // 35
  \`\`\`
- **Use Cases:** Function composition, creating specialized helper functions, "point-free" style coding.
`
  },
  {
    id: 'memoization',
    type: 'theoretical',
    question: "What is Memoization? Implement a generic memoization function.",
    answer: `
**Answer Guidance:**

- **Memoization:** An optimization technique used to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again.
- **Implementation:**
  \`\`\`javascript
  function memoize(fn) {
    const cache = new Map();
    return function(...args) {
      const key = JSON.stringify(args); // Simple key generation
      if (cache.has(key)) {
        return cache.get(key);
      }
      const result = fn.apply(this, args);
      cache.set(key, result);
      return result;
    };
  }
  
  const slowSquare = n => { /* expensive calc */ return n * n; };
  const fastSquare = memoize(slowSquare);
  \`\`\`
`
  },
  {
    id: 'event-bubbling-capturing',
    type: 'theoretical',
    question: "Explain Event Bubbling and Event Capturing (Trickling). How do you stop propagation?",
    answer: `
**Answer Guidance:**

- **Event Propagation:** The order in which events are handled in the DOM.
- **Capturing Phase:** The event goes down from the \`window\` to the target element.
- **Target Phase:** The event reaches the target element.
- **Bubbling Phase:** The event bubbles up from the target element to the \`window\`.
- **Default:** Most events bubble by default. \`addEventListener(type, listener, false)\` (or omitting the 3rd arg) listens in the bubbling phase. To listen in the capturing phase, pass \`true\` or \`{ capture: true }\`.
- **Stopping Propagation:**
  - \`event.stopPropagation()\`: Stops the event from moving to the next node in the propagation path.
  - \`event.stopImmediatePropagation()\`: Stops propagation AND prevents other listeners on the *same* element from running.
`
  },
  {
    id: 'storage-options',
    type: 'theoretical',
    question: "Compare LocalStorage, SessionStorage, and Cookies. When would you use each?",
    answer: `
**Answer Guidance:**

- **Cookies:**
  - **Capacity:** Small (4KB).
  - **Expiration:** Manually set.
  - **Server:** Sent with every HTTP request (unless \`SameSite\`).
  - **Use:** Authentication tokens (JWT), server-readable state.
- **LocalStorage:**
  - **Capacity:** Large (~5-10MB).
  - **Expiration:** Never expires (persistent).
  - **Server:** Client-side only.
  - **Use:** User preferences, long-term caching, themes (dark mode).
- **SessionStorage:**
  - **Capacity:** Large (~5-10MB).
  - **Expiration:** Cleared when the tab/window is closed.
  - **Server:** Client-side only.
  - **Use:** Form data retention, temporary state within a session.
`
  },
  {
    id: 'reflow-repaint',
    type: 'theoretical',
    question: "What are Reflow (Layout) and Repaint? How can you optimize to avoid them?",
    answer: `
**Answer Guidance:**

- **Reflow (Layout):** The browser calculates the positions and geometry of elements. Happens when the DOM layout changes (e.g., width, height, position, font-size). Expensive.
- **Repaint:** The browser draws the pixels to the screen. Happens when visibility changes (e.g., color, visibility, background) but layout doesn't. Cheaper than reflow.
- **Optimization:**
  - **Batch DOM updates:** Change classes instead of individual styles.
  - **Read/Write separation:** Don't read layout properties (like \`offsetWidth\`) immediately after writing them (forces synchronous layout).
  - **"Offline" elements:** Modify elements while they are \`display: none\` or in a DocumentFragment.
  - **Animations:** Use \`transform\` and \`opacity\` which can be handled by the GPU (compositor thread) without triggering reflow/repaint.
`
  },
  {
    id: 'deep-vs-shallow-copy',
    type: 'theoretical',
    question: "What is the difference between shallow copy and deep copy? How do you create them?",
    answer: `
**Answer Guidance:**

- **Shallow Copy:** Creates a new object/array, but nested objects are still referenced. Changing a nested object in the copy affects the original.
  - **Methods:** \`Object.assign({}, obj)\`, Spread syntax \`{...obj}\`, \`arr.slice()\`.
- **Deep Copy:** Creates a completely independent clone, including all nested objects.
  - **JSON:** \`JSON.parse(JSON.stringify(obj))\` (Simple, but loses methods, regex, dates, undefined).
  - **structuredClone():** New native API, handles dates, regex, maps, sets, but not functions.
  - **Libraries:** Lodash \`_.cloneDeep()\`.
`
  },
  {
    id: 'use-strict',
    type: 'theoretical',
    question: "What is 'use strict'? What changes does it enforce?",
    answer: `
**Answer Guidance:**

- **'use strict':** A directive string that enables strict mode in JavaScript.
- **Changes:**
  - **Variables:** Prevents using undeclared variables (prevents accidental globals).
  - **Functions:** \`this\` is \`undefined\` in simple function calls (not \`window\`).
  - **Properties:** Throws errors when assigning to non-writable properties.
  - **Parameters:** Disallows duplicate parameter names.
  - **Reserved keywords:** Reserves words like \`public\`, \`private\`, \`interface\` for future versions.
  - **Octal literals:** Disallows legacy octal syntax (\`012\`).
`
  },
  {
    id: 'symbol-primitive',
    type: 'theoretical',
    question: "What is the Symbol primitive? What are its use cases?",
    answer: `
**Answer Guidance:**

- **Symbol:** A unique and immutable primitive value. \`Symbol('desc') !== Symbol('desc')\`.
- **Use Cases:**
  - **Unique Object Keys:** Avoid naming collisions in objects, especially when extending libraries.
  - **Hidden Properties:** Keys created with Symbols don't appear in \`for...in\` or \`Object.keys()\`.
  - **Well-known Symbols:** Customize language behavior (e.g., \`Symbol.iterator\` to make an object iterable, \`Symbol.toPrimitive\`, \`Symbol.toStringTag\`).
`
  },
  {
    id: 'proxy-reflect',
    type: 'theoretical',
    question: "What are Proxies and Reflect in JavaScript? Give a practical example.",
    answer: `
**Answer Guidance:**

- **Proxy:** An object that wraps another object (target) and intercepts operations (reading, writing, deleting properties).
- **Reflect:** A built-in object that provides methods for interceptable JavaScript operations. Useful to forward default behavior inside a Proxy handler.
- **Example: Validation**
  \`\`\`javascript
  const validator = {
    set: function(obj, prop, value) {
      if (prop === 'age' && typeof value !== 'number') {
        throw new TypeError('Age must be a number');
      }
      return Reflect.set(obj, prop, value); // Forward operation
    }
  };
  const person = new Proxy({}, validator);
  person.age = 30; // OK
  // person.age = "30"; // Throws Error
  \`\`\`
`
  },
  {
    id: 'module-bundlers',
    type: 'theoretical',
    question: "What is a module bundler (Webpack, Vite, Rollup)? Why do we need them?",
    answer: `
**Answer Guidance:**

- **Module Bundler:** A tool that takes pieces of JavaScript and their dependencies and bundles them into a single (or few) files for the browser.
- **Why Needed:**
  - **Browser Support:** Browsers historically didn't support modules well (though they do now). Bundlers handle older browsers.
  - **Dependencies:** Managing npm packages and resolving imports.
  - **Optimization:** Minification, tree-shaking (removing unused code), code splitting (lazy loading).
  - **Assets:** Handling non-JS assets like CSS, images (loaders).
  - **Transpilation:** Often integrated with Babel/TypeScript to convert modern code to compatible code.
`
  },
  {
    id: 'javascript-design-patterns',
    type: 'theoretical',
    question: "Name and explain three common JavaScript design patterns.",
    answer: `
**Answer Guidance:**

- **Singleton:** Ensures a class has only one instance and provides a global point of access to it. (Common for database connections, config managers).
- **Observer (Pub/Sub):** Defines a dependency where notifying one object (Subject) automatically updates its dependents (Observers). (Used in event handling, Redux).
- **Factory:** A function or method for creating objects without specifying their exact class. Used when the creation logic is complex or depends on input.
- **Module Pattern:** (See previous question) Encapsulation.
`
  },
  {
    id: 'functional-programming-concepts',
    type: 'theoretical',
    question: "What is Functional Programming (FP)? Explain pure functions and side effects.",
    answer: `
**Answer Guidance:**

- **Functional Programming:** A paradigm where programs are constructed by applying and composing functions.
- **Pure Functions:**
  - **Deterministic:** Same input always produces same output.
  - **No Side Effects:** Does not modify external state (variables outside its scope, DOM, I/O).
  - **Benefits:** Easy to test, predictable, memoizable, parallelizable.
- **Side Effects:** modifying a global variable, making an API call, changing the DOM, logging to console.
`
  },
  {
    id: 'async-iterators-generators',
    type: 'theoretical',
    question: "What are Async Iterators and Async Generators (\`for await...of\`)?",
    answer: `
**Answer Guidance:**

- **Async Iterator:** An iterator where \`next()\` returns a Promise resolving to \`{ value, done }\`.
- **Async Generator:** Defined with \`async function*\`. Can use \`await\` and \`yield\`.
- **Usage:** define streams of data that come asynchronously.
  \`\`\`javascript
  async function* fetchPages(urls) {
    for (const url of urls) {
      const resp = await fetch(url);
      yield await resp.json();
    }
  }
  
  // Consuming
  for await (const page of fetchPages(['/api/1', '/api/2'])) {
    console.log(page);
  }
  \`\`\`
`
  },
  {
    id: 'web-security-js',
    type: 'theoretical',
    question: "Briefly explain XSS and CSRF. How does JavaScript play a role?",
    answer: `
**Answer Guidance:**

- **XSS (Cross-Site Scripting):** Attackers inject malicious scripts into trusted websites.
  - **JS Role:** The script runs in the user's browser, stealing cookies, session tokens, or defacing the site.
  - **Defense:** Escaping/sanitizing user input, using Content Security Policy (CSP), avoiding \`innerHTML\`.
- **CSRF (Cross-Site Request Forgery):** Attackers trick a logged-in user into executing unwanted actions.
  - **JS Role:** Often relies on the browser automatically sending cookies. JS can be used to trigger the request.
  - **Defense:** Anti-CSRF tokens, SameSite cookie attribute.
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

console.log(reverseStringIterative("world")); // "dlrow"
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
2.  Create a recursive helper function that takes the current object and the set of visited objects.
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
4.  If the first letter is not yet a key in your map/object, create a new entry with an array containing the current string.
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
2.  Use the \`test()\` method of the RegExp object, which returns \`true\` if there is a match and \`false\` otherwise.

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
    {
        id: 'react-hooks',
        type: 'theoretical',
        question: 'What are React Hooks? Explain common hooks like useState, useEffect, useContext, useReducer, useCallback, useMemo.',
        answer: `**Answer Guidance:**

- **React Hooks:** Functions that let you "hook into" React state and lifecycle features from functional components.
- **Common Hooks:**
  - **\`useState\`:** Adds state to a functional component.
  - **\`useEffect\`:** Lets you perform side effects (data fetching, subscriptions, DOM manipulation). It's a combination of \`componentDidMount\`, \`componentDidUpdate\`, and \`componentWillUnmount\`.
  - **\`useContext\`:** Accepts a context object and returns the current context value. It's used to consume shared data.
  - **\`useReducer\`:** An alternative to \`useState\`. It's usually preferable for complex state logic.
  - **\`useCallback\`:** Returns a memoized callback function. This is useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders.
  - **\`useMemo\`:** Returns a memoized value. It recomputes the memoized value only when one of the dependencies has changed. It's used for performance optimization.
`
    },
    {
        id: 'react-component-lifecycle',
        type: 'theoretical',
        question: "Describe the React component lifecycle. How do lifecycle methods map to useEffect?",
        answer: `**Answer Guidance:**

- **Mounting:** When an instance of a component is being created and inserted into the DOM.
  - \`constructor()\`, \`render()\`, \`componentDidMount()\`
- **Updating:** When a component is being re-rendered as a result of changes to either its props or state.
  - \`render()\`, \`componentDidUpdate()\`
- **Unmounting:** When a component is being removed from the DOM.
  - \`componentWillUnmount()\`

**Mapping to \`useEffect\`:**
- **\`componentDidMount\`:** \`useEffect(() => { ... }, [])\` (empty dependency array).
- **\`componentDidUpdate\`:** \`useEffect(() => { ... }, [dep1, dep2])\` (with dependencies).
- **\`componentWillUnmount\`:** The cleanup function returned from \`useEffect\`. \`useEffect(() => { return () => { ... } }, [])\`.
`
    },
    {
        id: 'jsx',
        type: 'theoretical',
        question: "What is JSX? How does it work?",
        answer: `**Answer Guidance:**

- **JSX (JavaScript XML):** A syntax extension for JavaScript that looks similar to HTML. It allows youto write HTML-like code in your JavaScript files.
- **How it works:** JSX is not understood by browsers. It's compiled (transpiled) by tools like Babel into regular JavaScript function calls (\`React.createElement()\`). These function calls create JavaScript objects that describe the UI.
`
    },
    {
        id: 'state-management-react',
        type: 'theoretical',
        question: "Explain state management in React. Discuss different approaches (local state, Context API, Redux, Zustand, Jotai).",
        answer: `**Answer Guidance:**

- **Local State:** State that is managed within a single component using \`useState\` or \`useReducer\`.
- **Context API:** A way to pass data through the component tree without having to pass props down manually at every level. Good for "global" data like themes, user info.
- **Redux:** A predictable state container for JavaScript apps. It uses a single global store, actions, and reducers. Provides strong debugging tools.
- **Zustand:** A small, fast, and scalable state-management solution using hooks. It's often considered a simpler alternative to Redux.
- **Jotai:** A primitive and flexible state management solution for React based on atomic state.
`
    },
    {
        id: 'prop-drilling',
        type: 'theoretical',
        question: "What is prop drilling? How can you avoid it?",
        answer: `**Answer Guidance:**

- **Prop Drilling:** The process of passing data from a parent component down to a child component through multiple layers of intermediate components that don't need the data.
- **How to avoid it:**
  - **Context API:** For global data.
  - **State Management Libraries (Redux, Zustand):** For application-wide state.
  - **Component Composition:** Restructuring components to pass children directly.
`
    },
    {
        id: 'composition-vs-inheritance',
        type: 'theoretical',
        question: "Explain the concept of component composition vs. inheritance in React.",
        answer: `**Answer Guidance:**

- **Inheritance:** React does not favor class inheritance for sharing code between components.
- **Composition:** React strongly favors composition. Instead of a component inheriting functionality from a parent component, it can be "composed" with other components by passing them as props (often as \`children\`). This is a more flexible and robust way to reuse code.
`
    },
    {
        id: 'higher-order-components',
        type: 'theoretical',
        question: "What are Higher-Order Components (HOCs)? What are their pros and cons? How do they compare to Hooks?",
        answer: `**Answer Guidance:**

- **HOCs:** A function that takes a component and returns a new component with additional props or logic. It's a pattern for reusing component logic.
- **Pros:** Reusability.
- **Cons:** Can lead to "wrapper hell" (many nested components in the React DevTools), can be hard to follow where props are coming from.
- **Comparison to Hooks:** Hooks are now the preferred way to share stateful logic. They are more explicit, easier to compose, and don't create extra components in the tree.
`
    },
    {
        id: 'shouldcomponentupdate-react-memo',
        type: 'theoretical',
        question: "What is shouldComponentUpdate and React.memo? When and why would you use them for performance optimization?",
        answer: `**Answer Guidance:**

- **\`shouldComponentUpdate\`:** A lifecycle method in class components that lets you control if a component should re-render.
- **\`React.memo\`:** A higher-order component for functional components that does a shallow comparison of props and prevents re-rendering if the props haven't changed.
- **When to use:** Use them to optimize performance when a component is re-rendering unnecessarily, especially in large lists or with complex UI.
`
    },
    {
        id: 'react-reconciliation',
        type: 'theoretical',
        question: "Explain React's reconciliation process.",
        answer: `**Answer Guidance:**

Reconciliation is the process through which React updates the DOM. When a component's state or props change, React compares the new Virtual DOM with the old one (this is the "diffing" algorithm) and then makes the minimal necessary changes to the real DOM.
`
    },
    {
        id: 'server-side-rendering',
        type: 'theoretical',
        question: "What is server-side rendering (SSR)? How does React support it (e.g., Next.js)?",
        answer: `**Answer Guidance:**

- **SSR:** The process of rendering React components on the server into HTML, which is then sent to the client. This can improve performance and SEO.
- **How React supports it:** React provides APIs like \`ReactDOMServer.renderToString()\` that can be used on a server. Frameworks like Next.js are built around this capability to provide a seamless SSR experience.
`
    },
    {
        id: 'controlled-vs-uncontrolled',
        type: 'theoretical',
        question: "Discuss the differences between controlled and uncontrolled components in React.",
        answer: `**Answer Guidance:**

- **Controlled Components:** Form elements whose value is controlled by React state. The value is set via props, and changes are handled by callbacks. This is the recommended approach.
- **Uncontrolled Components:** Form elements where the DOM handles the state (e.g., using a \`ref\` to get the value).
`
    },
    {
        id: 'key-prop',
        type: 'theoretical',
        question: "What is key prop used for in React lists? Why is it important?",
        answer: `**Answer Guidance:**

- **Keys:** Special string attributes you need to include when creating lists of elements. Keys help React identify which items have changed, are added, or are removed.
- **Importance:** Keys should be stable, predictable, and unique. They help React perform efficient updates. Using array indexes as keys is an anti-pattern if the list can be reordered.
`
    },
    {
        id: 'context-api-vs-redux',
        type: 'theoretical',
        question: "Explain the concept of Context API. When is it a good alternative to Redux?",
        answer: `**Answer Guidance:**

- **Context API:** Provides a way to pass data through the component tree without prop drilling.
- **Alternative to Redux:** Context is great for low-frequency updates of simple data (like theming, user authentication). Redux is better for complex, high-frequency state changes that require robust debugging tools.
`
    },
    {
        id: 'usecallback-vs-usememo',
        type: 'theoretical',
        question: "What is the difference between useCallback and useMemo?",
        answer: `**Answer Guidance:**

- **\`useCallback\`:** Memoizes a callback function.
- **\`useMemo\`:** Memoizes a value.

You use \`useCallback\` to prevent re-creation of functions, and \`useMemo\` to prevent re-computation of expensive values.
`
    },
    {
        id: 'useeffect-dependency-array',
        type: 'theoretical',
        question: "Describe the useEffect hook's dependency array. What happens if it's omitted or empty?",
        answer: `**Answer Guidance:**

- **Dependency Array:** The second argument to \`useEffect\`. It's an array of values that the effect depends on.
- **Omitted:** The effect runs after every render.
- **Empty Array \`[]\`:** The effect runs only once, after the initial render (like \`componentDidMount\`).
- **With Dependencies \`[dep1, dep2]\`:** The effect runs after the initial render and whenever any of the dependencies change.
`
    },
    {
        id: 'create-react-app',
        type: 'theoretical',
        question: "What is the role of create-react-app? What are its limitations in a production environment?",
        answer: `**Answer Guidance:**

- **Role:** A tool to quickly set up a new single-page React application with a good default configuration.
- **Limitations:** It's a client-side rendering (CSR) solution. It doesn't support server-side rendering (SSR) or static site generation (SSG) out of the box, which can be important for performance and SEO in production. Frameworks like Next.js are often preferred for production apps.
`
    },
    {
        id: 'react-routing',
        type: 'theoretical',
        question: "How do you handle routing in React? (React Router).",
        answer: `**Answer Guidance:**

- **React Router:** The most popular library for routing in React. It provides components like \`<BrowserRouter>\`, \`<Routes>\`, \`<Route>\`, and \`<Link>\` to manage navigation in a single-page application.
`
    }
  ,
  {
    id: 'uselayouteffect-vs-useeffect',
    type: 'theoretical',
    question: "What is useLayoutEffect? How does it differ from useEffect?",
    answer: `**Answer Guidance:**

- **\`useEffect\`:** Runs asynchronously *after* the render is committed to the screen. Good for data fetching, subscriptions.
- **\`useLayoutEffect\`:** Runs synchronously *immediately after* DOM mutations but *before* the browser has a chance to paint.
- **When to use layout effect:** When you need to read layout from the DOM and synchronously re-render (e.g., measuring an element's size/position) to prevent visual flickering.
`
  },
  {
    id: 'forward-ref',
    type: 'theoretical',
    question: "What is forwardRef in React? When is it used?",
    answer: `**Answer Guidance:**

- **\`forwardRef\`:** A function that lets your component expose a DOM node to its parent component with a ref.
- **Usage:**
  - Forwarding refs to DOM components (e.g., a generic \`FancyButton\` component that lets the parent focus the underlying \`<button>\`).
  - Forwarding refs in Higher-Order Components (HOCs) to pass the ref through the wrapper to the wrapped component.
`
  },
  {
    id: 'react-portals',
    type: 'theoretical',
    question: "What are React Portals? Why are they useful?",
    answer: `**Answer Guidance:**

- **Portals:** Provide a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.
- **Syntax:** \`ReactDOM.createPortal(child, container)\`
- **Use Cases:** When a parent component has \`overflow: hidden\` or \`z-index\` style, but you need the child to visually "break out" (e.g., Modals, Tooltips, Popovers/Dropdowns).
`
  },
  {
    id: 'error-boundaries',
    type: 'theoretical',
    question: "What are Error Boundaries in React? How do you implement one?",
    answer: `**Answer Guidance:**

- **Error Boundaries:** React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed.
- **Implementation:** Must be a class component.
  - \`static getDerivedStateFromError(error)\`: To render a fallback UI.
  - \`componentDidCatch(error, errorInfo)\`: To log the error information.
- **Note:** Error boundaries do not catch errors inside methods like event handlers, async code, or server-side rendering.
`
  },
  {
    id: 'react-lazy-suspense',
    type: 'theoretical',
    question: "Explain React.lazy and Suspense. How do they enable code splitting?",
    answer: `**Answer Guidance:**

- **\`React.lazy\`:** Takes a function that must call a dynamic import(). It lets you render a dynamic import as a regular component.
- **\`Suspense\`:** Lets you specify a loading indicator (fallback) in case some components in the tree below it are not yet ready to render (e.g., they are being lazy-loaded).
- **Code Splitting:** By using \`React.lazy\` and \`Suspense\`, you can split your bundle into smaller chunks which are loaded on demand, reducing the initial load time.
`
  },
  {
    id: 'react-fragments',
    type: 'theoretical',
    question: "What are Fragments? Why should you use them over a div?",
    answer: `**Answer Guidance:**

- **Fragments (\`<React.Fragment>\` or \`<>\`):** Let you group a list of children without adding extra nodes to the DOM.
- **Why use them:**
  - **Cleaner DOM:** Prevents "div soup" (unnecessary nesting).
  - **Layout:** Some CSS layouts (Grid, Flexbox) depend on parent-child relationships, and an extra \`div\` wraps the children and breaks the layout.
  - **Performance:** Slightly less memory usage and faster rendering.
`
  },
  {
    id: 'synthetic-events',
    type: 'theoretical',
    question: "What are Synthetic Events in React?",
    answer: `**Answer Guidance:**

- **SyntheticEvent:** A cross-browser wrapper around the browser's native event. It has the same interface as the native event (e.g., \`stopPropagation\`, \`preventDefault\`), but works identically across all browsers.
- **Pooling:** (Prior to React 17) Synthetic events were pooled for performance. This meant the event object was reused and properties were nullified after the callback. Current React versions do not pool events.
`
  },
  {
    id: 'redux-vs-usereducer',
    type: 'theoretical',
    question: "Compare useReducer with Redux. When should you choose one over the other?",
    answer: `**Answer Guidance:**

- **\`useReducer\`:**
  - **Scope:** Component-level (or subtree if passed via Context).
  - **Setup:** Minimal setup (built-in hook).
  - **Use Case:** Complex state logic within a component or small-to-medium apps where global state is minimal.
- **Redux:**
  - **Scope:** Global application state.
  - **Setup:** Requires boilerplate (store, provider, reducers, actions).
  - **Tools:** Excellent DevTools (Time travel debugging), Middleware (Thunk, Saga).
  - **Use Case:** Large apps with complex, frequently-updated global state, or when many components need to access/update the same state.
`
  },
  {
    id: 'custom-hooks-rules',
    type: 'theoretical',
    question: "What are the rules for writing Custom Hooks?",
    answer: `**Answer Guidance:**

- **Naming:** Must start with \`use\` (e.g., \`useFetch\`, \`useForm\`). This tells React (and linters) that it's a Hook.
- **Composition:** Can call other Hooks (useState, useEffect, etc.).
- **Top Level:** Like all Hooks, custom hooks must only be called at the top level of your component or another custom hook, not inside loops, conditions, or nested functions.
`
  },
  {
    id: 'react-fiber',
    type: 'theoretical',
    question: "Briefly explain React Fiber.",
    answer: `**Answer Guidance:**

- **React Fiber:** The reimplementation of React's core reconciliation algorithm (introduced in React 16).
- **Goal:** To enable incremental rendering.
- **Key Feature:** The ability to pause, abort, or reuse work as new updates come in; to assign priority to different types of updates; and new concurrency primitives. It breaks rendering work into units called "fibers" that can be paused and resumed.
`
  }
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
    },
    {
        id: slugify("Implement a component that fetches data from an API and displays it. Include loading and error states."),
        type: "coding",
        question: "Implement a component that fetches data from an API and displays it. Include loading and error states.",
        answer: `
\`\`\`jsx
import React, { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []); // Empty array means this effect runs once on mount

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Fetched Data</h2>
      <p>{data.title}</p>
    </div>
  );
}

export default DataFetcher;
\`\`\`
`
    },
    {
        id: slugify("Create a reusable button component with different variants (primary, secondary)."),
        type: "coding",
        question: "Create a reusable button component with different variants (primary, secondary).",
        answer: `
\`\`\`jsx
import React from 'react';

function Button({ children, variant = 'primary', ...props }) {
  const baseStyles = "px-4 py-2 rounded ";
  const styles = {
    primary: "bg-blue-500 text-white",
    secondary: "bg-gray-500 text-white",
  };
  
  return (
    <button className={\`\${baseStyles} \${styles[variant]}\`} {...props}>
      {children}
    </button>
  );
}

export default Button;
\`\`\`
`
    },
    {
        id: slugify("Build a modal component that can be toggled open and closed."),
        type: "coding",
        question: "Build a modal component that can be toggled open and closed.",
        answer: `
\`\`\`jsx
import React, { useState } from 'react';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px' }}>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

function ModalExample() {
    const [isModalOpen, setModalOpen] = useState(false);
    return (
        <div>
            <button onClick={() => setModalOpen(true)}>Open Modal</button>
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <p>This is a modal!</p>
            </Modal>
        </div>
    );
}

export default ModalExample;
\`\`\`
`
    },
    {
        id: slugify("Implement a list component that renders a dynamic list of items, with functionality to add/remove items."),
        type: "coding",
        question: "Implement a list component that renders a dynamic list of items, with functionality to add/remove items.",
        answer: `
\`\`\`jsx
import React, { useState } from 'react';

function DynamicList() {
  const [items, setItems] = useState(['Apple', 'Banana', 'Cherry']);
  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, newItem]);
      setNewItem('');
    }
  };

  const removeItem = (indexToRemove) => {
    setItems(items.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div>
      <input 
        type="text" 
        value={newItem} 
        onChange={(e) => setNewItem(e.target.value)} 
      />
      <button onClick={addItem}>Add Item</button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => removeItem(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DynamicList;
\`\`\`
`
    },
    {
        id: slugify("Create a toggle switch component."),
        type: "coding",
        question: "Create a toggle switch component.",
        answer: `
\`\`\`jsx
import React, { useState } from 'react';

function ToggleSwitch() {
  const [isOn, setIsOn] = useState(false);

  return (
    <button onClick={() => setIsOn(!isOn)}>
      {isOn ? 'ON' : 'OFF'}
    </button>
  );
}

export default ToggleSwitch;
\`\`\`
`
    },
    {
        id: slugify("Build a pagination component for a list of items."),
        type: "coding",
        question: "Build a pagination component for a list of items.",
        answer: `
\`\`\`jsx
import React, { useState } from 'react';

function Pagination({ totalItems, itemsPerPage, onPageChange }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  return (
    <div>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <button key={page} onClick={() => onPageChange(page)}>
          {page}
        </button>
      ))}
    </div>
  );
}

function PaginatedList() {
    const allItems = Array.from({ length: 50 }, (_, i) => \`Item \${i + 1}\`);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    
    const currentItems = allItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div>
            <ul>
                {currentItems.map(item => <li key={item}>{item}</li>)}
            </ul>
            <Pagination 
                totalItems={allItems.length} 
                itemsPerPage={itemsPerPage} 
                onPageChange={setCurrentPage} 
            />
        </div>
    );
}

export default PaginatedList;
\`\`\`
`
    },
    {
        id: slugify("Implement a search filter for a list of items."),
        type: "coding",
        question: "Implement a search filter for a list of items.",
        answer: `
\`\`\`jsx
import React, { useState } from 'react';

const allItems = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];

function SearchFilter() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = allItems.filter(item => 
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredItems.map(item => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}

export default SearchFilter;
\`\`\`
`
    },
    {
        id: slugify("Create a simple quiz application with multiple questions and scoring."),
        type: "coding",
        question: "Create a simple quiz application with multiple questions and scoring.",
        answer: `
\`\`\`jsx
import React, { useState } from 'react';

const questions = [
  { question: 'What is 2 + 2?', answer: '4' },
  { question: 'What is the capital of France?', answer: 'Paris' },
];

function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');

  const handleAnswer = () => {
    if (userAnswer.toLowerCase() === questions[currentQuestionIndex].answer.toLowerCase()) {
      setScore(score + 1);
    }
    setUserAnswer('');
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  if (currentQuestionIndex >= questions.length) {
    return <h2>Quiz Over! Your score: {score}</h2>;
  }

  return (
    <div>
      <h2>{questions[currentQuestionIndex].question}</h2>
      <input 
        type="text"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
      />
      <button onClick={handleAnswer}>Submit</button>
    </div>
  );
}

export default Quiz;
\`\`\`
`
    },
    {
        id: slugify("Build a form with validation using useState and basic JavaScript."),
        type: "coding",
        question: "Build a form with validation using useState and basic JavaScript.",
        answer: `
\`\`\`jsx
import React, { useState } from 'react';

function ValidatedForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    return /\\S+@\\S+\\.\\S+/.test(email);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Invalid email format');
    } else {
      setError('');
      alert('Form submitted!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}

export default ValidatedForm;
\`\`\`
`
    },
    {
        id: slugify("Implement a component that listens to window resize events and updates its state."),
        type: "coding",
        question: "Implement a component that listens to window resize events and updates its state.",
        answer: `
\`\`\`jsx
import React, { useState, useEffect } from 'react';

function WindowSize() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <p>Window width: {windowWidth}px</p>;
}

export default WindowSize;
\`\`\`
`
    },
    {
        id: slugify("Create a component that uses useContext to share data between components without prop drilling."),
        type: "coding",
        question: "Create a component that uses useContext to share data between components without prop drilling.",
        answer: `
\`\`\`jsx
import React, { useState, useContext, createContext } from 'react';

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function Toolbar() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
        <div>
            <p>Current theme: {theme}</p>
            <button onClick={toggleTheme}>Toggle Theme</button>
        </div>
    );
}

function AppWithContext() {
    return (
        <ThemeProvider>
            <Toolbar />
        </ThemeProvider>
    );
}

export default AppWithContext;
\`\`\`
`
    },
    {
        id: slugify("Build a component that fetches data and caches it using useMemo or a custom hook."),
        type: "coding",
        question: "Build a component that fetches data and caches it using useMemo or a custom hook.",
        answer: `
\`\`\`jsx
import React, { useState, useEffect, useMemo } from 'react';

// Using useMemo for simple caching based on an ID
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  const fetchUser = async (id) => {
    const response = await fetch(\`https://jsonplaceholder.typicode.com/users/\${id}\`);
    return response.json();
  };

  const cachedUser = useMemo(() => fetchUser(userId), [userId]);

  useEffect(() => {
    cachedUser.then(setUser);
  }, [cachedUser]);
  
  return user ? <div>{user.name}</div> : <p>Loading...</p>;
}

export default UserProfile;
\`\`\`
`
    },
    {
        id: slugify("Implement a component that uses React.memo to optimize rendering for a list item."),
        type: "coding",
        question: "Implement a component that uses React.memo to optimize rendering for a list item.",
        answer: `
\`\`\`jsx
import React, { useState, memo } from 'react';

const ListItem = memo(function ListItem({ text }) {
  console.log(\`Rendering \${text}\`);
  return <li>{text}</li>;
});

function List() {
  const [items, setItems] = useState(['Apple', 'Banana']);
  const [newItem, setNewItem] = useState('');
  
  return (
    <div>
        <input value={newItem} onChange={e => setNewItem(e.target.value)} />
        <button onClick={() => setItems([...items, newItem])}>Add</button>
        <ul>
            {items.map(item => <ListItem key={item} text={item} />)}
        </ul>
    </div>
  );
}

export default List;
\`\`\`
`
    },
    {
        id: slugify("Create a custom hook for fetching data from an API."),
        type: "coding",
        question: "Create a custom hook for fetching data from an API.",
        answer: `
\`\`\`jsx
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}

// Usage:
// const { data, loading, error } = useFetch('api/url');
\`\`\`
`
    },
    {
        id: slugify("Build a dropdown component with keyboard navigation."),
        type: "coding",
        question: "Build a dropdown component with keyboard navigation.",
        answer: `
\`\`\`jsx
import React, { useState, useEffect, useRef } from 'react';

function Dropdown({ options }) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const ref = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'ArrowDown') {
        setFocusedIndex(i => (i + 1) % options.length);
      } else if (e.key === 'ArrowUp') {
        setFocusedIndex(i => (i - 1 + options.length) % options.length);
      } else if (e.key === 'Enter') {
        // select option
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, options.length]);

  return (
    <div ref={ref}>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      {isOpen && (
        <ul>
          {options.map((option, i) => (
            <li key={option} style={{ backgroundColor: i === focusedIndex ? 'lightgray' : 'white' }}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
\`\`\`
`
    },
    {
        id: slugify("Implement a drag-and-drop functionality for list items."),
        type: "coding",
        question: "Implement a drag-and-drop functionality for list items.",
        answer: `
\`\`\`jsx
import React, { useState } from 'react';

function DraggableList() {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);
  const dragItem = React.useRef();
  const dragOverItem = React.useRef();

  const handleDragSort = () => {
    let _items = [...items];
    const draggedItemContent = _items.splice(dragItem.current, 1)[0];
    _items.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setItems(_items);
  };

  return (
    <ul>
      {items.map((item, index) => (
        <li
          key={index}
          draggable
          onDragStart={() => (dragItem.current = index)}
          onDragEnter={() => (dragOverItem.current = index)}
          onDragEnd={handleDragSort}
          onDragOver={(e) => e.preventDefault()}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export default DraggableList;
\`\`\`
`
    },
    {
        id: slugify("Create a component that displays a progress bar based on some value."),
        type: "coding",
        question: "Create a component that displays a progress bar based on some value.",
        answer: `
\`\`\`jsx
import React from 'react';

function ProgressBar({ value }) { // value is 0 to 100
  return (
    <div style={{ border: '1px solid black', width: '100px' }}>
      <div style={{ width: \`\${value}%\`, height: '20px', backgroundColor: 'green' }} />
    </div>
  );
}

export default ProgressBar;
\`\`\`
`
    },
    {
        id: slugify("Build a simple chat interface where messages appear in real-time (simulate with setInterval)."),
        type: "coding",
        question: "Build a simple chat interface where messages appear in real-time (simulate with setInterval).",
        answer: `
\`\`\`jsx
import React, { useState, useEffect } from 'react';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
        setMessages(m => [...m, 'New message from server!']);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const sendMessage = () => {
    setMessages([...messages, newMessage]);
    setNewMessage('');
  };
  
  return (
    <div>
      <ul>
        {messages.map((msg, i) => <li key={i}>{msg}</li>)}
      </ul>
      <input value={newMessage} onChange={e => setNewMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
\`\`\`
`
    }
  ,
  {
    id: slugify("Create a custom hook useWindowSize that returns the window dimensions."),
    type: "coding",
    question: "Create a custom hook useWindowSize that returns the window dimensions.",
    answer: `
\`\`\`jsx
import { useState, useEffect } from 'react';

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    window.addEventListener("resize", handleResize);
    handleResize(); // Call right away so state gets updated with initial window size
    
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  
  return windowSize;
}
// Usage: const { width, height } = useWindowSize();
\`\`\`
`
  },
  {
    id: slugify("Implement a Higher Order Component (HOC) withLoading that displays a loading spinner."),
    type: "coding",
    question: "Implement a Higher Order Component (HOC) withLoading that displays a loading spinner.",
    answer: `
\`\`\`jsx
import React from 'react';

function withLoading(Component) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) return <p>Loading...</p>;
    return <Component {...props} />;
  };
}

// Usage:
// const UserListWithLoading = withLoading(UserList);
// <UserListWithLoading isLoading={true} users={[]} />
\`\`\`
`
  },
  {
    id: slugify("Create a StarRating component that allows users to select a rating."),
    type: "coding",
    question: "Create a StarRating component that allows users to select a rating.",
    answer: `
\`\`\`jsx
import React, { useState } from 'react';

function StarRating({ totalStars = 5 }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="star-rating">
      {[...Array(totalStars)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <span 
            key={index} 
            style={{ cursor: 'pointer', color: ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9", fontSize: '2rem' }}
            onClick={() => setRating(ratingValue)}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(0)}
          >
            &#9733;
          </span>
        );
      })}
      <p>Rating: {rating}</p>
    </div>
  );
}
export default StarRating;
\`\`\`
`
  },
  {
    id: slugify("Build a Stopwatch component with Start, Stop, and Reset functionality."),
    type: "coding",
    question: "Build a Stopwatch component with Start, Stop, and Reset functionality.",
    answer: `
\`\`\`jsx
import React, { useState, useRef } from 'react';

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
  };

  const stop = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (time) => {
    const getMilliseconds = \`0\${(time % 1000) / 10}\`.slice(-2);
    const getSeconds = \`0\${Math.floor((time / 1000) % 60)}\`.slice(-2);
    const getMinutes = \`0\${Math.floor((time / 60000) % 60)}\`.slice(-2);
    return \`\${getMinutes}:\${getSeconds}:\${getMilliseconds}\`;
  };

  return (
    <div>
      <h1>{formatTime(time)}</h1>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
export default Stopwatch;
\`\`\`
`
  },
  {
    id: slugify("Implement a Tabs component that switches content based on the active tab."),
    type: "coding",
    question: "Implement a Tabs component that switches content based on the active tab.",
    answer: `
\`\`\`jsx
import React, { useState } from 'react';

function Tabs({ children }) {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const handleClick = (e, newActiveTab) => {
    e.preventDefault();
    setActiveTab(newActiveTab);
  };

  return (
    <div>
      <ul className="tabs">
        {children.map((child) => (
          <li 
            key={child.props.label} 
            className={child.props.label === activeTab ? 'active' : ''} 
            onClick={(e) => handleClick(e, child.props.label)}
          >
            {child.props.label}
          </li>
        ))}
      </ul>
      <div className="tab-content">
        {children.map((child) => {
          if (child.props.label !== activeTab) return undefined;
          return child.props.children;
        })}
      </div>
    </div>
  );
}

// Usage
function App() {
  return (
    <Tabs>
      <div label="Tab 1">Content 1</div>
      <div label="Tab 2">Content 2</div>
      <div label="Tab 3">Content 3</div>
    </Tabs>
  );
}
\`\`\`
`
  },
  {
    id: slugify("Build an ErrorBoundary component."),
    type: "coding",
    question: "Build an ErrorBoundary component.",
    answer: `
\`\`\`jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}
export default ErrorBoundary;
\`\`\`
`
  },
  {
    id: slugify("Implement a useLocalStorage custom hook."),
    type: "coding",
    question: "Implement a useLocalStorage custom hook.",
    answer: `
\`\`\`jsx
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
export default useLocalStorage;
\`\`\`
`
  },
  {
    id: slugify("Create an Autocomplete/Typeahead component."),
    type: "coding",
    question: "Create an Autocomplete/Typeahead component.",
    answer: `
\`\`\`jsx
import React, { useState } from 'react';

function Autocomplete({ options }) {
  const [activeOption, setActiveOption] = useState(0);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [userInput, setUserInput] = useState('');

  const onChange = (e) => {
    const input = e.currentTarget.value;
    const newFilteredOptions = options.filter(
      (optionName) => optionName.toLowerCase().indexOf(input.toLowerCase()) > -1
    );
    setFilteredOptions(newFilteredOptions);
    setActiveOption(0);
    setShowOptions(true);
    setUserInput(input);
  };

  const onClick = (e) => {
    setActiveOption(0);
    setFilteredOptions([]);
    setShowOptions(false);
    setUserInput(e.currentTarget.innerText);
  };

  let optionList;
  if (showOptions && userInput) {
    if (filteredOptions.length) {
      optionList = (
        <ul className="options">
          {filteredOptions.map((optionName, index) => {
            let className;
            if (index === activeOption) {
              className = 'option-active';
            }
            return (
              <li className={className} key={optionName} onClick={onClick}>
                {optionName}
              </li>
            );
          })}
        </ul>
      );
    } else {
      optionList = (
        <div className="no-options">
          <em>No Option!</em>
        </div>
      );
    }
  }

  return (
    <div className="search">
      <input
        type="text"
        className="search-box"
        onChange={onChange}
        value={userInput}
      />
      {optionList}
    </div>
  );
}
export default Autocomplete;
\`\`\`
`
  },
  {
    id: slugify("Implement a Todo list with useReducer."),
    type: "coding",
    question: "Implement a Todo list with useReducer.",
    answer: `
\`\`\`jsx
import React, { useReducer, useState } from 'react';

const initialState = [];

function reducer(state, action) {
  switch (action.type) {
    case 'add':
      return [...state, { id: Date.now(), text: action.payload, completed: false }];
    case 'toggle':
      return state.map(todo =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    case 'delete':
      return state.filter(todo => todo.id !== action.payload);
    default:
      throw new Error();
  }
}

function TodoApp() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'add', payload: text });
    setText('');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </form>
      <ul>
        {state.map((todo) => (
          <li 
            key={todo.id} 
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            onClick={() => dispatch({ type: 'toggle', payload: todo.id })}
          >
            {todo.text}
            <button onClick={(e) => { e.stopPropagation(); dispatch({ type: 'delete', payload: todo.id }); }}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}
export default TodoApp;
\`\`\`
`
  },
  {
    id: slugify("Build a simple ThemeProvider component."),
    type: "coding",
    question: "Build a simple ThemeProvider component.",
    answer: `
\`\`\`jsx
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={\`theme-\${theme}\`}>{children}</div>
    </ThemeContext.Provider>
  );
};
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
    },
    {
        id: 'vue-directives',
        type: 'theoretical',
        question: 'What are Vue directives? Give examples (v-if, v-for, v-bind, v-on, v-model).',
        answer: `**Answer Guidance:**

- **Vue Directives:** Special attributes with the \`v-\` prefix. Their job is to reactively apply side effects to the DOM when the value of its expression changes.
- **Examples:**
  - **\`v-if\`, \`v-else-if\`, \`v-else\`:** Conditionally render a block.
  - **\`v-for\`:** Render a list of items based on an array.
  - **\`v-bind\`:** Reactively update an HTML attribute. (Shorthand: \`:\`)
  - **\`v-on\`:** Attach an event listener. (Shorthand: \`@\`)
  - **\`v-model\`:** Create two-way data binding on form inputs.
`
    },
    {
        id: "vue-reactivity-system",
        type: "theoretical",
        question: "Explain reactive data binding in Vue. How does Vue detect changes?",
        answer: `**Answer Guidance:**

- **Vue 3:** Uses JavaScript Proxies. When you define data in a component, Vue wraps it in a Proxy. When you access or modify a property, the proxy intercepts the operation, allowing Vue to track dependencies and trigger updates when data changes.
- **Vue 2:** Used \`Object.defineProperty\`. It iterated over all properties in \`data\` and converted them to getter/setters.
`
    },
    {
        id: 'vue-template-syntax',
        type: 'theoretical',
        question: 'What is the Vue template syntax?',
        answer: `**Answer Guidance:**

Vue uses an HTML-based template syntax that allows you to declaratively bind the rendered DOM to the underlying component instance's data. It includes text interpolation (\`{{...}}\`), attribute bindings (\`v-bind\`), and structural directives (\`v-if\`, \`v-for\`).
`
    },
    {
        id: 'computed-vs-watchers',
        type: 'theoretical',
        question: 'Describe computed properties and watchers. When would you use each?',
        answer: `**Answer Guidance:**

- **Computed Properties:** Declarative way to derive state from other state. They are cached based on their reactive dependencies. Use them when you need to calculate a value based on other properties.
- **Watchers:** Allow you to perform side effects in response to a data change (e.g., fetching data, manual DOM manipulation). Use them when you need to perform an action when a specific property changes.
`
    },
    {
        id: 'data-vs-props',
        type: 'theoretical',
        question: 'What is the difference between data and props in Vue?',
        answer: `**Answer Guidance:**

- **Props:** Used to pass data from a parent component to a child component. A child component should not mutate its props.
- **Data:** The private, reactive state of a component. It can be changed within the component.
`
    },
    {
        id: 'vue-component-communication',
        type: 'theoretical',
        question: 'How does Vue handle component communication? ($emit, $parent, $children, provide/inject, Vuex).',
        answer: `**Answer Guidance:**

- **Parent to Child:** Props.
- **Child to Parent:** Emitting events with \`$emit\`.
- **Provide/Inject:** For passing data through a deep component tree.
- **State Management Libraries (Pinia/Vuex):** For global state management.
`
    },
    {
        id: 'virtual-dom-vue',
        type: 'theoretical',
        question: 'What is the Virtual DOM in Vue? How does it work?',
        answer: `**Answer Guidance:**

Similar to React, Vue uses a Virtual DOM. When data changes, Vue creates a new VDOM tree, compares it with the old one, and calculates the most efficient way to update the real DOM.
`
    },
    {
        id: 'vue-reactivity-system',
        type: 'theoretical',
        question: "Explain Vue's reactivity system. (Vue 2 vs. Vue 3).",
        answer: `**Answer Guidance:**

- **Vue 2:** Used \`Object.defineProperty\` to track changes. This had limitations, such as not being able to detect new property additions.
- **Vue 3:** Uses modern JavaScript Proxies, which can intercept more operations and provide more robust and performant reactivity.
`
    },
    {
        id: 'vue-mixins-vs-composition',
        type: 'theoretical',
        question: 'What are Vue Mixins and how do they differ from Composition API?',
        answer: `**Answer Guidance:**

- **Mixins:** A way to distribute reusable functionalities for Vue components. However, they have drawbacks like property name collisions and unclear data sources.
- **Composition API:** The modern and preferred way to reuse logic. It solves the problems of mixins by allowing you to encapsulate logic in "composable" functions, which are more explicit and flexible.
`
    },
    {
        id: 'state-management-vue',
        type: 'theoretical',
        question: 'Discuss state management in Vue. (Vuex, Pinia).',
        answer: `**Answer Guidance:**

- **Pinia:** The official and recommended state management library for Vue 3. It's simple, type-safe, and modular.
- **Vuex:** The older official state management library. It's more verbose than Pinia and was primarily used with Vue 2.
`
    },
    {
        id: 'v-show-vs-v-if',
        type: 'theoretical',
        question: 'What is the difference between v-show and v-if?',
        answer: `**Answer Guidance:**

- **\`v-if\`:** "Real" conditional rendering. It ensures that the element and its children are destroyed and re-created when the condition changes.
- **\`v-show\`:** Toggles the element's CSS \`display\` property. The element is always rendered, just hidden or shown. Use \`v-show\` if you need to toggle something frequently.
`
    },
    {
        id: 'v-model',
        type: 'theoretical',
        question: 'Explain the v-model directive. How does it work with form elements?',
        answer: `**Answer Guidance:**

\`v-model\` is syntactic sugar for two-way binding. On an input, it's equivalent to binding the \`value\` and listening for the \`input\` event.
`
    },
    {
        id: 'scoped-css',
        type: 'theoretical',
        question: 'What are scoped CSS in Vue? What problem do they solve?',
        answer: `**Answer Guidance:**

When you add the \`scoped\` attribute to a \`<style>\` tag in a Vue component, the CSS will only apply to elements of the current component. It prevents styles from leaking out and affecting other components.
`
    },
    {
        id: 'vue-routing',
        type: 'theoretical',
        question: 'How do you handle routing in Vue? (Vue Router).',
        answer: `**Answer Guidance:**

- **Vue Router:** The official router for Vue.js. It allows you to map components to different URL routes.
`
    },
    {
        id: 'ssr-vue',
        type: 'theoretical',
        question: 'What is Server-Side Rendering (SSR) in Vue? (Nuxt.js).',
        answer: `**Answer Guidance:**

- **SSR in Vue:** Rendering Vue components on the server to HTML.
- **Nuxt.js:** A popular framework built on top of Vue that provides built-in SSR capabilities.
`
    },
    {
        id: 'vue-slots',
        type: 'theoretical',
        question: 'What are Slots in Vue? Explain named slots and scoped slots.',
        answer: `**Answer Guidance:**

- **Slots:** A mechanism for content distribution. They allow you to pass template fragments from a parent component into a child component.
- **Named Slots:** Allow you to pass multiple content fragments to a child component.
- **Scoped Slots:** Allow the child component to pass data back up to the parent's slot content.
`
    },
    {
        id: 'vue-performance',
        type: 'theoretical',
        question: 'How do you optimize Vue applications for performance? (Lazy loading, code splitting, memoization).',
        answer: `**Answer Guidance:**

- **Lazy Loading:** Loading components or routes only when they are needed.
- **Code Splitting:** Splitting your code into smaller chunks that can be loaded on demand.
- **Memoization:** Caching the results of expensive calculations (e.g., with computed properties).
`
    },
    {
        id: 'vue-custom-directives',
        type: 'theoretical',
        question: 'Explain the concept of directives. Can you create custom directives?',
        answer: `**Answer Guidance:**

- **Directives:** Special attributes with the \`v-\` prefix that apply reactive side effects.
- **Custom Directives:** Yes, you can create your own custom directives to encapsulate DOM manipulations.
`
    }
  ,
  {
    id: "script-setup-vs-setup",
    type: "theoretical",
    question: "What is the difference between setup() and <script setup>?",
    answer: `**Answer Guidance:**\n\n- **\`setup()\`:** The traditional entry point for Composition API. You must manually return everything you want to expose to the template.\n- **\`<script setup>\`:** Syntactic sugar (compile-time macro) for using Composition API. Top-level bindings are automatically exposed to the template. It's more concise and provides better runtime performance and type inference.`
  },
  {
    id: "vue-teleport",
    type: "theoretical",
    question: "What is Teleport in Vue 3 and when should you use it?",
    answer: `**Answer Guidance:**\n\n- **Teleport:** Allows you to render a component's template content to a DOM node that exists outside the DOM hierarchy of that component (e.g., to \`<body>\`).\n- **Use Case:** Modals, Notifications, Tooltips, where you want to break out of the parent's \`z-index\` or \`overflow: hidden\` constraints.`
  },
  {
    id: "vue-suspense",
    type: "theoretical",
    question: "What is Suspense in Vue 3?",
    answer: `**Answer Guidance:**\n\n- **Suspense:** A built-in component that allows you to orchestrate async dependencies in a component tree. It can render a loading state (fallback) while waiting for multiple nested async components to resolve.`
  },
  {
    id: "vue-provide-inject-detail",
    type: "theoretical",
    question: "Detailed explanation of Provide/Inject. Is it reactive?",
    answer: `**Answer Guidance:**\n\n- **Purpose:** Prop drilling solution. Parent provides data, any descendant can inject it.\n- **Reactivity:** By default, if you provide a non-ref value, it's not reactive. To make it reactive, provide a \`ref\` or \`reactive\` object.`
  },
  {
    id: "vue-dynamic-components",
    type: "theoretical",
    question: "How do Dynamic Components work? (<component :is>).",
    answer: `**Answer Guidance:**\n\n- **Syntax:** \`<component :is="currentComponent" />\`\n- **Usage:** Switches between components based on the value of \`is\`. Useful for tabbed interfaces or conditional views where the component type isn't known until runtime.`
  },
  {
    id: "vue-keep-alive",
    type: "theoretical",
    question: "What is <KeepAlive>? usage and lifecycle hooks?",
    answer: `**Answer Guidance:**\n\n- **Purpose:** Caches inactive component instances instead of destroying them.\n- **Hooks:** \`onActivated\` (called when inserted into DOM) and \`onDeactivated\` (called when removed but cached).`
  },
  {
    id: "vue-next-tick",
    type: "theoretical",
    question: "What is nextTick() and why is it needed?",
    answer: `**Answer Guidance:**\n\n- **Reactivity:** Vue updates the DOM asynchronously. When you change data, the DOM isn't updated immediately.\n- **nextTick():** A utility to wait for the next DOM update cycle. Use it if you need to perform an operation on the DOM *after* it has updated.`
  },
  {
    id: "vue-async-components",
    type: "theoretical",
    question: "What are Async Components?",
    answer: `**Answer Guidance:**\n\n- **Definition:** Components that are loaded lazily from the server only when needed.\n- **Syntax:** \`defineAsyncComponent(() => import('./MyComponent.vue'))\``
  },
  {
    id: "v-memo-directive",
    type: "theoretical",
    question: "What is the v-memo directive in Vue 3.2+?",
    answer: `**Answer Guidance:**\n\n- **v-memo:** Memorizes a sub-tree of the template. It skips VDOM diffing if assumptions (dependencies passed to it) haven't changed. Similar to React.memo but for template chunks.`
  },
  {
    id: "vue-prop-validation",
    type: "theoretical",
    question: "How do you validate props in Vue?",
    answer: `**Answer Guidance:**\n\n- In options API or \`defineProps\`, you can specify: \`type\`, \`required\`, \`default\`, and \`validator\` function.\n- **Runtime Check:** Vue warns in the console if validation fails.`
  },
  {
    id: "vue-scoped-styles-deep",
    type: "theoretical",
    question: "How does 'scoped' style work under the hood? What is :deep()?",
    answer: `**Answer Guidance:**\n\n- **Scoped:** Vue adds a unique attribute (data-v-hash) to elements and CSS selectors.\n- **:deep():** A pseudo-class selector to affect child components' styles from a scoped parent style block.`
  },
  {
    id: "vue-plugins",
    type: "theoretical",
    question: "What is a Vue Plugin? How do you create one?",
    answer: `**Answer Guidance:**\n\n- **Plugin:** Self-contained code that adds global-level functionality (e.g., Vue Router, Pinia).\n- **Structure:** An object with an \`install(app, options)\` method.`
  },
  {
    id: "vue-transition-group",
    type: "theoretical",
    question: "Difference between <Transition> and <TransitionGroup>?",
    answer: `**Answer Guidance:**\n\n- **Transition:** For single element/component entering/leaving.\n- **TransitionGroup:** For a list of elements (v-for). It renders a real element (tag prop) and handles moving animations using the FLIP technique.`
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
    {
        id: slugify("Implement a component that fetches data from an API and displays it in Vue. Include loading and error states."),
        type: "coding",
        question: "Implement a component that fetches data from an API and displays it. Include loading and error states.",
        answer: `
\`\`\`vue
<template>
  <div>
    <p v-if="loading">Loading...</p>
    <p v-if="error">Error: {{ error.message }}</p>
    <div v-if="data">
      <h2>{{ data.title }}</h2>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const data = ref(null);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    if (!response.ok) throw new Error('Failed to fetch');
    data.value = await response.json();
  } catch (e) {
    error.value = e;
  } finally {
    loading.value = false;
  }
});
</script>
\`\`\`
`
    },
    {
        id: slugify("Create a reusable button component in Vue with different variants (primary, secondary)."),
        type: "coding",
        question: "Create a reusable button component in Vue with different variants (primary, secondary).",
        answer: `
\`\`\`vue
<template>
  <button :class="variantClass">
    <slot></slot>
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'primary'
  }
});

const variantClass = computed(() => {
  return {
    'bg-blue-500 text-white': props.variant === 'primary',
    'bg-gray-500 text-white': props.variant === 'secondary'
  };
});
</script>
\`\`\`
`
    },
    {
        id: slugify("Build a modal component in Vue that can be toggled open and closed."),
        type: "coding",
        question: "Build a modal component in Vue that can be toggled open and closed.",
        answer: `
\`\`\`vue
<template>
  <div v-if="isOpen" class="modal-overlay">
    <div class="modal-content">
      <slot></slot>
      <button @click="$emit('close')">Close</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isOpen: Boolean
});
defineEmits(['close']);
</script>
\`\`\`
`
    },
    {
        id: slugify("Implement a list component in Vue that renders a dynamic list of items, with functionality to add/remove items."),
        type: "coding",
        question: "Implement a list component in Vue that renders a dynamic list of items, with functionality to add/remove items.",
        answer: `
\`\`\`vue
<template>
  <div>
    <input v-model="newItem" @keyup.enter="addItem" />
    <button @click="addItem">Add</button>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        {{ item }}
        <button @click="removeItem(index)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const items = ref(['Apple', 'Banana']);
const newItem = ref('');

const addItem = () => {
  if (newItem.value) {
    items.value.push(newItem.value);
    newItem.value = '';
  }
};

const removeItem = (index) => {
  items.value.splice(index, 1);
};
</script>
\`\`\`
`
    },
    {
        id: slugify("Create a toggle switch component in Vue."),
        type: "coding",
        question: "Create a toggle switch component.",
        answer: `
\`\`\`vue
<template>
  <button @click="isOn = !isOn">
    {{ isOn ? 'ON' : 'OFF' }}
  </button>
</template>

<script setup>
import { ref } from 'vue';
const isOn = ref(false);
</script>
\`\`\`
`
    },
    {
        id: slugify("Build a pagination component in Vue for a list of items."),
        type: "coding",
        question: "Build a pagination component in Vue for a list of items.",
        answer: `
\`\`\`vue
<template>
  <div>
    <button 
      v-for="page in totalPages" 
      :key="page" 
      @click="$emit('page-change', page)"
    >
      {{ page }}
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  totalItems: Number,
  itemsPerPage: Number,
});

const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage));

defineEmits(['page-change']);
</script>
\`\`\`
`
    },
    {
        id: slugify("Implement a search filter in Vue for a list of items."),
        type: "coding",
        question: "Implement a search filter in Vue for a list of items.",
        answer: `
\`\`\`vue
<template>
  <div>
    <input v-model="searchTerm" placeholder="Search..." />
    <ul>
      <li v-for="item in filteredItems" :key="item">{{ item }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const searchTerm = ref('');
const allItems = ref(['Apple', 'Banana', 'Cherry']);

const filteredItems = computed(() => 
  allItems.value.filter(item => 
    item.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
);
</script>
\`\`\`
`
    },
    {
        id: slugify("Create a simple quiz application in Vue with multiple questions and scoring."),
        type: "coding",
        question: "Create a simple quiz application in Vue with multiple questions and scoring.",
        answer: `
\`\`\`vue
<template>
  <div v-if="!isFinished">
    <h2>{{ currentQuestion.question }}</h2>
    <input v-model="userAnswer" />
    <button @click="submitAnswer">Submit</button>
  </div>
  <h2 v-else>Quiz Over! Score: {{ score }}</h2>
</template>

<script setup>
import { ref, computed } from 'vue';

const questions = ref([
  { question: 'What is 2 + 2?', answer: '4' },
  { question: 'Capital of France?', answer: 'Paris' }
]);
const currentIndex = ref(0);
const score = ref(0);
const userAnswer = ref('');

const currentQuestion = computed(() => questions.value[currentIndex.value]);
const isFinished = computed(() => currentIndex.value >= questions.value.length);

const submitAnswer = () => {
  if (userAnswer.value.toLowerCase() === currentQuestion.value.answer.toLowerCase()) {
    score.value++;
  }
  userAnswer.value = '';
  currentIndex.value++;
};
</script>
\`\`\`
`
    },
    {
        id: slugify("Build a form in Vue with validation using custom logic."),
        type: "coding",
        question: "Build a form with validation using Vue's built-in validation or custom logic.",
        answer: `
\`\`\`vue
<template>
  <form @submit.prevent="submitForm">
    <input v-model="email" />
    <p v-if="error">{{ error }}</p>
    <button type="submit">Submit</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const error = ref('');

const submitForm = () => {
  if (!/\\S+@\\S+\\.\\S+/.test(email.value)) {
    error.value = 'Invalid email';
  } else {
    error.value = '';
    alert('Submitted');
  }
};
</script>
\`\`\`
`
    },
    {
        id: slugify("Implement a component in Vue that listens to window resize events and updates its data."),
        type: "coding",
        question: "Implement a component that listens to window resize events and updates its data.",
        answer: `
\`\`\`vue
<template>
  <p>Width: {{ width }}</p>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const width = ref(window.innerWidth);
const onResize = () => { width.value = window.innerWidth; };

onMounted(() => window.addEventListener('resize', onResize));
onUnmounted(() => window.removeEventListener('resize', onResize));
</script>
\`\`\`
`
    },
    {
        id: slugify("Create a component in Vue that uses provide/inject to share data."),
        type: "coding",
        question: "Create a component that uses provide/inject to share data between components without prop drilling.",
        answer: `
\`\`\`vue
// Parent.vue
<template>
  <Child />
</template>
<script setup>
import { provide } from 'vue';
import Child from './Child.vue';
provide('theme', 'dark');
</script>

// Child.vue
<template>
  <p>Theme: {{ theme }}</p>
</template>
<script setup>
import { inject } from 'vue';
const theme = inject('theme');
</script>
\`\`\`
`
    },
    {
        id: slugify("Build a component in Vue that fetches data and caches it."),
        type: "coding",
        question: "Build a component that fetches data and caches it using a computed property or watcher.",
        answer: `
\`\`\`vue
<template>
  <!-- ... -->
</template>

<script setup>
import { ref, computed } from 'vue';

const cache = new Map();
const userId = ref(1);

const userData = computed(async () => {
    if (cache.has(userId.value)) {
        return cache.get(userId.value);
    }
    const res = await fetch(\`.../\${userId.value}\`);
    const data = await res.json();
    cache.set(userId.value, data);
    return data;
});
</script>
\`\`\`
`
    },
    {
        id: slugify("Implement a component in Vue that uses v-once."),
        type: "coding",
        question: "Implement a component that uses v-once or a memoization technique to optimize rendering for a static list item.",
        answer: `
\`\`\`vue
<template>
  <p v-once>This will never change: {{ message }}</p>
</template>

<script setup>
import { ref } from 'vue';
const message = ref('Initial message');
</script>
\`\`\`
`
    },
    {
        id: slugify("Create a custom directive in Vue."),
        type: "coding",
        question: "Create a custom directive (e.g., for lazy loading images).",
        answer: `
\`\`\`vue
<template>
  <img v-lazy-load="'image-url.jpg'" />
</template>

<script setup>
const vLazyLoad = {
  mounted: (el, binding) => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        el.src = binding.value;
        observer.unobserve(el);
      }
    });
    observer.observe(el);
  }
};
</script>
\`\`\`
`
    },
    {
        id: slugify("Build a dropdown component in Vue with keyboard navigation."),
        type: "coding",
        question: "Build a dropdown component with keyboard navigation.",
        answer: `
\`\`\`vue
<template>
  <div>
    <button @click="isOpen = !isOpen">Toggle</button>
    <ul v-if="isOpen" @keydown="onKeydown">
      <li 
        v-for="(option, i) in options" 
        :key="option" 
        :class="{ focused: i === focusedIndex }"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const options = ['A', 'B', 'C'];
const isOpen = ref(false);
const focusedIndex = ref(-1);

const onKeydown = (e) => {
  if (e.key === 'ArrowDown') {
    focusedIndex.value = (focusedIndex.value + 1) % options.length;
  } else if (e.key === 'ArrowUp') {
    focusedIndex.value = (focusedIndex.value - 1 + options.length) % options.length;
  }
};
</script>
\`\`\`
`
    },
    {
        id: slugify("Implement a drag-and-drop functionality in Vue for list items."),
        type: "coding",
        question: "Implement a drag-and-drop functionality for list items.",
        answer: `
\`\`\`vue
<template>
  <ul>
    <li 
      v-for="(item, index) in items" 
      :key="item" 
      draggable="true" 
      @dragstart="dragStart(index)" 
      @dragover.prevent 
      @drop="drop(index)"
    >
      {{ item }}
    </li>
  </ul>
</template>

<script setup>
import { ref } from 'vue';
const items = ref(['A', 'B', 'C']);
const draggingIndex = ref(null);

const dragStart = (index) => { draggingIndex.value = index; };
const drop = (index) => {
  const item = items.value.splice(draggingIndex.value, 1)[0];
  items.value.splice(index, 0, item);
};
</script>
\`\`\`
`
    },
    {
        id: slugify("Create a component in Vue that displays a progress bar."),
        type: "coding",
        question: "Create a component that displays a progress bar based on some value.",
        answer: `
\`\`\`vue
<template>
  <div class="progress-container">
    <div class="progress-bar" :style="{ width: value + '%' }"></div>
  </div>
</template>

<script setup>
defineProps({ value: Number });
</script>
\`\`\`
`
    },
    {
        id: slugify("Build a simple chat interface in Vue where messages appear in real-time."),
        type: "coding",
        question: "Build a simple chat interface where messages appear in real-time (simulate with setInterval).",
        answer: `
\`\`\`vue
<template>
  <div>
    <ul>
      <li v-for="(msg, i) in messages" :key="i">{{ msg }}</li>
    </ul>
    <input v-model="newMessage" @keyup.enter="sendMessage" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const messages = ref([]);
const newMessage = ref('');

onMounted(() => {
  setInterval(() => {
    messages.value.push('Server message');
  }, 3000);
});

const sendMessage = () => {
  messages.value.push(newMessage.value);
  newMessage.value = '';
};
</script>
\`\`\`
`
    }
  ,
  {
    id: slugify("Build a mouse tracker composable (useMouse)."),
    type: "coding",
    question: "Build a mouse tracker composable (useMouse) that tracks x/y coordinates.",
    answer: `
\`\`\`vue
// useMouse.js
import { ref, onMounted, onUnmounted } from 'vue'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  return { x, y }
}

// Component.vue
<script setup>
import { useMouse } from './useMouse'
const { x, y } = useMouse()
</script>
<template>Mouse: {{x}}, {{y}}</template>
\`\`\`
`
  },
  {
    id: slugify("Create a custom directive v-focus that focuses the input on mount."),
    type: "coding",
    question: "Create a custom directive v-focus that focuses the input on mount.",
    answer: `
\`\`\`vue
<template>
  <input v-focus />
</template>

<script setup>
const vFocus = {
  mounted: (el) => el.focus()
}
</script>
\`\`\`
`
  },
  {
    id: slugify("Implement Infinite Scroll using IntersectionObserver in Vue."),
    type: "coding",
    question: "Implement Infinite Scroll using IntersectionObserver in Vue.",
    answer: `
\`\`\`vue
<template>
  <ul><li v-for="i in items" :key="i">{{i}}</li></ul>
  <div ref="trigger">Loading more...</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const items = ref([1,2,3,4,5]);
const trigger = ref(null);

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    if(entries[0].isIntersecting) {
      loadMore();
    }
  });
  observer.observe(trigger.value);
});

const loadMore = () => {
    const len = items.value.length;
    for(let i=1; i<=5; i++) items.value.push(len + i);
};
</script>
\`\`\`
`
  },
  {
    id: slugify("Build a Tree View component that recursively renders itself."),
    type: "coding",
    question: "Build a Tree View component that recursively renders itself.",
    answer: `
\`\`\`vue
<template>
  <li>
    <div @click="isOpen = !isOpen">
      {{ item.name }}
      <span v-if="isFolder">[{{ isOpen ? '-' : '+' }}]</span>
    </div>
    <ul v-if="isFolder && isOpen">
      <TreeItem v-for="child in item.children" :key="child.name" :item="child" />
    </ul>
  </li>
</template>

<script setup>
import { ref, computed } from 'vue';
const props = defineProps({ item: Object });
const isOpen = ref(false);
const isFolder = computed(() => props.item.children && props.item.children.length);
</script>

<script>
// For recursive calls in older syntax or if separate component
export default { name: 'TreeItem' }
</script>
\`\`\`
`
  },
  {
    id: slugify("Setup a simple Pinia store for counter and use it in a component."),
    type: "coding",
    question: "Setup a simple Pinia store for counter and use it in a component.",
    answer: `
\`\`\`js
// store.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  actions: {
    increment() { this.count++ }
  }
})

// Component.vue
<script setup>
import { useCounterStore } from './store'
const store = useCounterStore()
</script>

<template>
  <button @click="store.increment">{{ store.count }}</button>
</template>
\`\`\`
`
  },
  {
    id: slugify("Create a Modal using Vue Teleport."),
    type: "coding",
    question: "Create a Modal using Vue Teleport so it renders inside body.",
    answer: `
\`\`\`vue
<template>
  <button @click="open = true">Open Modal</button>
  <Teleport to="body">
    <div v-if="open" class="modal">
      <p>Hello from body!</p>
      <button @click="open = false">Close</button>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue';
const open = ref(false);
</script>
\`\`\`
`
  },
  {
    id: slugify("Build a Renderless Component that handles toggle logic using scoped slots."),
    type: "coding",
    question: "Build a Renderless Component that handles toggle logic using scoped slots.",
    answer: `
\`\`\`vue
<!-- ToggleProvider.vue -->
<template>
  <slot :on="on" :toggle="toggle"></slot>
</template>
<script setup>
import { ref } from 'vue';
const on = ref(false);
const toggle = () => on.value = !on.value;
</script>

<!-- Parent.vue -->
<ToggleProvider v-slot="{ on, toggle }">
  <button @click="toggle">{{ on ? 'ON' : 'OFF' }}</button>
</ToggleProvider>
\`\`\`
`
  },
  {
    id: slugify("Implement a Dynamic Form Builder based on a JSON schema."),
    type: "coding",
    question: "Implement a Dynamic Form Builder based on a JSON schema.",
    answer: `
\`\`\`vue
<template>
  <form>
    <div v-for="field in schema" :key="field.name">
      <label>{{ field.label }}</label>
      <component 
        :is="field.type === 'text' ? 'input' : 'select'" 
        v-model="model[field.name]"
      >
         <option v-if="field.type==='select'" v-for="opt in field.options" :value="opt">{{opt}}</option>
      </component>
    </div>
  </form>
</template>

<script setup>
import { reactive } from 'vue';
const schema = [
  { name: 'username', label: 'Username', type: 'text' },
  { name: 'role', label: 'Role', type: 'select', options: ['Admin', 'User'] }
];
const model = reactive({ username: '', role: 'User' });
</script>
\`\`\`
`
  },
  {
    id: slugify("Create a Skeleton Loader component."),
    type: "coding",
    question: "Create a Skeleton Loader component.",
    answer: `
\`\`\`vue
<template>
  <div class="skeleton" :style="{ width: width, height: height }"></div>
</template>

<style scoped>
.skeleton {
  background: #eee;
  animation: pulse 1.5s infinite;
}
@keyframes pulse {
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
}
</style>

<script setup>
defineProps({ width: String, height: String });
</script>
\`\`\`
`
  },
  {
    id: slugify("Implement Image Lazy Loader using IntersectionObserver in a directive."),
    type: "coding",
    question: "Implement Image Lazy Loader using IntersectionObserver in a directive.",
    answer: `
\`\`\`js
const vLazy = {
  mounted: (el, binding) => {
    const observer = new IntersectionObserver((entries) => {
      if(entries[0].isIntersecting) {
        el.src = binding.value;
        observer.unobserve(el);
      }
    });
    observer.observe(el);
  }
};
\`\`\`
`
  },
  {
    id: slugify("Build a 'Click Outside' directive to close a dropdown."),
    type: "coding",
    question: "Build a 'Click Outside' directive to close a dropdown.",
    answer: `
\`\`\`js
const vClickOutside = {
  mounted(el, binding) {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value();
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted(el) {
    document.body.removeEventListener('click', el.clickOutsideEvent);
  }
};
\`\`\`
`
  },
  {
    id: slugify("Create a simple virtual scroller (renders only visible items)."),
    type: "coding",
    question: "Create a simple virtual scroller (renders only visible items).",
    answer: `
\`\`\`vue
<template>
  <div class="viewport" @scroll="onScroll" :style="{ height: viewportHeight + 'px', overflowY: 'auto' }">
    <div :style="{ height: totalHeight + 'px', position: 'relative' }">
      <div v-for="item in visibleItems" :key="item.id" :style="{ top: item.top + 'px', position: 'absolute', height: itemHeight + 'px' }">
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
const props = defineProps({ items: Array, itemHeight: Number, viewportHeight: Number });
const scrollTop = ref(0);

const totalHeight = computed(() => props.items.length * props.itemHeight);
const startIndex = computed(() => Math.floor(scrollTop.value / props.itemHeight));
const endIndex = computed(() => Math.min(props.items.length, startIndex.value + Math.ceil(props.viewportHeight / props.itemHeight)));

const visibleItems = computed(() => {
  return props.items.slice(startIndex.value, endIndex.value + 1).map((item, i) => ({
    ...item,
    top: (startIndex.value + i) * props.itemHeight
  }));
});

const onScroll = (e) => scrollTop.value = e.target.scrollTop;
</script>
\`\`\`
`
  },
  {
    id: slugify("Implement a reusable Notification Toast component."),
    type: "coding",
    question: "Implement a reusable Notification Toast component.",
    answer: `
\`\`\`vue
<template>
  <div class="toast" v-if="visible">{{ message }}</div>
</template>

<script setup>
import { ref } from 'vue';
const visible = ref(false);
const message = ref('');

const show = (msg) => {
  message.value = msg;
  visible.value = true;
  setTimeout(() => visible.value = false, 3000);
}
defineExpose({ show });
</script>

<style scoped>
.toast { position: fixed; bottom: 20px; right: 20px; background: #333; color: white; padding: 10px; }
</style>
\`\`\`
`
  },
  {
    id: slugify("Build a generic Data Table component with sorting."),
    type: "coding",
    question: "Build a generic Data Table component with sorting.",
    answer: `
\`\`\`vue
<template>
  <table>
    <thead>
      <tr>
        <th v-for="col in columns" @click="sort(col.key)">{{ col.label }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in sortedData" :key="row.id">
        <td v-for="col in columns">{{ row[col.key] }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref, computed } from 'vue';
const props = defineProps({ data: Array, columns: Array });
const sortKey = ref('');
const sortOrder = ref(1);

const sort = (key) => {
  if (sortKey.value === key) sortOrder.value *= -1;
  else { sortKey.value = key; sortOrder.value = 1; }
};

const sortedData = computed(() => {
  if (!sortKey.value) return props.data;
  return [...props.data].sort((a, b) => {
    return (a[sortKey.value] > b[sortKey.value] ? 1 : -1) * sortOrder.value;
  });
});
</script>
\`\`\`
`
  }
];

const vuePath: Topic[] = [
  { id: "vue-theoretical", title: "Theoretical Questions", questions: vueTheoretical },
  { id: "vue-coding", title: "Coding Questions", questions: vueCoding },
];

const systemDesignTheoretical: Question[] = [
  {
    id: "what-is-system-design",
    type: "theoretical",
    question: "What is System Design? Explain its purpose and key principles.",
    answer: `**Answer Guidance:**

- **What is System Design?**
  - System design is the process of defining the architecture, components, modules, interfaces, and data for a system to satisfy specified requirements. It's about making high-level choices that will dictate how the system is built.

- **Purpose of System Design:**
  - To build systems that are **scalable** (can handle growing amounts of work), **reliable** (operate correctly and consistently), and **maintainable** (easy to fix and update).
  - To manage the complexity of large systems by breaking them down into smaller, manageable parts.
  - To satisfy both functional (what the system does) and non-functional (how the system does it, e.g., performance, availability, security) requirements.

- **Types of System Design Questions:**
  - **Product Design:** Designing a specific product like a URL shortener, a Twitter feed, or a chat application. These questions test your ability to translate requirements into a technical design.
  - **Concept Design:** Designing a generic system component like a rate limiter, a notification system, or a caching strategy. These questions test your understanding of fundamental architectural patterns.

- **Key Principles:**
  - **Scalability:** The ability of a system to handle increased load. (Horizontal vs. Vertical scaling).
  - **Availability:** The percentage of time a system is operational. Often achieved through redundancy and failover.
  - **Performance:** The speed and responsiveness of the system. (Latency, throughput).
  - **Consistency:** Ensuring that all clients see the same data at the same time. (Strong vs. Eventual consistency).
  - **Durability:** Ensuring that data, once committed, is not lost.
  - **Decoupling:** Reducing the dependencies between components, often using message queues or APIs.
`
  },
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
    },
    {
        id: "chat-application",
        type: "theoretical",
        question: "Design a chat application. (Consider real-time communication, user presence, message history).",
        answer: `**Answer Guidance:**

- **Real-time Communication:** WebSockets are essential for instant message delivery.
- **User Presence:** A system to track if a user is online or offline. This can be done by maintaining a connection status in a cache like Redis.
- **Message History:** Store messages in a database. For large-scale apps, a NoSQL database like Cassandra is a good choice for its write performance.
- **Scalability:** Use load balancers to distribute WebSocket connections across multiple servers.
`
    },
    {
        id: "e-commerce-platform",
        type: "theoretical",
        question: "Design an e-commerce platform. (Consider product catalog, user accounts, shopping cart, order processing, payments).",
        answer: `**Answer Guidance:**

- **Product Catalog:** A service to manage product information.
- **User Accounts:** A service for user authentication and profile management.
- **Shopping Cart:** A service to manage users' shopping carts. Carts can be stored temporarily in a cache like Redis.
- **Order Processing:** A service to handle orders, which involves coordinating with inventory, payment, and shipping services.
- **Payments:** Integrate with a third-party payment gateway like Stripe or PayPal.
`
    },
    {
        id: "rate-limiter",
        type: "theoretical",
        question: "Design a rate limiter. (Consider how to limit API requests from users or services).",
        answer: `**Answer Guidance:**

- **Algorithm:** Token bucket or leaky bucket algorithms are common.
- **Storage:** Use a fast in-memory store like Redis to keep track of request counts for each user/IP.
- **Implementation:** A rate limiter can be implemented as a middleware in your API gateway.
`
    },
    {
        id: "notification-system",
        type: "theoretical",
        question: "Design a notification system. (Consider push notifications, email notifications, in-app notifications).",
        answer: `**Answer Guidance:**

- **Components:**
  - **Notification Service:** An API to send notifications.
  - **Message Queue:** To handle the asynchronous sending of notifications.
  - **Third-party Services:** For sending push notifications (e.g., Firebase Cloud Messaging) and emails (e.g., SendGrid).
`
    },
    {
        id: "collaborative-editor",
        type: "theoretical",
        question: "Design a real-time collaborative document editor. (e.g., Google Docs).",
        answer: `**Answer Guidance:**

- **Collaboration:** Use Operational Transformation (OT) or Conflict-free Replicated Data Types (CRDTs) to resolve concurrent edits from multiple users.
- **Communication:** WebSockets for real-time updates.
- **Backend:** A server to manage document state and broadcast changes.
`
    },
    {
        id: "background-jobs",
        type: "theoretical",
        question: "Design a system for processing background jobs. (e.g., sending emails, generating reports).",
        answer: `**Answer Guidance:**

- **Components:**
  - **Message Queue:** (e.g., RabbitMQ, SQS) to queue up jobs.
  - **Workers:** A pool of servers that pull jobs from the queue and process them.
- **Benefits:** Decouples long-running tasks from the main application, improving responsiveness.
`
    },
    {
        id: "social-media-profile",
        type: "theoretical",
        question: "Design a social media platform's user profile page. (Consider data fetching, rendering, performance).",
        answer: `**Answer Guidance:**

- **Data Fetching:** Aggregate data from multiple services (user info, posts, followers).
- **Rendering:** Server-side rendering (SSR) for initial load performance and SEO.
- **Performance:** Use a CDN for images, and cache profile data.
`
    },
    {
        id: "image-uploading",
        type: "theoretical",
        question: "Design a system for image uploading and processing. (Consider storage, resizing, formats, CDN).",
        answer: `**Answer Guidance:**

- **Storage:** Use a cloud storage service like Amazon S3 or Google Cloud Storage.
- **Processing:** Use background workers to process images (resizing, watermarking).
- **CDN:** Serve images from a CDN for fast delivery.
`
    },
    {
        id: "handling-millions-of-users",
        type: "theoretical",
        question: "How would you design a system to handle millions of concurrent users?",
        answer: `**Answer Guidance:**

- **Horizontal Scaling:** Add more servers.
- **Load Balancing:** Distribute traffic across servers.
- **Caching:** Use caching at multiple levels (database, API, CDN).
- **Asynchronous Processing:** Use message queues for background jobs.
- **Database Scaling:** Use sharding and read replicas.
`
    },
    {
        id: "caching-strategies",
        type: "theoretical",
        question: "Discuss strategies for caching data to improve performance.",
        answer: `**Answer Guidance:**

- **Cache-Aside:** The application is responsible for reading and writing from the cache.
- **Read-Through:** The cache is responsible for reading data from the database.
- **Write-Through:** Data is written to the cache and the database at the same time.
- **Write-Back:** Data is written to the cache, and the cache writes it to the database later.
`
    },
    {
        id: "horizontal-vs-vertical-scaling",
        type: "theoretical",
        question: "Explain the concept of horizontal vs. vertical scaling.",
        answer: `**Answer Guidance:**

- **Vertical Scaling:** Increasing the resources of a single server (e.g., more CPU, RAM).
- **Horizontal Scaling:** Adding more servers to a pool of resources.
`
    },
    {
        id: "microservices-vs-monolith",
        type: "theoretical",
        question: "What are microservices? What are their pros and cons compared to a monolithic architecture?",
        answer: `**Answer Guidance:**

- **Monolith:** A single, unified application.
- **Microservices:** An architectural style that structures an application as a collection of small, independent services.
- **Pros of Microservices:** Scalability, flexibility, independent deployment.
- **Cons of Microservices:** Complexity, operational overhead.
`
    },
    {
        id: "api-gateway",
        type: "theoretical",
        question: "How would you design an API gateway for a set of microservices?",
        answer: `**Answer Guidance:**

An API gateway is a single entry point for all clients. It can handle routing, authentication, rate limiting, and other cross-cutting concerns.
`
    },
    {
        id: "data-consistency",
        type: "theoretical",
        question: "Discuss strategies for ensuring data consistency in a distributed system.",
        answer: `**Answer Guidance:**

- **Strong Consistency:** All clients see the same data at the same time. This can be slow.
- **Eventual Consistency:** Over time, all replicas of the data will become consistent. This is often a good trade-off for performance.
`
    },
    {
        id: "search-engine-design",
        type: "theoretical",
        question: "How would you design a search engine or recommendation system?",
        answer: `**Answer Guidance:**

- **Search Engine:** Involves web crawling, indexing (e.g., using Elasticsearch), and ranking.
- **Recommendation System:** Can use collaborative filtering (based on user behavior) or content-based filtering (based on item attributes).
`
    },
    {
        id: "load-balancers",
        type: "theoretical",
        question: "What are load balancers? What are different types of load balancing?",
        answer: `**Answer Guidance:**

- **Load Balancer:** A device that distributes network or application traffic across a number of servers.
- **Types:** Round Robin, Least Connections, IP Hash.
`
    },
    {
        id: "high-availability-design",
        type: "theoretical",
        question: "How would you approach designing a system that needs to be highly available and fault-tolerant?",
        answer: `**Answer Guidance:**

- **Redundancy:** Have multiple copies of each component.
- **Failover:** Automatically switch to a redundant component if one fails.
- **Monitoring and Alerting:** To detect failures quickly.
`
    },
    {
        id: "authentication-authorization",
        type: "theoretical",
        question: "Describe how you would implement authentication and authorization in a web application.",
        answer: `**Answer Guidance:**

- **Authentication:** Verifying who a user is. Common methods include passwords, OAuth, and JWTs.
- **Authorization:** Determining what an authenticated user is allowed to do. This can be managed with roles and permissions.
`
    }
  ,
  {
    id: "pacelc-theorem",
    type: "theoretical",
    question: "Explain the PACELC theorem. How does it extend CAP?",
    answer: `**Answer Guidance:**\n\n- **PACELC:** An extension of CAP. It states that in case of **P**artition (P), one has to choose between **A**vailability (A) and **C**onsistency (C) (as in CAP), but **E**lse (E) (even when the system is running normally without partitions), one has to choose between **L**atency (L) and **C**onsistency (C).\n- **Implication:** Even in healthy systems, strong consistency comes at the cost of higher latency.`
  },
  {
    id: "bloom-filters",
    type: "theoretical",
    question: "What is a Bloom Filter? When is it used?",
    answer: `**Answer Guidance:**\n\n- **Bloom Filter:** A probabilistic data structure used to test whether an element is a member of a set.\n- **Properties:** False positives are possible, but false negatives are not. Very space-efficient.\n- **Use Cases:** Checking if a username is taken, blocking malicious URLs (browser check), caching (to avoid checking disk for non-existent keys).`
  },
  {
    id: "quorum-consensus",
    type: "theoretical",
    question: "Explain Quorum (N, R, W) in distributed systems.",
    answer: `**Answer Guidance:**\n\n- **N:** Total number of replicas.\n- **R:** Number of replicas that must acknowledge a read.\n- **W:** Number of replicas that must acknowledge a write.\n- **Strong Consistency:** R + W > N. This ensures that at least one node in the read set has the latest write.`
  },
  {
    id: "gossip-protocol",
    type: "theoretical",
    question: "What is a Gossip Protocol?",
    answer: `**Answer Guidance:**\n\n- **Gossip Protocol:** A way for nodes in a distributed system to share state by randomly talking to a few other nodes. Information spreads like a virus (epidemic protocol).\n- **Use Cases:** Failure detection (detecting heartbeats), cluster membership (Cassandra ring), updating configuration.`
  },
  {
    id: "heartbeat-mechanism",
    type: "theoretical",
    question: "What is a Heartbeat mechanism in system design?",
    answer: `**Answer Guidance:**\n\n- **Heartbeat:** A periodic signal sent by a node to indicate it is still alive and functioning.\n- **Failure Detection:** If a central monitor or peer nodes stop receiving heartbeats from a node for a specific time, they assume the node is dead and trigger failover.`
  }
];

const systemDesignCoding: Question[] = [
  {
    id: slugify("Design a Pastebin service."),
    type: "coding",
    question: "Design a Pastebin-like web service for storing and sharing text.",
    answer: `**System Design Scenario:**

1.  **Requirements:**
    *   User uploads text, gets a unique URL.
    *   Text expires after a set time.
    *   Read-heavy system.
2.  **Back-of-Envelope:**
    *   1M new pastes/day. Average size 10KB. Storage: 10GB/day.
3.  **API Design:**
    *   \`POST /api/paste\` (body: content, expiry) -> returns URL.
    *   \`GET /api/paste/:id\` -> returns content.
4.  **Database:**
    *   NoSQL (DynamoDB/Cassandra) or Object Store (S3) for content.
    *   Metadata (ID, content_url, expiry) in SQL or key-value store.
5.  **Unique ID:**
    *   Base62 encoding of a unique counter or hash.
`
  },
  {
    id: slugify("Design a Distributed Key-Value Store."),
    type: "coding",
    question: "Design a Distributed Key-Value Store like Dynamo or Cassandra.",
    answer: `**System Design Scenario:**

1.  **Core Features:** get(key), put(key, value).
2.  **Partitioning:** Consistent Hashing to distribute keys across nodes.
3.  **Replication:** Replicate data to N nodes (Preference List) for high availability.
4.  **Consistency:** Tunable consistency (W + R > N).
5.  **Conflict Resolution:** Vector Clocks or Last-Write-Wins (LWW).
6.  **Gossip Protocol:** For cluster membership and failure detection.
`
  },
  {
    id: slugify("Design a Web Crawler."),
    type: "coding",
    question: "Design a scalable Web Crawler.",
    answer: `**System Design Scenario:**

1.  **Components:**
    *   **Seed URLs:** Starting point.
    *   **URL Frontier:** FIFO queue (or priority queue) of URLs to visit. Needs to handle duplicate removal (Bloom Filter).
    *   **HTML Downloader (Fetcher):** Fetches page content.
    *   **DNS Resolver:** Caches IP addresses.
    *   **Content Parser:** Extracts links and data.
    *   **Storage:** File system or Object store for content.
2.  **Politeness:** Ensure not to overload target servers (delay queues).
3.  **Distributed:** Hash URLs to distribute work among multiple worker machines.
`
  },
  {
    id: slugify("Design a Notification System."),
    type: "coding",
    question: "Design a centralized Notification System (Push, Email, SMS).",
    answer: `**System Design Scenario:**

1.  **Flow:** Service triggers event -> Notification Service -> User Preferences -> Provider (APNS/FCM, Twilio, SendGrid).
2.  **Components:**
    *   **Events Queue:** Kafka topics for different notification types.
    *   **Notification Workers:** Process events, check user settings (do not disturb, preferred channel), construct message.
    *   **Retry Mechanism:** Exponential backoff if 3rd party provider fails.
    *   **Rate Limiting:** Prevent spamming users.
`
  },
  {
    id: slugify("Design a Leaderboard System."),
    type: "coding",
    question: "Design a real-time Gaming Leaderboard.",
    answer: `**System Design Scenario:**

1.  **Requirements:** Real-time rank updates, top 10 players, specific user rank.
2.  **Data Structure:** Redis Sorted Sets (ZSET).
    *   \`ZADD leaderboard <score> <userId>\`
3.  **Operations:**
    *   Get Top 10: \`ZREVRANGE leaderboard 0 9\`
    *   Get User Rank: \`ZREVRANK leaderboard <userId>\`
4.  **Scaling:** Sharding based on game ID or region if dataset is too large for single Redis instance.
`
  },
  {
    id: slugify("Design a Unique ID Generator."),
    type: "coding",
    question: "Design a distributed Unique ID Generator (like Twitter Snowflake).",
    answer: `**System Design Scenario:**

1.  **Goal:** Generate 64-bit numeric IDs roughly sorted by time.
2.  **Structure (Snowflake approach):**
    *   1 bit: Sign bit (0).
    *   41 bits: Timestamp (milliseconds since epoch).
    *   10 bits: Machine ID (datacenter ID + worker ID).
    *   12 bits: Sequence number (reset every millisecond).
3.  **Implementation:**
    *   No coordination needed between nodes.
    *   IDs are k-sortable.
`
  },
  {
    id: slugify("Design a Typeahead Suggestion System."),
    type: "coding",
    question: "Design a Typeahead/Autocomplete Suggestion System (like Google Search).",
    answer: `**System Design Scenario:**

1.  **Data Structure:** Trie (Prefix Tree).
2.  **Optimization:** Store top 5 most searched queries at each node.
3.  **Architecture:**
    *   **Offline Service:** Builds/Updates the Trie based on query logs (MapReduce/Spark).
    *   **Online Service:** Reads from the Trie (serialized, cached in memory/Redis) to serve suggestions.
4.  **Performance:** Cache results in browser and CDN.
`
  },
  {
    id: slugify("Design a Distributed Counter."),
    type: "coding",
    question: "Design a Distributed Counter (e.g., Video View Count & Likes).",
    answer: `**System Design Scenario:**

1.  **Problem:** High concurrency write contention on a single database row.
2.  **Solution:** Write-back buffer or "Sharded Counters".
    *   **Sharded Counters:** Instead of one row per video, have N rows. Randomly pick one row to increment. Read sum of all rows.
    *   In-memory aggregation (Redis) -> Periodic flush to Persistent DB.
`
  },
  {
    id: slugify("Design Consistent Hashing."),
    type: "coding",
    question: "Design a Consistent Hashing mechanism.",
    answer: `**System Design Scenario:**

1.  **Goal:** Minimize key remapping when nodes are added/removed.
2.  **Concept:** Hash ring (0 to 2^32-1).
3.  **Nodes:** Hash node IPs to place them on the ring.
4.  **Keys:** Hash key to place on ring, move clockwise to find the first node.
5.  **Virtual Nodes:** Map each physical node to multiple points on the ring to ensure even distribution.
`
  },
  {
    id: slugify("Design a Parking Lot System."),
    type: "coding",
    question: "Design an Object-Oriented system for a Parking Lot.",
    answer: `**OO Design Scenario:**

1.  **Classes:** \`ParkingLot\`, \`Level\`, \`ParkingSpot\`, \`Vehicle\` (Abstract), \`Car\`, \`Motorcycle\`, \`Ticket\`.
2.  **Logic:**
    *   \`ParkingLot\` has many \`Level\`s.
    *   \`Level\` has many \`ParkingSpot\`s (Compact, Large, Motorcycle).
    *   \`entry(Vehicle)\` -> finds spot, issues \`Ticket\`.
    *   \`exit(Ticket)\` -> calculates fee, frees spot.
3.  **Concurrency:** Need to handle multiple cars entering simultaneously (locking).
`
  },
  {
    id: slugify("Design an API Rate Limiter."),
    type: "coding",
    question: "Design an API Rate Limiter system.",
    answer: `**System Design Scenario:**

1.  **Strategies:** Token Bucket, Leaky Bucket, Fixed Window, Sliding Window Log, Sliding Window Counter.
2.  **Architecture:**
    *   Middleware or API Gateway (Kong, Nginx).
    *   Storage: Redis (INCR, EXPIRE commands are atomic and fast).
3.  **Rule Management:** Configuration service to define limits per user/tier.
`
  },
  {
    id: slugify("Design a Video Streaming Platform (Netflix)."),
    type: "coding",
    question: "Design a Video Streaming Platform like Netflix.",
    answer: `**System Design Scenario:**

1.  **Content Ingestion:** Upload -> Chunking -> Transcoding (different resolutions/formats) -> DRM -> Storage (S3).
2.  **Content Delivery:** Open Connect (Netflix's custom CDN) placed deep in ISP networks.
3.  **Playback:** Adaptive Bitrate Streaming (MPEG-DASH/HLS). Client switches quality based on bandwidth.
4.  **Data Model:** User watch history, resume points (Cassandra for high write throughput).
`
  },
  {
    id: slugify("Design a Ticket Booking System."),
    type: "coding",
    question: "Design a Ticket Booking System (Ticketmaster).",
    answer: `**System Design Scenario:**

1.  **Challenge:** High concurrency for popular events ("The Eras Tour Problem").
2.  **Consistency:** No double booking. Needs strict ACID transactions or locking.
3.  **Flow:**
    *   Select Seat -> Temporary Lock (e.g., 10 mins) in Redis -> Payment -> Confirm.
    *   If payment fails/timeout -> Release lock.
4.  **Queueing:** Virtual Waiting Room to throttle traffic before it hits the booking service.
`
  },
  {
    id: slugify("Design a Ride Sharing Service (Uber)."),
    type: "coding",
    question: "Design a Ride Sharing Service like Uber.",
    answer: `**System Design Scenario:**

1.  **Core:** Driver Location Updates (high frequency).
2.  **Geo-Spatial Index:** QuadTree or Google S2.
    *   Drivers send location every 3s.
    *   Service updates driver position in the index.
3.  **Matching:** Find nearest available drivers (radius search on QuadTree).
4.  **State Machine:** Request -> Matching -> Accepted -> Arrived -> InProgress -> Completed.
`
  },
  {
    id: slugify("Design a Metrics Monitoring System."),
    type: "coding",
    question: "Design a Metrics Monitoring System (Datadog/Prometheus).",
    answer: `**System Design Scenario:**

1.  **Data Model:** Time Series Data.
2.  **Storage:** Time Series Database (TSDB) like InfluxDB or Prometheus (w/ separate storage). Optimized for write-heavy, append-only workloads.
3.  **Compression:** Key for storing massive amounts of data (delta-of-delta encoding).
4.  **Design:**
    *   Agent (on host) collects metrics -> Pushes/Pulled by Aggregator.
    *   Alerting Service checks rules against incoming data.
`
  },
  {
    id: slugify("Design a Distributed Logging System."),
    type: "coding",
    question: "Design a Distributed Logging System.",
    answer: `**System Design Scenario:**

1.  **Components:**
    *   **Sidecar/Agent:** Collects logs from container/app (e.g., Fluentd, Logstash).
    *   **Buffer:** Kafka (to handle spikes).
    *   **Indexer:** Elasticsearch (for searching).
    *   **Storage:** S3 (for archival/long-term).
    *   **UI:** Kibana.
`
  },
  {
    id: slugify("Design a Location-Based Service (Nearby Friends)."),
    type: "coding",
    question: "Design a 'Nearby Friends' service.",
    answer: `**System Design Scenario:**

1.  **Challenge:** Dynamic locations of many friends.
2.  **Solution:**
    *   Users share location only when app is open (mostly).
    *   Redis Geospatial commands (\`GEOADD\`, \`GEORADIUS\`).
    *   Or use ephemeral subscriptions: User A subscribes to updates in Grid ID X.
`
  },
  {
    id: slugify("Design a Job Scheduler."),
    type: "coding",
    question: "Design a distributed Job Scheduler.",
    answer: `**System Design Scenario:**

1.  **Requirements:** Execute tasks at specific times (one-off or recurring crons).
2.  **Architecture:**
    *   **Store:** DB table with execution_time.
    *   **Poller:** Leader node polls DB for "due" jobs (Locking needed).
    *   **Executor:** Pushes due jobs to a Queue.
    *   **Workers:** Pick up jobs from queue and run.
3.  **Reliability:** Ack mechanisms, Dead Letter Queues.
`
  },
  {
    id: slugify("Design a Stock Exchange."),
    type: "coding",
    question: "Design a high-frequency Stock Exchange Trading System.",
    answer: `**System Design Scenario:**

1.  **Key Requirement:** Ultra-low latency, fairness (FIFO), strict reliability.
2.  **Matching Engine:** In-memory, single-threaded (to avoid locking overhead) per symbol or partition.
3.  **LMAX Disruptor:** Ring buffer pattern for high-throughput inter-thread messaging.
4.  **Architecture:**
    *   Gateway -> Risk Check -> Matching Engine -> Broadcast Market Data.
`
  },
  {
    id: slugify("Design a Vending Machine."),
    type: "coding",
    question: "Design an Object-Oriented Vending Machine.",
    answer: `**OO Design Scenario:**

1.  **States:** Idle, Ready, Dispensing, OutOfService. (State Pattern).
2.  **Classes:** \`VendingMachine\`, \`Item\`, \`Inventory\`, \`Coin\`, \`Keypad\`.
3.  **Flow:**
    *   insertMoney() -> selectItem() -> validate() -> dispense() -> returnChange().
`
  },
  {
    id: slugify("Design Google Drive (File Storage)."),
    type: "coding",
    question: "Design a file storage service like Google Drive or Dropbox.",
    answer: `**System Design Scenario:**

1.  **Client:**
    *   Chunking files (4MB).
    *   Hashing chunks (deduplication).
    *   Sync logic (handling conflicts).
2.  **Backend:**
    *   **Block Server:** Stores raw blocks in S3/Object Storage.
    *   **Metadata DB:** File hierarchy, versions, permissions.
3.  **Reliability:** Erasure Coding for storage efficiency and durability.
`
  },
  {
    id: slugify("Design a News Feed with Aggregation."),
    type: "coding",
    question: "Design a News Feed Aggregator (like Google News).",
    answer: `**System Design Scenario:**

1.  **Crawler:** Scrapes news sites.
2.  **Dedup:** Visual and text similarity checks (MinHash/SimHash) to group same stories.
3.  **Classification:** ML models to tag topics/sentiment.
4.  **Ranking:** Personalized ranking based on user click history.
`
  },
  {
    id: slugify("Design an Analytics System."),
    type: "coding",
    question: "Design a Real-time Web Analytics System (like Google Analytics).",
    answer: `**System Design Scenario:**

1.  **Ingestion:** JS SDK sends beacons -> Endpoint -> Kafka.
2.  **Processing:**
    *   **Real-time:** Spark Streaming/Flink -> Aggregate views -> Redis/Cassandra.
    *   **Batch:** Dump to Data Lake (S3) -> nightly processing (Hadoop/BigQuery).
3.  **Storage:** Columnar DB (ClickHouse/Druid) for ad-hoc querying.
`
  },
  {
    id: slugify("Design a CDN."),
    type: "coding",
    question: "How would you design a Content Delivery Network (CDN)?",
    answer: `**System Design Scenario:**

1.  **Concept:** Distributed network of proxy servers close to users.
2.  **Routing:** Anycast DNS or GeoDNS to route user to nearest Edge server.
3.  **Caching:** LRU policies.
4.  **hierarchical Caching:** Edge -> Regional -> Origin.
`
  },
  {
    id: slugify("Design WhatsApp."),
    type: "coding",
    question: "Design a Chat System with End-to-End Encryption (like WhatsApp).",
    answer: `**System Design Scenario:**

1.  **Encryption:** Signal Protocol. Keys stored on device. Server only passes encrypted blobs.
2.  **Delivery:** Store-and-forward. Server holds message until user helps acknowledges receipt, then deletes.
3.  **Media:** Upload to Blob store, send encrypted URL + decryption key in the text message.
`
  }
];


const systemDesignPath: Topic[] = [
  { id: "system-design-theoretical", title: "Theoretical Questions", questions: systemDesignTheoretical },
  { id: "system-design-coding", title: "System Design Scenarios", questions: systemDesignCoding }
];

const aiPath: Topic[] = [
  { id: "ai-theoretical", title: "AI & LLM Fundamentals", questions: aiTheoretical },
  { id: "ai-coding", title: "Practical AI Development", questions: aiCoding },
];

// DSA, Node, DB, DevOps moved to separate files
// Leaving JS, React, Vue, SystemDesign, AI here for now (or move them too if needed/requested)

export const learningPaths: LearningPath[] = [
  {
    id: "dsa",
    title: "Data Structures & Algorithms",
    description: "Master the foundations of computer science. Visualize sorting, trees, and graphs interactively.",
    icon: Cpu,
    topics: dsaPath,
  },
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
    id: "generative-ai",
    title: "Generative AI & LLMs",
    description: "Master AI fundamentals, large language models, prompt engineering, and build intelligent applications with modern AI APIs.",
    icon: Bot,
    topics: aiPath,
  },
  {
    id: "system-design",
    title: "System Design",
    description: "Learn to architect scalable, resilient, and performant applications, from URL shorteners to large-scale social feeds.",
    icon: Milestone,
    topics: systemDesignPath,
  },
  {
    id: "nodejs",
    title: "Node.js & Backend",
    description: "Build scalable server-side applications with Node.js, Express, and modern backend patterns.",
    icon: Server,
    topics: nodePath,
  },
  {
    id: "databases",
    title: "Databases (SQL & NoSQL)",
    description: "Understand data persistence, ACID properties, indexing, and schema design.",
    icon: Database,
    topics: dbPath,
  },
  {
    id: "devops",
    title: "DevOps & Cloud",
    description: "Learn to deploy, manage, and scale applications using Docker, Kubernetes, and Cloud providers.",
    icon: Cloud,
    topics: devopsPath,
  },
];

export const allCodingChallenges = learningPaths.flatMap(path =>
  path.topics
    .filter(topic => topic.id.endsWith('-coding'))
    .flatMap(topic => topic.questions)
);
