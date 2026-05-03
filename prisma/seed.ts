import { PrismaClient } from "../app/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new   PrismaPg(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // Clean slate
  await prisma.appointment.deleteMany();
  await prisma.service.deleteMany();
  await prisma.staff.deleteMany();

  // Services
  const manicure = await prisma.service.create({
    data: { name: "Classic Manicure", price: 250, duration: 30 },
  });
  const gel = await prisma.service.create({
    data: { name: "Gel Manicure", price: 400, duration: 45 },
  });
  const pedicure = await prisma.service.create({
    data: { name: "Classic Pedicure", price: 350, duration: 45 },
  });
  const nailArt = await prisma.service.create({
    data: { name: "Nail Art", price: 150, duration: 20 },
  });
  const acrylic = await prisma.service.create({
    data: { name: "Acrylic Full Set", price: 650, duration: 90 },
  });

  console.log("Services created");

  // Staff
  const lamees = await prisma.staff.create({
    data: { name: "Lamees Bahaa", role: "Owner" },
  });
  const sara = await prisma.staff.create({
    data: { name: "Sara Ahmed", role: "Senior Technician" },
  });
  const nour = await prisma.staff.create({
    data: { name: "Nour Hassan", role: "Technician" },
  });

  console.log("Staff created");

  // Appointments — today and nearby dates
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  function apptTime(dayOffset: number, hour: number, minute = 0) {
    const d = new Date(today);
    d.setDate(d.getDate() + dayOffset);
    d.setHours(hour, minute, 0, 0);
    return d;
  }

  await prisma.appointment.createMany({
    data: [
      // Today
      {
        customerName: "Aisha Malik",
        customerPhone: "0501000001",
        startTime: apptTime(0, 9, 0),
        serviceId: manicure.id,
        staffId: sara.id,
        priceAtBooking: manicure.price,
        status: "COMPLETED",
      },
      {
        customerName: "Reem Al-Farsi",
        customerPhone: "05010006302",
        startTime: apptTime(0, 10, 30),
        serviceId: gel.id,
        staffId: lamees.id,
        priceAtBooking: gel.price,
        status: "COMPLETED",
      },
      {
        customerName: "Dana Khalid",
        customerPhone: "05234953498",
        startTime: apptTime(0, 13, 0),
        serviceId: pedicure.id,
        staffId: nour.id,
        priceAtBooking: pedicure.price,
        status: "SCHEDULED",
      },
      {
        customerName: "Lina Saeed",
        customerPhone: "0501000003",
        startTime: apptTime(0, 14, 30),
        serviceId: acrylic.id,
        staffId: lamees.id,
        priceAtBooking: acrylic.price,
        status: "SCHEDULED",
      },
      {
        customerName: "Hessa Nasser",
        customerPhone: "05344456235",
        startTime: apptTime(0, 16, 0),
        serviceId: nailArt.id,
        staffId: sara.id,
        priceAtBooking: nailArt.price,
        status: "CANCELLED",
      },

      // Yesterday
      {
        customerName: "Mona Hassan",
        customerPhone: "0501000004",
        startTime: apptTime(-1, 10, 0),
        serviceId: gel.id,
        staffId: sara.id,
        priceAtBooking: gel.price,
        status: "COMPLETED",
      },
      {
        customerName: "Fatima Al-Ali",
        customerPhone: "05394338494",
        startTime: apptTime(-1, 11, 30),
        serviceId: manicure.id,
        staffId: nour.id,
        priceAtBooking: manicure.price,
        status: "COMPLETED",
      },
      {
        customerName: "Sara Al-Mutairi",
        customerPhone: "05230904334",
        startTime: apptTime(-1, 14, 0),
        serviceId: pedicure.id,
        staffId: lamees.id,
        priceAtBooking: pedicure.price,
        status: "COMPLETED",
      },

      // 2 days ago
      {
        customerName: "Noura Ahmed",
        customerPhone: "0501000005",
        startTime: apptTime(-2, 9, 30),
        serviceId: acrylic.id,
        staffId: lamees.id,
        priceAtBooking: acrylic.price,
        status: "COMPLETED",
      },
      {
        customerName: "Wafa Al-Rashid",
        customerPhone: "05353994434",
        startTime: apptTime(-2, 13, 0),
        serviceId: gel.id,
        staffId: sara.id,
        priceAtBooking: gel.price,
        status: "COMPLETED",
      },

      // 3 days ago
      {
        customerName: "Basma Yousef",
        customerPhone: "05344304334",
        startTime: apptTime(-3, 10, 0),
        serviceId: nailArt.id,
        staffId: nour.id,
        priceAtBooking: nailArt.price,
        status: "COMPLETED",
      },
      {
        customerName: "Hana Al-Dosari",
        customerPhone: "0501000006",
        startTime: apptTime(-3, 15, 0),
        serviceId: manicure.id,
        staffId: sara.id,
        priceAtBooking: manicure.price,
        status: "COMPLETED",
      },

      // Tomorrow
      {
        customerName: "Rawan Al-Otaibi",
        customerPhone: "0501000007",
        startTime: apptTime(1, 10, 0),
        serviceId: gel.id,
        staffId: sara.id,
        priceAtBooking: gel.price,
        status: "SCHEDULED",
      },
      {
        customerName: "Manal Hamdan",
        customerPhone: "05394302334",
        startTime: apptTime(1, 12, 0),
        serviceId: pedicure.id,
        staffId: nour.id,
        priceAtBooking: pedicure.price,
        status: "SCHEDULED",
      },
      {
        customerName: "Dalal Al-Shammari",
        customerPhone: "05394304332",
        startTime: apptTime(1, 14, 30),
        serviceId: acrylic.id,
        staffId: lamees.id,
        priceAtBooking: acrylic.price,
        status: "SCHEDULED",
      },

      // Day after tomorrow
      {
        customerName: "Shahad Bilal",
        customerPhone: "0501000008",
        startTime: apptTime(2, 11, 0),
        serviceId: manicure.id,
        staffId: nour.id,
        priceAtBooking: manicure.price,
        status: "SCHEDULED",
      },
      {
        customerName: "Nadia Al-Rashidi",
        customerPhone: "05394304334",
        startTime: apptTime(2, 13, 30),
        serviceId: gel.id,
        staffId: lamees.id,
        priceAtBooking: gel.price,
        status: "SCHEDULED",
      },
    ],
  });

  console.log("Appointments created");
  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });