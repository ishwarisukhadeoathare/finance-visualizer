import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Define colors for the pie chart
const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff6b6b", "#a29bfe", "#fd79a8"];

// Function to group transactions by category
const groupTransactionsByCategory = (transactions) => {
  const grouped = {};

  transactions.forEach((txn) => {
    if (!grouped[txn.category]) grouped[txn.category] = 0;
    grouped[txn.category] += parseFloat(txn.amount);
  });

  return Object.entries(grouped).map(([name, value]) => ({ name, value }));
};

export default function CategoryChart({ transactions }) {
  const data = groupTransactionsByCategory(transactions);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-2 text-center">Spending by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
