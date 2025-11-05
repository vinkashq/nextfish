import { googleAI } from '@genkit-ai/google-genai';
import { genkit } from 'genkit';

const DEFAULT_GEMINI_MODEL = 'gemini-2.5-flash'

const defaultGeminiConfig = {
  plugins: [googleAI()],
  model: googleAI.model(DEFAULT_GEMINI_MODEL)
}

const googleGemini = genkit(defaultGeminiConfig)

export default googleGemini
