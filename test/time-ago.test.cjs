const { strict: assert } = require("node:assert");
const { test } = require("node:test");
const { timeAgo } = require("../dist/index.js");

test("1 week ago (numeric)", () => {
  const now = Date.parse("2026-01-15T12:00:00.000Z");
  const past = now - 7 * 24 * 60 * 60 * 1000;
  assert.equal(timeAgo(past, { now }), "1 week ago");
});

test("one week ago (words)", () => {
  const now = Date.parse("2026-01-15T12:00:00.000Z");
  const past = now - 7 * 24 * 60 * 60 * 1000;
  assert.equal(timeAgo(past, { now, numberStyle: "words" }), "one week ago");
});

test("3 months ago (numeric)", () => {
  const now = Date.parse("2026-04-15T12:00:00.000Z");
  const past = now - 90 * 24 * 60 * 60 * 1000;
  assert.equal(timeAgo(past, { now }), "3 months ago");
});

test("three months ago (words)", () => {
  const now = Date.parse("2026-04-15T12:00:00.000Z");
  const past = now - 90 * 24 * 60 * 60 * 1000;
  assert.equal(timeAgo(past, { now, numberStyle: "words" }), "three months ago");
});

test("future timestamp throws", () => {
  const now = Date.now();
  assert.throws(() => timeAgo(now + 60_000, { now }), RangeError);
});
