export type Task = {
  index: string;
  userId: string;
  createdAt: number;
  name: string;
  description: string;
  deadline: Date;
  status: boolean;
};
