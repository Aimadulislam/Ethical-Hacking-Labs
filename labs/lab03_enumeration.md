# Lab 03: Service Enumeration & Host Profiling

## Objectives
- Profile service banners running on active localhost ports.
- Identify software version signatures safely.

## Step-by-Step Instructions
1. Run the local port scanner on loopback port `8080` (where the isolated web container lives):
   ```bash
   ./scripts/port_scanner.sh -t 127.0.0.1 -p 8080
   ```
2. Sniff web server response headers:
   ```bash
   curl -I http://127.0.0.1:8080
   ```
3. Document Nginx or Apache software versions discovered during port profiling.

## Learning Outcomes
- Performed host port mapping.
- Discovered service headers safely on localhost.
