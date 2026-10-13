
function EmployeeTable({
  employees,
  filteredEmployees,
  editingIndex,
  handleEdit,
  handleDelete
}) {
  return (
    <div className="table-responsive">
      <table className="table align-middle">
        <thead>
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Employee Code</th>
            <th>Salary</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredEmployees.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-4">
                No employees found.
              </td>
            </tr>
          ) : (
            filteredEmployees.map((employee, rowIndex) => {
              const index = employees.indexOf(employee);

              return (
                <tr key={employee.empCode || index}>
                  <td>{rowIndex + 1}</td>
                  <td>{employee.fullName}</td>
                  <td>{employee.empCode}</td>
                  <td>{employee.salary}</td>
                  <td>{employee.city}</td>

                  <td>
                    <button
                      type="button"
                      className={`btn btn-sm me-2 ${
                        editingIndex === index
                          ? 'btn-secondary'
                          : 'btn-warning'
                      }`}
                      onClick={() => handleEdit(index)}
                    >
                      {editingIndex === index ? 'Cancel' : 'Edit'}
                    </button>

                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;
