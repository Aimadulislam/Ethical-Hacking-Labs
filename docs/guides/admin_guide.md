# Administrator Guide: Lab Environment Management ⚙️

This guide is designed for educators, lab administrators, and system engineers who manage local or shared instances of the Secure Sandbox environment.

---

## 🔒 Hardening the Lab Host

To ensure your host system remains secure during exercises, apply these best practices:

### 1. Restrict Group Privileges
Only grant the `docker` system group to authorized users. Users with Docker access can easily escalate privileges to root on the host machine.

### 2. Restrict Sandbox Access
Verify that all container ports in `docker/docker-compose.yml` are bound exclusively to the local loopback interface (`127.0.0.1`):
```yaml
ports:
  - "127.0.0.1:8080:80"  # Safe loopback binding
```
Avoid using open port bindings (`"8080:80"`), which expose the test services to the wider public network.

---

## 🔄 Refreshing and Resetting Lab Environments

To reset the sandbox back to a clean state after an exercise, run the following commands:
```bash
# Run the reset script to tear down and purge existing volumes
./scripts/reset_lab.sh
```

This cleans up isolated container networks, stops running instances, and starts a fresh environment in seconds.
