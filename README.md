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
