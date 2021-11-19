import workbench from './workbench'
import dynamicComp from './dynamic-comp/dynamic-comp'

export default {
  path: '/:tenantId/workbench',
  name: 'workbench',
  component: workbench,
  children: [
    {
      path: ':name',
      name: 'dynamic-comp',
      component: dynamicComp
    }
  ]
}