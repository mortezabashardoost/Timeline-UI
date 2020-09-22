import { environment } from '../../environments/environment';

const dashboardAPI = 'dashboard';
const measureAPI = 'measure';

export class Config {

    // Dashboard
    // tslint:disable-next-line:typedef
    public static get Dashboard() {
        return `${environment.baseApiUrl}/${dashboardAPI}`;
    }

    // Configurations
    // tslint:disable-next-line:typedef
    public static get Measures() {
        return `${environment.baseApiUrl}/${measureAPI}`;
    }

}
