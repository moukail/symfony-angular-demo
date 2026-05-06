import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChannelListComponent } from './channel-list.component';
import { ChannelStore } from '../../stores/channel.store';
import { signal } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { Channel } from '../../models/channel.model';
import { vi, describe, beforeEach, it, expect } from 'vitest';

describe('ChannelListComponent', () => {
    let component: ChannelListComponent;
    let fixture: ComponentFixture<ChannelListComponent>;
    let mockStore: any;

    const mockChannels: Channel[] = [
        {
            id: '1',
            name: 'Aloula',
            type: 'TV',
            country: 'MA',
            language: 'ar',
            active: true,
            logo: 'logo.png',
            website: 'https://site.com'
        }
    ];

    beforeEach(async () => {
        mockStore = {
            entities: signal(mockChannels),
            isLoading: signal(false),
            loadAll: vi.fn()
        };

        await TestBed.configureTestingModule({
            imports: [
                ChannelListComponent,
                NoopAnimationsModule
            ],
            providers: [
                { provide: ChannelStore, useValue: mockStore },
                provideRouter([])
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ChannelListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call loadAll on initialization', () => {
        expect(mockStore.loadAll).toHaveBeenCalled();
    });

    it('should display channels in the table', async () => {
        await fixture.whenStable();
        fixture.detectChanges();

        const compiled = fixture.nativeElement as HTMLElement;
        const rows = compiled.querySelectorAll('tr.mat-mdc-row');

        expect(rows.length).toBe(1);
        expect(rows[0].textContent).toContain('Aloula');
        expect(rows[0].textContent).toContain('TV');
    });
});
