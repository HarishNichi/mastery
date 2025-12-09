import { slugify } from "@/lib/utils";
import { Topic } from "@/lib/types";

export const dbTheoretical = [
  {
    id: slugify("ACID Properties"),
    type: "theoretical",
    question: "What are ACID properties in databases?",
    answer: `**Answer Guidance:**\n\n- **Atomicity:** All or nothing transaction.\n- **Consistency:** DB remains in valid state.\n- **Isolation:** Transactions don't interfere.\n- **Durability:** Committed data is saved permanently.`
  },
  {
    id: slugify("Indexing"),
    type: "theoretical",
    question: "How does Database Indexing work?",
    answer: `**Answer Guidance:**\n\n- **Mechanism:** Data structure (B-Tree/Hash) that improves speed of data retrieval operations.\n- **Trade-off:** Faster reads, slower writes (index must be updated), more storage space.`
  },
  {
    id: slugify("Normalization"),
    type: "theoretical",
    question: "What is Database Normalization?",
    answer: `**Answer Guidance:**\n\n- **Goal:** Minimize redundancy and dependency.\n- **Forms:**\n  - **1NF:** Atomic values.\n  - **2NF:** No partial dependency.\n  - **3NF:** No transitive dependency.`
  },
  {
    id: slugify("SQL vs NoSQL"),
    type: "theoretical",
    question: "Compare SQL and NoSQL databases.",
    answer: `**Answer Guidance:**\n\n- **SQL (Relational):** Structured, Schema-based, Scaled vertically (MySQL, Postgres).\n- **NoSQL (Non-Relational):** Flexible schema, Scaled horizontally (MongoDB, Cassandra, Redis).`
  },
  {
    id: slugify("CAP Theorem"),
    type: "theoretical",
    question: "Explain the CAP Theorem.",
    answer: `**Answer Guidance:**\n\n- **Consistency:** All nodes see same data at same time.\n- **Availability:** Every request gets a response.\n- **Partition Tolerance:** System continues despite network drops.\n- **Rule:** You can only pick 2 of 3.`
  },
  // --- New Questions (Batch 2) ---
  {
    id: slugify("Sharding vs Partitioning"),
    type: "theoretical",
    question: "What is the difference between Sharding and Partitioning?",
    answer: `**Answer Guidance:**\n\n- **Partitioning:** Dividing tables within the *same* database instance (e.g., by date).\n- **Sharding:** Distributing data across *multiple* database servers (horizontal scaling).`
  },
  {
    id: slugify("Replication Strategies"),
    type: "theoretical",
    question: "Explain Master-Slave vs Master-Master replication.",
    answer: `**Answer Guidance:**\n\n- **Master-Slave:** Writes go to Master, Reads from Slaves. Good for read-heavy apps.\n- **Master-Master:** Writes to any node. Complex conflict resolution.`
  },
  {
    id: slugify("SQL Injection"),
    type: "theoretical",
    question: "What is SQL Injection and how to prevent it?",
    answer: `**Answer Guidance:**\n\n- **Definition:** Malicious SQL code inserted into queries.\n- **Prevention:** Use Parameterized Queries (Prepared Statements), Input Validation, ORMs.`
  },
  {
    id: slugify("Isolation Levels"),
    type: "theoretical",
    question: "What are Transaction Isolation Levels?",
    answer: `**Answer Guidance:**\n\n- **Read Uncommitted:** Dirty reads allowed.\n- **Read Committed:** No dirty reads.\n- **Repeatable Read:** No non-repeatable reads.\n- **Serializable:** Strict, no phantom reads (slowest).`
  },
  {
    id: slugify("Row vs Column DB"),
    type: "theoretical",
    question: "Row-oriented vs Column-oriented databases?",
    answer: `**Answer Guidance:**\n\n- **Row-oriented (Postgres/MySQL):** Good for transaction processing (OLTP). fetching entire rows buffers usage.\n- **Column-oriented (Redshift/ClickHouse):** Good for analytics (OLAP). Fetches specific columns faster.`
  },
  {
    id: slugify("MVCC"),
    type: "theoretical",
    question: "What is MVCC (Multi-Version Concurrency Control)?",
    answer: `**Answer Guidance:**\n\n- **Concept:** Every write creates a new version of data instead of overwriting.\n- **Benefit:** Readers don't block writers, and writers don't block readers. Snapshot isolation.`
  },
  {
    id: slugify("Redis Use Cases"),
    type: "theoretical",
    question: "When should you use Redis?",
    answer: `**Answer Guidance:**\n\n- **Caching:** Speed up DB reads.\n- **Session Store:** Fast access to user sessions.\n- **Pub/Sub:** Real-time messaging.\n- **Leaderboards:** Sorted Sets.`
  },
  {
    id: slugify("Denormalization"),
    type: "theoretical",
    question: "When is Denormalization beneficial?",
    answer: `**Answer Guidance:**\n\n- **Goal:** Improve read performance by adding redundant data.\n- **Trade-off:** Slower writes, risk of data inconsistency, increased storage.`
  },
  {
    id: slugify("B-Tree vs Hash Index"),
    type: "theoretical",
    question: "Difference between B-Tree and Hash Indexes?",
    answer: `**Answer Guidance:**\n\n- **B-Tree:** Good for range queries (<, >, BETWEEN). Sorted.\n- **Hash:** Good for exact match (=). O(1) lookup. No range support.`
  },
  {
    id: slugify("Database Scaling"),
    type: "theoretical",
    question: "Vertical vs Horizontal Scaling?",
    answer: `**Answer Guidance:**\n\n- **Vertical (Scale Up):** Add more CPU/RAM to single server. easier but limited.\n- **Horizontal (Scale Out):** Add more servers (Sharding). unlimited but complex.`
  }
];

export const dbCoding = [
  {
    id: slugify("SQL Inner Join"),
    type: "coding",
    question: "Write a SQL query to select all orders with customer names (Inner Join).",
    answer: `\`\`\`sql
SELECT Orders.OrderID, Customers.CustomerName
FROM Orders
INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID;
\`\`\``
  },
  {
    id: slugify("Mongoose Schema"),
    type: "coding",
    question: "Define a simple Mongoose schema for a 'User' with name and email.",
    answer: `\`\`\`js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
\`\`\``
  },
  // --- New Questions (Batch 2) ---
  {
    id: slugify("Group By SQL"),
    type: "coding",
    question: "Write an SQL query to count customers per country.",
    answer: `\`\`\`sql
SELECT Country, COUNT(*) as CustomerCount
FROM Customers
GROUP BY Country
ORDER BY CustomerCount DESC;
\`\`\``
  },
  {
    id: slugify("Left Join"),
    type: "coding",
    question: "SQL query to get all Customers and their Orders (if any) - Left Join.",
    answer: `\`\`\`sql
SELECT Customers.CustomerName, Orders.OrderID
FROM Customers
LEFT JOIN Orders ON Customers.CustomerID = Orders.CustomerID;
\`\`\``
  },
  {
    id: slugify("MongoDB Aggregation"),
    type: "coding",
    question: "MongoDB: Calculate total sales amount per product using aggregation.",
    answer: `\`\`\`js
db.sales.aggregate([
  {
    $group: {
      _id: "$product_id",
      totalAmount: { $sum: "$amount" }
    }
  }
]);
\`\`\``
  },
  {
    id: slugify("Find Duplicates SQL"),
    type: "coding",
    question: "Find duplicate emails in a Users table.",
    answer: `\`\`\`sql
SELECT Email, COUNT(*)
FROM Users
GROUP BY Email
HAVING COUNT(*) > 1;
\`\`\``
  },
  {
    id: slugify("Pagination SQL"),
    type: "coding",
    question: "Write a SQL query for pagination (Skip 20, Take 10).",
    answer: `\`\`\`sql
SELECT * FROM Products
ORDER BY ProductID
LIMIT 10 OFFSET 20;
\`\`\``
  },
  {
    id: slugify("Redis Operations"),
    type: "coding",
    question: "Basic Redis set and get in Node.js.",
    answer: `\`\`\`js
const redis = require('redis');
const client = redis.createClient();

await client.connect();
await client.set('key', 'value');
const value = await client.get('key');
console.log(value);
\`\`\``
  },
  {
    id: slugify("SQL Transaction"),
    type: "coding",
    question: "Pseudo-code for a DB transaction (Transfer money).",
    answer: `\`\`\`sql
BEGIN TRANSACTION;
UPDATE Accounts SET Balance = Balance - 100 WHERE ID = 1;
UPDATE Accounts SET Balance = Balance + 100 WHERE ID = 2;
COMMIT;
-- Or ROLLBACK if error
\`\`\``
  },
  {
    id: slugify("Mongoose Populate"),
    type: "coding",
    question: "How to use 'populate' in Mongoose to get referenced data?",
    answer: `\`\`\`js
const story = await Story.findOne({ title: 'Casino Royale' })
  .populate('author') // 'author' is a ref in the schema
  .exec();

console.log(story.author.name);
\`\`\``
  },
  {
    id: slugify("Soft Delete SQL"),
    type: "coding",
    question: "How to implement Soft Delete?",
    answer: `\`\`\`sql
-- Don't DELETE. Update 'is_deleted' flag.
UPDATE Users SET is_deleted = 1 WHERE UserID = 10;

-- Querying
SELECT * FROM Users WHERE is_deleted = 0;
\`\`\``
  },
  {
    id: slugify("SQL Update with Join"),
    type: "coding",
    question: "Update prices of all products in 'Electronics' category.",
    answer: `\`\`\`sql
UPDATE Products
SET Price = Price * 1.1
WHERE CategoryID = (SELECT CategoryID FROM Categories WHERE Name = 'Electronics');
\`\`\``
  }
];

export const dbPath: Topic[] = [
  { id: "db-theoretical", title: "Database Concepts", questions: dbTheoretical as any },
  { id: "db-coding", title: "SQL & Querying", questions: dbCoding as any },
];
