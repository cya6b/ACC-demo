export default {
  title: 'v1.1.4',
  updateTime: '2023-10-31',
  children: [
    {
      title: 'bug修复',
      list: [
        '设计质量审查大小窗联动查看场景下，小窗中下拉选择切换图纸或模型不生效问题修复',
        '设计质量审查大小窗联动查看场景下，主窗为图纸时，小窗中无法绘制房间类构件的定位框问题修复',
        '主窗为模型查看时，房间类问题annor点击取消active状态后，绘制的房间定位框消失问题修复'
      ]
    },
    {
      title: '新增方法 clearAllMarkups',
      list: [
        'Model对象新增clearAllMarkups方法，支持清空所有批注',
        'ModelSet对象新增clearAllMarkups方法，支持清空所有批注',
        'Compliance对象新增clearAllMarkups方法，支持清空主窗口中所有批注',
        'Review对象新增clearAllMarkups方法，支持清空主窗口中所有批注'
      ]
    }
  ]
}