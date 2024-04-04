import { prisma } from "../src/lib/prisma";

async function seed() {
  await prisma.event.create({
    data: {
      id: "2cbef1f0-1e79-415c-86f2-57fab766ad2d",
      title: "My first event",
      slug: "my-first-event",
      details: "This is my first event",
      maximumAttendees: 120,
    },
  });
}

seed().then(() => {
  console.log("Database seeded successfully!");
  prisma.$disconnect();
});
