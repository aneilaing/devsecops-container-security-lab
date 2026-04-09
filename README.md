# DevSecOps Container Security Lab

## Summary

This project demonstrates end-to-end DevSecOps practices by integrating security across the development lifecycle of a containerized Node.js application.

The project includes:
- SAST using Semgrep for code analysis
- Container vulnerability scanning using Trivy
- DAST using OWASP ZAP for runtime testing
- CI/CD pipeline with security enforcement using GitHub Actions
- Vulnerability remediation and validation

The goal is to demonstrate practical application security and DevSecOps concepts, including detection, analysis, remediation, and automated enforcement.

## Tools & Technologies

- Docker
- GitHub Actions (CI/CD)
- Semgrep (SAST)
- Trivy (Container Security)
- OWASP ZAP (DAST)
- Node.js / Express
- Helmet (Security Headers)

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
- Integrate SAST (Semgrep) for code analysis
- Integrate Trivy vulnerability scanning for container security
- Generate and store scan reports as artifacts
- Enforce a security gate that fails builds on CRITICAL vulnerabilities

---

### CI/CD Workflow

On every push to the `main` branch:

1. GitHub Actions checks out the code
2. Semgrep performs SAST analysis on the codebase
3. The Docker image is built
4. Trivy scans the container image for vulnerabilities
5. A JSON report (`trivy-report.json`) is generated
6. The report is uploaded as a pipeline artifact
7. The build fails if CRITICAL vulnerabilities are detected

---

### Workflow Architecture
Code Push\
↓\
Run Semgrep (SAST)
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
- Difference between SAST (code-level scanning) and container vulnerability scanning

## DevSecOps Container Security Lab — Day 3 (DAST)

### Overview
Performed dynamic application security testing using OWASP ZAP against the running containerized application.

### Findings
- Identified missing or misconfigured security headers (e.g., CSP, X-Frame-Options, X-Content-Type-Options)
- Detected information disclosure via X-Powered-By header
- No critical vulnerabilities found

### Key Learnings
- Difference between code-level and runtime vulnerabilities
- Importance of HTTP security headers
- DAST helps identify misconfigurations not visible in SAST or container scans

---

### Remediation

Security headers were implemented using Helmet middleware.

This reduced multiple DAST findings, including:
- Missing CSP header
- Clickjacking protection
- Information disclosure via X-Powered-By

Demonstrates practical remediation of security misconfigurations and validation through rescanning.

### DAST Remediation Results

After implementing Helmet middleware:

- Eliminated multiple security header issues
- Reduced overall vulnerability surface
- Remaining findings limited to CSP configuration

Demonstrates practical vulnerability remediation and validation.

### Notes
- Security policies are enforced in CI/CD by failing builds when critical vulnerabilities are detected.
