import { Controller, Get, NotFoundException, Param } from "@nestjs/common";

const pages = {
  overview: {
    title: "我的空间",
    description: "个人资料、资产与职业记录，随时可由助手帮你整理。",
    content: "## 资产概览\n\n| 项目 | 金额 | 状态 |\n| --- | ---: | --- |\n| 总资产 | ¥328,650 | 正常 |\n| 现金及活期 | ¥86,420 | 3 个账户 |\n| 本月支出 | ¥6,280 | 较上月减少 8% |\n\n## 最近更新\n\n- 昨天更新了简历档案\n- 今天同步了资产账户\n\n> 你可以通过右侧对话，让助手修改或重新组织此页面。",
  },
  profile: {
    title: "个人资料",
    description: "这是你的基础个人信息。",
    content: "## 基本信息\n\n| 字段 | 内容 |\n| --- | --- |\n| 姓名 | 我的个人档案 |\n| 职业 | 全栈工程师 |\n| 所在地 | 新加坡 |\n\n## 个人简介\n\n持续建设可长期维护的个人数据与 AI 工作台。",
  },
  assets: {
    title: "资产账户",
    description: "汇总你的账户余额与资产分布。",
    content: "## 账户概览\n\n| 账户 | 类型 | 余额 |\n| --- | --- | ---: |\n| 招商银行 | 活期 | ¥42,300 |\n| 支付宝 | 余额 | ¥8,120 |\n| 证券账户 | 投资 | ¥192,650 |\n\n## 资产分布\n\n- 现金及活期：¥86,420\n- 投资资产：¥192,650\n- 其他资产：¥49,580",
  },
  transactions: {
    title: "消费流水",
    description: "查看最近的收入、消费与资产变动。",
    content: "## 本月流水\n\n| 日期 | 分类 | 金额 | 备注 |\n| --- | --- | ---: | --- |\n| 09-03 | 餐饮 | -¥68 | 午餐 |\n| 09-02 | 交通 | -¥24 | 地铁 |\n| 09-01 | 收入 | +¥12,000 | 工资 |\n\n> 通过对话说“记录一笔消费”，助手会先生成待确认流水。",
  },
  resume: {
    title: "简历档案",
    description: "维护你的职业经历、项目成果和技能。",
    content: "## 当前职位\n\n**全栈工程师**  \n专注于 TypeScript、AI 应用工程与产品交付。\n\n## 核心技能\n\n- TypeScript / React / NestJS\n- AI Application Engineering\n- 系统设计与全栈开发\n\n## 最近更新\n\n昨天更新了工作经历描述。",
  },
} as const;

@Controller("dashboard")
export class DashboardController {
  @Get()
  getDashboard() {
    return pages.overview;
  }

  @Get(":pageId")
  getPage(@Param("pageId") pageId: string) {
    const page = pages[pageId as keyof typeof pages];
    if (!page) throw new NotFoundException(`Unknown dashboard page: ${pageId}`);
    return page;
  }
}
