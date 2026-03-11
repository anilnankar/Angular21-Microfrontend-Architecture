import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink, RouterOutlet, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatDividerModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit, OnDestroy {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private routeSubscription?: Subscription;
  
  protected readonly title = signal('Dashboard');
  protected readonly userName = signal('John Doe'); // You can get this from a service or localStorage
  
  // Check if we're on a child route (todo or analytics)
  protected readonly showTiles = signal(true);
  
  ngOnInit() {
    // Check initial route
    this.updateShowTiles();
    
    // Monitor route changes to show/hide tiles
    this.routeSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateShowTiles();
      });
  }
  
  ngOnDestroy() {
    this.routeSubscription?.unsubscribe();
  }
  
  private updateShowTiles() {
    const url = this.router.url;
    // Check for child routes - both absolute and relative paths
    const hasChildRoute = url.includes('/todo') || url.includes('/analytics') || 
                         url.endsWith('/dashboard/todo') || url.endsWith('/dashboard/analytics');
    this.showTiles.set(!hasChildRoute);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth']).catch(() => {
      window.location.href = '/auth';
    });
  }

  navigateToProfile() {
    this.router.navigate(['/user']).catch(() => {
      window.location.href = '/user';
    });
  }

  editProfile() {
    // Navigate to user profile page with edit mode
    // You can add a query parameter or route to indicate edit mode
    this.router.navigate(['/user'], { queryParams: { edit: 'true' } }).catch(() => {
      window.location.href = '/user?edit=true';
    });
  }

  navigateToTodo() {
    this.router.navigate(['todo'], { relativeTo: this.route }).catch(() => {
      this.router.navigate(['/dashboard/todo']).catch(() => {
        window.location.href = '/dashboard/todo';
      });
    });
  }

  navigateToAnalytics() {
    this.router.navigate(['analytics'], { relativeTo: this.route }).catch(() => {
      this.router.navigate(['/dashboard/analytics']).catch(() => {
        window.location.href = '/dashboard/analytics';
      });
    });
  }
  
  navigateToDashboard() {
    this.router.navigate(['/dashboard']).catch(() => {
      window.location.href = '/dashboard';
    });
  }
}
