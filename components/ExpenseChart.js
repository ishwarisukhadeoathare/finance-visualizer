import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Function to group transactions by month
const groupTransactionsByMonth = (transactions) => {
  const grouped = {};

  transactions.forEach((txn) => {
    const month = new Date(txn.date).toLocaleString("default", { month: "short", year: "numeric" });
    if (!grouped[month]) grouped[month] = 0;
    grouped[month] += txn.amount;
  });

  return Object.entries(grouped).map(([name, amount]) => ({ name, amount }));
};

export default function ExpenseChart({ transactions }) {
  const data = groupTransactionsByMonth(transactions);

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-2">Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
