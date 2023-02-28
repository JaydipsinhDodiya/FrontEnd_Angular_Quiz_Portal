import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  //Example of This Data but its used our service
  categories = [
    { cid:23,
      title: 'programming',
      description:'this is category',
  
    },
    { cid:24,
      title: 'Gk',
      description:'this is category',
  
    },
    { cid:25,
      title: 'Aptitude',
      description:'this is category',
    },
  ];
  
  constructor(private _category: CategoryService) {

  }

  ngOnInit(): void {

    this._category.categories().subscribe((data:any)=>{
      //css
      this.categories=data;
      console.log(this.categories);

    },
    (error)=>{
      console.log(error);
      Swal.fire("Error !!", "Error in loadig data ", 'error')
    }
    );
  }

}
