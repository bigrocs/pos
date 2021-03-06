
const Mousetrap = require('mousetrap')
// require('@/utils/mousetrap-global-bind')
import { Message } from 'element-ui'
import store from '@/store'
const Keyboard = store.state.settings.Keyboard
import hander from './hander'
import log from '@/utils/log'

const mousetrap = {
  registerMousetrap() {
    Object.keys(Keyboard).map(key => {
      if (hander.hasOwnProperty(key)) { // 方式不存在的方法注册
        Mousetrap.bindGlobal(Keyboard[key].toLowerCase(), async() => {
          if (store.state.terminal.isPay) { // 支付中禁止操作
            Message({
              type: 'warning',
              message: '支付锁定中,请勿进行其他操作!'
            })
          } else {
            if (this.order.status) { // 根据订单状态初始化订单
              await this.initOrder()
            }
            log.h('info', 'Mousetrap.bindGlobal', JSON.stringify(key), Keyboard[key])
            setTimeout(() => {
              hander[key](this)
            }, 0)// 加入js队列[等待其他异步操作完成后在执行]
          }
        })
      }
    })
  },
  unregisterMousetrap() {
    Object.keys(Keyboard).map(key => { // 注销快捷键
      if (hander.hasOwnProperty(key)) { // 方式不存在的方法注销
        Mousetrap.unbindGlobal(Keyboard[key].toLowerCase())
      }
    })
  }
}
export default mousetrap
