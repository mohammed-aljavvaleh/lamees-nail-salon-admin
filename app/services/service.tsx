import { prisma } from "@/lib/prisma";
import { ServicesClient } from "@/components/services/services-clients";

export default async function ServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { name: "asc" } });
  return <ServicesClient initialServices={services} />;
}