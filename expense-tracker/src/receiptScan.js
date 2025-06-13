// src/receiptScan.js

import { showModal } from './ui/modal.js';
import { geminiApiKey } from './constants.js';

export function handleReceiptUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
        const base64ImageData = e.target.result.split(',')[1];
        showModal('Scanning...', `<div class="text-center"><div class="animate-spin rounded-full h-16 w-16 border-b-2 border-violet-600 mx-auto"></div><p class="mt-4 text-slate-600">Analyzing receipt, please wait...</p></div>`, false);
        await extractDataFromReceipt(base64ImageData);
    };
    reader.readAsDataURL(file);
}

async function extractDataFromReceipt(base64ImageData) {
    if (!geminiApiKey || geminiApiKey.includes("PASTE_YOUR")) {
        showModal('Configuration Needed', '<p>The receipt scanning feature is not configured. Please add your Gemini API key to the constants.js file.</p>');
        return;
    }
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`;
    const prompt = `Analyze this receipt image and extract the total amount, the merchant name or a brief description, and suggest a category.`;

    const payload = {
        contents: [{
            parts: [
                { text: prompt },
                { inlineData: { mimeType: "image/png", data: base64ImageData } }
            ]
        }],
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
                type: "OBJECT",
                properties: {
                    "amount": { "type": "NUMBER" },
                    "description": { "type": "STRING" },
                    "category": { "type": "STRING" }
                },
                required: ["amount", "description", "category"]
            }
        }
    };

    try {
        const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
        const result = await response.json();
        const text = result.candidates[0].content.parts[0].text;
        const data = JSON.parse(text);
        showModal('Success!', `<p>Receipt processed successfully. Amount: ${data.amount}, Description: ${data.description}, Category: ${data.category}</p>`);
    } catch (error) {
        console.error('Error processing receipt:', error);
        showModal('Scan Failed', '<p>Sorry, I couldn\'t read the details from that receipt. Please enter them manually.</p>');
    }
}