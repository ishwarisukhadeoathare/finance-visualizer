import { useMemo } from "react";

export default function SummaryDashboard({ transactions }) {
  // Calculate total expenses
  const totalExpenses = useMemo(
    () => transactions.reduce((sum, txn) => sum + parseFloat(txn.amount), 0),
    [transactions]
  );

  // Find the highest spending category
  const categoryTotals = useMemo(() => {
    const totals = {};
    transactions.forEach((txn) => {
      if (!totals[txn.category]) totals[txn.category] = 0;
      totals[txn.category] += parseFloat(txn.amount);
    });
    return totals;
  }, [transactions]);

  const highestCategory = useMemo(() => {
    return Object.entries(categoryTotals).reduce(
      (max, [category, amount]) => (amount > max.amount ? { category, amount } : max),
      { category: "N/A", amount: 0 }
    );
  }, [categoryTotals]);

  // Get the most recent transaction
  const recentTransaction = useMemo(() => {
    return transactions.length
      ? transactions.reduce((latest, txn) => (new Date(txn.date) > new Date(latest.date) ? txn : latest), transactions[0])
      : null;
  }, [transactions]);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold text-center mb-4">Summary Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {/* Total Expenses Card */}
        <div className="p-4 bg-red-100 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Expenses</h3>
          <p className="text-2xl font-bold text-red-600">${totalExpenses.toFixed(2)}</p>
        </div>

        {/* Highest Spending Category Card */}
        <div className="p-4 bg-blue-100 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Top Category</h3>
          <p className="text-xl font-bold text-blue-600">{highestCategory.category}</p>
          <p className="text-lg">${highestCategory.amount.toFixed(2)}</p>
        </div>

        {/* Most Recent Transaction Card */}
        <div className="p-4 bg-green-100 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Latest Transaction</h3>
          {recentTransaction ? (
            <>
              <p className="font-bold">{recentTransaction.description}</p>
              <p>${parseFloat(recentTransaction.amount).toFixed(2)}</p>
              <p className="text-sm">{new Date(recentTransaction.date).toLocaleDateString()}</p>
            </>
          ) : (
            <p className="text-gray-500">No transactions yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
