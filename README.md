# DevSecOps Container Security Lab — Day 1

## Overview

This lab demonstrates basic DevSecOps container security practices.  
A Node.js application was containerized with Docker, scanned for vulnerabilities using Trivy, and hardened by replacing insecure base images and analyzing identified CVEs.

The goal was to understand how container images inherit vulnerabilities and how architectural decisions (such as base image selection) significantly affect security posture.

---

## Objectives

- Build a container image using Docker
- Scan the image for vulnerabilities using Trivy
- Analyze identified CVEs
- Reduce risk by switching to a more secure base image
- Validate improvements by rescanning the container

---

## Environment

- Ubuntu (VirtualBox VM)
- Docker
- Node.js
- Trivy vulnerability scanner

---

## Initial Dockerfile (Insecure)

The initial image used an older Node base image.

```Dockerfile
FROM node:16
WORKDIR /app
RUN npm init -y
RUN npm install express
CMD ["node"]
```

## DevSecOps Container Security Lab — Day 2

### Overview
This lab extends container security practices by integrating automated vulnerability scanning into a CI/CD pipeline using GitHub Actions.

The goal was to implement shift-left security by ensuring that container images are automatically scanned and validated before deployment.

---

### Objectives
- Automate Docker image builds in CI/CD
- Integrate Trivy vulnerability scanning into the pipeline
- Generate and store scan reports as artifacts
- Enforce a security gate that fails builds on CRITICAL vulnerabilities

---

### CI/CD Workflow

On every push to the `main` branch:

1. GitHub Actions builds the Docker image
2. Trivy scans the image for vulnerabilities
3. A JSON report (`trivy-report.json`) is generated
4. The report is uploaded as a pipeline artifact
5. The build fails if CRITICAL vulnerabilities are detected

---

### Workflow Architecture
Code Push\
↓\
Build Docker Image\
↓\
Run Trivy Scan (Generate Report)\
↓\
Upload Scan Artifact\
↓\
Enforce Security Policy (Fail on CRITICAL)

---

### Results
- Successfully integrated container scanning into CI/CD
- Automated detection of vulnerabilities during build
- Implemented security enforcement via pipeline failure
- Generated downloadable vulnerability reports for analysis

---

### Key Learnings
- Importance of automating security checks early (shift-left)
- Separation of scanning and enforcement in CI pipelines
- Handling vulnerabilities in automated workflows
- Real-world DevSecOps practice: balancing visibility vs enforcement

---

### Notes
The pipeline is intentionally configured to fail due to existing CRITICAL vulnerabilities, demonstrating enforcement of security policies in CI/CD environments.
