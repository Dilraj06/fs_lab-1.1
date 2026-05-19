import type { Department } from "../types/Employee";

export const departments: Department[] = [
  {
    name: "Finance Department",
    employees: [
      { firstName: "Olivia", lastName: "Smith" },
      { firstName: "Liam", lastName: "Johnson" },
    ],
  },
  {
    name: "Human Resources",
    employees: [
      { firstName: "Emma", lastName: "Brown" },
      { firstName: "Noah", lastName: "Wilson" },
    ],
  },
  {
    name: "Information Technology",
    employees: [
      { firstName: "Sophia", lastName: "Taylor" },
      { firstName: "James", lastName: "Anderson" },
      { firstName: "Mia", lastName: "Thomas" },
    ],
  },
  {
    name: "Customer Service",
    employees: [
      { firstName: "Lucas", lastName: "Martin" },
      { firstName: "Charlotte", lastName: "White" },
    ],
  },
];