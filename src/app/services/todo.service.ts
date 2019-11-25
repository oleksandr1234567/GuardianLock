// Oleksandr Zakirov 1802341

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Todo {
  // creates database fields
id?: string;
title: string;
password: string;
createdAt: number;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosCollection: AngularFirestoreCollection<Todo>;

  private todos: Observable<Todo[]>;

  constructor(db: AngularFirestore) {
    this.todosCollection = db.collection<Todo>('todos');

    this.todos = this.todosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getTodos() {
    return this.todos;
  }
//fetches from database
  getTodo(id) {
    return this.todosCollection.doc<Todo>(id).valueChanges();
  }
// updates databes
  updateTodo(todo: Todo, id: string) {
    return this.todosCollection.doc(id).update(todo);
  }
// add button
  addTodo(todo: Todo) {
    return this.todosCollection.add(todo);
  }
// - delete button
  removeTodo(id) {
    return this.todosCollection.doc(id).delete();
  }
}
