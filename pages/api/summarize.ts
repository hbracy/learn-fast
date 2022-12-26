import type { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

type ResponseData = {
  summary: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const { body }: { body: { text: string } } = req;
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  const response: string = (await openai.createCompletion({
    model: 'text-davinci-003',
    // eslint-disable-next-line max-len
    prompt: `Summarize the following into multiple bullet points using \u2022. Prefer bullet points over semicolons: ${body.text}`,
    temperature: 0.6,
    max_tokens: 200,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
    n: 1,
  })).data.choices[0].text || '';

  res.status(200).json({ summary: response });
}
