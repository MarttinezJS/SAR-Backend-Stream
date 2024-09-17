export interface AzuraWebhook {
  now_playing: Song;
  playing_next: Song;
  song_history: Song[];
  is_online: boolean;
  cache: string;
}

interface Song {
  sh_id: number;
  played_at: number;
  duration: number;
  playlist: string;
  streamer: string;
  is_request: boolean;
  song: {
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
  };
  elapsed: number;
  remaining: number;
}
