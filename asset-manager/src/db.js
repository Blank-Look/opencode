const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');
const config = require('./config');

const dbDir = path.dirname(config.dbPath);
if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });

const db = new Database(config.dbPath);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS asset_types (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT    NOT NULL UNIQUE,
    icon        TEXT    DEFAULT '📦',
    description TEXT,
    created_at  TEXT    DEFAULT (datetime('now')),
    updated_at  TEXT    DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS sources (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT    NOT NULL UNIQUE,
    display_name TEXT   NOT NULL,
    description TEXT,
    enabled     INTEGER DEFAULT 1,
    config      TEXT,
    created_at  TEXT    DEFAULT (datetime('now')),
    updated_at  TEXT    DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS owners (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT    NOT NULL,
    email       TEXT    UNIQUE,
    initials    TEXT,
    department  TEXT,
    created_at  TEXT    DEFAULT (datetime('now')),
    updated_at  TEXT    DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS assets (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    external_id TEXT,
    name        TEXT    NOT NULL,
    description TEXT,
    asset_type_id INTEGER REFERENCES asset_types(id),
    source_id   INTEGER REFERENCES sources(id),
    status      TEXT    CHECK(status IN ('active','inactive','unknown')) DEFAULT 'unknown',
    owner_id    INTEGER REFERENCES owners(id),
    category    TEXT,
    last_seen   TEXT,
    metadata    TEXT,
    created_at  TEXT    DEFAULT (datetime('now')),
    updated_at  TEXT    DEFAULT (datetime('now'))
  );

  CREATE INDEX IF NOT EXISTS idx_assets_source ON assets(source_id);
  CREATE INDEX IF NOT EXISTS idx_assets_type ON assets(asset_type_id);
  CREATE INDEX IF NOT EXISTS idx_assets_owner ON assets(owner_id);
  CREATE INDEX IF NOT EXISTS idx_assets_status ON assets(status);
  CREATE UNIQUE INDEX IF NOT EXISTS idx_assets_external ON assets(external_id, source_id);

  CREATE TABLE IF NOT EXISTS sync_jobs (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT    NOT NULL,
    source_id   INTEGER REFERENCES sources(id),
    schedule    TEXT,
    enabled     INTEGER DEFAULT 1,
    last_run_at TEXT,
    last_status TEXT,
    config      TEXT,
    created_at  TEXT    DEFAULT (datetime('now')),
    updated_at  TEXT    DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS sync_logs (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    job_id        INTEGER REFERENCES sync_jobs(id),
    started_at    TEXT    NOT NULL,
    ended_at      TEXT,
    status        TEXT    CHECK(status IN ('running','completed','failed')) DEFAULT 'running',
    assets_added  INTEGER DEFAULT 0,
    assets_updated INTEGER DEFAULT 0,
    assets_removed INTEGER DEFAULT 0,
    error_message TEXT,
    details       TEXT,
    created_at    TEXT    DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS business_rules (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    name           TEXT    NOT NULL,
    description    TEXT,
    asset_type_id  INTEGER REFERENCES asset_types(id),
    source_id      INTEGER REFERENCES sources(id),
    condition_type TEXT    NOT NULL,
    condition_config TEXT  NOT NULL,
    action_type    TEXT    NOT NULL,
    action_config  TEXT,
    enabled        INTEGER DEFAULT 1,
    created_at     TEXT    DEFAULT (datetime('now')),
    updated_at     TEXT    DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS sessions (
    sid       TEXT PRIMARY KEY,
    data      TEXT,
    expires   TEXT
  );
`);

module.exports = db;
