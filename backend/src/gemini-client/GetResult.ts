import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();
// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});
export async function GetResult(message: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: `You are an ai assistant which will generate an array of tasks based on summary provided by user below analyze his summary he provided below and then suggest the tasks that can be added into the todo list to manage his tasks according to his summary only provide the json object with key tasks and its value should be an array containing the tasks in tasks array must follow these guidelines and make sure that all tasks are seperated successfully and make sure that suggested tasks are with length of 15 at maximum this is the summary: ${message}`,
  });
  return response.text;
}
