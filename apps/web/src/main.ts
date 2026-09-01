const status = document.querySelector<HTMLParagraphElement>("#api-status");

async function checkApi(): Promise<void> {
  try {
    const response = await fetch("http://localhost:3001/health");
    if (!response.ok) throw new Error("API is unavailable");
    status!.textContent = "API 服务已连接。";
  } catch {
    status!.textContent = "API 服务未启动（请运行 pnpm dev）。";
  }
}

void checkApi();
