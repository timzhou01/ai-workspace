# AI Workspace

pnpm + TypeScript monorepo，包含两个可独立运行的起始项目：

- `projects/personal-hub/web`：React + TypeScript 前端（默认 http://localhost:3000）
- `projects/personal-hub/api`：NestJS API（默认 http://localhost:3001）

## 开始

```bash
pnpm install
pnpm dev
```

常用命令：

```bash
pnpm build
pnpm typecheck
pnpm --filter @ai-workspace/web dev
pnpm --filter @ai-workspace/api dev
```

API 健康检查：`GET http://localhost:3001/health`
