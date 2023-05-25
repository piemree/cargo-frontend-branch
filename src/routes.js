import Dashboard from './views/pages/dashboard/Dashboard';
import CreateCargo from './views/pages/createCargo/CreateCargo';
import GiveCargosToVehicle from './views/pages/giveCargosToVehicle/GiveCargosToVehicle';
import GiveCargoToCustomer from './views/pages/giveCargoToCustomer/GiveCargoToCustomer';


const privateRoutes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/createCargo', name: 'CreateCargo', element: CreateCargo },
  { path: '/giveCargosToVehicle', name: 'GiveCargosToVehicle', element: GiveCargosToVehicle },
  { path: '/giveCargoToCustomer', name: 'GiveCargoToCustomer', element: GiveCargoToCustomer }

];

export { privateRoutes };
