# Expense Tracker Pro

## Overview
Expense Tracker Pro is a web application designed to help users manage their expenses and budgets efficiently. The application allows users to add transactions, view their financial summaries, and scan receipts for automatic data extraction.

## Project Structure
The project is organized into the following directories and files:

```
expense-tracker
├── public
│   └── index.html          # Main HTML entry point
├── src
│   ├── main.js             # Application initialization and flow management
│   ├── firebase.js         # Firebase configuration and initialization
│   ├── auth.js             # User authentication logic
│   ├── transactions.js      # Transaction management
│   ├── budgets.js           # Budget management
│   ├── receiptScan.js       # Receipt scanning functionality
│   ├── ui
│   │   ├── navigation.js    # Navigation logic
│   │   ├── modal.js         # Modal dialog functionality
│   │   ├── pages
│   │   │   ├── homePage.js  # Home page rendering
│   │   │   ├── addPage.js   # Add transaction page rendering
│   │   │   ├── scanPage.js   # Scan receipt page rendering
│   │   │   └── budgetPage.js # Budget page rendering
│   └── constants.js         # Constant values used throughout the application
├── package.json             # npm configuration file
└── README.md                # Project documentation
```

## Setup Instructions
1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd expense-tracker
   ```

2. **Install Dependencies**
   Make sure you have Node.js installed. Then run:
   ```bash
   npm install
   ```

3. **Firebase Configuration**
   Update the `firebase.js` file with your Firebase project configuration.

4. **Run the Application**
   You can use a local server to serve the `public/index.html` file. For example, you can use the `live-server` package:
   ```bash
   npx live-server public
   ```

## Usage
- **Home Page**: View recent transactions and financial summaries.
- **Add Transaction**: Add new transactions with details such as amount, description, and category.
- **Scan Receipt**: Upload receipt images to extract transaction details automatically.
- **Budget Page**: Manage and view your budgets, including progress tracking.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.