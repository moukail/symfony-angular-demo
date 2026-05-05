import { Stream } from './stream.model';

export interface Channel {
  id: string;
  name: string;
  type: 'TV' | 'Radio';
  country: string;
  language: string;
  website: string;
  logo: string;
  active: boolean;
  streams?: Stream[];
}
