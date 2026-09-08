export interface IEmployee {
  id: number
  name: string
  email: string
  department: string
  salary: number
  createdAt: string
}

const DEPARTMENTS = ['IT', 'Moliya', 'Kadrlar', 'Marketing', 'Ishlab chiqarish']

export function createRows(count: number): IEmployee[] {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `Xodim ${index + 1}`,
    email: `xodim${index + 1}@webase.uz`,
    department: DEPARTMENTS[index % DEPARTMENTS.length],
    salary: 3000000 + (index % 50) * 100000,
    createdAt: new Date(2024, index % 12, (index % 28) + 1).toLocaleDateString('ru-RU'),
  }))
}
