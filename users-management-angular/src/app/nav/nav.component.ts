import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UsersService } from '../users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit, OnDestroy {
  private authSub!: Subscription;
  private adminSub!: Subscription;
  private userSub!: Subscription;

  isAuthenticated: boolean = false;
  isAdmin: boolean = false;
  isUser: boolean = false;

  constructor(private readonly userService: UsersService) {}

  ngOnInit(): void {
    // Subscribe to the observables
    this.authSub = this.userService.isAuthenticated$.subscribe(
      isAuth => this.isAuthenticated = isAuth
    );
    this.adminSub = this.userService.isAdmin$.subscribe(
      isAdmin => this.isAdmin = isAdmin
    );
    this.userSub = this.userService.isUser$.subscribe(
      isUser => this.isUser = isUser
    );
  }

  ngOnDestroy(): void {
    // Clean up subscriptions
    this.authSub.unsubscribe();
    this.adminSub.unsubscribe();
    this.userSub.unsubscribe();
  }

  logout(): void {
    this.userService.logOut();
  }
}