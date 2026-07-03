# Lab 06: Linux Privilege Escalation Mechanics

## Objectives
- Audit custom SUID root privileges in sandbox VMs.
- Explore cron job scheduler permission models.

## Step-by-Step Instructions
1. Hunt for any system binary possessing an SUID active flag:
   ```bash
   find / -perm -4000 -type f 2>/dev/null
   ```
2. Audit the system crontab to find scheduled backup jobs running as root that read writable paths:
   ```bash
   cat /etc/crontab
   ```
3. Secure crontab entries to only run verified immutable scripts.

## Learning Outcomes
- Identified administrative SUID pathways.
- Audited system scheduler jobs defensively.
