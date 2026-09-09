import { useEffect, useState } from "react";
import { Bubble, Sender, Welcome } from "@ant-design/x";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, ConfigProvider, Layout, Typography } from "antd";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./App.css";

type ChatMessage = { content: string; key: string; role: "ai" | "user" };
type Dashboard = { content: string; description: string; title: string };
type PageId = "overview" | "profile" | "assets" | "transactions" | "resume";

const categories: Array<{ id: PageId; label: string }> = [
  { id: "overview", label: "总览" },
  { id: "profile", label: "个人资料" },
  { id: "assets", label: "资产账户" },
  { id: "transactions", label: "消费流水" },
  { id: "resume", label: "简历档案" },
];

const initialMessages: ChatMessage[] = [
  {
    key: "welcome",
    role: "ai",
    content: "你好，我是你的个人助手。你可以问我资产情况、更新个人资料，或记录一笔新的消费。",
  },
];

export function App(): React.JSX.Element {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [leftWidth, setLeftWidth] = useState(196);
  const [rightWidth, setRightWidth] = useState(440);
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [dashboardError, setDashboardError] = useState(false);
  const [selectedPage, setSelectedPage] = useState<PageId>("overview");

  useEffect(() => {
    async function loadDashboard(): Promise<void> {
      try {
        setDashboardError(false);
        const path = selectedPage === "overview" ? "dashboard" : `dashboard/${selectedPage}`;
        const response = await fetch(`http://127.0.0.1:3001/${path}`);
        if (!response.ok) throw new Error("Dashboard request failed");
        setDashboard(await response.json() as Dashboard);
      } catch {
        setDashboardError(true);
      }
    }

    void loadDashboard();
  }, [selectedPage]);

  function sendMessage(content: string): void {
    const message = content.trim();
    if (!message) return;

    setMessages((current) => [
      ...current,
      { key: crypto.randomUUID(), role: "user", content: message },
      {
        key: crypto.randomUUID(),
        role: "ai",
        content: "已收到。这是一个界面原型；连接 AI 后，我会先生成待确认的操作，再更新你的个人数据。",
      },
    ]);
  }

  function startResize(panel: "left" | "right", event: React.PointerEvent<HTMLDivElement>): void {
    event.preventDefault();

    function resize(moveEvent: PointerEvent): void {
      if (panel === "left") {
        setLeftWidth(Math.min(340, Math.max(160, moveEvent.clientX)));
        return;
      }

      setRightWidth(Math.min(620, Math.max(340, window.innerWidth - moveEvent.clientX)));
    }

    function stopResize(): void {
      document.removeEventListener("pointermove", resize);
      document.removeEventListener("pointerup", stopResize);
    }

    document.addEventListener("pointermove", resize);
    document.addEventListener("pointerup", stopResize);
  }

  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#2563eb", borderRadius: 12 } }}>
      <Layout className="app-shell">
        <Layout.Sider width={leftWidth} theme="light" className="category-panel">
          <div className="brand"><span className="brand-mark">P</span><span>Personal Hub</span></div>
          <div className="category-list"><Typography.Text type="secondary">我的数据</Typography.Text>{categories.map((category) => <span className={selectedPage === category.id ? "category-current" : undefined} key={category.id} onClick={() => setSelectedPage(category.id)}>{category.label}</span>)}</div>
          <div className="history-list"><Typography.Text type="secondary">最近聊天</Typography.Text><span className="history-current">本月支出分析</span><span>更新工作经历</span><span>记录信用卡消费</span><span>整理个人资料</span></div>
        </Layout.Sider>
        <div className="resize-handle left-resize-handle" onPointerDown={(event) => startResize("left", event)} />
        <Layout.Content className="main-panel">
          <section className="intro"><Avatar size={46} icon={<UserOutlined />} /><div><Typography.Title level={3}>{dashboard?.title ?? "正在加载"}</Typography.Title><Typography.Text type="secondary">{dashboard?.description ?? "正在从个人数据服务读取页面配置…"}</Typography.Text></div></section>

          {dashboard && <article className="markdown-content"><ReactMarkdown remarkPlugins={[remarkGfm]}>{dashboard.content}</ReactMarkdown></article>}
          {dashboardError && <Typography.Text type="secondary">暂时无法读取页面数据，请确认 API 服务已启动。</Typography.Text>}

        </Layout.Content>
        <div className="resize-handle right-resize-handle" onPointerDown={(event) => startResize("right", event)} />
        <aside className="chat-panel" style={{ flexBasis: rightWidth }}>
          <div className="chat-title"><div><Typography.Title level={4}>本月支出分析</Typography.Title><Typography.Text type="secondary">今天 · 自动保存</Typography.Text></div><span className="online-dot" /></div>
          <Welcome title="当前正在查看本月支出" description="继续提问，或直接告诉我需要记录的新信息。" />
          <div className="messages"><Bubble.List items={messages} role={{ ai: { placement: "start" }, user: { placement: "end" } }} /></div>
          <Sender placeholder="例如：今天信用卡消费了 200 元" onSubmit={sendMessage} />
          <Typography.Text type="secondary" className="chat-note">AI 会在写入数据前请求你的确认。</Typography.Text>
        </aside>
      </Layout>
    </ConfigProvider>
  );
}
