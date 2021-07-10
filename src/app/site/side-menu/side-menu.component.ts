import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../shared/services/message.service';
import { AuthorizationService } from '../../auth/services/authorization.service';
import { MenuItem } from '../../shared/models/menu-item.model';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  isAuthenticated: boolean;
  user: any;
  publicMenuItems: MenuItem[];
  authorizedMenuItems: MenuItem[];

  constructor(private auth: AuthorizationService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.setMenuItems();

    this.messageService.receiveMessage().subscribe((m) => {
      if(m === 'authcheck') {
        this.isAuthenticated = this.auth.isLoggedIn();
        this.user = this.auth.getAuthenticatedUser();
      }
    });
  }

  click(action: string) {
    if (action === 'logout') {
      this.logOut();
    }
  }

  logOut() {
    this.auth.logOut();
  }

  updateAccount() {}

  setMenuItems() {
    this.authorizedMenuItems = [
      {
        name: 'Sectors',
        url: '/sectors',
        icon: 'reader-outline'
      },
      {
        name: 'Assets',
        url: '/assets',
        icon: 'cash-outline'
      },
      {
        name: 'Weekly Summary',
        url: '/assets-summary',
        icon: 'calendar-outline'
      },
      {
        name: 'My Account',
        url: '',
        icon: 'person-outline',
      },
      {
        name: 'Logout',
        url: '',
        icon: 'log-out-outline',
        action: 'logout'
      }
    ];

    this.publicMenuItems = [
      {
        name: 'Login',
        url: '/login',
        icon: 'log-in-outline'
      },
      {
        name: 'Register',
        url: '/register',
        icon: 'person-add-outline'
      }
    ];
  }
}
