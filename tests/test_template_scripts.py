"""Tests for the template's Python helper scripts (scripts/*.py).

Run: python3 -m unittest discover -s tests
(Part of `just gate`.)
"""
import subprocess
import sys
import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
SCRIPTS = REPO_ROOT / "scripts"

# -X warn_default_encoding makes Python emit EncodingWarning for every open()
# that relies on the machine's locale encoding; -W error turns it into a crash.
# This reproduces the Windows/GBK failure deterministically on ANY machine.
STRICT_ENCODING = ["-X", "warn_default_encoding", "-W", "error::EncodingWarning"]


class RegressionTests(unittest.TestCase):
    def test_groups_lookup_reads_registry_as_utf8(self):
        # Bug: groups-lookup.py opened docs/inbox/agent-sessions.json with the
        # locale's default encoding. On a Windows machine with a Chinese locale
        # (GBK) `just gate` crashed with:
        #   UnicodeDecodeError: 'gbk' codec can't decode byte 0x92 ...
        # because the registry contains UTF-8 em-dashes. Found 2026-11-05 on
        # the first `just gate` run of this instance; fixed by passing
        # encoding="utf-8" to open().
        result = subprocess.run(
            [sys.executable, *STRICT_ENCODING, str(SCRIPTS / "groups-lookup.py"), "--validate"],
            cwd=REPO_ROOT, capture_output=True, text=True, encoding="utf-8",
        )
        self.assertEqual(result.returncode, 0, result.stderr)

    def test_registry_lib_reads_registry_as_utf8(self):
        # Same bug, second site: registry_lib.load_config() (used by blame.py
        # and refresh-terminals.py) opened the same file without an encoding.
        code = (
            "import sys; sys.path.insert(0, r'%s'); "
            "import registry_lib; registry_lib.load_config()" % SCRIPTS
        )
        result = subprocess.run(
            [sys.executable, *STRICT_ENCODING, "-c", code],
            cwd=REPO_ROOT, capture_output=True, text=True, encoding="utf-8",
        )
        self.assertEqual(result.returncode, 0, result.stderr)


if __name__ == "__main__":
    unittest.main()
