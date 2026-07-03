# Lab 04: Vulnerability Assessment & Configuration Auditing

## Objectives
- Learn to distinguish insecure default settings from safe configurations.
- Audit permission lists in folders.

## Step-by-Step Instructions
1. Run the custom permission audit script in your repository:
   ```bash
   ./scripts/permission_audit.sh
   ```
2. Scan for folders configured with excessive write privileges (`777` permissions).
3. Update writable directory attributes to generic executable read states:
   ```bash
   chmod 755 config/
   ```

## Learning Outcomes
- Recognized configuration exposure risk factors.
- Remediated world-writable directories.
