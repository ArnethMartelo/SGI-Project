import { ObjectId } from "mongoose";

export interface IncidentI {
  id: string
  serial: number;
  site: string;
  date: Date;
  time: string;
  type: string;
  description: string;
  deadly: boolean;
  victim: ObjectId;
  informer: ObjectId;
}

