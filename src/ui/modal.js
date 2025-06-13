export function showModal(title, content, showCloseButton = true) {
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modal-content');
  modalContent.innerHTML = `<div class="flex justify-between items-center mb-4"><h2 class="text-xl font-bold">${title}</h2>${showCloseButton ? '<button id="modal-close-btn" class="p-1 text-2xl leading-none text-slate-500 hover:text-slate-800">&times;</button>' : ''}</div><div>${content}</div>`;
  modal.classList.remove('hidden');
  if(showCloseButton) {
    document.getElementById('modal-close-btn').onclick = () => modal.classList.add('hidden');
  }
}
