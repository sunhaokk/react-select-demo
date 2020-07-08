import React, { useState, Fragment } from 'react';
import Select, { components } from 'react-select';
import Menu, { SubMenu, MenuItem } from 'rc-menu';

import clsx from 'clsx';
import logo from './logo.svg';
import './menu.less'
// import './App.css';

// 这里定义 select 组件自带的样式。provided 是自带的。 后面覆盖掉需要覆盖的。
const customStyles = {

  menu: (provided, state) => ({
    ...provided,
    width: state.selectProps.width,
    borderBottom: '1px dotted pink',
    color: state.selectProps.menuColor,
  }),
  menuList: (provided, state) => ({
    ...provided,
    padding: '0px'
  }),
 
}
export const colourOptions = [
  { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
  { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
  { value: 'purple', label: 'Purple', color: '#5243AA' },
  { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
  { value: 'orange', label: 'Orange', color: '#FF8B00' },
  { value: 'yellow', label: 'Yellow', color: '#FFC400' },
  { value: 'green', label: 'Green', color: '#36B37E' },
  { value: 'forest', label: 'Forest', color: '#00875A' },
  { value: 'slate', label: 'Slate', color: '#253858' },
  { value: 'silver', label: 'Silver', color: '#666666' },
];

export const flavourOptions = [
  { value: 'vanilla', label: 'Vanilla', rating: 'safe' },
  { value: 'chocolate', label: 'Chocolate', rating: 'good' },
  { value: 'strawberry', label: 'Strawberry', rating: 'wild' },
  { value: 'salted-caramel', label: 'Salted Caramel', rating: 'crazy' },
];


export const groupedOptions = [
  { value: 'vanilla', label: 'Vanilla', rating: 'safe' },
  {
    label: 'Colours',
    value: 'Colours',
    options: colourOptions,
  },
  {
    label: 'Flavours',
    value: 'Flavours',
    options: flavourOptions,
  },
];

// 定制清除组件  就是选中后的 叉号符号。  注意要有叉号  必须开启多选  也就是在 select 组件里面 加上  isMulti
const CustomClearText = () => 'clear all';

const ClearIndicator = props => {
  const {
    children = <CustomClearText />,
    getStyles,
    innerProps: { ref, ...restInnerProps },
  } = props;
  return (
    <div
      {...restInnerProps}
      ref={ref}
      style={getStyles('clearIndicator', props)}
    >
      <div style={{ padding: '0px 5px' }}>{children}</div>
    </div>
  );
};

const ClearIndicatorStyles = (base, state) => ({
  ...base,
  cursor: 'pointer',
  color: state.isFocused ? 'blue' : 'black',
});


// 定制 控制组件   也就是一个大的包裹 负责ValueContainer和IndicatorsContainer的定位。后面是菜单。
const controlStyles = {
  borderRadius: '0px solid black',
  padding: '0px',
  margin: '0px',
  background: 'green',
  color: 'white',
};

const ControlComponent = props => (
  <div style={controlStyles}>
    {<p>Custom Control</p>}
    <components.Control {...props} />
  </div>
);

// 定制 下拉组件  也就是那个 向下的三角符号
const DropdownIndicator = (
  props
) => {
  return (
    <components.DropdownIndicator {...props}>
      @@
    </components.DropdownIndicator>
  );
};

// 定制分组组件   如果Select的数据中包含组，则围绕每个组的包装器。默认组件负责映射其选项，以及将其数据呈现​​到GroupHeading中。
const groupStyles = {
  border: `0px dotted ${colourOptions[2].color}`,
  borderRadius: '0px',
  padding: '0px',
  margin: '0px',
  background: '#f2fcff',
};

const Group = props => (
  <div style={groupStyles}>
    <components.Group {...props} />
  </div>
);

// 定制右侧的图标 

const IndicatorsContainer = props => {
  return (
    <div style={{ background: colourOptions[2].color }}>
      <components.IndicatorsContainer {...props} />
    </div>
  );
};

// 定制右侧图标分割符
const indicatorSeparatorStyle = {
  alignSelf: 'stretch',
  backgroundColor: colourOptions[2].color,
  marginBottom: 8,
  marginTop: 8,
  width: 1,
};

const IndicatorSeparator = ({ innerProps }) => {
  return <span style={indicatorSeparatorStyle} {...innerProps} />;
};

// Menu
function getLength(options) {
  return options.reduce((acc, curr) => {
    if (curr.options) return acc + getLength(curr.options);
    return acc + 1;
  }, 0);
}

const menuHeaderStyle = {
  padding: '0px 0px',
  color: 'white',
};

const Menus = props => {
  const optionsLength = getLength(props.options);
  return (
    <Fragment>
      <div style={menuHeaderStyle}>
        Custom Menu with {optionsLength} options
      </div>
      <components.Menu {...props}>{props.children}</components.Menu>
    </Fragment>
  );
};

// MenuList

const menuStyle = {
  minWidth: '100px',
  padding: '0px 0px',
  margin: '0px'

}
const MenuList = props => {
  console.log(props)
  let options = props.options
  props.children.map((n)=>{
  })
  const menuClick = ()=>{
    let val = props.getValue()
    console.log(val)
    props.setValue(options[0])

  }
  const subClick = ()=>{
    props.setValue([options[1],options[1]['options'][0]])
  }
  return (
    <components.MenuList {...props}>
      <Menu style={menuStyle}>
      <MenuItem onClick={menuClick} multiple={true} selectedKeys={2-1}>1</MenuItem>
      <SubMenu title="2">
        <MenuItem onClick={subClick} key={2-1}>2-1</MenuItem>
        <MenuItem>2-2</MenuItem>

      </SubMenu>
    </Menu>
    </components.MenuList>
  );
};
// 主程序
function App() {
  const [selectedOptions, setSelectedOptions] = useState(null)

  let handleChange = (newValue, actionMeta) => {
    console.group('Value Changed');
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };
  let handleInputChange = (inputValue, actionMeta) => {
    console.group('Input Changed');
    console.log(inputValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };
  return (
    <div className="App">


      <Select
        isClearable={true}
        styles={{ clearIndicator: ClearIndicatorStyles }}
        // components={{ Control: ControlComponent, ClearIndicator,DropdownIndicator,Group,IndicatorsContainer,IndicatorSeparator,MenuList }}
        components={{ MenuList }}
        menuIsOpen={true}
        styles={customStyles}
        isSearchable={false}
        name="color"
        onClick={handleChange}
        options={groupedOptions}
        isMulti
      />


    </div>
  );
}

export default App;
