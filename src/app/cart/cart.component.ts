import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../service/general.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.component.html',
  styleUrls: ['cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(
    private generalService: GeneralService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  cart: any;
  success: string = 'Please Wait';
  total: number = 0;

  @ViewChild('purchase')
  purchase: any;

  @ViewChild('successDialog')
  successDialog: any;

  ngOnInit() {
    this.generalService.callApi('get', 'cart').subscribe((res) => {
      this.cart = res;

      this.cart.forEach((element: any) => {
        this.total += element.items.price;
      });
    });
  }

  delete(item: any) {
    this.generalService.callApi('put', 'cart/' + item.id).subscribe(() => {
      this.generalService.callApi('get', 'cart').subscribe((res) => {
        this.cart = res;

        this.cart.forEach((element: any) => {
          this.total += element.items.price;
        });
      });
    });
  }

  buyNow() {
    this.dialog.open(this.purchase);
  }

  pay() {
    this.dialog.closeAll();
    this.dialog.open(this.successDialog);
    this.generalService
      .callApi('post', 'strip/create-order', {
        amount: this.total,
      })
      .subscribe((res) => {
        if (res.success) {
          this.cart.forEach((ele: any) => {
            this.generalService
              .callApi('put', 'cart/remove/' + ele.id)
              .subscribe(() => {
                this.dialog.closeAll();
                alert('Purchase Complete');
                this.router.navigateByUrl('/home');
              });
          });
          this.generalService
            .callApi('get', 'mailgun/send-mail')
            .subscribe((res) => {
              if (res.success) {
                alert('Confirmation mail has been send');
              }
            });
        }
      });
  }

  logout() {
    localStorage.removeItem('online_fd_token');
    this.router.navigateByUrl('/');
  }
}
