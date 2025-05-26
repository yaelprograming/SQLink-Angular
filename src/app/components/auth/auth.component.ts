import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/Auth/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from 'express';
import { User } from '../../models/user';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule, ReactiveFormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  MatButtonModule, MatIconModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {
  status!:string;
router=inject(Router);
user: User | undefined;
authForm!: FormGroup;
  constructor(private userService: AuthService,private fb: FormBuilder) {
     console.log("AuthComponent");
    this.status = this.userService.status;
    console.log(this.status);
  }
  ngOnInit(): void {
    this.authForm = this.fb.group({
      email: ['', Validators.email],
      password: [''],
      name: ['']
    });
    this.status = this.userService.status;
  }

  submit(){
    if(this.authForm?.valid){
      this.user=this.authForm.value;
    }
    if(this.user){
     // this.userService.updateStatus(this.status==''?'register':'login');
      this.userService.addUser(this.user).subscribe({
        next: (res) => {
          sessionStorage.setItem("token", res.token);
          sessionStorage.setItem("userId", res.userId);
          sessionStorage.setItem("role", this.authForm?.value.role);
     //    this.userService.updateStatus('login'); // עדכון הסטטוס לאחר רישום מוצלח
         this.router.navigate(['/tickets']);
        },
        error: (error) => {
          alert("register failed");
          this.authForm?.reset();
        }
      });
    }
  }

//angular-metirial
errorMessage = signal('');

updateErrorMessage() {
  const email=this.authForm.get('email');
  if (email?.hasError('required')) {
    this.errorMessage.set('You must enter a value');
  } else if (email?.hasError('email')) {
    this.errorMessage.set('Not a valid email');
  } else {
    this.errorMessage.set('');
  }
}

  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
