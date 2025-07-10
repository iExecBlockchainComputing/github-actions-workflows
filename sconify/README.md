# Sconify - Reusable Workflow Documentation 🚀

## Overview 🌟

This reusable GitHub Actions workflow automates the process of sconifying a Docker image. It is configurable via inputs for the Sconification options and secrets for docker registries credentials and production enclave signing key.

The workflow performs the following actions:

- **Create Temporary Directory**
- **Prepare Sconify Command** and args
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

| **Input**           | **Description**                                                                                          | **Required** | **Default**                      |
| ------------------- | -------------------------------------------------------------------------------------------------------- | ------------ | -------------------------------- |
| **docker-registry** | Docker registry of docker image to sconify                                                               | No           | docker.io                        |
| **docker-username** | Docker registry username                                                                                 | Yes          | -                                |
| **image-name**      | Name of docker image to sconify                                                                          | Yes          | -                                |
| **image-tag**       | Tag of docker image to sconify                                                                           | Yes          | -                                |
| **sconify-version** | Version of the sconify image to use                                                                      | Yes          | -                                |
| **binary**          | [SCONE] Path of the binary to use                                                                        | Yes          | -                                |
| **command**         | [SCONE] Command to execute                                                                               | No           | ENTRYPOINT + CMD of native image |
| **binary-fs**       | [SCONE] Embed the file system into the binary via Scone binary file system                               | No           | false                            |
| **fs-dir**          | [SCONE] Path of directories to add to the binary file system (use multiline to add multiple directories) | No           | -                                |
| **fs-file**         | [SCONE] Path of files to add to the binary file system (use multiline to add multiple files)             | No           | -                                |
| **host-path**       | [SCONE] Host path, served directly from the host file system (use multiline to add multiple path)        | No           | -                                |
| **heap**            | [SCONE] Enclave heap size                                                                                | No           | 1G                               |
| **dlopen**          | [SCONE] Scone dlopen mode (0:disable; 1:enable)                                                          | No           | 0                                |
| **mprotect**        | [SCONE] Scone mprotect mode (0:disable; 1:enable)                                                        | No           | 0                                |

| **sconify-debug** | Create Scone debug image | No | true |
| **sconify-prod** | Create Scone production image | No | true |
| **runner** | Runner to use (overrides `runs-on`) ⚠️ the specified runner must feature Ubuntu OS and docker CE | No | ubuntu-latest |

> ℹ️ for more details about [SCONE] options see [Scone's documentation](https://sconedocs.github.io/ee_sconify_image/#all-supported-options)

### Secrets 🔐

| **Secret**            | **Description**                                 | **Required**                            |
| --------------------- | ----------------------------------------------- | --------------------------------------- |
| **docker-username**   | Docker registry username                        | yes                                     |
| **docker-password**   | Docker Registry Password or Token               | Yes                                     |
| **scontain-username** | Scontain registry username                      | Yes                                     |
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
      # runner: your-runner-here ⚠️ control the runner used in the workflow to match your requirements
      image-name: ${{ inputs.image-name }}
      image-tag: ${{ inputs.image-tag }}
      sconify-debug: ${{ inputs.sconify-debug }}
      sconify-prod: ${{ inputs.sconify-prod }}
      docker-registry: docker.io
      sconify-version: 5.9.0-v15
      binary: /usr/local/bin/node
      command: node /app/src/app.js
      host-path: |
        /etc/hosts
        /etc/resolv.conf
      binary-fs: true
      fs-dir: /app
      heap: 1G
      dlopen: 1
      mprotect: 1
    secrets:
      docker-username: ${{ secrets.DOCKER_USERNAME }}
      scontain-username: ${{ secrets.SCONTAIN_USERNAME }}
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

3. **Configure Secrets**  
   Ensure that the following secrets are added to your repository's settings:
   - `DOCKER_USERNAME`: Your Docker Registry username
   - `DOCKER_PASSWORD`: Your Docker Registry password or access token
   - `SCONTAIN_USERNAME`: Your Scontain username
   - `SCONTAIN_PASSWORD`: Your Scontain password or access token
   - `SCONE_SIGNING_KEY`: The key to use for signing Scone Prod applications

## Prerequisites 📋

1. **Read/Write access to the image to sconify**

2. **Read access to Scontain's `iexec-sconify-image` image**:
   - You must have a Scontain account with access to the `scone-production/iexec-sconify-image` image.
