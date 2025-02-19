export default function TransactionList({ transactions, fetchTransactions }) {
  const handleDelete = async (id) => {
    await fetch(`/api/transactions?id=${id}`, { method: "DELETE" });
    fetchTransactions();
  };

  return (
    <div className="p-4 shadow-lg bg-white rounded-lg">
      <h3 className="text-lg font-bold mb-2">Transaction History</h3>
      <ul className="list-group">
        {transactions.map((t) => (
          <li key={t._id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>
              {t.description} - <strong>${t.amount}</strong> ({t.category})
            </span>
            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(t._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
