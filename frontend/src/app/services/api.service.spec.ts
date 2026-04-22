import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { M3uRequest, XtreamRequest, PlaylistResponse } from '../models';
import { environment } from '../environments/environment';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call m3u endpoint when playlist type is m3u', () => {
    const dummyPlaylist: M3uRequest = {
      type: 'm3u',
      name: 'Test M3U',
      url: 'http://test.com/playlist.m3u',
      macAddress: '00:1A:2B:3C:4D:5E'
    };
    const dummyResponse: PlaylistResponse = {
      id: 1,
      name: 'Test M3U',
      type: 'm3u',
      url: 'http://test.com/playlist.m3u',
      macAddress: '00:1A:2B:3C:4D:5E'
    };

    service.addPlaylist(dummyPlaylist).subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/v1/playlists/m3u`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dummyPlaylist);
    req.flush(dummyResponse);
  });

  it('should call xtream endpoint when playlist type is xtream', () => {
    const dummyPlaylist: XtreamRequest = {
      type: 'xtream',
      name: 'Test Xtream',
      url: 'http://test.com',
      username: 'user',
      password: 'pass',
      macAddress: '00:1A:2B:3C:4D:5E'
    };
    const dummyResponse: PlaylistResponse = {
      id: 2,
      name: 'Test Xtream',
      type: 'xtream',
      url: 'http://test.com',
      macAddress: '00:1A:2B:3C:4D:5E',
      username: 'user',
      password: 'pass'
    };

    service.addPlaylist(dummyPlaylist).subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/v1/playlists/xtream`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dummyPlaylist);
    req.flush(dummyResponse);
  });
});
