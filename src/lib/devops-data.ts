import { slugify } from "@/lib/utils";
import { Topic } from "@/lib/types";

export const devopsTheoretical = [
  {
    id: slugify("CI/CD Pipeline"),
    type: "theoretical",
    question: "What is a CI/CD pipeline?",
    answer: `**Answer Guidance:**\n\n- **CI (Continuous Integration):** Automate testing/building when code is pushed.\n- **CD (Continuous Deployment/Delivery):** Automate releasing code to production.`
  },
  {
    id: slugify("Docker vs VM"),
    type: "theoretical",
    question: "Difference between Docker Containers and Virtual Machines?",
    answer: `**Answer Guidance:**\n\n- **VM:** Virtualizes hardware. Has full OS. Heavyweight.\n- **Docker:** Virtualizes OS (kernel). Sharing host kernel. Lightweight.`
  },
  {
    id: slugify("Kubernetes Pod"),
    type: "theoretical",
    question: "What is a Pod in Kubernetes?",
    answer: `**Answer Guidance:**\n\n- **Definition:** Smallest deployable unit in K8s.\n- **Content:** One or more containers sharing storage/network.\n- **Lifecycle:** Ephemeral.`
  },
  {
    id: slugify("Green-Blue Deployment"),
    type: "theoretical",
    question: "Explain Blue-Green Deployment.",
    answer: `**Answer Guidance:**\n\n- **Strategy:** Two identical environments (Blue=Live, Green=New).\n- **Process:** Deploy to Green, test, then switch traffic (Load Balancer) to Green.\n- **Benefit:** Zero downtime, easy rollback.`
  },
  {
    id: slugify("Infrastructure as Code"),
    type: "theoretical",
    question: "What is IaC (Infrastructure as Code)?",
    answer: `**Answer Guidance:**\n\n- **Concept:** Managing infrastructure (servers, networks) through code files (Terraform, CloudFormation) rather than manual configuration.\n- **Benefits:** Version control, consistency, reproducibility.`
  },
  // --- New Questions (Batch 2) ---
  {
    id: slugify("Docker Layers"),
    type: "theoretical",
    question: "How do Docker Image Layers work? Why are they useful?",
    answer: `**Answer Guidance:**\n\n- **Mechanism:** Each instruction in Dockerfile creates a read-only layer. Layers are stacked.\n- **Benefit:** Caching. If a layer hasn't changed, it's reused, speeding up builds and saving space.`
  },
  {
    id: slugify("K8s Service Types"),
    type: "theoretical",
    question: "Explain ClusterIP, NodePort, and LoadBalancer in K8s.",
    answer: `**Answer Guidance:**\n\n- **ClusterIP:** Internal IP only. Default.\n- **NodePort:** Exposes service on static port on each Node IP.\n- **LoadBalancer:** Exposes service externally using cloud provider's LB.`
  },
  {
    id: slugify("K8s Autoscaling"),
    type: "theoretical",
    question: "HPA (Horizontal) vs VPA (Vertical) Pod Autoscaling?",
    answer: `**Answer Guidance:**\n\n- **HPA:** Adds more pods (replicas) based on CPU/Memory.\n- **VPA:** Increases CPU/Memory limits of existing pods (restarts them).`
  },
  {
    id: slugify("Canary Deployment"),
    type: "theoretical",
    question: "What is Canary Deployment?",
    answer: `**Answer Guidance:**\n\n- **Strategy:** Roll out update to a small subset of users (canaries) first.\n- **Goal:** Verify stability before full rollout.`
  },
  {
    id: slugify("Terraform State"),
    type: "theoretical",
    question: "What is the purpose of the Terraform State file?",
    answer: `**Answer Guidance:**\n\n- **Purpose:** Maps real-world resources to your configuration.\n- **Function:** Tracks metadata, improves performance, handles locking.`
  },
  {
    id: slugify("Ansible vs Terraform"),
    type: "theoretical",
    question: "Difference between Ansible and Terraform?",
    answer: `**Answer Guidance:**\n\n- **Terraform:** Infrastructure Provisioning (creating servers/VPCs). Declarative.\n- **Ansible:** Configuration Management (installing software on servers). Procedural/Declarative mix.`
  },
  {
    id: slugify("Ingress Controller"),
    type: "theoretical",
    question: "What is a Kubernetes Ingress?",
    answer: `**Answer Guidance:**\n\n- **Definition:** API object that manages external access to services in a cluster (HTTP/HTTPS).\n- **Features:** Load balancing, SSL termination, path-based routing.`
  },
  {
    id: slugify("GitOps"),
    type: "theoretical",
    question: "Explain the concept of GitOps.",
    answer: `**Answer Guidance:**\n\n- **Core:** Git repository is the single source of truth for infrastructure/application state.\n- **Process:** Automated operator (e.g., ArgoCD) syncs the cluster state to match the Git state.`
  },
  {
    id: slugify("Monitoring vs Logging"),
    type: "theoretical",
    question: "Difference between Monitoring (Prometheus) and Logging (ELK)?",
    answer: `**Answer Guidance:**\n\n- **Monitoring:** Metrics (numbers). CPU usage, request rate. "Is it healthy?"\n- **Logging:** Events (text). Stack traces, error messages. "Why did it fail?"`
  },
  {
    id: slugify("Secrets Management"),
    type: "theoretical",
    question: "How to handle secrets in DevOps?",
    answer: `**Answer Guidance:**\n\n- **Avoid:** Hardcoding in git.\n- **Use:** Environment variables, K8s Secrets, dedicated vaults (HashiCorp Vault, AWS Secrets Manager).`
  }
];

export const devopsCoding = [
  {
    id: slugify("Simple Dockerfile"),
    type: "coding",
    question: "Write a Dockerfile for a Node.js application.",
    answer: `\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
\`\`\``
  },
  {
    id: slugify("GitHub Action Workflow"),
    type: "coding",
    question: "Write a basic GitHub Actions workflow to run tests on push.",
    answer: `\`\`\`yaml
name: Node.js CI

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Use Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18.x'
    - run: npm ci
    - run: npm test
\`\`\``
  },
  // --- New Questions (Batch 2) ---
  {
    id: slugify("Docker Compose"),
    type: "coding",
    question: "Create a docker-compose.yml for a Node app and Redis.",
    answer: `\`\`\`yaml
version: '3'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - REDIS_URL=redis://redis:6379
  redis:
    image: "redis:alpine"
\`\`\``
  },
  {
    id: slugify("K8s Deployment"),
    type: "coding",
    question: "Write a simple Kubernetes Deployment YAML.",
    answer: `\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-app
        image: my-app:1.0
        ports:
        - containerPort: 80
\`\`\``
  },
  {
    id: slugify("K8s Service"),
    type: "coding",
    question: "Write a Kubernetes Service YAML to expose 'my-app'.",
    answer: `\`\`\`yaml
apiVersion: v1
kind: Service
metadata:
  name: my-app-service
spec:
  selector:
    app: my-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: LoadBalancer
\`\`\``
  },
  {
    id: slugify("Terraform S3 bucket"),
    type: "coding",
    question: "Define an AWS S3 bucket in Terraform.",
    answer: `\`\`\`hcl
resource "aws_s3_bucket" "my_bucket" {
  bucket = "my-unique-bucket-name"
  acl    = "private"

  tags = {
    Name        = "My bucket"
    Environment = "Dev"
  }
}
\`\`\``
  },
  {
    id: slugify("Multi-stage Dockerfile"),
    type: "coding",
    question: "Write a multi-stage Dockerfile for a Node.js app to reduce image size.",
    answer: `\`\`\`dockerfile
# Stage 1: Build
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm install

# Stage 2: Run
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app .
CMD ["npm", "start"]
\`\`\``
  },
  {
    id: slugify("Nginx Reverse Proxy"),
    type: "coding",
    question: "Configure Nginx as a reverse proxy for localhost:3000.",
    answer: `\`\`\`nginx
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
    }
}
\`\`\``
  },
  {
    id: slugify("Shell Script Health Check"),
    type: "coding",
    question: "Write a shell script to check if a website is up.",
    answer: `\`\`\`bash
#!/bin/bash
if curl -s --head  --request GET https://google.com | grep "200 OK" > /dev/null; then 
   echo "UP"
else
   echo "DOWN"
fi
\`\`\``
  },
  {
    id: slugify("Makefile"),
    type: "coding",
    question: "Create a Makefile to build and test a project.",
    answer: `\`\`\`makefile
build:
\tnpm run build

test:
\tnpm test

deploy: build test
\techo "Deploying..."
\`\`\``
  },
  {
    id: slugify("Prometheus Config"),
    type: "coding",
    question: "Basic prometheus.yml config to scrape localhost:9090.",
    answer: `\`\`\`yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']
\`\`\``
  },
  {
    id: slugify("Docker Volume"),
    type: "coding",
    question: "Command to create a docker volume and mount it.",
    answer: `\`\`\`bash
docker volume create my-vol
docker run -d -v my-vol:/app/data my-image
\`\`\``
  }
];

export const devopsPath: Topic[] = [
  { id: "devops-theoretical", title: "DevOps & Cloud", questions: devopsTheoretical as any },
  { id: "devops-coding", title: "Infrastructure as Code", questions: devopsCoding as any },
];
