import OpenAI from "openai";

// SDK 默认从 OPENAI_API_KEY 环境变量读取密钥
const client = new OpenAI();

// 通过 Responses API 发起最小模型调用
const response = await client.responses.create({
  model: "gpt-5.6",
  input: "用一句话解释什么是 AI Application Engineering。",
});

console.log(response.output_text);