# Lab 07: Windows Privilege Escalation Principles

## Objectives
- Review Registry keys that enable elevated service installations.
- Identify Service path formatting misconfigurations.

## Step-by-Step Instructions
1. Inspect Registry permissions for AlwaysInstallElevated values:
   ```cmd
   reg query HKLM\SOFTWARE\Policies\Microsoft\Windows\Installer /v AlwaysInstallElevated
   ```
2. Identify unquoted service paths possessing space breaks:
   ```cmd
   wmic service get name,displayname,pathname,startmode | findstr /i "auto"
   ```
3. Secure service paths by wrapping binary paths with absolute quotes.

## Learning Outcomes
- Recognized Windows service permission escalation targets.
- Learned the defensive value of strict quoting inside registries.
