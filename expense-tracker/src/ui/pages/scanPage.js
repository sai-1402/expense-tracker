function renderScanPage() {
    const scanPageHTML = `
        <div class="max-w-2xl mx-auto text-center">
            <h2 class="text-2xl font-bold mb-4">Scan Receipt</h2>
            <p class="text-slate-500 mb-8">Upload an image of your receipt to automatically extract the details.</p>
            <div class="relative border-2 border-dashed border-slate-300 rounded-2xl p-8 hover:border-violet-400 hover:bg-violet-50 transition-colors">
                <input type="file" id="receipt-upload" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*">
                <div class="flex flex-col items-center text-slate-500 pointer-events-none">
                    <span class="material-symbols-outlined text-6xl text-violet-500">upload_file</span>
                    <p class="mt-2 font-semibold">Click to upload or drag & drop</p>
                    <p class="text-sm">PNG, JPG, or WEBP</p>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('scan-page').innerHTML = scanPageHTML;
    document.getElementById('receipt-upload').addEventListener('change', handleReceiptUpload);
}

async function handleReceiptUpload(event) {
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
    const geminiApiKey = "YOUR_GEMINI_API_KEY"; // Replace with your actual API key
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
        document.getElementById('modal').classList.add('hidden');
        showPage('add', {
            amount: data.amount || '',
            description: data.description || 'Scanned Item',
            category: data.category || 'Other',
            date: new Date().toISOString().split('T')[0]
        });
    } catch (error) {
        console.error('Error processing receipt:', error);
        showModal('Scan Failed', '<p>Sorry, I couldn\'t read the details from that receipt. Please enter them manually.</p>');
    }
}

export { renderScanPage };