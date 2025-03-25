const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Database connection
mongoose.connect('mongodb://localhost:27017/moneytracking', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected..."))
    .catch(err => console.log(err));

// Define schemas
const transactionSchema = new mongoose.Schema({
    transactionId: String,
    name: String,
    type: String,
    amount: Number,
    category: String,
    date: { type: Date, default: Date.now }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

// API route to add a transaction
app.post('/api/transactions', (req, res) => {
    const newTransaction = new Transaction(req.body);
    newTransaction.save((err, transaction) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(transaction);
    });
});

// API route to get all transactions with optional date range filter
app.get('/api/transactions', (req, res) => {
    const { start, end, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const filter = {};

    if (start && end) {
        filter.date = { $gte: new Date(start), $lte: new Date(end) };
    }

    Transaction.find(filter)
        .skip(skip)
        .limit(parseInt(limit))
        .exec((err, transactions) => {
            if (err) return res.status(500).send(err);
            res.status(200).send(transactions);
        });
});

// API route to get transaction summary
app.get('/api/summary', (req, res) => {
    Transaction.aggregate([
        { 
            $group: {
                _id: '$type', 
                total: { $sum: '$amount' } 
            }
        }
    ], (err, summary) => {
        if (err) return res.status(500).send(err);
        const totals = { savings: 0, expenses: 0 };
        summary.forEach(item => {
            if (item._id === 'savings') {
                totals.savings = item.total;
            } else if (item._id === 'expense') {
                totals.expenses = item.total;
            }
        });
        res.status(200).send(totals);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


