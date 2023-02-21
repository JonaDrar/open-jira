
interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  createdAt: number;
  status: string;
}

export const seedData: SeedData = {
  entries: [
    {
      description: 'Café',
      createdAt: Date.now(),
      status: 'pending',
    },
    {
      description: 'Comida',
      createdAt: Date.now() - 1000 * 60 * 60,
      status: 'in-progress',
    },
    {
      description: 'Gimnasio',
      createdAt: Date.now() - 1000 * 60 * 60 * 2,
      status: 'completed',
    },
  ]
}