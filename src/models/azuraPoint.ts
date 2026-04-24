export interface AzuraPoint {
  station_id: number;
  name: string;
  display_name: string;
  is_visible_on_public_pages: boolean;
  is_default: boolean;
  is_public: boolean;
  fallback_mount: null;
  relay_url: null;
  authhash: null;
  max_listener_duration: number;
  enable_autodj: boolean;
  autodj_format: string;
  autodj_bitrate: number;
  custom_listen_url: string;
  intro_path: null;
  frontend_config: null;
  listeners_unique: number;
  listeners_total: number;
  id: number;
  links: Links;
}

export interface Links {
  self: string;
  intro: string;
  listen: string;
}
