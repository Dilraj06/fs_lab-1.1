import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.employee.deleteMany();
  await prisma.role.deleteMany();

  const adminRole = await prisma.role.create({
    data: {
      name: "Admin",
    },
  });

  const managerRole = await prisma.role.create({
    data: {
      name: "Manager",
    },
  });

  const employeeRole = await prisma.role.create({
    data: {
      name: "Employee",
    },
  });

  await prisma.employee.createMany({
    data: [
      {
        firstName: "John",
        lastName: "Smith",
        department: "Finance",
        roleId: adminRole.id,
      },
      {
        firstName: "Sarah",
        lastName: "Jones",
        department: "Customer Service",
        roleId: managerRole.id,
      },
      {
        firstName: "Michael",
        lastName: "Brown",
        department: "Operations",
        roleId: employeeRole.id,
      },
    ],
  });
}

main()
  .then(async () => {
    console.log("Seed completed successfully");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });