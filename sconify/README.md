# Sconify - Reusable Workflow Documentation 🚀

## Overview 🌟

This reusable GitHub Actions workflow automates the process of sconifying a Docker image. It is configurable via inputs for the Sconification options and secrets for docker registries credentials and production enclave signing key.

The workflow performs the following actions:

- **Create Temporary Directory**
- **Login to Docker Registry**
- **Login to Scontain Docker Registry**
- **Pull Image to Sconify** from Docker Registry
- **Pull Sconify Image** from Scontain Docker Registry
- [unless input `sconify-debug: false`]
  - **Sconify Image Debug**
  - **Push Debug Image** to Docker Registry and prepare outputs (`debug-image`,`debug-mrenclave`,`debug-checksum`)
- [unless input `sconify-prod: false`]
  - **Sconify Image Prod** using scone-signing-key stored in the Temporary Directory
  - **Push Prod Image** to Docker Registry and prepare outputs (`prod-image`,`prod-mrenclave`,`prod-checksum`)
- **Clean Temporary Directory** always

## Workflow Inputs 🛠️

| **Input**             | **Description**                                                                                  | **Required** | **Default**   |
| --------------------- | ------------------------------------------------------------------------------------------------ | ------------ | ------------- |
| **docker-username**   | Docker Registry Username                                                                         | Yes          | -             |
| **scontain-username** | Scontain Registry Username                                                                       | Yes          | -             |
| **image-name**        | Name of Docker Image to Sconify                                                                  | Yes          | -             |
| **image-tag**         | Tag of Docker Image to Sconify                                                                   | Yes          | -             |
| **docker-registry**   | Docker Registry of Docker Image to Sconify                                                       | No           | docker.io     |
| **sconify-version**   | Version of the Sconify Image to use                                                              | Yes          | -             |
| **fs-dir**            | File System Directory to Protect                                                                 | Yes          | -             |
| **binary**            | Path to the Binary to Protect                                                                    | Yes          | -             |
| **command**           | Command to Protect                                                                               | Yes          | -             |
| **heap**              | Enclave Heap size                                                                                | No           | 1G            |
| **dlopen**            | dlopen mode                                                                                      | No           | 1             |
| **sconify-debug**     | Create Scone Debug image                                                                         | No           | true          |
| **sconify-prod**      | Create Scone Production image                                                                    | No           | true          |
| **runner**            | Runner to use (overrides `runs-on`) ⚠️ the specified runner must feature Ubuntu OS and docker CE | No           | ubuntu-latest |

### Secrets 🔐

| **Secret**            | **Description**                                 | **Required**                            |
| --------------------- | ----------------------------------------------- | --------------------------------------- |
| **docker-password**   | Docker Registry Password or Token               | Yes                                     |
| **scontain-password** | Scontain Registry Password or Token             | Yes                                     |
| **scone-signing-key** | Signing Key for Scone Production (PEM RSA-3072) | Yes unless `inputs.sconify-prod: false` |

### Outputs 📤

| **Output**          | **Description**                                                                    |
| ------------------- | ---------------------------------------------------------------------------------- |
| **debug-image**     | Debug Sconified Image (unless `inputs.sconify-debug: false`)                       |
| **debug-mrenclave** | Debug Sconified Image MrEnclave Fingerprint (unless `inputs.sconify-debug: false`) |
| **debug-checksum**  | Debug Sconified Image Checksum (unless `inputs.sconify-debug: false`)              |
| **prod-image**      | Prod Sconified Image (unless `inputs.sconify-prod: false`)                         |
| **prod-mrenclave**  | Prod Sconified Image MrEnclave Fingerprint (unless `inputs.sconify-prod: false`)   |
| **prod-checksum**   | Prod Sconified Image Checksum (unless `inputs.sconify-prod: false`)                |

## How to Use This Reusable Workflow 🔄

1. **Save the Workflow File**  
   This workflow is already saved as `.github/workflows/sconify.yml` in the repository. 💾

2. **Call the Reusable Workflow**
   In another workflow file (e.g., triggered manually or by a release), invoke this reusable workflow like so:

```yaml
name: Sconify iApp

on:
  workflow_dispatch:
    inputs:
      image-name:
        required: true
        type: string
      image-tag:
        required: true
        type: string
      sconify-debug:
        type: boolean
        default: true
      sconify-prod:
        type: boolean
        default: true

jobs:
  sconify:
    uses: iExecBlockchainComputing/github-actions-workflows/.github/workflows/sconify.yml@sconify-v1.0.0
    with:
      image-name: ${{ inputs.image-name }}
      image-tag: ${{ inputs.image-tag }}
      sconify-debug: ${{ inputs.sconify-debug }}
      sconify-prod: ${{ inputs.sconify-prod }}
      docker-registry: docker.io
      sconify-version: 5.9.0-v15
      fs-dir: /app
      binary: /usr/local/bin/node
      command: node /app/src/app.js
      heap: 1G
      dlopen: 1
      docker-username: ${{ vars.DOCKER_USERNAME }}
      scontain-username: ${{ vars.SCONTAIN_USERNAME }}
    secrets:
      docker-password: ${{ secrets.DOCKER_TOKEN }}
      scontain-password: ${{ secrets.SCONTAIN_TOKEN }}
      scone-signing-key: ${{ secrets.SCONE_SIGNING_KEY }}

  use-sconify-output:
    # usually you want to deploy the sconified image as an iExec app using the sconify job outputs
    runs-on: ubuntu-latest
    needs: sconify
    steps:
      - run: |
          echo "DEBUG IMAGE INFO: image=${{ needs.sconify.outputs.debug-image }} | checksum=${{ needs.sconify.outputs.debug-checksum }} | mrenclave=${{ needs.sconify.outputs.debug-mrenclave }}"
          echo "PROD IMAGE INFO: image=${{ needs.sconify.outputs.prod-image }} | checksum=${{ needs.sconify.outputs.prod-checksum }} | mrenclave=${{ needs.sconify.outputs.prod-mrenclave }}"
```

3. **Configure Variables**
   Ensure that the following variables are added to your repository's settings:

   - `DOCKER_USERNAME`: Your Docker Registry username
   - `SCONTAIN_USERNAME`: Your Scontain username

   NB: Beware if you choose to use secrets to store registries usernames;
   registries usernames can appear in sconified image names outputted as `outputs.debug-image` and `outputs.prod-image`, in such a case GitHub Actions blanks the outputs with this waring:

   > Skip output 'prod-image' since it may contain secret.

   > Skip output 'debug-image' since it may contain secret.

4. **Configure Secrets**  
   Ensure that the following secrets are added to your repository's settings:
   - `DOCKER_PASSWORD`: Your Docker Registry password or access token
   - `SCONTAIN_PASSWORD`: Your Scontain password or access token
   - `SCONE_SIGNING_KEY`: The key to use for signing Scone Prod applications

## Prerequisites 📋

1. **Read/Write access to the image to sconify**

2. **Read access to Scontain's `iexec-sconify-image` image**:
   - You must have a Scontain account with access to the `scone-production/iexec-sconify-image` image.
