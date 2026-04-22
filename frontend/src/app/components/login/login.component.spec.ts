import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { login } from '../../actions/auth.actions';
import { By } from '@angular/platform-browser';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: MockStore;
  const initialState = { auth: { loading: false, error: null } };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent, // It's standalone
        ReactiveFormsModule,
        NoopAnimationsModule
      ],
      providers: [
        provideMockStore({ initialState })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should validate email format', () => {
    const email = component.loginForm.controls['email'];
    email.setValue('invalid-email');
    expect(email.hasError('email')).toBeTruthy();
    
    email.setValue('valid@example.com');
    expect(email.hasError('email')).toBeFalsy();
  });

  it('should validate password minimum length', () => {
    const password = component.loginForm.controls['password'];
    password.setValue('12345');
    expect(password.hasError('minlength')).toBeTruthy();
    
    password.setValue('123456');
    expect(password.hasError('minlength')).toBeFalsy();
  });

  it('should dispatch login action when valid form is submitted', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    const credentials = {
      email: 'test@example.com',
      password: 'password123'
    };

    component.loginForm.setValue(credentials);
    component.onSubmit();

    expect(dispatchSpy).toHaveBeenCalledWith(login(credentials));
  });

  it('should mark all fields as touched on invalid submission', () => {
    const markAllAsTouchedSpy = vi.spyOn(component.loginForm, 'markAllAsTouched');
    
    component.loginForm.setValue({ email: '', password: '' });
    component.onSubmit();

    expect(markAllAsTouchedSpy).toHaveBeenCalled();
  });

  it('should toggle password visibility', () => {
    expect(component.hidePassword).toBeTruthy();
    
    const toggleButton = fixture.debugElement.query(By.css('button[aria-label="Toggle password visibility"]'));
    toggleButton.triggerEventHandler('click', null);
    
    expect(component.hidePassword).toBeFalsy();
  });
});
