import {Component, OnInit} from '@angular/core';
import {UserSearchForm} from "../../../model/searchForm.mode";
import {PaginationObj, UserListItem} from "../../../model/searchResult.mode";
import {SysService} from "../../../service/sys.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  searchForm: UserSearchForm;
  showMoreSearchParam: boolean = false;
  loading: boolean = false;
  paginationAbout: PaginationObj;
  list: UserListItem[];

  constructor(private sysService: SysService,
              private router: Router) {
    this.searchForm = {
      par1: '',
      par2: "",
      par3: '',
      par4: '',
      par5: '',
      pageSize: 5,
      pageNumber: 1
    };
    this.paginationAbout = {
      total: 0,
      pageSize: this.searchForm.pageSize
    };
  }

  ngOnInit(): void {
    this.search();
  }

  /**
   * 搜索
   */
  search(): void {
    console.log('搜索条件', this.searchForm);
    this.loading = true;
    this.sysService.getUsers(this.searchForm).subscribe((resp) => {
      this.loading = false;
      const {status, data} = resp;
      if (status == "success") {
        this.list = data.list;
        this.paginationAbout['total'] = data.total;
      } else {
        this.list = [];
        this.paginationAbout['total'] = 0;
        this.searchForm.pageNumber = 1;
      }
    });
  }

  handle(ref?: any, flag?: string): void {
    console.log(ref);
    console.log(flag)
    if (flag == "add") {
      //添加角色
      this.router.navigate(['/sys/user/add'], {queryParams: {userid: "-1"}});
    } else if (flag == "edit") {
      //编辑角色
      this.router.navigate(['/sys/user/edit'], {queryParams: {userid: 100}});
    } else if (flag == 'detail') {
      //详情
      this.router.navigate(['/sys/user/detail'], {queryParams: {userid: 100}});
    }
  }

  pageNumChange(pagenumber: number): void {
    this.searchForm.pageNumber = pagenumber;
    this.search();
  }

  searchParCtr(): void {
    this.showMoreSearchParam = !this.showMoreSearchParam;
  }

}
