import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonContent, IonInfiniteScroll, ModalController } from '@ionic/angular';
import { IPageProduct, IPageRequest, StoreService } from 'src/app/@app-core/http';
import { DateTimeService, LoadingService } from 'src/app/@app-core/utils';
import { AddStoreComponent } from 'src/app/@modular/add-store/add-store.component';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {
  @ViewChild(IonContent) ionContent: IonContent;
  @ViewChild('infiniteScroll') infinityScroll: IonInfiniteScroll;

  headerCustom = { title: 'Cửa hàng' };
  list = [];
  cart = [];
  hasSetting = false;
  categories = [];
  currentCategoryId = null;
  parishId = localStorage.getItem('parish_id');
  pageRequestCategories: IPageRequest = {
    page: 1,
    per_page: 20
  }
  pageRequestProducts: IPageProduct = {
    page: 1,
    per_page: 20,
    category_id: null
  }

  constructor(
    public dateTimeService: DateTimeService,
    private router: Router,
    private modalController: ModalController,
    private storeService: StoreService,
    private alertController: AlertController,
    private loading: LoadingService
  ) { }

  ngOnInit() {
    // this.loading.present();
    this.getCategories();
  }

  ionViewWillEnter() {
    this.getCart();
    const parishId = localStorage.getItem('tempParishId');
    if (parishId) {
      if (parishId !== this.parishId) {
        this.parishId = parishId;
        this.categories = [];
        this.list = [];
        this.pageRequestProducts.page = 1;
        this.getCategories();
      }
      localStorage.removeItem('tempParishId');
    }
  }

  ionViewWillLeave() {
    this.resetAmount();
  }

  getProducts(event?) {
    this.pageRequestProducts.category_id = this.currentCategoryId;
    const tempCategoryId = this.currentCategoryId;
    this.storeService.getAllProducts(this.pageRequestProducts).subscribe(data => {
      if (tempCategoryId !== this.currentCategoryId) {
        return;
      }
      this.loading.dismiss();
      data.products.forEach(product => {
        product.unit_price = 'đ';
        product.amount = 0;
      })
      this.list = this.list.concat(data.products);
      this.pageRequestProducts.page++;
      if (this.list.length >= data.meta.pagination.total_objects) {
        this.infinityScroll.disabled = true;
      }

      if (event) {
        event.target.complete();
      }
    })
  }

  getCategories() {
    this.storeService.getAllCategories(this.pageRequestCategories).subscribe(data => {
      this.categories = data.categories;
      this.currentCategoryId = this.categories[0].id;
      this.getProducts();
    })
  }

  resetAmount() {
    this.list.forEach(item => item.amount = 0);
  }

  setHasSetting(bool) {
    this.hasSetting = bool;
  }

  toggleHasSetting() {
    this.hasSetting = !this.hasSetting;
  }

  getCart() {
    this.cart = JSON.parse(localStorage.getItem('cart')) || [];
  }

  setCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  calTotalItem() {
    const total = this.cart.reduce((acc, item) => acc + item.amount, 0);
    return total <= 99 ? total : 99;
  }

  goToCart() {
    this.router.navigateByUrl('main/store/cart');
  }

  changeCategory(category) {
    this.setHasSetting(false);
    if (this.currentCategoryId != category.id) {
      this.infinityScroll.disabled = false;
      this.pageRequestProducts.page = 1;
      this.currentCategoryId = category.id;
      this.list = [];
      this.infinityScroll.disabled = false;
      this.ionContent.scrollToTop(0).then(() => {
        this.getProducts();
      })
    }
  }

  async openAddModal(item) {
    const modal = await this.modalController.create({
      component: AddStoreComponent,
      cssClass: 'add-store-modal',
      swipeToClose: true,
      componentProps: {
        item: item
      }
    });

    modal.present();
    modal.onWillDismiss().then(data => {
      if (data.role == 'ok') {
        item.amount = data.data;
        this.getCart();
      }
    })
  }

  decreaseAmount(item) {
    if (item.amount > 0) {
      item.amount--;
    }
    for (let i of this.cart) {
      if (i.id == item.id) {
        i.amount = item.amount;
        i.amount <= 0 && this.cart.splice(this.cart.indexOf(i), 1);
        break;
      }
    }
    this.setCart();
  }

  increaseAmount(item) {
    if (item.amount < 999) {
      item.amount++;
    }
    for (let i of this.cart) {
      if (i.id == item.id) {
        i.amount = item.amount;
        break;
      }
    }
    this.setCart();
  }

  sortDescendingByPrice() {
    this.list.sort((a, b) => b.price - a.price);
  }

  sortAscendingByPrice() {
    this.list.sort((a, b) => a.price - b.price);
  }

  loadMoreProducts(event) {
    this.getProducts(event);
  }

  onScrollContent(event) {
    this.setHasSetting(false);
  }

  async alertGoToOtherStore() {
    const alert = await this.alertController.create({
      header: 'Xem cửa hàng khác',
      buttons: [
        {
          text: 'Hủy',
          role: 'cancel'
        },
        {
          text: 'Đồng ý',
          handler: () => {
            this.router.navigateByUrl('main/store/choose-store');
          }
        }
      ]
    })
    await alert.present();
  }
}
