import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createHash } from "node:crypto";
import { verifyRelease } from "./verify-release.mjs";
test("detects altered bytes and rejects escaping manifest paths", async () => {
  const root = await mkdtemp(join(tmpdir(), "release-"));
  try {
    await writeFile(join(root, "app.js"), "ok");
    const item = {
      path: "app.js",
      bytes: 2,
      sha256: createHash("sha256").update("ok").digest("hex"),
    };
    assert.deepEqual(await verifyRelease(root, [item]), []);
    await writeFile(join(root, "app.js"), "no");
    assert.equal((await verifyRelease(root, [item])).length, 1);
    assert.equal(
      (await verifyRelease(root, [{ ...item, path: "../outside" }])).length,
      1,
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
