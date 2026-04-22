import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { M3uRequest, PlaylistResponse, XtreamRequest } from "../models";
import { environment } from "../environments/environment";

@Injectable({ providedIn: 'root' })
export class ApiService {
    private base = environment.apiUrl;
    constructor(private http: HttpClient) { }

    addPlaylist(playlist: M3uRequest | XtreamRequest) {
        console.log(playlist);

        if (playlist.type === 'm3u') {
            return this.http.post<PlaylistResponse>(this.base + '/v1/playlists/m3u', playlist);
        }
        return this.http.post<PlaylistResponse>(this.base + '/v1/playlists/xtream', playlist);
    }
}