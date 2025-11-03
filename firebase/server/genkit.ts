"use server"

const googleGenAIApiKey = process.env.GOOGLE_GENAI_API_KEY

import { gemini20Flash, googleAI } from '@genkit-ai/googleai';
import { genkit, z } from 'genkit';

const genkitConfig = {
  plugins: [googleAI()],
  model: gemini20Flash,
}

const ai = genkit(genkitConfig)

const menuSuggestionFlow = ai.defineFlow(
  {
    name: 'menuSuggestionFlow',
    inputSchema: z.object({ theme: z.string() }),
    outputSchema: z.object({ menuItem: z.string() }),
    streamSchema: z.string(),
  },
  async ({ theme }, { sendChunk }) => {
    const { stream, response } = ai.generateStream({
      model: googleAI.model('gemini-2.5-flash'),
      prompt: `Invent a menu item for a ${theme} themed restaurant.`,
    });

    for await (const chunk of stream) {
      sendChunk(chunk.text);
    }

    const { text } = await response;
    return { menuItem: text };
  }
);


export {
  menuSuggestionFlow
}
