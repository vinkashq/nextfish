import { googleAI } from '@genkit-ai/googleai';
import { genkit } from 'genkit/beta';

const DEFAULT_CHATBOT_MODEL = 'gemini-2.5-flash'

const defaultChatbotConfig = {
  plugins: [googleAI()],
  model: googleAI.model(DEFAULT_CHATBOT_MODEL)
}

const googleChatbot = genkit(defaultChatbotConfig)
googleChatbot.chat()

export default googleChatbot
