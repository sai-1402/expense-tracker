import { handleReceiptUpload } from "../../receiptScan.js";

export function renderScanPage() {
  document.getElementById('scan-page').innerHTML = `
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
  document.getElementById('receipt-upload').addEventListener('change', handleReceiptUpload);
}
