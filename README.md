# inbsu.com

与航的个人生活志，记录生活、旅行和一些正在发生的计划。

## 技术结构

- Vinext + React
- Cloudflare Vite plugin
- Cloudflare Workers + Static Assets
- GitHub Actions 持续部署

## 本地开发

需要 Node.js 22.13 或更高版本。

```bash
npm ci
npm run dev
```

## 验证

```bash
npm test
```

测试会重新构建站点，并确认首页内容、分享信息和 Cloudflare Worker
部署产物均正确生成。

## 部署到 Cloudflare Workers

首次启用 GitHub Actions 前，在仓库的 `Settings → Secrets and variables → Actions`
中添加：

- `CLOUDFLARE_API_TOKEN`：具有 Workers Scripts 编辑权限的 Cloudflare API Token
- `CLOUDFLARE_ACCOUNT_ID`：Cloudflare Account ID

合并到 `main` 后，`.github/workflows/deploy-cloudflare.yml` 会自动测试并部署。
如果尚未添加上述两个 Secrets，工作流只运行构建与测试，不会尝试部署。
也可以手动执行：

```bash
npm run deploy
```

为了避免切换期间中断访问，自定义域名 `inbsu.com` 暂不写入 Worker
配置。先确认 `workers.dev` 地址正常，再把域名从原托管服务切换到新 Worker。
