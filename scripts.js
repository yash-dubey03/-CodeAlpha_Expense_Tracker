document.addEventListener('DOMContentLoaded', () => {
    const expenseNameInput = document.getElementById('expense-name');
    const expenseAmountInput = document.getElementById('expense-amount');
    const addExpenseButton = document.getElementById('add-expense');
    const expensesList = document.getElementById('expenses');

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    addExpenseButton.addEventListener('click', addExpense);

    function addExpense() {
        const name = expenseNameInput.value;
        const amount = expenseAmountInput.value;

        if (name && amount) {
            const expense = {
                id: Date.now(),
                name,
                amount
            };

            expenses.push(expense);
            localStorage.setItem('expenses', JSON.stringify(expenses));
            renderExpenses();
            expenseNameInput.value = '';
            expenseAmountInput.value = '';
        }
    }

    function deleteExpense(id) {
        expenses = expenses.filter(expense => expense.id !== id);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
    }

    function renderExpenses() {
        expensesList.innerHTML = '';
        expenses.forEach(expense => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${expense.name}: ₹${expense.amount}
                <button onclick="deleteExpense(${expense.id})">Delete</button>
            `;
            expensesList.appendChild(li);
        });
    }

    window.deleteExpense = deleteExpense;

    renderExpenses();
});
