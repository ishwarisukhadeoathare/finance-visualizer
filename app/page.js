"use client"; // Ensuring React hooks work properly

import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import ExpenseChart from "../components/ExpenseChart";
import CategoryChart from "../components/CategoryChart";
import SummaryDashboard from "../components/SummaryDashboard";

export default function Home() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await fetch("/api/transactions");
      const data = await res.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  return (
    <div className="container py-5 bg-light min-vh-100">
      {/* Header Section */}
      <header className="text-center mb-4">
        <h1 className="display-5 fw-bold text-primary">Personal Finance Tracker</h1>
        <p className="lead text-secondary">Manage your expenses efficiently</p>
      </header>

      {/* Dashboard Section */}
      <div className="row g-4">
        <div className="col-lg-4 col-md-6">
          <SummaryDashboard transactions={transactions} />
        </div>
        <div className="col-lg-4 col-md-6">
          <ExpenseChart transactions={transactions} />
        </div>
        <div className="col-lg-4 col-md-6">
          <CategoryChart transactions={transactions} />
        </div>
      </div>

      {/* Transaction Form */}
      <div className="card shadow-lg mt-5 p-4">
        <h3 className="text-center text-dark">Add New Transaction</h3>
        <TransactionForm onAddTransaction={fetchTransactions} />
      </div>

      {/* Transaction List */}
      <div className="card shadow-lg mt-5 p-4">
        <h3 className="text-center text-dark">Transaction History</h3>
        <TransactionList transactions={transactions} fetchTransactions={fetchTransactions} />
      </div>
    </div>
  );
}
