# Lab 01: Linux Basics & Permissions

## Objectives
- Master standard file system navigation.
- Audit permission flags (`rwx`) and learn security implications of `chmod`/`chown` misconfigurations.
- Understand how system services are launched and verified.

## Laboratory Setup
- Local Linux terminal or isolated Docker container running Ubuntu/Alpine.

## Step-by-Step Instructions
1. **Interactive Listing**: Run `ls -lah` in your local directory. Identify the owner and group names.
2. **Permission Modification**: Create a practice script:
   ```bash
   echo "echo 'Target running!'" > test.sh
   ```
   Modify permission so it's readable and executable:
   ```bash
   chmod 755 test.sh
   ./test.sh
   ```
3. **Audit Active Ports**: List listening ports to verify running system processes:
   ```bash
   ss -tulpn
   ```

## Learning Outcomes
- Recognized different permission blocks (User, Group, Others).
- Learned how to read system sockets safely.

## Quiz & Questions
1. *What numerical flag corresponds to read-only permissions?*
   - **Answer**: `4` (or `r--`).
2. *How do you hide standard errors from finding results?*
   - **Answer**: Appending `2>/dev/null` redirection.
