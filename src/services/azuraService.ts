import { Axios } from "axios";
import { AzuraPoint, AzuraResp, ErrorResp } from "../models";

export class AzuraService {
  private static client = new Axios({
    baseURL: Bun.env.AZURA_API_URL,
    headers: {
      "X-API-Key": Bun.env.AZURA_API_KEY,
      "Content-Type": "application/json",
    },
  });

  static async getPlayNow(): Promise<ErrorResp<any>> {
    const { data, status } = await this.client.get(
      `/nowplaying/${Bun.env.AZURA_STATION_ID}`
    );

    if (status != 200) {
      return {
        isError: true,
        message: "Error al en azura.",
        statusCode: status as any,
        meta: data as any,
      };
    }
    const {
      live: { broadcast_start, ...live },
      now_playing: {
        sh_id,
        played_at,
        streamer,
        is_request,
        elapsed,
        remaining,
        ...now_playing
      },
    } = JSON.parse(data) as AzuraResp;

    return {
      isError: false,
      message: "Canción en reproducción.",
      data: { live, now_playing },
    };
  }

  static async getSongList() {
    const { data, status } = await this.client.get(
      `/nowplaying/${Bun.env.AZURA_STATION_ID}`
    );

    if (status != 200) {
      return {
        isError: true,
        message: "Error al en azura.",
        statusCode: status as any,
        meta: data as any,
      };
    }
  }
  static async getPoints(): Promise<
    ErrorResp<{ url: string; name: string }[]>
  > {
    const { data, status } = await this.client.get(
      `/station/${Bun.env.AZURA_STATION_ID}/mounts`
    );

    if (status != 200) {
      return {
        isError: true,
        message: "Error al en azura.",
        statusCode: status as any,
        meta: data as any,
      };
    }
    const points = JSON.parse(data) as AzuraPoint[];

    return {
      isError: false,
      message: "Puntos de montaje",
      data: points.map(({ display_name, links: { listen }, id }) => ({
        url: listen,
        name: display_name,
        id,
      })),
    };
  }
}
