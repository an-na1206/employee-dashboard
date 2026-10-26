
import { useEffect, useState } from 'react';

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch employee data');
        }
        return response.json();
      })
      .then((data) => setEmployees(data))
      .catch(() => setError('Could not load employees. Please refresh the page.'))
      .finally(() => setLoading(false));
  }, []);

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(search.toLowerCase()) ||
    employee.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <p className="eyebrow">EMPLOYEE MANAGEMENT</p>
          <h1>Dashboard</h1>
          <p className="subtitle">
            View and manage your employee directory.
          </p>
        </div>
        <div className="dashboard-icon">ED</div>
      </div>

      <div className="stats-card">
        <div className="stats-icon">👥</div>
        <div>
          <p>Total Employees</p>
          <h2>{loading ? '...' : employees.length}</h2>
        </div>
      </div>

      <div className="table-card">
        <div className="table-heading">
          <div>
            <h2>Employee Directory</h2>
            <p>Employee details and contact information</p>
          </div>

          <input
            className="search-input"
            type="text"
            placeholder="Search name or email..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search employees"
          />
        </div>

        {loading ? (
          <p className="message">Loading employees...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="table-responsive">
            <table className="employee-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Employee Name</th>
                  <th>Email Address</th>
                </tr>
              </thead>

              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td>
                      <span className="employee-id">
                        {String(employee.id).padStart(2, '0')}
                      </span>
                    </td>
                    <td>
                      <div className="employee-name">
                        <span className="avatar">
                          {employee.name.charAt(0)}
                        </span>
                        <span>{employee.name}</span>
                      </div>
                    </td>
                    <td className="email-cell">{employee.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredEmployees.length === 0 && (
              <p className="message">No matching employees found.</p>
            )}
          </div>
        )}

        <div className="table-footer">
          Showing {filteredEmployees.length} of {employees.length} employees
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
