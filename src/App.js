import React, { useState, Fragment } from 'react';

import Menu, { SubMenu, MenuItem } from 'rc-menu';
import './menu.less'
export default ()=>{
  return (
    <Menu>
    <MenuItem>1</MenuItem>
    <SubMenu title="2">
      <MenuItem>2-1</MenuItem>
    </SubMenu>
  </Menu>
  )
}


