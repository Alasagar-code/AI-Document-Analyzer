import axios from "axios";

/**
 * callOpenAIChat - use Chat Completions via axios
 * returns { raw, content }
 */
export const callOpenAIChat = async ({ messages, model = process.env.OPENAI_MODEL || "gpt-3.5-turbo", max_tokens = 1200 }) => {
  if (!process.env.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY not set in env");
  const payload = { model, messages, temperature: 0.2, max_tokens };
  const resp = await axios.post("https://api.openai.com/v1/chat/completions", payload, {
    headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
    timeout: 120000
  });
  const content = resp.data?.choices?.[0]?.message?.content;
  return { raw: resp.data, content };
};
