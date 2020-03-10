// organize response from query by grouping together
// the names of items that belong to the same order ID

const organize = function (object) {
  let organized = {
    arr: [
      {
        orderid: object.arr[0].orderid,
        status: object.arr[0].status,
        total_price: object.arr[0].total_price,
        items: []
      }
    ]
  };

  for (const item of object.arr) {
    if (item.orderid !== organized.arr[organized.arr.length - 1].orderid) {
      organized.arr.push(
        {
          orderid: item.orderid,
          status: item.status,
          total_price: item.total_price,
          items: [{
            name: item.name,
            qty: item.qty
          }]
        })
    } else {
      organized.arr[organized.arr.length - 1].items.push(
        {
          name: item.name,
          qty: item.qty
        }
      )
    }
  }
  return organized
}

// console.log(JSON.stringify(organize(response), null, 1));


module.exports = organize
