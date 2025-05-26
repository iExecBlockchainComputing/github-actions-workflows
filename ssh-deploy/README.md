# SSH Deploy

## Inputs

### `host`

**Required** The hostname or IP address of the remote server.

### `username`

**Required** The username to use for SSH authentication.

### `port`

**Optional** The SSH port to connect to. Default: `22`.

### `source`

**Required** The local file or directory to copy to the remote server.

### `target`

**Required** The destination path on the remote server.

### `pre-deploy-commands`

**Optional** Commands to run on the remote server before copying files. Each command should be on a new line.

### `post-deploy-commands`

**Optional** Commands to run on the remote server after copying files. Each command should be on a new line.

### `ssh-options`

**Optional** Additional SSH options to use when connecting to the remote server.

## Secrets

### `ssh_private_key`

**Required** The SSH private key to use for authentication.

### `ssh_passphrase`

**Optional** The passphrase for the SSH private key, if it is encrypted.

## Example usage

```yaml
uses: iExecBlockchainComputing/github-actions-workflows/ssh-deploy@ssh-deploy-v1.0.0
with:
  host: 'example.com'
  username: 'deploy'
  source: './dist'
  target: '/var/www/html'
  pre-deploy-commands: |
    mkdir -p /var/www/html
    rm -rf /var/www/html/*
  post-deploy-commands: |
    cd /var/www/html
    npm install --production
    pm2 restart app
secrets:
  ssh_private_key: ${{ secrets.SSH_PRIVATE_KEY }}
```