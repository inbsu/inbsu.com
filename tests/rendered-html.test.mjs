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
  assert.match(html, /足迹所至，岁月如流。/);
  assert.doesNotMatch(html, /hello@inbsu\.com|mailto:/);
  assert.match(html, /https:\/\/x\.com\/yuinbsu/);
  assert.match(html, /X · @yuinbsu ↗/);
  assert.match(html, /https:\/\/www\.youtube\.com\/@inbsu/);
  assert.match(html, /YouTube · @inbsu ↗/);
  assert.match(html, /hero-yuhang-temple\.jpg/);
  assert.match(html, /A hand-drawn travel portrait of Yu Hang/);
  assert.match(html, /MY APPS/);
  assert.match(html, /href="\/">Home<\/a>/);
  assert.doesNotMatch(html, /href="\/#top">Home<\/a>/);
  assert.match(html, /href="#about">About<\/a>/);
  assert.doesNotMatch(html, /data-future-path="\/cn"/);
  assert.doesNotMatch(html, />中文<\/button>/);
  assert.match(html, /https:\/\/relay\.inbsu\.com/);
  assert.match(html, /https:\/\/photos\.inbsu\.com/);
  assert.match(html, /https:\/\/v\.inbsu\.com/);
  assert.match(html, />Videos</);
  assert.match(html, /POWERED BY 3X-UI/);
  assert.match(html, /POWERED BY IMMICH/);
  assert.match(html, /POWERED BY JELLYFIN/);
  assert.match(html, /https:\/\/docs\.sanaei\.dev\//);
  assert.doesNotMatch(html, /https:\/\/github\.com\/MHSanaei\/3x-ui/);
  assert.match(html, /https:\/\/immich\.app\//);
  assert.match(html, /https:\/\/jellyfin\.org\//);
  assert.match(html, /Explore the world\./);
  assert.doesNotMatch(html, /Wander the World\./);
  assert.match(html, /Revisit the past\./);
  assert.match(html, /Hold what I love close\./);
  assert.doesNotMatch(html, /Revisit the Past\.|Hold What I Love Close\./);
  assert.match(html, />看世界<\/span>/);
  assert.match(html, />忆往昔<\/span>/);
  assert.match(html, />藏所爱<\/span>/);
  assert.doesNotMatch(html, /SELF-HOSTED/);
  assert.doesNotMatch(html, /A lightweight, self-hosted relay service|A self-hosted library for personal photos|A self-hosted library for video collections/);
  assert.doesNotMatch(html, /Media Library/);
  assert.match(html, />ABOUT<\/span>/);
  assert.match(html, /class="about-heading"/);
  assert.doesNotMatch(html, /ABOUT \/ 关于与航/);
  assert.match(html, /Vast as the world may be/);
  assert.match(html, /I keep moving toward the horizon/);
  assert.match(html, /Vast as the world may be,<br\/><em>I keep moving toward the horizon\.<\/em>/);
  assert.match(html, /纵天地巍峨，仍向远方行。/);
  assert.doesNotMatch(html, /在确定与不确定之间|认真生活/);
  assert.match(html, /我去过一些地方，也遇见过一些人。/);
  assert.match(html, /有些同行很久，有些只陪一程/);
  assert.match(html, /人生不必事事圆满。/);
  assert.match(html, /比起留下谁，我更在意留下些什么——/);
  assert.match(html, /class="about-signoff">向前看。/);
  assert.doesNotMatch(html, /此刻 \/ NOW|正在读|《远山淡影》|自由泳换气|大理 · 九月|循环播放|橘子海|最后更新/);
  assert.doesNotMatch(html, /人生或许不必|继续向前的理由|有些时刻并不轰轰烈烈|我用文字保存那些容易被忘记的部分|这个网站是我的公开笔记本/);
  assert.doesNotMatch(html, /在潮州，沿着韩江走到天黑/);
  assert.doesNotMatch(html, /把愿望写具体/);
  assert.doesNotMatch(html, /如果你也在路上/);
  assert.doesNotMatch(html, /向下读最近的文章/);
  assert.doesNotMatch(html, /Explore my apps/);
  assert.match(html, /31 JANUARY 2026/);
  assert.match(html, /Beijing, China/);
  assert.doesNotMatch(html, /ISSUE 0[18] · 2026/);
  assert.match(html, /INBSU\.COM · 向前看/);
  assert.match(html, /© 2026 与航/);
  assert.doesNotMatch(html, /© 2026 YU HANG/);
  assert.doesNotMatch(html, /记录走过的路|我的应用|向下看我的应用/);
  assert.doesNotMatch(html, /Email me|I’m Yu Hang|YU HANG'S PERSONAL NOTES|Three small tools I host and use myself/);
  assert.doesNotMatch(html, /LIFE · TRAVEL · PLANS IN PROGRESS|This is a place for small discoveries/);
  assert.doesNotMatch(html, /Built around everyday needs/);
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
