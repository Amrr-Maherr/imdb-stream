import { SYSTEM_PROMPT } from "../prompts/system-prompt";

type AiChatProps = {
    param: string
}
export default async function aiChat({ param }: AiChatProps) {
    try {
        const response = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_GROQ_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "openai/gpt-oss-120b",
                    messages: [
                        {
                            role: "user",
                            content: param,
                        },
                        {
                            role: "system",
                            content: SYSTEM_PROMPT,
                        },
                    ],
                    stream: false,
                }),
            }
        );
        return response
    } catch (error) {
        console.log(error);
    }
}