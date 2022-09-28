
export interface OpenTab{
  name:string; //tab名称
  //isHit:boolean; //tab是否显示边框（边框颜色和 type一致）  选中的时候isHit=true显示边框
  selected:boolean; //tab是否是选中状态
  type:string; //tab主题   选中用 success  未选中用 primary
  tabRouter:TabRouter; // Tag 标签需要的数据源格式和 TabRouter联系起来
}
export  interface TabRouter {
  title: string; // 浏览器标签页名称， 路由页面名称
  module: string; // 路由路径
  routepath:string; // 完整的路由sting(包含了路由参数)，  一个不同的routepath可代表一个单独的tab
  /**
   * 路由可选参数，  <a [routerLink]="['/detail', {age: 18, male: true}]"></a>   或者  this.router.navigate(['/detail',  {age: 18, male: true}]);
   * 取值：this.route.snapshot.paramMap.get('age');
   * 地址栏特性： http://localhost:4200/detail;age=18;male=true
   */
  params: object;
  /**
   *  路由查询参数， <a [routerLink]="['/detail']" [queryParams]=" {age: 18, male: true}"></a>  或者 this.router.navigate(['/detail'], {queryParams: {age: 18, male: true}});
   *  取值：this.route.snapshot.queryParamMap.get('age');
   *  地址栏特性：http://localhost:4200/detail?age=18&male=true
   *
   */
  queryParams: object;
  selected?:boolean; // tab页是否是选中状态
  tabrouterIndex?:number; //相同的 module（业务页面一样），不同的参数导致的多个tab
}
