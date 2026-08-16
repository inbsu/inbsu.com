import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(url = "https://inbsu.com/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(url, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders Yu Hang's personal journal", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>与航 — 向前看<\/title>/);
  assert.match(html, /记录走过的路/);
  assert.match(html, /hello@inbsu\.com/);
  assert.match(html, /hero-yuhang-temple\.jpg/);
  assert.match(html, /与航和朋友在天坛前的手绘旅行合影/);
  assert.match(html, /MY APPS \/ 我的应用/);
  assert.match(html, /https:\/\/relay\.inbsu\.com/);
  assert.match(html, /https:\/\/photos\.inbsu\.com/);
  assert.match(html, /https:\/\/v\.inbsu\.com/);
  assert.match(html, /og-yuhang\.png/);
  assert.doesNotMatch(html, /林屿|linyu\.design/);
});

test("redirects www to the canonical apex domain", async () => {
  const response = await render("https://www.inbsu.com/travel?from=www");
  assert.equal(response.status, 301);
  assert.equal(
    response.headers.get("location"),
    "https://inbsu.com/travel?from=www",
  );
});

test("build emits a deployable Cloudflare Worker", async () => {
  const config = JSON.parse(
    await readFile(new URL("../dist/server/wrangler.json", import.meta.url), "utf8"),
  );

  assert.equal(config.name, "inbsu-com");
  assert.equal(config.main, "index.js");
  assert.equal(config.no_bundle, true);
  assert.deepEqual(config.compatibility_flags, ["nodejs_compat"]);
  assert.equal(config.assets.directory, "../client");
  assert.equal(config.assets.binding, "ASSETS");
  assert.deepEqual(config.routes, [
    { pattern: "inbsu.com", custom_domain: true },
    { pattern: "www.inbsu.com", custom_domain: true },
  ]);
});
