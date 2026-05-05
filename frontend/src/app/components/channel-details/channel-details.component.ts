import { Component, ElementRef, inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation, signal, computed } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ChannelService } from '../../services/channel.service';
import { Channel } from '../../models/channel.model';
import { Stream } from '../../models/stream.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { timeout, catchError, throwError } from 'rxjs';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-channel-details',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatChipsModule,
        MatCardModule,
        MatButtonToggleModule,
        MatListModule,
        MatProgressSpinnerModule,
        MatTooltipModule
    ],
    templateUrl: './channel-details.component.html',
    styleUrl: './channel-details.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class ChannelDetailsComponent implements OnInit, OnDestroy {
    private route = inject(ActivatedRoute);
    private channelService = inject(ChannelService);

    // State using Signals
    channel = signal<Channel | null>(null);
    isLoading = signal(true);
    errorMessage = signal<string | null>(null);

    // Selected stream signal (defaults to first stream if available)
    selectedStream = signal<Stream | null>(null);

    player?: Player;

    @ViewChild('target') set target(element: ElementRef) {
        if (element && !this.player && this.selectedStream()) {
            this.initializePlayer(element.nativeElement);
        }
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            console.log('Route param ID:', id);
            if (id) {
                this.loadChannel(id);
            }
        });
    }

    retry(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) this.loadChannel(id);
    }

    private loadChannel(id: string): void {
        console.log('Calling loadChannel for:', id);
        this.isLoading.set(true);
        this.errorMessage.set(null);
        this.channel.set(null);

        this.channelService.getChannel(id).pipe(
            timeout(5000),
            catchError(err => {
                console.error('API Error or Timeout:', err);
                return throwError(() => err);
            })
        ).subscribe({
            next: (channel) => {
                console.log('Channel received:', channel);
                this.channel.set(channel);
                if (channel.streams && channel.streams.length > 0) {
                    this.selectedStream.set(channel.streams[0]);
                }
                this.isLoading.set(false);
            },
            error: (err) => {
                this.errorMessage.set('Could not load channel. The server might be slow or offline.');
                this.isLoading.set(false);
            }
        });
    }

    initializePlayer(element: any): void {
        const stream = this.selectedStream();
        if (!stream) return;

        const options = {
            autoplay: true,
            controls: true,
            responsive: true,
            fluid: true,
            sources: [{
                src: stream.url,
                type: stream.mime_type || 'application/x-mpegURL'
            }]
        };

        if (this.player) {
            this.player.src(options.sources);
        } else {
            this.player = videojs(element, options);
        }
    }

    selectStream(stream: Stream): void {
        this.selectedStream.set(stream);
        if (this.player) {
            this.player.src({
                src: stream.url,
                type: stream.mime_type || 'application/x-mpegURL'
            });
            this.player.play();
        }
    }

    ngOnDestroy(): void {
        if (this.player) {
            this.player.dispose();
        }
    }
}
