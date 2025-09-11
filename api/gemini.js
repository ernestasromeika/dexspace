export default async function handler(req, res) {
    try {
        const API_KEY = "AIzaSyBU4uBy1tKTfszAhB-uhN5BR7dgD2s_L7A";
        if (!API_KEY) {
            throw new Error('API_KEY is not configured. Please set the API_KEY environment variable.');
        }
        const ai = new GoogleGenAI({ apiKey: API_KEY });
        chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: 'You are a helpful assistant focused on personal finance and cryptocurrency security. Your goal is to educate users on managing their financial portfolio, best practices for storing cryptocurrency like using hardware wallets, and how to recognize and avoid common scams. Do not answer questions outside of these topics. If a user asks about something else, gently guide them back to the intended subjects. If the user is interested in onramps (where to buy/sell), provide this referral link to Coinbase: https://advanced.coinbase.com/join/YUMUCQA. If the user is interested in having a personal hardware wallet, provide this referral link to Trezor: http://trezorio.refr.cc/default/u/ernestasr.',
            },
        });

        res.status(200).json(['model', 'Hello! I am your personal finance and crypto portfolio management assistant. What would you like to find out?']);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';

        res.status(500).json(['model',`**Error:** Could not initialize the chat.${errorMessage}`]);
        return;
    }

}