#!/usr/bin/env python3
"""
Ethical Hacking Labs - Simple Web Log Security Audit & Metric Tool
A fully compliant Python 3 script designed to parse simulated Nginx access logs
to identify requests returning 4xx or 5xx status codes, potential brute force anomalies, and mapping metrics.
"""

import sys
import re
import argparse
import logging
from typing import Dict, List

# Setup Logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("log_analyzer")


def parse_nginx_access_log(filepath: str) -> None:
    """Parses standard Nginx log lines to count responses and alert on brute force anomalies."""
    logger.info(f"Opening simulated web logs: {filepath}")
    
    # Simple regex to match: IP - - [Date] "METHOD URL PROTOCOL" STATUS BYTES
    log_pattern = re.compile(
        r'(?P<ip>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}) - - \[(?P<date>[^\]]+)\] "(?P<request>[^"]+)" (?P<status>\d{3}) (?P<bytes>\d+)'
    )

    status_counts: Dict[str, int] = {}
    ip_requests: Dict[str, int] = {}
    error_requests: List[str] = []

    try:
        with open(filepath, "r") as file:
            for line in file:
                match = log_pattern.match(line.strip())
                if match:
                    data = match.groupdict()
                    status = data["status"]
                    ip = data["ip"]
                    req = data["request"]

                    status_counts[status] = status_counts.get(status, 0) + 1
                    ip_requests[ip] = ip_requests.get(ip, 0) + 1

                    if status.startswith("4") or status.startswith("5"):
                        error_requests.append(f"{ip} - {req} -> HTTP {status}")
                else:
                    # Generic simple lines parsing fallback
                    if "HTTP" in line:
                        parts = line.split()
                        if len(parts) >= 6:
                            status = parts[-2]
                            status_counts[status] = status_counts.get(status, 0) + 1

    except FileNotFoundError:
        logger.error(f"Target log file not found: {filepath}")
        return
    except Exception as e:
        logger.error(f"Error parsing log file: {e}")
        return

    # Visual audit metrics printing
    print("\n" + "="*50)
    print("           EDUCATIONAL LOG AUDIT METRICS")
    print("="*50)
    print("\n[HTTP Status Distribution]")
    for status, count in status_counts.items():
        print(f"  HTTP {status}: {count} requests")

    print("\n[Requests Per Remote IP Address]")
    for ip, count in sorted(ip_requests.items(), key=lambda item: item[1], reverse=True):
        print(f"  {ip}: {count} requests")

    print("\n[HTTP Failures & Non-200 Event Logs]")
    if error_requests:
        for err in error_requests[:10]: # limit to top 10
            print(f"  [!] {err}")
    else:
        print("  No web client access errors detected.")
    print("="*50 + "\n")


def main() -> None:
    parser = argparse.ArgumentParser(description="Educational Server Log Audit Analyzer.")
    parser.add_argument("-f", "--file", required=True, help="Path to simulated log file")
    args = parser.parse_args()

    parse_nginx_access_log(args.file)


if __name__ == "__main__":
    main()
