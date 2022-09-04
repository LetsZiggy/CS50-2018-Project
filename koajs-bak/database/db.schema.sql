CREATE TABLE `users` (
  `id`            INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
  `username`      TEXT    NOT NULL                           UNIQUE DEFAULT "",
  `hash_password` TEXT    NOT NULL                                  DEFAULT "",
  `hash_email`    TEXT    NOT NULL                                  DEFAULT ""
);

CREATE TABLE `rooms` (
  `id`       INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
  `owner`    TEXT    NOT NULL                                  DEFAULT "",
  `name`     TEXT    NOT NULL                                  DEFAULT "",
  `visible`  INTEGER NOT NULL                                  DEFAULT 0,
  `passcode` TEXT                                              DEFAULT "",
  `maxUsers` INTEGER                                           DEFAULT 4,
  `users`    TEXT                                              DEFAULT ""
);

CREATE TABLE `messages` (
  `id`    INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
  `room`  INTEGER NOT NULL                                  DEFAULT 0,
  `owner` INTEGER NOT NULL                                  DEFAULT 0,
  `utc`   INTEGER NOT NULL                                  DEFAULT 0,
  `title` TEXT                                              DEFAULT "",
  `text`  TEXT                                              DEFAULT ""
);

CREATE TABLE `macros` (
  `id`          INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
  `room`        INTEGER NOT NULL                                  DEFAULT 0,
  `owner`       INTEGER NOT NULL                                  DEFAULT 0,
  `title`       TEXT                                              DEFAULT "",
  `description` TEXT                                              DEFAULT "",
  `calculation` TEXT                                              DEFAULT ""
);
