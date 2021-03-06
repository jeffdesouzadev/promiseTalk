function pricingAPI(callback) {
  return setTimeout(()=>{
    callback(null, 0.25)
  }, 1000);
}

function buyDozenBuns(count) {
  return new Promise((resolve, reject) => {
    console.log('there are 2 dozen buns for sale');
    resolve(count);
  });
}
function toEach(dozen) {
  return new Promise((resolve, reject) => {
    var eachCount = dozen * 12;
    console.log('there are ', eachCount,' buns for sale.');
    resolve(eachCount);
  });
}
function pricePerEach(eachCount) {
  return new Promise((resolve, reject) => {
    pricingAPI((err, price) => {
      if (err) {
        console.error(err);
      } else {
        var cost = eachCount * price;
        console.log(eachCount, 'buns would cost $', cost)
        resolve(cost);
      }
    });
  });
}
function returnChange(wallet, bunTotal) {
  return new Promise((resolve, reject) => {
    resolve(wallet - bunTotal);
  });
}

async function getChange(dozenBuns) {
  try{
    const dozen = await buyDozenBuns(dozenBuns);
    const eachCount = await toEach(dozen);
    const cost = await pricePerEach(eachCount);
    const moneyLeft = await returnChange(10, cost);
    console.log('we have $', moneyLeft, ' left.');
  } catch {
    console.log('error!', err);
  }
}
getChange(2);