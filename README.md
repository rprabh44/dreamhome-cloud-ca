# DreamHome – Cloud Platform Development CA1

![Cloud Platform](https://img.shields.io/badge/Platform-Google%20Cloud-blue)
![CI/CD](https://img.shields.io/badge/CI%2FCD-Cloud%20Build-green)
![Runtime](https://img.shields.io/badge/Runtime-Node.js%2022-brightgreen)

This repository contains the **DreamHome** web application deployed to **Google Cloud Platform (GCP)** as part of the **B8IS124 – Cloud Platform Development (CA1)** assessment.

**Purpose:** This repository demonstrates cloud deployment and CI/CD automation practices, not application development.

**Live Application:** [https://dreamhome-ca.nw.r.appspot.com](https://dreamhome-ca.nw.r.appspot.com)

---

## Table of Contents

- [Application Overview](#application-overview)
- [Cloud Services Used](#cloud-services-used)
- [Repository Structure](#repository-structure)
- [CI/CD Pipeline](#cicd-pipeline)
- [Initial Setup](#initial-setup)
- [Deployment Workflow](#deployment-workflow)
- [Configuration Files](#configuration-files)
- [Monitoring & Logs](#monitoring--logs)
- [Troubleshooting](#troubleshooting)
- [Educational Purpose](#educational-purpose)

---

## Application Overview

DreamHome is a web-based property listing and viewing booking application built with **Ionic** and **Angular**.

### Key Features

- Browse property listings with detailed information
- View high-quality property images and descriptions
- User registration and authentication via Firebase
- Book property viewings with date/time selection
- Responsive design for mobile and desktop

**Technology Stack:**
- Frontend: Ionic + Angular
- Backend: Firebase Authentication
- Database: Cloud Firestore (Native mode)
- Hosting: Google App Engine (Standard)

---

## Cloud Services Used

| Service | Purpose |
|---------|---------|
| **Google App Engine** | Serverless application hosting with automatic scaling |
| **Google Cloud Build** | Automated CI/CD pipeline triggered by GitHub pushes |
| **Cloud Firestore** | NoSQL database for property and booking data |
| **Firebase Authentication** | Secure user authentication and authorization |
| **GitHub** | Source control and CI/CD trigger integration |

---

## Repository Structure

```
dreamhome-cloud-ca/
│
├── DreamHomeApp2/          # Ionic + Angular application source code
│   ├── src/                # Application source files
│   ├── package.json        # Node.js dependencies
│   └── ionic.config.json   # Ionic configuration
│
├── app.yaml                # App Engine deployment configuration
├── cloudbuild.yaml         # Cloud Build CI/CD pipeline definition
├── README.md               # This file - deployment documentation
└── .gitignore              # Git ignore rules
```

---

## CI/CD Pipeline

The application uses a **fully automated CI/CD pipeline** for continuous deployment.

### Deployment Flow

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐      ┌──────────────┐
│   Code      │      │   GitHub     │      │   Cloud     │      │   App        │
│   Push      │─────▶│   Trigger    │─────▶│   Build     │─────▶│   Engine     │
│   (main)    │      │   Webhook    │      │   Pipeline  │      │   Deploy     │
└─────────────┘      └──────────────┘      └─────────────┘      └──────────────┘
```

### Pipeline Steps

1. Developer pushes code to the `main` branch on GitHub
2. Cloud Build trigger automatically detects the push
3. Cloud Build executes steps defined in `cloudbuild.yaml`
4. Application is built and deployed to Google App Engine
5. New version becomes live automatically

⚠️ **Note:** No manual deployment is required during normal operation.

---

## Initial Setup

These steps are required **once** to configure the project for the first time.

### Prerequisites

- Google Cloud account with billing enabled
- GitHub account with repository access
- Google Cloud CLI installed locally

### 1. Clone the Repository

```bash
git clone https://github.com/rprabh44/dreamhome-cloud-ca.git
cd dreamhome-cloud-ca
```

### 2. Install Google Cloud CLI

Verify installation:

```bash
gcloud --version
```

If not installed, download from: [https://cloud.google.com/sdk/docs/install](https://cloud.google.com/sdk/docs/install)

### 3. Authenticate with Google Cloud

```bash
gcloud auth login
gcloud config set project dreamhome-ca
```

### 4. Create App Engine Application

```bash
gcloud app create --region=europe-west2
```

### 5. Enable Required Services

```bash
gcloud services enable appengine.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable firestore.googleapis.com
```

### 6. Configure Cloud Build Trigger

1. Go to **Cloud Console → Cloud Build → Triggers**
2. Click **Create Trigger**
3. Connect your GitHub repository
4. Set trigger to activate on pushes to `main` branch
5. Set Cloud Build configuration file to `cloudbuild.yaml`
6. Save the trigger

---

## Deployment Workflow

### Automated Deployment (Standard Process)

Once the Cloud Build trigger is configured, deployment is automatic:

```bash
# 1. Make code changes
git add .
git commit -m "Your descriptive commit message"

# 2. Push to GitHub (triggers automatic deployment)
git push origin main
```

**What happens next:**
- Cloud Build automatically starts building
- Application is deployed to App Engine
- New version goes live within 2-3 minutes
- Build status visible in Cloud Console

### Manual Deployment (Testing/Override)

For testing or emergency deployments, you can deploy manually:

```bash
gcloud app deploy --quiet
```

**Note:** Manual deployment should only be used for testing purposes. Regular deployments should use the automated CI/CD pipeline.

---

## Configuration Files

### app.yaml

Defines the runtime environment and scaling configuration for Google App Engine.

```yaml
runtime: nodejs22
env: standard

automatic_scaling:
  max_instances: 2
```

**Key settings:**
- `runtime`: Node.js 22 runtime environment
- `env: standard`: Uses App Engine Standard Environment
- `max_instances: 2`: Limits scaling to 2 instances (cost control)

### cloudbuild.yaml

Defines the CI/CD pipeline executed by Google Cloud Build.

```yaml
steps:
  - name: 'gcr.io/cloud-builders/gcloud'
    args: ['app', 'deploy', '--quiet']

options:
  logging: CLOUD_LOGGING_ONLY
timeout: '1200s'
```

**Key settings:**
- `timeout`: Maximum build time of 20 minutes
- `logging`: Stores logs in Cloud Logging only
- `--quiet`: Suppresses interactive prompts

---

## Monitoring & Logs

### View Application Logs

Stream live application logs:

```bash
gcloud app logs tail -s default
```

View recent logs:

```bash
gcloud app logs read --limit=50
```

### Cloud Console Monitoring

Access monitoring dashboards:

1. **Application Logs:** Cloud Console → App Engine → Versions → Logs
2. **Build History:** Cloud Console → Cloud Build → History
3. **Performance Metrics:** Cloud Console → App Engine → Dashboard

### Key Metrics to Monitor

- Request latency
- Error rates
- Instance count
- Memory and CPU usage

---

## Troubleshooting

### Common Issues and Solutions

#### Build Fails on Cloud Build

**Check:**
- Build logs in Cloud Console → Cloud Build → History
- Verify `cloudbuild.yaml` syntax is correct
- Ensure Cloud Build has necessary permissions

#### Application Won't Start

**Check:**
- App Engine logs for startup errors
- Verify `app.yaml` configuration
- Confirm all required APIs are enabled

#### Changes Not Appearing After Push

**Check:**
- Cloud Build trigger is enabled
- Build completed successfully
- Correct branch is being monitored (should be `main`)
- Clear browser cache and hard refresh

#### Deployment Takes Too Long

**Possible causes:**
- Large dependencies being installed
- Cold start of new instances
- Network latency

**Solution:** Wait for initial deployment to complete (usually 2-5 minutes)

### Get Help

View detailed error messages:

```bash
gcloud app logs read --level=error --limit=20
```

Check service status:

```bash
gcloud app describe
```

---

## Educational Purpose

This project is provided for **educational purposes only** to demonstrate:

- ☁️ **Cloud deployment** using Google Cloud Platform
- 🔄 **CI/CD automation** with Cloud Build and GitHub integration
- 📊 **Infrastructure as Code** with declarative configuration files
- 🔧 **DevOps practices** for modern web applications
- 📈 **Scalable architecture** using serverless technologies

**Course:** B8IS124 – Cloud Platform Development  
**Assessment:** CA1 – Cloud Deployment Project

---

## License

This project is created for educational purposes as part of academic coursework.

---

## Contact

For questions or issues related to this deployment:

- **Repository:** [https://github.com/rprabh44/dreamhome-cloud-ca](https://github.com/rprabh44/dreamhome-cloud-ca)
- **Live Application:** [https://dreamhome-ca.nw.r.appspot.com](https://dreamhome-ca.nw.r.appspot.com)

---



**Last Updated:** December 2025