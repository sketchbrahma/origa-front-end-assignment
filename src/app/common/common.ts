export const userTableColumns = [
  'id',
  'name',
  'username',
  'city',
  'zipcode',
  'companyname',
];

export const userGeoCoOrdinatesChartLabel = [
  'Latitude > 0',
  'Latitude < 0',
  'Longitude > 0',
  'Longitude < 0',
];

export const userGeoCoOrdinatesChartColors = [
  '#FF0000',
  '#4BC0C0',
  '#FFCE56',
  '#E7E9ED',
  '#36A2EB',
];

export const userGeoCoOrdinatesChartType = 'pie';

export class PieChart {
  chartLabels: string[];
  chartData: number[];
  chartType: string;
  chartOptions: {};
}

class Geo {
  lat: string;
  lng: string;
}

class Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

class CompanyDetail {
  name: string;
  catchPhrase: string;
  bs: string;
}

export class UserProfile {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: CompanyDetail;
}
