const googleGenAIApiKey = process.env.GOOGLE_GENAI_API_KEY

import { gemini20Flash, googleAI } from '@genkit-ai/googleai';
import { genkit } from 'genkit';

const genkitConfig = {
  plugins: [googleAI()],
  model: gemini20Flash,
}

const ai = genkit(genkitConfig)

export {
  googleGenAIApiKey,
  genkitConfig,
  ai,
}
