# Lab 02: Network Diagnostics & Sockets

## Objectives
- Understand network adapters and live loopback configurations.
- Diagnose connection bottlenecks using native system sockets.
- Map localhost socket states.

## Step-by-Step Instructions
1. **List Interface Adapters**:
   Check active local interfaces:
   ```bash
   ip a
   ```
2. **Ping Loopback Address**:
   Send 3 requests to confirm loopback state:
   ```bash
   ping -c 3 127.0.0.1
   ```
3. **Trace Local Host Router Node**:
   Query active listening sockets:
   ```bash
   ss -tulpn
   ```

## Learning Outcomes
- Understood IP configuration subnets.
- Verified system socket availability.
