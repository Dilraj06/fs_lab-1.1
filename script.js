const departments = [
  {
    name: "Finance Department",
    employees: [
      { firstName: "karan", lastName: "Patel" },
      { firstName: "Isha", lastName: "Yadav" }
    ]
  },

  {
    name: "Human Resources",
    employees: [
      { firstName: "Emma", lastName: "Wilson" },
      { firstName: "Noah", lastName: "Sii" }
    ]
  },

  {
    name: "Information Technology",
    employees: [
      { firstName: "Ruhi", lastName: "Bal" },
      { firstName: "Jass", lastName: "Purba" },
      { firstName: "John", lastName: "Taylor" }
    ]
  },

  {
    name: "Customer Service",
    employees: [
      { firstName: "Lucas", lastName: "Martin" },
      { firstName: "Charlotte", lastName: "White" }
    ]
  }
];

const departmentContainer = document.getElementById("departmentContainer");

const searchInput = document.getElementById("searchInput");

const year = document.getElementById("year");

year.textContent = new Date().getFullYear();

function renderDepartments(searchText = "") {

  departmentContainer.innerHTML = "";

  departments.forEach(function(department){

    const filteredEmployees = department.employees.filter(function(employee){

      const fullName =
        `${employee.firstName} ${employee.lastName}`.toLowerCase();

      return fullName.includes(searchText.toLowerCase());

    });

    if(filteredEmployees.length === 0){
      return;
    }

    const card = document.createElement("article");
    card.className = "department-card";

    const title = document.createElement("h3");
    title.textContent = department.name;

    const count = document.createElement("p");
    count.className = "employee-count";
    count.textContent =
      `${filteredEmployees.length} Employee(s)`;

    const list = document.createElement("ul");
    list.className = "employee-list";

    filteredEmployees.forEach(function(employee){

      const item = document.createElement("li");

      item.textContent =
        `${employee.firstName} ${employee.lastName}`;

      list.appendChild(item);

    });

    card.appendChild(title);
    card.appendChild(count);
    card.appendChild(list);

    departmentContainer.appendChild(card);

  });

}

searchInput.addEventListener("input", function(){

  renderDepartments(searchInput.value);

});

renderDepartments();