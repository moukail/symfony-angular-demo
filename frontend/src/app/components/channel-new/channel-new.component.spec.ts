import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChannelNewComponent } from './channel-new.component';
import { ChannelStore } from '../../stores/channel.store';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { vi, describe, beforeEach, it, expect } from 'vitest';

describe('ChannelNewComponent', () => {
  let component: ChannelNewComponent;
  let fixture: ComponentFixture<ChannelNewComponent>;
  let mockStore: any;

  beforeEach(async () => {
    mockStore = {
      add: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [
        ChannelNewComponent,
        NoopAnimationsModule
      ],
      providers: [
        { provide: ChannelStore, useValue: mockStore },
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ChannelNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.form.get('active')?.value).toBe(true);
    expect(component.form.get('type')?.value).toBe('TV');
  });

  it('should be invalid when required fields are empty', () => {
    component.form.patchValue({
      name: '',
      country: '',
      language: ''
    });
    expect(component.form.valid).toBe(false);
  });

  it('should call store.add when form is valid and submitted', () => {
    const channelData = {
      name: 'New Channel',
      type: 'TV' as const,
      country: 'US',
      language: 'en',
      website: 'https://test.com',
      logo: 'https://logo.com',
      active: true
    };

    component.form.patchValue(channelData);
    component.onSubmit();

    expect(mockStore.add).toHaveBeenCalledWith(expect.objectContaining({
      name: 'New Channel',
      country: 'US'
    }));
  });
});
