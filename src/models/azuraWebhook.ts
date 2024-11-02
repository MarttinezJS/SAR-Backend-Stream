export interface AzuraWebhook {
  now_playing: MetaSong;
  playing_next: MetaSong;
  song_history: MetaSong[];
  is_online: boolean;
  cache: string;
  station: Station;
  listeners: Listeners;
  live: Live;
}

interface MetaSong {
  sh_id: number;
  played_at: number;
  duration: number;
  playlist: string;
  streamer: string;
  is_request: boolean;
  song: Song;
  elapsed: number;
  remaining: number;
}

interface Song {
  id: string;
  art: string;
  custom_fields: [];
  text: string;
  artist: string;
  title: string;
  album: string;
  genre: string;
  isrc: string;
  lyrics: string;
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
