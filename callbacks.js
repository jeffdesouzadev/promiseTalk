function pricingAPI(callback) {
  return setTimeout(()=>{
    callback(null, 0.25)
  }, 1000);
}

function buyDozenBuns(count, callback) {
    console.log('there are 2 dozen buns for sale');
    callback(null, count);
}
function toEach(dozen, callback) {
    var eachCount = dozen * 12;
    console.log('there are ', eachCount,' buns for sale.');
    callback(null, eachCount);
}
function pricePerEach(eachCount, callback) {
    pricingAPI((err, price) => {
      if (err) {
        console.error(err);
      } else {
        var cost = eachCount * price;
        console.log(eachCount, 'buns would cost $', cost)
        callback(null, cost);
      }
    });
}
function returnChange(wallet, bunTotal, callback) {
    callback(null, wallet - bunTotal);
}



buyDozenBuns(2, (err, count) => {
  if (err) {
    console.log('Error!', err);
  } else {
    toEach(count, (err, eachCount) => {
      if (err) {
        console.log('Error!', err);
      } else {
        pricePerEach(count, (err, cost) => {
          if (err) {
            console.log('Error!', err);
          } else {
            returnChange(10, cost, (err, value) => {
              console.log('we have $', value, ' left');
            })
          }
        })
      }
    })
  }
})