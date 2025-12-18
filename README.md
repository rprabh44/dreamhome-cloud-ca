# DreamHome – Cloud Platform Development CA1

![Cloud Platform](https://img.shields.io/badge/Platform-Google%20Cloud-blue)
![CI/CD](https://img.shields.io/badge/CI%2FCD-Cloud%20Build-green)
![Runtime](https://img.shields.io/badge/Runtime-Node.js%2022-brightgreen)

This repository contains the **DreamHome** web application deployed to **Google Cloud Platform (GCP)** as part of the **B8IS124 – Cloud Platform Development (CA1)** assessment.

**Purpose:** This repository demonstrates **cloud deployment, CI/CD automation, and DevOps practices**. Application feature development is secondary to deployment architecture.

**Live Application:** [https://dreamhome-481604.nw.r.appspot.com](https://dreamhome-481604.nw.r.appspot.com)

---

## Table of Contents

* [Application Overview](#application-overview)
* [Cloud Services Used](#cloud-services-used)
* [Repository Structure](#repository-structure)
* [CI/CD Pipeline](#cicd-pipeline)
* [Initial Setup](#initial-setup)
* [Deployment Workflow](#deployment-workflow)
* [Configuration Files](#configuration-files)
* [Monitoring & Logs](#monitoring--logs)
* [Troubleshooting](#troubleshooting)
* [Educational Context](#educational-context)

---

## Application Overview

DreamHome is a web-based property listing and viewing-booking application built using **Ionic** and **Angular**.

### Key Features

* Browse property listings with detailed descriptions
* View property images
* User registration and authentication (Firebase)
* Book property viewings
* Responsive UI for mobile and desktop

**Technology Stack**

* Frontend: Ionic + Angular
* Authentication: Firebase Authentication
* Database: Cloud Firestore (Native mode)
* Hosting: Google App Engine (Standard Environment)

---

## Cloud Services Used

| Service                     | Purpose                                   |
| --------------------------- | ----------------------------------------- |
| **Google App Engine**       | Serverless hosting and traffic management |
| **Google Cloud Build**      | Automated CI/CD pipeline                  |
| **Cloud Firestore**         | NoSQL database                            |
| **Firebase Authentication** | User authentication                       |
| **GitHub**                  | Source control and CI/CD trigger          |

---

## Repository Structure

```
dreamhome-cloud-ca/
│
├── DreamHomeApp2/           # Ionic + Angular application
│   ├── src/                # Source code
│   ├── www/                # Production build output (Ionic)
│   ├── package.json        # Dependencies
│   └── ionic.config.json   # Ionic configuration
│
├── app.yaml                # App Engine configuration
├── cloudbuild.yaml         # CI/CD pipeline definition
├── .gcloudignore           # Deployment ignore rules
├── README.md               # Deployment documentation
└── .gitignore              # Git ignore rules
```

---

## CI/CD Pipeline

A **fully automated CI/CD pipeline** is implemented using **Google Cloud Build**.

### Deployment Flow

```
Developer Push → GitHub → Cloud Build Trigger → Build → App Engine Deploy
```

### Pipeline Steps

1. Code is pushed to the `main` branch
2. GitHub webhook triggers Cloud Build
3. Dependencies are installed
4. Ionic/Angular application is built
5. Application is deployed to App Engine

No manual deployment steps are required during normal operation.

---

## Initial Setup

### Prerequisites

* Google Cloud account with billing enabled
* GitHub account
* Google Cloud CLI installed locally

### Clone Repository

```bash
git clone https://github.com/rprabh44/dreamhome-cloud-ca.git
cd dreamhome-cloud-ca
```

### Authenticate with Google Cloud

```bash
gcloud auth login
gcloud config set project dreamhome-481604
```

### Enable Required Services

```bash
gcloud services enable appengine.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable firestore.googleapis.com
```

### Create App Engine Application

```bash
gcloud app create --region=europe-west2
```

---

## Deployment Workflow

### Automated Deployment

```bash
git add .
git commit -m "Deploy update"
git push origin main
```

Cloud Build automatically builds and deploys the application.

---

## Configuration Files

### app.yaml

```yaml
runtime: nodejs22
env: standard

automatic_scaling:
  max_instances: 2

handlers:
  - url: /
    static_files: DreamHomeApp2/www/index.html
    upload: DreamHomeApp2/www/index.html

  - url: /(.*)
    static_files: DreamHomeApp2/www/\1
    upload: DreamHomeApp2/www/(.*)
```

**Notes:**

* Ionic outputs production builds to the `www/` directory
* App Engine serves static files directly
* Default App Engine service account is used

---

### cloudbuild.yaml

```yaml
steps:
  - name: "node:22"
    dir: "DreamHomeApp2"
    entrypoint: "npm"
    args: ["install"]

  - name: "node:22"
    dir: "DreamHomeApp2"
    entrypoint: "npm"
    args: ["run", "build"]

  - name: "gcr.io/cloud-builders/gcloud"
    args: ["app", "deploy", "--quiet"]

options:
  logging: CLOUD_LOGGING_ONLY

timeout: "1200s"
```

---

### .gcloudignore

```text
.git
.gitignore

node_modules/
DreamHomeApp2/node_modules/
DreamHomeApp2/.angular/
DreamHomeApp2/ios/
DreamHomeApp2/android/

# Exclude large Ionic icon directory
DreamHomeApp2/www/svg/
```

This prevents App Engine static file limits from being exceeded.

---

## Monitoring & Logs

```bash
gcloud app logs tail -s default
gcloud app logs read --limit=50
```

Monitoring is available via:

* App Engine → Versions → Logs
* Cloud Build → History

---

## Troubleshooting

### Common Issues

**404 Errors**

* Ensure App Engine is serving the Ionic `www/` directory

**Deployment Fails Due to File Limits**

* Ensure `www/svg/` is excluded via `.gcloudignore`

**Build Failures**

* Review Cloud Build logs
* Verify correct Node.js runtime

---

## Educational Context

This project demonstrates:

* Cloud-native deployment on Google Cloud Platform
* Automated CI/CD using Cloud Build
* Infrastructure as Code via YAML configuration
* Handling real-world cloud deployment constraints

**Course:** B8IS124 – Cloud Platform Development
**Assessment:** CA1 – Cloud Deployment Project

---

## License

This project is provided for **educational purposes only**.

---

**Last Updated:** December 2025
