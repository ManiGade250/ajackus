
let employees = [
  {
    id: 1,
    firstName: "Alice",
    lastName: "Smith",
    email: "alice@example.com",
    department: "HR",
    role: "Manager"
  },
  {
    id: 2,
    firstName: "Bob",
    lastName: "Johnson",
    email: "bob@example.com",
    department: "IT",
    role: "Developer"
  },
  {
    id: 3,
    firstName: "Charlie",
    lastName: "Lee",
    email: "charlie@example.com",
    department: "Finance",
    role: "Analyst"
  }
];

function editEmployee(id) {
  alert("Redirecting to edit form for employee ID: " + id);
  window.location.href = "form.html?id=" + id;
}

function deleteEmployee(id) {
  employees = employees.filter(emp => emp.id !== id);
  renderEmployees();
}

function renderEmployees(list = employees) {
  const directory = document.getElementById("directory");
  directory.innerHTML = "";
  list.forEach((emp) => {
    const card = document.createElement("div");
    card.className = "employee-card";
    card.innerHTML = `
      <strong>${emp.firstName} ${emp.lastName}</strong><br />
      <span>Email: ${emp.email}</span><br />
      <span>Department: ${emp.department}</span><br />
      <span>Role: ${emp.role}</span><br />
      <button onclick="editEmployee(${emp.id})">Edit</button>
      <button onclick="deleteEmployee(${emp.id})">Delete</button>
    `;
    directory.appendChild(card);
  });
}

function searchEmployees() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filtered = employees.filter(emp =>
    emp.firstName.toLowerCase().includes(query) ||
    emp.lastName.toLowerCase().includes(query) ||
    emp.email.toLowerCase().includes(query)
  );
  renderEmployees(filtered);
}

function toggleFilter() {
  const panel = document.getElementById("filterPanel");
  panel.style.display = panel.style.display === "none" ? "block" : "none";
}

function applyFilters() {
  const fn = document.getElementById("filterFirstName").value.toLowerCase();
  const dept = document.getElementById("filterDepartment").value.toLowerCase();
  const role = document.getElementById("filterRole").value.toLowerCase();

  const filtered = employees.filter(emp =>
    (fn === "" || emp.firstName.toLowerCase().includes(fn)) &&
    (dept === "" || emp.department.toLowerCase().includes(dept)) &&
    (role === "" || emp.role.toLowerCase().includes(role))
  );
  renderEmployees(filtered);
}

function resetFilters() {
  document.getElementById("filterFirstName").value = "";
  document.getElementById("filterDepartment").value = "";
  document.getElementById("filterRole").value = "";
  renderEmployees();
}

function sortEmployees() {
  const sortKey = document.getElementById("sortSelect").value;
  if (sortKey) {
    employees.sort((a, b) => a[sortKey].localeCompare(b[sortKey]));
    renderEmployees();
  }
}

function paginateEmployees() {
  const count = parseInt(document.getElementById("showCount").value);
  renderEmployees(employees.slice(0, count));
}

window.onload = () => {
  renderEmployees();
};
