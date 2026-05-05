import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChannelDetailsComponent } from './channel-details.component';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Channel } from '../../models/channel.model';
import { Stream } from '../../models/stream.model';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import videojs from 'video.js';

// Mock video.js
vi.mock('video.js', () => ({
  default: vi.fn().mockReturnValue({
    src: vi.fn(),
    play: vi.fn(),
    dispose: vi.fn(),
    on: vi.fn()
  })
}));

describe('ChannelDetailsComponent', () => {
  let component: ChannelDetailsComponent;
  let fixture: ComponentFixture<ChannelDetailsComponent>;
  let apiServiceMock: any;

  const mockStream: Stream = {
    id: 's1',
    mime_type: 'application/x-mpegURL',
    source: 'Akamai',
    type: 'hls',
    url: 'https://test.com/stream.m3u8',
    drm: false,
    channelId: 'c1'
  };

  const mockChannel: Channel = {
    id: 'c1',
    name: 'Test Channel',
    type: 'TV',
    country: 'MA',
    language: 'ar',
    active: true,
    logo: 'logo.png',
    website: 'https://site.com',
    streams: [mockStream]
  };

  beforeEach(async () => {
    apiServiceMock = {
      getChannel: vi.fn().mockReturnValue(of(mockChannel))
    };

    await TestBed.configureTestingModule({
      imports: [ChannelDetailsComponent, NoopAnimationsModule],
      providers: [
        { provide: ApiService, useValue: apiServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => 'c1' } },
            paramMap: of({ get: (key: string) => 'c1' })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ChannelDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load channel data on init', () => {
    expect(apiServiceMock.getChannel).toHaveBeenCalledWith('c1');
    expect(component.channel()).toEqual(mockChannel);
    expect(component.selectedStream()).toEqual(mockStream);
  });

  it('should display channel name and metadata', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-card-title')?.textContent).toContain('Test Channel');
    expect(compiled.querySelector('mat-card-subtitle')?.textContent).toContain('MA | ar');
  });

  it('should initialize video player', () => {
    // The setter for 'target' should have been called because 'channel' was loaded in ngOnInit
    expect(videojs).toHaveBeenCalled();
  });

  it('should change stream when selectStream is called', () => {
    const newStream: Stream = { ...mockStream, id: 's2', url: 'https://test.com/stream2.m3u8' };
    const playerSpy = vi.spyOn(component.player!, 'src');

    component.selectStream(newStream);

    expect(component.selectedStream()).toEqual(newStream);
    expect(playerSpy).toHaveBeenCalledWith({
      src: newStream.url,
      type: newStream.mime_type || 'application/x-mpegURL'
    });
  });

  it('should dispose player on destroy', () => {
    const disposeSpy = vi.spyOn(component.player!, 'dispose');
    component.ngOnDestroy();
    expect(disposeSpy).toHaveBeenCalled();
  });
});
