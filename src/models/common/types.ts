export interface Entity {
  id: number; // @PK
  created: Date | string; // @audit
}

export interface MongoEntity {
  id: string; // MongoDB ObjectId as string
  created: Date | string;
}
