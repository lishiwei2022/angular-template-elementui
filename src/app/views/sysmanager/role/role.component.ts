import {Component, OnInit} from '@angular/core';
import {RoleSearchForm} from "../../../model/searchForm.mode";
import {PaginationObj, RoleListItem} from "../../../model/searchResult.mode";
import {SysService} from "../../../service/sys.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  searchForm: RoleSearchForm;
  showMoreSearchParam: boolean = false;
  list: RoleListItem[];
  paginationAbout: PaginationObj;
  loading: boolean = false;  //表格加载效果

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
    this.sysService.getRoles(this.searchForm).subscribe((resp) => {
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
      this.router.navigate(['/sys/role/add'], {queryParams: {roleid: "-1"}});
    } else if (flag == "edit") {
      //编辑角色
      this.router.navigate(['/sys/role/edit'], {queryParams: {roleid: 100}});
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
