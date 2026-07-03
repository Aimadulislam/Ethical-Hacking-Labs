# Lab 05: Isolated Web Application Vulnerability Analysis

## Objectives
- Connect to the local Docker-Compose vulnerable web portal.
- Verify basic input handling bugs like SQL injection conceptually.

## Step-by-Step Instructions
1. Ensure the isolated target compose service is up:
   ```bash
   docker compose -f docker/docker-compose.yml up -d
   ```
2. Navigate to `http://localhost:8080` in your web browser.
3. Test how input parameters behave when special SQL characters like `'` are passed.
4. Clean up the container stack after training:
   ```bash
   docker compose -f docker/docker-compose.yml down -v
   ```

## Learning Outcomes
- Demonstrated OWASP Top 10 injection vulnerabilities in isolated local containers.
- Learned parameterization techniques to close injection parameters.
