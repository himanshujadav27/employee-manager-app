
import { useEffect, useState } from 'react';
import EmployeeTable from './EmployeeTable';

function EmployeeForm() {
  const [fullName, setFullName] = useState('');
  const [empCode, setEmpCode] = useState('');
  const [salary, setSalary] = useState('');
  const [city, setCity] = useState('');

  const [employees, setEmployees] = useState(() =>
    JSON.parse(localStorage.getItem('employees') || '[]')
  );

  const [error, setError] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  const clearForm = () => {
    setFullName('');
    setEmpCode('');
    setSalary('');
    setCity('');
    setEditingIndex(null);
    setError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!fullName.trim() || !empCode.trim() || !city.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!Number.isFinite(Number(salary)) || salary.trim() === '' || Number(salary) <= 0) {
      setError('Enter a valid salary greater than zero.');
      return;
    }

    const newEmployee = {
      fullName: fullName.trim(),
      empCode: empCode.trim(),
      salary,
      city: city.trim()
    };

    if (editingIndex === null) {
      setEmployees((previous) => [...previous, newEmployee]);
    } else {
      setEmployees((previous) =>
        previous.map((employee, index) =>
          index === editingIndex ? newEmployee : employee
        )
      );
    }

    clearForm();
  };

  const handleEdit = (index) => {
    if (editingIndex === index) {
      clearForm();
      return;
    }

    const employee = employees[index];

    setFullName(employee.fullName);
    setEmpCode(employee.empCode);
    setSalary(String(employee.salary));
    setCity(employee.city);
    setEditingIndex(index);
    setError('');
  };

  const handleDelete = (indexToDelete) => {
    setEmployees((previous) =>
      previous.filter((_, index) => index !== indexToDelete)
    );

    if (editingIndex === indexToDelete) {
      clearForm();
    } else if (editingIndex !== null && editingIndex > indexToDelete) {
      setEditingIndex((previous) => previous - 1);
    }
  };

  const searchText = search.toLowerCase();

  const filteredEmployees = employees.filter((employee) =>
    [employee.fullName, employee.empCode, employee.city]
      .some((value) => value.toLowerCase().includes(searchText))
  );

  return (
    <section id="employees">
      <div className="mb-4">
        <h1 className="fw-bold text-primary mb-2">Employee Manager</h1>
        <p className="text-secondary mb-0">
          Manage your employee records efficiently.
        </p>
      </div>

      {/* Employee form */}
      <div className="card shadow-sm mb-4">
        <div className="card-header">
          <h4 className="fw-bold mb-1">Employee Details</h4>
          <p className="text-secondary small mb-0">
            Add or update employee information
          </p>
        </div>

        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="alert alert-danger py-2">{error}</div>
            )}

            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label htmlFor="fullName" className="form-label">
                  Full Name *
                </label>
                <input
                  id="fullName"
                  className="form-control"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Enter full name"
                />
              </div>

              <div className="col-12 col-md-6">
                <label htmlFor="empCode" className="form-label">
                  Employee Code *
                </label>
                <input
                  id="empCode"
                  className="form-control"
                  value={empCode}
                  onChange={(event) => setEmpCode(event.target.value)}
                  placeholder="e.g. EMP101"
                />
              </div>

              <div className="col-12 col-md-6">
                <label htmlFor="salary" className="form-label">
                  Salary (₹) *
                </label>
                <input
                  id="salary"
                  type="number"
                  className="form-control"
                  value={salary}
                  onChange={(event) => setSalary(event.target.value)}
                  placeholder="Enter salary"
                />
              </div>

              <div className="col-12 col-md-6">
                <label htmlFor="city" className="form-label">
                  City *
                </label>
                <input
                  id="city"
                  className="form-control"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  placeholder="Enter city"
                />
              </div>
            </div>

            <div className="d-flex flex-wrap gap-2 mt-4">
              <button
                type="submit"
                className={`btn ${editingIndex === null ? 'btn-primary' : 'btn-success'}`}
              >
                {editingIndex === null ? 'Add Employee' : 'Update Employee'}
              </button>

              {editingIndex !== null && (
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={clearForm}
                >
                  Cancel Editing
                </button>
              )}
            </div>

            <p className="text-secondary small mt-3 mb-0">
              All fields are required. Salary must be greater than zero.
            </p>
          </form>
        </div>
      </div>

      {/* Employee count */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <p className="text-secondary mb-1">Total Employees</p>
          <h3 className="fw-bold mb-0">{employees.length}</h3>
        </div>
      </div>

      {/* Employee records */}
      <div className="card shadow-sm">
        <div className="card-header">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
            <div>
              <h4 className="fw-bold mb-1">Employee Records</h4>
              <p className="text-secondary small mb-0">
                View and manage your team
              </p>
            </div>

            <span className="badge text-bg-primary rounded-pill">
              {filteredEmployees.length} results
            </span>
          </div>
        </div>

        <div className="p-4 pb-3">
          <input
            className="form-control"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name, employee code, or city..."
            aria-label="Search employees"
          />
        </div>

        <EmployeeTable
          employees={employees}
          filteredEmployees={filteredEmployees}
          editingIndex={editingIndex}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
    </section>
  );
}

export default EmployeeForm;
