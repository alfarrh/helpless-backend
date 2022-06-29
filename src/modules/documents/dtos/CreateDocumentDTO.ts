export interface CreateDocumentDTO {
  userId: string;
  title: string;
  activity: string;
  group: string;
  points: number | null;
  hours: string;
  description: string;
}
