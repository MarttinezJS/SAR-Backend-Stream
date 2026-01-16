import { MetaSong } from "./song";

export interface AzuraResp {
  now_playing: MetaSong;
  playing_next: MetaSong;
  song_history: MetaSong[];
  is_online: boolean;
  cache: string;
  station: Station;
  listeners: Listeners;
  live: Live;
}

export interface Listeners {
  total: number;
  unique: number;
  current: number;
}

export interface Live {
  is_live: boolean;
  streamer_name: string;
  broadcast_start: number;
  art: string;
}

export interface Station {
  id: number;
  name: string;
  shortcode: string;
  description: string;
  frontend: string;
  backend: string;
  timezone: string;
  listen_url: string;
  url: string;
  public_player_url: string;
  playlist_pls_url: string;
  playlist_m3u_url: string;
  is_public: boolean;
  mounts: Mount[];
  remotes: any[];
  hls_enabled: boolean;
  hls_is_default: boolean;
  hls_url: null;
  hls_listeners: number;
}

export interface Mount {
  id: number;
  name: string;
  url: string;
  bitrate: number;
  format: string;
  listeners: Listeners;
  path: string;
  is_default: boolean;
}
