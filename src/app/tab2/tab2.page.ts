// Oleksandr Zakirov 1802341

import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from '../services/todo.service';
import { AuthenticateService } from '../services/authentication.service';

import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  public form = [
    { val: 'Favourite', isChecked: true }
  ];
  userEmail: string;

  todos: Todo[];

  constructor(private todoService: TodoService,
              private navCtrl: NavController,
              private authService: AuthenticateService,
              private route: ActivatedRoute, private nav: NavController,) {}

  ngOnInit() {
    this.todoService.getTodos().subscribe(res => {
      this.todos = res;
    });

    if (this.authService.userDetails()) {
      this.userEmail = this.authService.userDetails().email;
    } else {
      this.navCtrl.navigateBack('');
    }
  }

  logout() {
    this.authService.logoutUser()
    .then(res => {
      console.log(res);
      this.navCtrl.navigateBack('');
    })
    .catch(error => {
      console.log(error);
    });
    this.todoService.getTodos().subscribe(res => {
      this.todos = res;
    });
  }
//delete button
  remove(item) {
    this.todoService.removeTodo(item.id).then(() => {
      this.nav.navigateBack('tabs/tab2');
    });
  }

  
}
