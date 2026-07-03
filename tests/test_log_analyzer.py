#!/usr/bin/env python3
"""
Unit tests for tools/log_analyzer.py
Uses standard unittest library to verify log parsing of standard Nginx log lines.
"""

import os
import sys
import unittest
import tempfile
import io
from contextlib import redirect_stdout

# Ensure workspace root or tools is in the path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from tools.log_analyzer import parse_nginx_access_log


class TestLogAnalyzer(unittest.TestCase):
    def setUp(self):
        # Create a temporary log file
        self.temp_log = tempfile.NamedTemporaryFile(mode="w+", delete=False)
        self.log_content = [
            '127.0.0.1 - - [03/Jul/2026:11:00:01] "GET /index.html HTTP/1.1" 200 1024\n',
            '192.168.1.5 - - [03/Jul/2026:11:01:14] "POST /login HTTP/1.1" 401 234\n',
            '192.168.1.5 - - [03/Jul/2026:11:01:20] "POST /login HTTP/1.1" 401 234\n',
            '10.0.0.4 - - [03/Jul/2026:11:04:15] "GET /admin HTTP/1.1" 403 512\n',
        ]
        self.temp_log.writelines(self.log_content)
        self.temp_log.close()

    def tearDown(self):
        os.unlink(self.temp_log.name)

    def test_log_parsing_metrics(self):
        """Test log parsing maps HTTP codes, IP requests and failure alerts correctly."""
        f = io.StringIO()
        with redirect_stdout(f):
            parse_nginx_access_log(self.temp_log.name)
        
        output = f.getvalue()

        # Check if HTTP Status Distribution is in output
        self.assertIn("HTTP 200: 1 requests", output)
        self.assertIn("HTTP 401: 2 requests", output)
        self.assertIn("HTTP 403: 1 requests", output)

        # Check IP requests counting
        self.assertIn("192.168.1.5: 2 requests", output)
        self.assertIn("127.0.0.1: 1 requests", output)
        self.assertIn("10.0.0.4: 1 requests", output)

        # Check failure alerts logs are included
        self.assertIn("[!] 192.168.1.5 - POST /login HTTP/1.1 -> HTTP 401", output)
        self.assertIn("[!] 10.0.0.4 - GET /admin HTTP/1.1 -> HTTP 403", output)


if __name__ == "__main__":
    unittest.main()
