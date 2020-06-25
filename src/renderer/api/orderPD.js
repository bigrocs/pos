const SQL2000OrderSQL = import('@/sql2000/model/orderPD')

/**
 * syncOrder 同步订单
 */
export function syncOrder(orders) {
  return new Promise(async(resolve, reject) => {
    await SQL2000OrderSQL.then(async sql => {
      await sql.default.Create(orders).then(async response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  })
}
