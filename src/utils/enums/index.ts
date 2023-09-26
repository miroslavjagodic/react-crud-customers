export enum Language {
  EN = 'EN',
  DE = 'DE',
}

export enum LangNameSpace {
  Common = 'common',
}

export enum Route {
  Base = '/',
  Dashboard = '/dashboard',
  Customers = '/customers',
  Details = '/details',
  Create = '/create',
  Edit = '/edit',
}

export enum ApiQuery {
  Customers = 'customers',
  Customer = 'customers/:id',
  CustomerCreate = 'customers/:id/create',
  CustomerEdit = 'customers/:id/edit',
  CustomerDelete = 'customers/:id/delete',
}

export enum CreateCustomerForm {
  Id = 'id',
  Active = 'active',
  Company = 'company',
  Industry = 'industry',
  About = 'about',
  Project = 'project',
  Projects = 'projects',
  Name = 'name',
  Contact = 'contact',
  StartDate = 'start_date',
  EndDate = 'end_date',
  Status = 'status',
}
