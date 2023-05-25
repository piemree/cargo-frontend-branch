import React from 'react';
import CIcon from '@coreui/icons-react';
import {
  cilBell,
  cilBuilding,
  cilCalculator,
  cilCarAlt,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilHome,
  cilNotes,
  cilPencil,
  cilPlus,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilUser,
} from '@coreui/icons';
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react';

const _nav = [
  {
    component: CNavItem,
    name: 'Genel Bakış',
    to: '/dashboard',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Kargo Oluştur',
    to: '/createCargo',
    icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Araç Yükle',
    to: '/giveCargosToVehicle',
    icon: <CIcon icon={cilCarAlt} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Kargo Teslim Et',
    to: '/giveCargoToCustomer',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
];

export default _nav;
