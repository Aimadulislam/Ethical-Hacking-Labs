# Lab 08: Docker Isolation & Security Auditing

## Objectives
- Audit Docker Daemon configurations.
- Understand rootless modes and secure user context boundaries inside containers.

## Step-by-Step Instructions
1. Inspect the running user of your active Docker container process:
   ```bash
   docker exec hacking_lab_target whoami
   ```
2. Verify that Docker Compose is configured to restrict external incoming connections through local loopback binds (`127.0.0.1:8080:80`).
3. Ensure the container runs as a non-privileged user by declaring `USER nginx` or equivalent non-root flags inside the Dockerfile configuration.

## Learning Outcomes
- Sandboxed target environments inside isolated virtual subnets.
- Verified non-privileged container states.
