import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL_NAME = process.env.NEXT_PUBLIC_GEMINI_MODEL || 'gemini-2.0-flash';

let genAI: GoogleGenerativeAI | null = null;

function getGenAI() {
  if (!genAI) {
    if (!API_KEY) {
      console.warn('Gemini API key not configured, using mock responses');
      return null;
    }
    genAI = new GoogleGenerativeAI(API_KEY);
  }
  return genAI;
}

export async function callGemini(prompt: string, systemPrompt?: string, retries = 2): Promise<string> {
  try {
    const client = getGenAI();
    if (!client) {
      throw new Error('Gemini API not initialized');
    }

    const model = client.getGenerativeModel({ model: MODEL_NAME });

    const fullPrompt = systemPrompt ? `${systemPrompt}\n\n${prompt}` : prompt;

    const result = await model.generateContent(fullPrompt);
    const response = result.response;
    return response.text();
  } catch (error: any) {
    if (retries > 0 && error?.message?.includes('429')) {
      // Rate limited - wait and retry
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return callGemini(prompt, systemPrompt, retries - 1);
    }
    console.error('Gemini API error:', error);
    throw error;
  }
}

export async function structureProblem(problemText: string) {
  const systemPrompt = `You are an expert land governance policy analyst.
Convert the following natural language problem into a structured research problem.
Return ONLY valid JSON (no markdown, no comments).`;

  const prompt = `Problem: "${problemText}"

Return JSON with this exact structure (fill all fields):
{
  "theme": "urbanization|water|agriculture|climate|energy|mining",
  "geography": "string (district/region name in India)",
  "timePeriod": { "start": 2015, "end": 2026 },
  "landType": "string (e.g., Agricultural, Urban, Forest)",
  "potentialDrivers": ["string", "string", "string"],
  "potentialIndicators": ["string", "string", "string"],
  "researchQuestions": ["string", "string"]
}`;

  try {
    const result = await callGemini(prompt, systemPrompt);
    // Extract JSON from response (handle markdown code blocks)
    const jsonMatch = result.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return JSON.parse(result);
  } catch (error) {
    console.error('Error structuring problem:', error);
    return null;
  }
}

export async function synthesizeResearch(papers: any[]): Promise<any> {
  const prompt = `Analyze these research papers and extract key findings:
${papers.map((p) => `- ${p.title} (${p.year}): ${p.abstract}`).join('\n')}

Return JSON:
{
  "commonFindings": ["string"],
  "contradictions": ["string"],
  "methodologies": ["string"],
  "dataGaps": ["string"]
}`;

  try {
    const result = await callGemini(prompt);
    const jsonMatch = result.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return JSON.parse(result);
  } catch (error) {
    console.error('Error synthesizing research:', error);
    return null;
  }
}

export async function detectResearchGaps(researchCount: number, geography: string, topic: string): Promise<any> {
  const prompt = `As a research analyst, identify research gaps for:
Topic: ${topic}
Geography: ${geography}
Existing research count: ${researchCount}

Return JSON:
{
  "gapDescription": "string",
  "affectedGeographies": ["string"],
  "timeframeUncovered": ["string"],
  "importanceScore": 0-10,
  "suggestedResearch": "string"
}`;

  try {
    const result = await callGemini(prompt);
    const jsonMatch = result.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return JSON.parse(result);
  } catch (error) {
    console.error('Error detecting gaps:', error);
    return null;
  }
}

export async function generatePolicyBrief(evidence: any[], experiment: any): Promise<string> {
  const prompt = `Generate a policy brief based on:
Evidence: ${JSON.stringify(evidence)}
Experiment: ${experiment.proposedIntervention}

Provide citations for each claim.`;

  try {
    return await callGemini(prompt);
  } catch (error) {
    console.error('Error generating brief:', error);
    return '';
  }
}

// Fallback mock responses
export const MOCK_RESPONSES = {
  structuredProblem: {
    theme: 'urbanization',
    geography: 'Urban fringe regions, Maharashtra',
    timePeriod: { start: 2015, end: 2026 },
    landType: 'Agricultural',
    potentialDrivers: ['Population growth', 'Infrastructure expansion', 'Industrial development', 'Road connectivity'],
    potentialIndicators: ['Agricultural land loss', 'Built-up expansion', 'Population growth', 'Infrastructure density', 'Water stress', 'Flood vulnerability'],
    researchQuestions: ['What is the rate of agricultural land conversion?', 'What are the primary drivers of conversion?', 'What are the socio-economic impacts?'],
  },
  researchGap: {
    gapDescription: 'Post-2020 agricultural land conversion in rapidly growing Tier-2 urban regions',
    affectedGeographies: ['Pune', 'Nagpur', 'Aurangabad'],
    timeframeUncovered: ['2020-2026'],
    importanceScore: 8,
    suggestedResearch: 'Comparative analysis of Tier-1 vs Tier-2 urban expansion patterns',
  },
};
