import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideMockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { describe, it, expect, beforeEach } from 'vitest';

describe('App', () => {
  const initialState = {
    account: {
      user: null,
      isActive: false,
      roles: []
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        App,
        NoopAnimationsModule
      ],
      providers: [
        provideMockStore({ initialState }),
        provideRouter([])
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'frontend' title`, () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app['title']()).toEqual('frontend');
  });

  it('should render navbar with application name', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.navbar span')?.textContent).toContain('My Application');
  });
});
