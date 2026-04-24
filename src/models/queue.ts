import { Links } from "./azuraPoint";
import { Song } from "./song";

export interface Queue {
  cued_at: number;
  played_at: number;
  duration: number;
  playlist: string;
  is_request: boolean;
  song: Song;
  sent_to_autodj: boolean;
  is_played: boolean;
  autodj_custom_uri: null;
  log: string[];
  links: Links;
}
