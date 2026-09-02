import { useEffect, useState } from "react";

type ApiStatus = "checking" | "connected" | "unavailable";

export function App(): React.JSX.Element {
  const [apiStatus, setApiStatus] = useState<ApiStatus>("checking");

  useEffect(() => {
    async function checkApi(): Promise<void> {
      try {
        const response = await fetch("http://localhost:3001/health");
        setApiStatus(response.ok ? "connected" : "unavailable");
      } catch {
        setApiStatus("unavailable");
      }
    }

    void checkApi();
  }, []);

  const messages: Record<ApiStatus, string> = {
    checking: "正在检查 Nest API 服务…",
    connected: "Nest API 服务已连接。",
    unavailable: "Nest API 服务未启动（请运行 pnpm dev）。",
  };

  return (
    <main>
      <h1>AI Workspace</h1>
      <p>{messages[apiStatus]}</p>
    </main>
  );
}
