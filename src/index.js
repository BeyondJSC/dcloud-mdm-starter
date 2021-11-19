import HelloWorld from './components/hello-world'

export default [
  {
    name: 'hello-world', // 名称不可重复
    component: HelloWorld,
    type: 'applicationPage'
  },
  {
    name: 'hello-world2',
    component: HelloWorld,
    type: 'applicationPage'
  }
]