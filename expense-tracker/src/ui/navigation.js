// File: /expense-tracker/expense-tracker/src/ui/navigation.js

export function showPage(pageName, data = {}) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const pageId = `${pageName}-page`;
    const pageElement = document.getElementById(pageId);
    const navElement = document.querySelector(`.nav-item[onclick="showPage('${pageName}')"]`);
    
    if (pageElement) {
        pageElement.classList.add('active');
        if (pageName === 'home') renderHomePage();
        else if (pageName === 'add') renderAddPage(data);
        else if (pageName === 'scan') renderScanPage();
        else if (pageName === 'budget') renderBudgetPage();
    }
    
    if (navElement) navElement.classList.add('active');
    
    let titleText = 'Home';
    if (pageName === 'add') titleText = data.id ? 'Edit Transaction' : 'Add Transaction';
    else if (pageName !== 'home') titleText = pageName.charAt(0).toUpperCase() + pageName.slice(1);
    
    document.getElementById('page-title').textContent = titleText;
}