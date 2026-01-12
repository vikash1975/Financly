

import React, { useState } from "react";
import { Radio, Select, Table } from "antd";
import { unparse, parse } from "papaparse";
import searchImg from "../../assets/search.png";

const { Option } = Select;

function TransactionsTable({ transactions, setTransactions }) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortKey, setSortKey] = useState("");

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    { title: "Tag", dataIndex: "tag", key: "tag" },
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "Date", dataIndex: "date", key: "date" },
  ];

  //  Filter
  const filteredTransactions = transactions.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      (typeFilter === "all" || item.type === typeFilter)
  );

  //  Sort
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortKey === "date") return new Date(a.date) - new Date(b.date);
    if (sortKey === "amount") return a.amount - b.amount;
    return 0;
  });

  //  Export CSV
  function exportCSV() {
    const csv = unparse({
      fields: ["name", "type", "tag", "date", "amount"],
      data: transactions,
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  //  Import CSV
  function importFromCSV(e) {
    const file = e.target.files[0];
    if (!file) return;

    parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const importedData = results.data.map((item, index) => ({
          ...item,
          amount: Number(item.amount),
          id: item.id || Date.now() + index,
        }));

        setTransactions((prev) => [...prev, ...importedData]);
      },
    });
  }

  return (
    <div style={{ width: "97%", padding: "0rem 2rem" }}>
      {/* Search + Filter */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <div className="input-flex">
          {searchImg && <img src={searchImg} width="16" alt="search" />}
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search By Name"
          />
        </div>

        <Select
          className="select-input"
          value={typeFilter}
          onChange={setTypeFilter}
        >
          <Option value="all">All</Option>
          <Option value="income">Income</Option>
          <Option value="expense">Expense</Option>
        </Select>
      </div>

      {/* Table */}
      <div className="my-table">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <h2 style={{ margin: 0 }}>My Transactions</h2>

        
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Radio.Group
              className="input-radio"
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
            >
              <Radio.Button value="">No Sort</Radio.Button>
              <Radio.Button value="date">Sort By Date</Radio.Button>
              <Radio.Button value="amount">Sort By Amount</Radio.Button>
            </Radio.Group>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
            <button className="btn" onClick={exportCSV}>
              Export CSV
            </button>

            <label htmlFor="file-csv" className="btn btn-blue">
              Import CSV
            </label>
            <input
              id="file-csv"
              type="file"
              accept=".csv"
              hidden
              onChange={importFromCSV}
            />
          </div>
        </div>

        <Table
          rowKey="id"
          dataSource={sortedTransactions}
          columns={columns}
        />
      </div>
    </div>
  );
}

export default TransactionsTable;
