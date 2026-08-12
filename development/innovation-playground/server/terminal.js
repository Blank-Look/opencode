const { spawn } = require('child_process');
const { checkGuardrails, sanitizeEnv } = require('./guardrails');
const { v4: uuidv4 } = require('uuid');

const sessions = new Map();

function createSession(sandboxId) {
  const sessionId = uuidv4().slice(0, 8);
  const cwd = `/tmp/playground-${sandboxId || sessionId}`;

  const fs = require('fs');
  try { fs.mkdirSync(cwd, { recursive: true }); } catch {}

  const env = sanitizeEnv({
    ...process.env,
    PLAYGROUND_SANDBOX_ID: sandboxId || sessionId,
    TERM: 'xterm-256color',
    PS1: `\\[\\e[38;5;39m\\]opencode@playground:\\[\\e[38;5;82m\\]\\w\\[\\e[0m\\]\\$ `,
  });

  const shell = process.env.SHELL || '/bin/bash';
  const proc = spawn(shell, [], {
    cwd,
    env,
    stdio: ['pipe', 'pipe', 'pipe'],
  });

  const session = {
    id: sessionId,
    sandboxId: sandboxId || sessionId,
    proc,
    cwd,
    createdAt: Date.now(),
    lastActivity: Date.now(),
    output: [],
    guardrailViolations: [],
  };

  sessions.set(sessionId, session);
  return session;
}

function destroySession(sessionId) {
  const session = sessions.get(sessionId);
  if (!session) return false;
  try { session.proc.kill('SIGTERM'); } catch {}
  setTimeout(() => {
    try { session.proc.kill('SIGKILL'); } catch {}
  }, 3000);
  sessions.delete(sessionId);
  return true;
}

function writeToTerminal(sessionId, data) {
  const session = sessions.get(sessionId);
  if (!session) return false;
  session.lastActivity = Date.now();
  session.proc.stdin.write(data);
  return true;
}

function executeCommand(sessionId, command) {
  const session = sessions.get(sessionId);
  if (!session) return { error: 'Session not found' };

  const guardrail = checkGuardrails(command);
  if (guardrail.blocked) {
    session.guardrailViolations.push({
      command,
      reasons: guardrail.reasons,
      timestamp: Date.now(),
    });
    return { blocked: true, reasons: guardrail.reasons };
  }

  session.lastActivity = Date.now();
  session.proc.stdin.write(command + '\n');
  return { ok: true, warnings: guardrail.warnings };
}

function getSession(sessionId) {
  return sessions.get(sessionId) || null;
}

function getStats() {
  let total = 0, active = 0;
  for (const s of sessions.values()) {
    total++;
    if (s.proc.exitCode === null) active++;
  }
  return { total, active };
}

setInterval(() => {
  const now = Date.now();
  for (const [id, s] of sessions) {
    if (s.proc.exitCode !== null) {
      sessions.delete(id);
      continue;
    }
    if (now - s.lastActivity > 3600000) {
      destroySession(id);
    }
  }
}, 60000);

module.exports = {
  createSession, destroySession, writeToTerminal,
  executeCommand, getSession, getStats, sessions,
};
