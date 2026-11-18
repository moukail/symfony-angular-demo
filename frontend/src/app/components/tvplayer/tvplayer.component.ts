import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';
import { ChannelStore } from '../../stores/channel.store';
import { Channel } from '../../models/channel.model';
import { Stream } from '../../models/stream.model';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-tvplayer',
  standalone: true,
  imports: [CommonModule, MatListModule],
  templateUrl: './tvplayer.component.html',
  styleUrl: './tvplayer.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class TvplayerComponent implements OnInit, OnDestroy {
  @ViewChild('target', { static: true }) target!: ElementRef;
  
  private route = inject(ActivatedRoute);
  private location = inject(Location);
  readonly channelStore = inject(ChannelStore);

  player?: Player;
  streamUrl: string | null = null;
  channelName: string | null = null;
  currentChannel: Channel | null = null;
  currentStreamIndex = 0;
  showSidebar = true;

  goBack() {
    this.location.back();
  }

  ngOnInit() {
    this.channelStore.loadAll();
    
    this.streamUrl = this.route.snapshot.queryParamMap.get('url');
    this.channelName = this.route.snapshot.queryParamMap.get('name');

    this.initializePlayer();
  }

  private initializePlayer() {
    const options = {
      autoplay: true,
      controls: true,
      responsive: true,
      fluid: true,
      sources: this.streamUrl ? [{
        src: this.streamUrl,
        type: this.getMimeType(this.streamUrl)
      }] : []
    };

    this.player = videojs(this.target.nativeElement, options, () => {
      console.log('Player ready');
    });

    this.player.on('play', () => {
      this.showSidebar = false;
    });

    this.player.on('pause', () => {
      this.showSidebar = true;
    });

    this.player.on('error', () => {
      console.warn('Stream failed, trying fallback...');
      this.tryFallback();
    });
  }

  playChannel(channel: Channel) {
    console.log('Selected channel:', channel.name, 'Streams:', channel.streams?.length);
    if (!channel.streams || channel.streams.length === 0) {
      console.error('No streams for channel', channel.name);
      return;
    }

    this.currentChannel = channel;
    this.currentStreamIndex = 0;
    this.channelName = channel.name;
    this.loadStream(channel.streams[0]);
  }

  private loadStream(stream: Stream) {
    this.streamUrl = stream.url;
    if (this.player) {
      console.log('Loading stream:', stream.url, 'Mime:', stream.mime_type);
      this.player.src({
        src: stream.url,
        type: stream.mime_type || this.getMimeType(stream.url)
      });
      this.player.load();
      this.player.play().catch(err => {
        console.error('Playback failed:', err);
      });
    } else {
      console.error('Player not initialized');
    }
  }

  private tryFallback() {
    if (this.currentChannel && this.currentChannel.streams) {
      this.currentStreamIndex++;
      if (this.currentStreamIndex < this.currentChannel.streams.length) {
        console.log(`Trying fallback stream ${this.currentStreamIndex + 1}/${this.currentChannel.streams.length}`);
        this.loadStream(this.currentChannel.streams[this.currentStreamIndex]);
      } else {
        console.error('All streams failed for this channel');
      }
    }
  }

  private getMimeType(url: string): string {
    const cleanUrl = url.split('?')[0];
    if (cleanUrl.endsWith('.m3u8')) return 'application/x-mpegURL';
    if (cleanUrl.endsWith('.mpd')) return 'application/dash+xml';
    return 'video/mp4';
  }

  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
}
