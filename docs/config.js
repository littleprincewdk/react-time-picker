const componentList = [
  {
    title: 'Time picker',
    url: 'timepicker',
    component: 'TimePicker',
    children: [],
  }
];

const nav = [
  {
    title: 'Home',
    url: '/',
  },
  {
    title: 'Docs',
    url: `/doc/${componentList[0].url}`,
  },
  {
    title: 'Example',
    url: `/example/${componentList[0].url}`,
  },
];


export {
  nav,
  componentList,
};
