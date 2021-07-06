import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../../shared/services/message.service';
import { AuthorizationService } from '../../../auth/services/authorization.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-auth-menu',
  templateUrl: './auth-menu.component.html',
  styleUrls: ['./auth-menu.component.scss'],
})
export class AuthMenuComponent implements OnInit {
  isAuthenticated: boolean;
  user: any;

  constructor(private auth: AuthorizationService,
    private messageService: MessageService,
    private menu: MenuController) { }

  ngOnInit(): void {
    this.messageService.receiveMessage().subscribe((m) => {
      if(m === 'authcheck') {
        this.isAuthenticated = this.auth.isLoggedIn();
        this.user = this.auth.getAuthenticatedUser();
      }
    });
  }

  logOut() {
    this.auth.logOut();
  }

  updateAccount() {}
}
