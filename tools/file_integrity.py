#!/usr/bin/env python3
"""
Ethical Hacking Labs - File Integrity Monitoring Tool (Educational)
A clean, PEP8 compliant Python utility to scan a directory and calculate SHA256 hashes 
to identify modifications in configuration files or codebases.
"""

import os
import hashlib
import sys
import argparse
import logging
import json
from typing import Dict, Optional

# Setup Logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger("file_integrity")


def get_file_sha256(filepath: str) -> str:
    """Calculates the SHA256 hash of a file."""
    sha256_hash = hashlib.sha256()
    try:
        with open(filepath, "rb") as f:
            for byte_block in iter(lambda: f.read(4096), b""):
                sha256_hash.update(byte_block)
        return sha256_hash.hexdigest()
    except Exception as e:
        logger.error(f"Failed to hash {filepath}: {e}")
        raise e


def generate_baseline(directory: str, output_file: str) -> None:
    """Scans a directory and writes a baseline JSON file containing SHA256 hashes of all files."""
    logger.info(f"Generating baseline for directory: {directory}")
    baseline_data: Dict[str, str] = {}

    for root, _, files in os.walk(directory):
        for file in files:
            filepath = os.path.join(root, file)
            # Skip output files or git directories
            if ".git" in filepath or output_file in filepath:
                continue
            try:
                file_hash = get_file_sha256(filepath)
                # Save relative path
                rel_path = os.path.relpath(filepath, directory)
                baseline_data[rel_path] = file_hash
            except Exception:
                continue

    try:
        with open(output_file, "w") as f:
            json.dump(baseline_data, f, indent=4)
        logger.info(f"Successfully wrote baseline file containing {len(baseline_data)} items to {output_file}")
    except Exception as e:
        logger.error(f"Failed to write baseline file: {e}")
        sys.exit(1)


def verify_integrity(directory: str, baseline_file: str) -> bool:
    """Compares current file hashes against a saved baseline JSON."""
    logger.info(f"Verifying integrity using baseline: {baseline_file}")
    
    if not os.path.exists(baseline_file):
        logger.error(f"Baseline file '{baseline_file}' does not exist. Please generate it first.")
        return False

    try:
        with open(baseline_file, "r") as f:
            baseline_data: Dict[str, str] = json.load(f)
    except Exception as e:
        logger.error(f"Failed to load baseline data: {e}")
        return False

    current_data: Dict[str, str] = {}
    for root, _, files in os.walk(directory):
        for file in files:
            filepath = os.path.join(root, file)
            if ".git" in filepath or baseline_file in filepath:
                continue
            try:
                file_hash = get_file_sha256(filepath)
                rel_path = os.path.relpath(filepath, directory)
                current_data[rel_path] = file_hash
            except Exception:
                continue

    tampered_files = []
    missing_files = []
    new_files = []

    for rel_path, expected_hash in baseline_data.items():
        if rel_path not in current_data:
            missing_files.append(rel_path)
        elif current_data[rel_path] != expected_hash:
            tampered_files.append(rel_path)

    for rel_path in current_data:
        if rel_path not in baseline_data:
            new_files.append(rel_path)

    if not tampered_files and not missing_files and not new_files:
        logger.info("INTEGRITY OK: No modifications detected in the target directory.")
        return True
    else:
        if tampered_files:
            logger.warning(f"MODIFIED FILES DETECTED: {tampered_files}")
        if missing_files:
            logger.warning(f"MISSING FILES DETECTED: {missing_files}")
        if new_files:
            logger.warning(f"NEW FILES DETECTED: {new_files}")
        return False


def main() -> None:
    parser = argparse.ArgumentParser(description="Educational File Integrity Auditor.")
    parser.add_argument("-d", "--dir", default=".", help="Target directory to audit (default: current directory)")
    parser.add_argument("-o", "--output", default="baseline.json", help="Path to write baseline output json")
    parser.add_argument("-b", "--baseline", help="Baseline JSON file path to verify current files against")
    parser.add_argument("--generate", action="store_true", help="Generate baseline file")
    parser.add_argument("--verify", action="store_true", help="Verify integrity against loaded baseline")

    args = parser.parse_args()

    if args.generate:
        generate_baseline(args.dir, args.output)
    elif args.verify:
        if not args.baseline:
            logger.error("Error: --baseline file is required when verifying integrity.")
            sys.exit(1)
        success = verify_integrity(args.dir, args.baseline)
        sys.exit(0 if success else 1)
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
