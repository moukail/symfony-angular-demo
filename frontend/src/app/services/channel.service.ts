import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";
import { Channel } from "../models/channel.model";

@Injectable({ providedIn: 'root' })
export class ChannelService {
    private base = environment.apiUrl;
    constructor(private http: HttpClient) { }

    getChannels() {
        console.log('calling get channels api');
        return this.http.get<Channel[]>(this.base + '/v1/channels');
    }

    getChannel(id: string) {
        return this.http.get<Channel>(this.base + '/v1/channels/' + id);
    }

    addChannel(channel: Partial<Channel>) {
        return this.http.post<Channel>(this.base + '/v1/channels', channel);
    }

    deleteChannel(id: string) {
        return this.http.delete<void>(this.base + '/v1/channels/' + id);
    }
}
