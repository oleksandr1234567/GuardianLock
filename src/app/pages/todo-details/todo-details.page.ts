

import { Todo, TodoService } from './../../services/todo.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { getRandomString } from 'selenium-webdriver/safari';
import { validateEventsArray } from 'angularfire2/firestore';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.page.html',
  styleUrls: ['./todo-details.page.scss'],
})
export class TodoDetailsPage implements OnInit {

  public form = [
    { val: 'Favourite', isChecked: true }
  ];

  todo: Todo = {
    Recipe: '',
    Cookingtime: null,
    Ingredients: '',
    Instructions: '',
    Instructions2: '',
    Instructions3: '',
    Instructions4: '',
    Instructions5: '',
    Instructions6: '',
    Instructions7: '',
    Instructions8: '',
    Rating: null,
    createdAt: new Date().getTime(),

  };

  todoId = null;

  constructor(private route: ActivatedRoute, private nav: NavController,
              private todoService: TodoService, private loadingController: LoadingController) { }

  ngOnInit() {
    this.todoId = this.route.snapshot.params.id;
    if (this.todoId)  {
      this.loadTodo();
    }
  }

  async loadTodo() {
    const loading = await this.loadingController.create({
      message: 'Loading list..'
    });
    await loading.present();

    this.todoService.getTodo(this.todoId).subscribe(res => {
      loading.dismiss();
      this.todo = res;
    });
  }

  async saveTodo() {

    const loading = await this.loadingController.create({
      message: 'Saving Entry..'
    });
    await loading.present();

    if (this.todoId) {
      this.todoService.updateTodo(this.todo, this.todoId).then(() => {
        loading.dismiss();
        this.nav.navigateBack('tab2');
      });
    } else {
      this.todoService.addTodo(this.todo).then(() => {
        loading.dismiss();
        this.nav.navigateBack('tab2');
      });
    }
  }

}
