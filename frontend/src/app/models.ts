export type PlaylistType = 'm3u' | 'xtream';

export interface PlaylistRequest {
    type: PlaylistType;
    name: string;
    url: string;
    macAddress: string;
}

export interface XtreamRequest extends PlaylistRequest {
    username: string;
    password: string;
}

export interface M3uRequest extends PlaylistRequest {}

export interface PlaylistResponse {
    id: number;
    name: string;
    type: PlaylistType;
    macAddress: string;
    url: string;
    username?: string;
    password?: string;
}
