import React from 'react';


const reports = [
  { id: 1, name: 'Sales Report – July', date: '2025-08-01' },
  { id: 2, name: 'Inventory Report', date: '2025-08-05' },
  { id: 3, name: 'Customer Growth Report', date: '2025-08-07' },
];

function Reports() {
  const handleDownloadReport = (rep) => {
    alert(`Downloading: ${rep.name}`);
  };

  return (
    <section>
      <h2>📊 Reports</h2>
      <p>Download and analyze sales reports.</p>
      <ul className="report-list">
        {reports.map(rep => (
          <li key={rep.id}>
            {rep.name} – <small>{rep.date}</small>
            <button className="btn-small btn-download" onClick={() => handleDownloadReport(rep)}>Download CSV</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Reports;
