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
  assert.match(html, /<html lang="en">/);
  assert.match(html, /Places I’ve been/);
  assert.match(html, /days as they unfold/);
  assert.doesNotMatch(html, /hello@inbsu\.com/);
  assert.match(html, /hero-yuhang-temple\.jpg/);
  assert.match(html, /A hand-drawn travel portrait of Yu Hang/);
  assert.match(html, /MY APPS/);
  assert.match(html, /data-future-path="\/cn"/);
  assert.match(html, />中文<\/button>/);
  assert.match(html, /https:\/\/relay\.inbsu\.com/);
  assert.match(html, /https:\/\/photos\.inbsu\.com/);
  assert.match(html, /https:\/\/v\.inbsu\.com/);
  assert.match(html, />Videos</);
  assert.doesNotMatch(html, /Media Library/);
  assert.doesNotMatch(html, /在潮州，沿着韩江走到天黑/);
  assert.doesNotMatch(html, /把愿望写具体/);
  assert.doesNotMatch(html, /如果你也在路上/);
  assert.doesNotMatch(html, /向下读最近的文章/);
  assert.match(html, /Explore my apps/);
  assert.match(html, /INBSU\.COM · 向前看/);
  assert.doesNotMatch(html, /记录走过的路|我的应用|向下看我的应用/);
  assert.doesNotMatch(html, /Email me|I’m Yu Hang|YU HANG'S PERSONAL NOTES|Three small tools I host and use myself/);
  assert.doesNotMatch(html, /LIFE · TRAVEL · PLANS IN PROGRESS|This is a place for small discoveries/);
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
