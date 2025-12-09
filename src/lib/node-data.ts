import { slugify } from "@/lib/utils";
import { Topic } from "@/lib/types";

export const nodeTheoretical = [
  {
    id: slugify("Node Event Loop"),
    type: "theoretical",
    question: "How does the Node.js Event Loop work? Explain the phases.",
    answer: `**Answer Guidance:**\n\n- **Single Threaded:** Uses libuv to handle async I/O.\n- **Phases:**\n  1. **Timers:** setTimeout, setInterval.\n  2. **Pending Callbacks:** System admin tasks.\n  3. **Idle, Prepare:** Internal.\n  4. **Poll:** Retrieve new I/O events.\n  5. **Check:** setImmediate.\n  6. **Close Callbacks:** socket.on('close').`
  },
  {
    id: slugify("Node Streams"),
    type: "theoretical",
    question: "What are Streams in Node.js? Why are they useful?",
    answer: `**Answer Guidance:**\n\n- **Definition:** Collections of data that might not be available all at once and don't have to fit in memory.\n- **Types:** Readable, Writable, Duplex, Transform.\n- **Use Case:** Processing large files (video/logs) chunk by chunk.`
  },
  {
    id: slugify("Buffers"),
    type: "theoretical",
    question: "What is a Buffer class in Node.js?",
    answer: `**Answer Guidance:**\n\n- **Definition:** Raw binary data storage.\n- **Context:** JS originally dealt with strings (utf-8). Buffers allow handling TCP streams, file system operations, and other binary interactions.`
  },
  {
    id: slugify("Cluster Module"),
    type: "theoretical",
    question: "How does the Cluster module help scale Node.js applications?",
    answer: `**Answer Guidance:**\n\n- **Problem:** Node is single-threaded; it ignores other CPU cores.\n- **Solution:** Cluster allows creating child processes (workers) that share server ports.\n- **Scaling:** Enables utilizing all available CPU cores.`
  },
  {
    id: slugify("Middleware Pattern"),
    type: "theoretical",
    question: "Explain the middleware pattern in Express.js.",
    answer: `**Answer Guidance:**\n\n- **Concept:** Functions that have access to the request (req), response (res), and the next middleware function.\n- **Uses:** Logging, Authentication, Error handling, parsing body data.`
  },
  // --- New Questions (Batch 2) ---
  {
    id: slugify("NextTick vs SetImmediate"),
    type: "theoretical",
    question: "Difference between process.nextTick() and setImmediate()?",
    answer: `**Answer Guidance:**\n\n- **process.nextTick():** Fires immediately after the current operation, BEFORE the event loop continues. Higher priority.\n- **setImmediate():** Fires in the 'Check' phase of the event loop, after I/O events.`
  },
  {
    id: slugify("EventEmitter Internals"),
    type: "theoretical",
    question: "How does the EventEmitter work?",
    answer: `**Answer Guidance:**\n\n- **Mechanism:** Pub/Sub pattern. Maintains a listener array for each event name.\n- **emit(event):** Loops synchronously through listeners and invokes them.\n- **on(event, fn):** Adds function to the listener array.`
  },
  {
    id: slugify("CJS vs ESM"),
    type: "theoretical",
    question: "Difference between CommonJS (require) and ES Modules (import)?",
    answer: `**Answer Guidance:**\n\n- **CJS:** Dynamic, synchronous, used in older Node. \`module.exports\`.\n- **ESM:** Static, async-ready, standard JS. \`export default\`. Tree-shakable.`
  },
  {
    id: slugify("Worker Threads vs Cluster"),
    type: "theoretical",
    question: "Difference between Worker Threads and Cluster?",
    answer: `**Answer Guidance:**\n\n- **Cluster:** Spawns new processes (separate memory/V8 instance). Good for HTTP scaling.\n- **Worker Threads:** Spawns threads within same process (shared memory). Good for CPU-intensive tasks.`
  },
  {
    id: slugify("Handling Memory Leaks"),
    type: "theoretical",
    question: "Common causes of Memory Leaks in Node.js?",
    answer: `**Answer Guidance:**\n\n- **Causes:** Global variables, Unclosed event listeners, Closure references, Caching without expiration.\n- **Tools:** Heap dumps, Chrome DevTools.`
  },
  {
    id: slugify("Node Security Best Practices"),
    type: "theoretical",
    question: "Name 3 security best practices for Node.js apps.",
    answer: `**Answer Guidance:**\n\n1. **Helmet:** Set secure HTTP headers.\n2. **Input Validation:** Sanitize user input (avoid SQL/NoSQL injection).\n3. **Rate Limiting:** Prevent DoS attacks.`
  },
  {
    id: slugify("Libuv"),
    type: "theoretical",
    question: "What is Libuv?",
    answer: `**Answer Guidance:**\n\n- **Role:** C library that provides the Event Loop and async I/O support.\n- **Features:** Thread pool (disk I/O, DNS, Crypto), file system events, child processes.`
  },
  {
    id: slugify("Node.js Global Objects"),
    type: "theoretical",
    question: "What are __dirname and __filename?",
    answer: `**Answer Guidance:**\n\n- **__dirname:** Absolute path to the directory of the current module.\n- **__filename:** Absolute path to the current module file itself.\n- **Note:** Only available in CJS.`
  },
  {
    id: slugify("Error Handling Async"),
    type: "theoretical",
    question: "How to handle errors in async/await vs callbacks?",
    answer: `**Answer Guidance:**\n\n- **Callbacks:** Check if first argument 'err' is truthy.\n- **Async/Await:** Wrap code in try/catch block.`
  },
  {
    id: slugify("Buffer vs Stream"),
    type: "theoretical",
    question: "When to use Stream over Buffer?",
    answer: `**Answer Guidance:**\n\n- **Buffer:** Stores entire data in memory. Good for small data.\n- **Stream:** Processes data piece by piece. Essential for large files/data to prevent memory overflow.`
  }
];

export const nodeCoding = [
  {
    id: slugify("Simple HTTP Server"),
    type: "coding",
    question: "Create a simple HTTP server in Node.js that returns 'Hello World'.",
    answer: `\`\`\`js
const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
\`\`\``
  },
  {
    id: slugify("Read File Async"),
    type: "coding",
    question: "Read a text file asynchronously using 'fs' module.",
    answer: `\`\`\`js
const fs = require('fs');

fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
\`\`\``
  },
  // --- New Questions (Batch 2) ---
  {
    id: slugify("Custom EventEmitter"),
    type: "coding",
    question: "Implement a simple EventEmitter class.",
    answer: `\`\`\`js
class SimpleEmitter {
  constructor() {
    this.events = {};
  }
  on(event, listener) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(listener);
  }
  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(fn => fn(...args));
    }
  }
}
\`\`\``
  },
  {
    id: slugify("Stream Pipe"),
    type: "coding",
    question: "Copy a file using Streams (pipe).",
    answer: `\`\`\`js
const fs = require('fs');

const readStream = fs.createReadStream('input.txt');
const writeStream = fs.createWriteStream('output.txt');

readStream.pipe(writeStream);

writeStream.on('finish', () => console.log('Copy complete'));
\`\`\``
  },
  {
    id: slugify("Promisify fs"),
    type: "coding",
    question: "Promisify fs.readFile without using util.promisify.",
    answer: `\`\`\`js
const fs = require('fs');

const readFilePromise = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};
\`\`\``
  },
  {
    id: slugify("Express Middleware Logger"),
    type: "coding",
    question: "Write an Express middleware to log Request Method and URL.",
    answer: `\`\`\`js
const logger = (req, res, next) => {
  console.log(\`\${req.method} \${req.url} - \${new Date().toISOString()}\`);
  next(); // Pass control to next handler
};

app.use(logger);
\`\`\``
  },
  {
    id: slugify("JWT Sign"),
    type: "coding",
    question: "Sign a JWT token using 'jsonwebtoken' library.",
    answer: `\`\`\`js
const jwt = require('jsonwebtoken');

const user = { id: 1, username: 'dev' };
const secret = 'super-secret-key';

const token = jwt.sign(user, secret, { expiresIn: '1h' });
console.log(token);
\`\`\``
  },
  {
    id: slugify("Basic REST API"),
    type: "coding",
    question: "Create a simple GET /users endpoint with http module.",
    answer: `\`\`\`js
const http = require('http');
const users = [{id: 1, name: 'Alice'}];

http.createServer((req, res) => {
  if (req.url === '/users' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
}).listen(3000);
\`\`\``
  },
  {
    id: slugify("Rate Limiter Logic"),
    type: "coding",
    question: "Implement a basic logic for rate limiting (pseudo-code/simple js).",
    answer: `\`\`\`js
const requestCounts = {};
const LIMIT = 5;
const WINDOW = 60000; // 1 min

function rateLimiter(ip) {
  const now = Date.now();
  if (!requestCounts[ip]) {
    requestCounts[ip] = [];
  }
  // Filter old requests
  requestCounts[ip] = requestCounts[ip].filter(time => now - time < WINDOW);
  
  if (requestCounts[ip].length >= LIMIT) return false; // Block
  
  requestCounts[ip].push(now);
  return true; // Allow
}
\`\`\``
  },
  {
    id: slugify("Uncaught Exception"),
    type: "coding",
    question: "How to handle uncaught exceptions globally?",
    answer: `\`\`\`js
process.on('uncaughtException', (err) => {
  console.error('CRASH:', err);
  // Perform cleanup
  process.exit(1); // Force exit
});
\`\`\``
  }
];

export const nodePath: Topic[] = [
  { id: "node-theoretical", title: "Node.js Internals", questions: nodeTheoretical as any },
  { id: "node-coding", title: "Backend Development", questions: nodeCoding as any },
];
