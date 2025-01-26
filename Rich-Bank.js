// List of accounts
const accounts = [
    { id: 1, owner: "Alice", balance: 500 },
    { id: 2, owner: "Bob", balance: 300 }
];

// Find an account by ID
function getAccountById(id) {
    const account = accounts.find(acc => acc.id === id);
    if (!account) {
        throw new Error(`Account with ID ${id} not found.`);
    }
    return account;
}

// Create a new account
function createAccount(newAccountId, newAccountOwner) {
    if (accounts.some(acc => acc.id === newAccountId)) {
        throw new Error(`Account with ID ${newAccountId} already exists.`);
    }
    if (!Number.isInteger(newAccountId) || newAccountId <= 0) {
        throw new Error("Account ID must be a positive integer.");
    }
    if (typeof newAccountOwner !== "string" || newAccountOwner.trim() === "") {
        throw new Error("Account owner must be a non-empty string.");
    }

    accounts.push({ id: newAccountId, owner: newAccountOwner, balance: 0 });
}

// Deposit money into an account
function depositMoney(accountId, amount) {
    const account = getAccountById(accountId);
    if (amount <= 0) {
        throw new Error("Deposit amount must be greater than 0.");
    }
    account.balance += amount;
}

// Withdraw money from an account
function withdrawMoney(accountId, amount) {
    const account = getAccountById(accountId);
    if (amount <= 0) {
        throw new Error("Withdrawal amount must be greater than 0.");
    }
    if (account.balance < amount) {
        throw new Error("Insufficient funds.");
    }
    account.balance -= amount;
}

// Transfer money between accounts
function transferMoney(fromAccountId, toAccountId, amount) {
    const fromAccount = getAccountById(fromAccountId);
    const toAccount = getAccountById(toAccountId);

    if (amount <= 0) {
        throw new Error("Transfer amount must be greater than 0.");
    }
    if (fromAccount.balance < amount) {
        throw new Error("Insufficient funds for transfer.");
    }

    fromAccount.balance -= amount;
    toAccount.balance += amount;
}

// Example usage
try {
    createAccount(3, "Charlie");
    depositMoney(3, 200);
    transferMoney(1, 3, 100);
    console.log(accounts);
} catch (error) {
    console.error(error.message);
}