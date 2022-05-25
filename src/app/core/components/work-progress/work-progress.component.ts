import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs';
import { ApiService } from '../../services/api.service';

export interface Task {
  id?: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-work-progress',
  templateUrl: './work-progress.component.html',
  styleUrls: ['./work-progress.component.scss']
})

export class WorkProgressComponent implements OnInit {

  todo: Task[] = [];
  inProgress: Task[] = [];
  done: Task[] = [];
  projects: any = [];
  selectedProject: any;
  id: any;

  ngOnInit(): void {
    this.api.getAllJobs()
      .pipe(
        filter(res => !!res)
      )
      .subscribe(res => {
        res.forEach((ans: any) => {
          //DYNAMIC USER
          if (ans.postedBy === '0uv4r4jLry1UEtW2XAJz') {
            this.projects.push(ans);
          }
        });
      });
  }

  constructor(private dialog: MatDialog, private api: ApiService) { }

  newTask(): void {
    //   const dialogRef = this.dialog.open(TaskDialogComponent, {
    //     width: '270px',
    //     data: {
    //       task: {},
    //     },
    //   });
    //   dialogRef
    //     .afterClosed()
    //     .subscribe((result: TaskDialogResult) => {
    //       if (!result) {
    //         return;
    //       }
    //       this.todo.push(result.task);
    //     });
  }

  editTask(list: 'done' | 'todo' | 'inProgress', task: any): void {
    // const dialogRef = this.dialog.open(TaskDialogComponent, {
    //   width: '270px',
    //   data: {
    //     task,
    //     enableDelete: true,
    //   },
    // });
    // dialogRef.afterClosed().subscribe((result: TaskDialogResult) => {
    //   if (!result) {
    //     return;
    //   }
    //   const dataList = this[list];
    //   const taskIndex = dataList.indexOf(task);
    //   if (result.delete) {
    //     dataList.splice(taskIndex, 1);
    //   } else {
    //     dataList[taskIndex] = task;
    //   }
    // });
  }

  drop(event: CdkDragDrop<any[]>): void {
    if (event.previousContainer === event.container) {
      return;
    }
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
    this.getStatus(event.currentIndex);
  }

  getStatus(id: any) {
    // switch (id) {
    //   case 0:

    //     break;
    //   case 1:

    //     break;
    //   case 2:

    //     break;

    //   default:
    //     break;
    // }
  }

  selectProject(id: any) {
    this.projects.forEach((res: any) => {
      res.id === id.value ? this.selectedProject = res : '';
    });
    if (this.selectedProject) {
      this.api.getCards()
        .pipe(
          filter(res => !!res)
        )
        .subscribe(res => {
          res.forEach((ans: any) => {
            if (ans.jobid === id.value) {
              const payload = {
                id: ans.id,
                title: ans.title,
                description: ans.description
              };
              this.todo.push(payload);
            }
          });
        });
      this.todo = [];
    }
  }

}
