"use server"

const googleGenAIApiKey = process.env.GOOGLE_GENAI_API_KEY

import { gemini20Flash, googleAI } from '@genkit-ai/googleai';

const genkitConfig = {
  plugins: [googleAI()],
  model: gemini20Flash,
}

export {
  googleGenAIApiKey,
  genkitConfig
}
