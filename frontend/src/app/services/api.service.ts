import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { M3uRequest, PlaylistResponse, XtreamRequest } from "../models";
import { environment } from "../environments/environment";

import { Stream } from "../models/stream.model";

@Injectable({ providedIn: 'root' })
export class ApiService {
    private base = environment.apiUrl;
    constructor(private http: HttpClient) { }

    getStreams(channelId: string) {
        return this.http.get<Stream[]>(this.base + '/v1/channels/' + channelId + '/streams');
    }

    addStream(channelId: string, stream: Partial<Stream>) {
        return this.http.post<Stream>(this.base + '/v1/channels/' + channelId + '/streams', stream);
    }

    deleteStream(id: string) {
        return this.http.delete<void>(this.base + '/v1/streams/' + id);
    }

    addPlaylist(playlist: M3uRequest | XtreamRequest) {
        console.log(playlist);

        if (playlist.type === 'm3u') {
            return this.http.post<PlaylistResponse>(this.base + '/v1/playlists/m3u', playlist);
        }
        return this.http.post<PlaylistResponse>(this.base + '/v1/playlists/xtream', playlist);
    }
}