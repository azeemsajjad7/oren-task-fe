import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../service/general.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private generalService: GeneralService, private router: Router) {}

  ngOnInit() {}

  addToCart(item: any) {
    this.generalService
      .callApi('post', 'cart/add', { item: item })
      .subscribe((res) => {
        if (res) {
          alert('added');
        }
      });
  }

  logout() {
    localStorage.removeItem('online_fd_token');
    this.router.navigateByUrl('/');
  }

  items = [
    { name: 'iPhone 12', price: 69900 },
    { name: 'iPhone 13', price: 79900 },
    { name: 'iPhone 12 mini', price: 59900 },
    { name: 'iPhone 13 mini', price: 69900 },
    { name: 'iPhone 12 pro', price: 89900 },
    { name: 'iPhone 13 pro', price: 99900 },
  ];
}
