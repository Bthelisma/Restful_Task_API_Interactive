import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit  {
  constructor(private _httpService: HttpService) {}
  title = 'Restful Tasks API';
  tasks = [];
    
  onButtonClick(): void { 
      this.getTasksFromService();
      
  }
    
  getTasksFromService(){
    let observable = this._httpService.getTasks();
    observable.subscribe(data => {
      console.log("Got our tasks!", data)
          // In this example, the array of tasks is assigned to the key 'tasks' in the data object. 
          // This may be different for you, depending on how you set up your Task API.
      this.tasks = data['tasks'];
      console.log(this.tasks)
    });
  }
}
  
  

  


