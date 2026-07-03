# Reference: Script Modules & Functions ⚙️

This document describes the primary functions and modules of our Python security tools.

---

## 🐍 `tools/file_integrity.py`

Tracks and verifies directory files using SHA256 hashes.

### Functions

#### `calculate_sha256(filepath)`
Calculates the SHA256 hash of a file using chunk-based reading.
* **Arguments**:
  * `filepath` (*str*): Absolute or relative path to the target file.
* **Returns**:
  * `hexdigest` (*str*): The 64-character hexadecimal SHA256 hash, or `None` if the file could not be read.

#### `generate_baseline(directory, output_file)`
Generates a baseline hash index for all files in a folder, skipping common development directories like `.git` and `node_modules`.
* **Arguments**:
  * `directory` (*str*): The root directory to scan (defaults to `.`).
  * `output_file` (*str*): The filename to save the JSON index (defaults to `baseline.json`).

#### `verify_integrity(directory, baseline_file)`
Compares current files against a baseline index and flags added, modified, or missing files.
* **Arguments**:
  * `directory` (*str*): The folder to audit.
  * `baseline_file` (*str*): Path to the baseline JSON index file.
* **Returns**:
  * `status` (*bool*): `True` if no changes were detected, otherwise `False`.
