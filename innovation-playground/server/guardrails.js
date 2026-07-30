const BLOCKED_PATTERNS = [
  /rm\s+-rf\s+\/\s*$/,
  /rm\s+--no-preserve-root/,
  /mkfs\./,
  /dd\s+if=\/dev\/zero/,
  />\s*\/dev\/(sda|sdb|nvme|xvda)/,
  /:\(\)\s*\{/,
  /wget\s+.*\||curl\s+.*\|/,
  /eval\s+\$/,
  /sudo\s+/,
  /su\s+/,
  /chmod\s+777/,
  /chown\s+\w+/,
  /passwd/,
  /useradd/,
  /usermod/,
  /systemctl/,
  /service\s+/,
  /docker\s+exec\s+--privileged/,
  /docker\s+run\s+.*--privileged/,
  /kubectl\s+exec\s+.*--\s+(\/bin\/bash|\/bin\/sh)/,
  /export\s+(AWS_ACCESS_KEY|AZURE_CLIENT_SECRET|GITHUB_TOKEN|API_KEY|SECRET)/,
  /\.env\s+(cat|less|more|tail|head|vi|vim|nano)/,
];

const WARN_PATTERNS = [
  /npm\s+publish/,
  /docker\s+push/,
  /gh\s+release/,
  /git\s+push\s+.*main/,
  /git\s+push\s+.*master/,
  /az\s+login/,
  /az\s+account\s+set/,
];

const ALLOWED_ENV_VARS = [
  'HOME', 'USER', 'PATH', 'TERM', 'SHELL', 'PWD', 'LOGNAME',
  'LANG', 'LC_ALL', 'NODE_ENV', 'PLAYGROUND_SANDBOX_ID',
];

function checkGuardrails(input) {
  const results = { blocked: false, warnings: [], reasons: [] };

  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(input)) {
      results.blocked = true;
      results.reasons.push(`Blocked by pattern: ${pattern}`);
    }
  }

  for (const pattern of WARN_PATTERNS) {
    if (pattern.test(input)) {
      results.warnings.push(`Warning: command matches pattern ${pattern}`);
    }
  }

  return results;
}

function sanitizeEnv(env) {
  const safe = {};
  for (const key of ALLOWED_ENV_VARS) {
    if (env[key] !== undefined) safe[key] = env[key];
  }
  safe.PLAYGROUND_SANDBOX_ID = env.PLAYGROUND_SANDBOX_ID || 'unknown';
  return safe;
}

module.exports = { checkGuardrails, sanitizeEnv, BLOCKED_PATTERNS, WARN_PATTERNS };
