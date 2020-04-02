import { Student } from './../../shared/student';
import { ApiService } from './../../shared/api.service';
import { Component, ViewChild, OnInit, Input, SimpleChanges,ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})

export class StudentsListComponent implements OnInit {
  StudentData: any = [];
  dataSource: MatTableDataSource<Student>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['_id', 'student_name', 'student_email', 'section', 'action'];
  @Input() parentData: any = [];

  @ViewChild('prueba1', {static: true}) prueba1: ElementRef;
  constructor(private studentApi: ApiService,private elementRef:ElementRef) {
    this.studentApi.GetStudents().subscribe(data => {
      this.StudentData = data;
      this.dataSource = new MatTableDataSource<Student>(this.StudentData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })    
  }

  ngOnInit() {
    //ejemplo de addEventListener con Angular
    this.elementRef.nativeElement.querySelector('#titulo')
                                .addEventListener('click', this.imprime);

   this.prueba1.nativeElement.addEventListener('click', this.imprime2);

   }

  deleteStudent(index: number, e){
    if(window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.studentApi.DeleteStudent(e._id).subscribe()
    }
  }
  ngOnChanges(changes: SimpleChanges) {

  console.log(this.parentData);
    this.dataSource = this.parentData;

  }
  imprime(){
alert("ha pulsado el titulo")
  }
  imprime2(){
    alert("ha pulsado listado prueba")
      }
}