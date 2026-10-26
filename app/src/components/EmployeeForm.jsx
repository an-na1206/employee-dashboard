
import { useState } from 'react';

function EmployeeForm() {
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    location: '',
    salary: ''
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    alert('Employee form submitted successfully!');
    console.log('Employee Details:', formData);
  }

  return (
    <div className="form-page">
      <div className="form-card">
        <p className="eyebrow">EMPLOYEE MANAGEMENT</p>

        <h1>Register Employee</h1>

        <p className="form-description">
          Enter the employee details below.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              id="name"
              className="form-control"
              type="text"
              name="name"
              placeholder="Enter employee name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="designation" className="form-label">
              Designation
            </label>
            <input
              id="designation"
              className="form-control"
              type="text"
              name="designation"
              placeholder="e.g. Software Developer"
              value={formData.designation}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <input
              id="location"
              className="form-control"
              type="text"
              name="location"
              placeholder="Enter employee location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="salary" className="form-label">
              Salary
            </label>
            <input
              id="salary"
              className="form-control"
              type="number"
              name="salary"
              placeholder="Enter salary"
              min="0"
              value={formData.salary}
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn btn-primary w-100" type="submit">
            Submit Employee Details
          </button>
        </form>
      </div>
    </div>
  );
}

export default EmployeeForm;
