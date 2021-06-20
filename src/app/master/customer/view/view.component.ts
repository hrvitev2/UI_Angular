import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from '../../../http.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  id: any;
  customerDetails: any;

  constructor(private http: HttpService, private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService) {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.getCustomerDetails(this.id)
    });
  }

  ngOnInit(): void {
  }

  getCustomerDetails(id) {

    this.http.getDetails('customer', id).subscribe(
      (data: any) => {
        this.customerDetails = data.data;
      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }

}
