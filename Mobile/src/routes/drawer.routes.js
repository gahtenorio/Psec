import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

import DrawerContent from '../pages/DrawerContent'
import Home from '../pages/Home';

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator
      drawerContent={() => <DrawerContent />}>
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  );
}