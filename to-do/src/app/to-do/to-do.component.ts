import { Component, Input, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { todo } from './todo.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.sass'],
})
export class TodoComponent implements OnInit {
  @Input() todo!: todo;
  todos: todo[] = [];

  constructor(
    private todoService: TodoService,
  ) {}

  ngOnInit(): void {
    this.getAllToDos();
  }

  trackByFn(index: number, item: any): string {
    return item._id;
  }

  profileForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
  });

  getAllToDos() {
    this.todoService.getAllToDos().subscribe((data: todo[]) => {
      this.todos = data;
    });
  }

  handleSubmit() {
    const data = {
      title: this.profileForm.value.title,
      description: this.profileForm.value.description,
    };
    this.todoService.postToDo(data).subscribe((response: any) => {
      console.log(response);
      this.getAllToDos();
    });
    this.profileForm.reset();
  }

  handleRemove(id: number) {
    this.todoService.deleteToDo(id).subscribe((response: any) => {
      console.log(response);
      this.getAllToDos();
    });
  }
}
