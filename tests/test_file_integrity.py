#!/usr/bin/env python3
"""
Unit tests for tools/file_integrity.py
Uses standard unittest library to verify hashing, baseline generation, and tampering checks.
"""

import os
import sys
import json
import unittest
import tempfile
import shutil

# Ensure workspace root or tools is in the path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from tools.file_integrity import get_file_sha256, generate_baseline, verify_integrity


class TestFileIntegrity(unittest.TestCase):
    def setUp(self):
        # Create a temporary directory structure for isolated testing
        self.test_dir = tempfile.mkdtemp()
        self.file_a = os.path.join(self.test_dir, "file_a.txt")
        self.file_b = os.path.join(self.test_dir, "file_b.txt")
        self.baseline_file = os.path.join(self.test_dir, "baseline_test.json")

        with open(self.file_a, "w") as f:
            f.write("Hello World from File A!")

        with open(self.file_b, "w") as f:
            f.write("Ethical Hacking Lab Integrity Check!")

    def tearDown(self):
        # Clean up temporary directory
        shutil.rmtree(self.test_dir)

    def test_sha256_calculation(self):
        """Test hash is calculated correctly and matches stable outputs."""
        hash_a = get_file_sha256(self.file_a)
        # Check that it returns a valid hexadecimal string of length 64
        self.assertEqual(len(hash_a), 64)
        self.assertTrue(all(c in "0123456789abcdef" for c in hash_a))

    def test_baseline_generation(self):
        """Test baseline file is written with expected relative paths."""
        generate_baseline(self.test_dir, self.baseline_file)
        self.assertTrue(os.path.exists(self.baseline_file))

        with open(self.baseline_file, "r") as f:
            data = json.load(f)

        self.assertIn("file_a.txt", data)
        self.assertIn("file_b.txt", data)
        self.assertEqual(data["file_a.txt"], get_file_sha256(self.file_a))

    def test_verify_integrity_ok(self):
        """Test verify_integrity returns True when files match baseline."""
        generate_baseline(self.test_dir, self.baseline_file)
        result = verify_integrity(self.test_dir, self.baseline_file)
        self.assertTrue(result)

    def test_verify_integrity_tampered(self):
        """Test verify_integrity identifies and reports modifications."""
        generate_baseline(self.test_dir, self.baseline_file)
        
        # Modify file_a
        with open(self.file_a, "w") as f:
            f.write("Tampered message!")

        result = verify_integrity(self.test_dir, self.baseline_file)
        self.assertFalse(result)

    def test_verify_integrity_missing_file(self):
        """Test verify_integrity identifies deleted files."""
        generate_baseline(self.test_dir, self.baseline_file)
        os.remove(self.file_b)

        result = verify_integrity(self.test_dir, self.baseline_file)
        self.assertFalse(result)

    def test_verify_integrity_new_file(self):
        """Test verify_integrity spots un-baselined files."""
        generate_baseline(self.test_dir, self.baseline_file)
        
        file_c = os.path.join(self.test_dir, "file_c.txt")
        with open(file_c, "w") as f:
            f.write("Untracked new file!")

        result = verify_integrity(self.test_dir, self.baseline_file)
        self.assertFalse(result)


if __name__ == "__main__":
    unittest.main()
