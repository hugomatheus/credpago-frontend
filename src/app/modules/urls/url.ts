export interface Url {
  id?: number;
  uuid: string;
  user_id: number;
  description: string;
  url_requests?: Array<Detail>;
}

interface Detail {
  code: number;
  body: string;
  created_at: Date;
}

export type Urls = Array<Url>;
