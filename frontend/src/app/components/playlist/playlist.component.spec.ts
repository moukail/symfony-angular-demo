import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ApiService } from '../../services/api.service';

import { PlaylistComponent } from './playlist.component';

describe('PlaylistComponent', () => {
  let component: PlaylistComponent;
  let fixture: ComponentFixture<PlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PlaylistComponent,
        NoopAnimationsModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: ApiService, useValue: { addPlaylist: vi.fn() } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate MAC address format', () => {
    const macControl = component.playlistForm.get('macAddress');
    
    macControl?.setValue('invalid-mac');
    expect(macControl?.valid).toBeFalsy();

    macControl?.setValue('00:1A:2B:3C:4D:5E');
    expect(macControl?.valid).toBeTruthy();
  });

  it('should switch validators when playlist type changes', () => {
    component.playlistForm.get('type')?.setValue('xtream');
    
    expect(component.playlistForm.get('username')?.validator).toBeDefined();
    expect(component.playlistForm.get('password')?.validator).toBeDefined();
    
    component.playlistForm.get('type')?.setValue('m3u');
    
    // In Angular tests, validator being null is checked differently if it's cleared
    expect(component.playlistForm.get('username')?.validator).toBeNull();
    expect(component.playlistForm.get('password')?.validator).toBeNull();
  });
});
