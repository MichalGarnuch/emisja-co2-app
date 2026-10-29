import { readFile, stat } from "node:fs/promises";
import { createReadStream } from "node:fs";
import { createHash } from "node:crypto";
import { resolve, relative, sep } from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";
export async function verifyRelease(root, entries) {
  const errors = [];
  const base = resolve(root);
  for (const item of entries) {
    const path = resolve(base, item.path);
    const rel = relative(base, path);
    if (
      rel === ".." ||
      rel.startsWith(".." + sep) ||
      !rel ||
      !Number.isSafeInteger(item.bytes) ||
      item.bytes < 0 ||
      !/^[a-f0-9]{64}$/.test(item.sha256)
    ) {
      errors.push("Invalid manifest entry");
      continue;
    }
    try {
      const info = await stat(path);
      if (!info.isFile() || info.size !== item.bytes)
        throw Error("size mismatch");
      const hash = createHash("sha256");
      for await (const chunk of createReadStream(path)) hash.update(chunk);
      if (hash.digest("hex") !== item.sha256) throw Error("digest mismatch");
    } catch {
      errors.push(`Missing or changed runtime file: ${item.path}`);
    }
  }
  return errors;
}
if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  const root = new URL("../", import.meta.url);
  const manifest = JSON.parse(
    await readFile(new URL("release-manifest.json", root), "utf8"),
  );
  const errors = await verifyRelease(fileURLToPath(root), manifest.files);
  for (const e of errors) console.error(e);
  if (errors.length) process.exitCode = 1;
  else console.log(`Verified ${manifest.files.length} runtime files`);
}
