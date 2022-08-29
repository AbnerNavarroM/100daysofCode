// Amazon shopping
const user = {
    name: 'Kim',
    active: true,
    credit: 2000.0,
    cart: [],
    purchases: [],
    purchHistory: []
  };
  
  const user2 = {
    name: 'Wendy',
    active: true,
    credit: 1500.0,
    cart: [],
    purchases: [],
    purchHistory: []
  };
  
  const user3 = {
    name: 'Abner',
    active: true,
    credit: 1000.0,
    cart: [],
    purchases: [],
    purchHistory: []
  };
  
  class Item {
    constructor(name, price) {
      (this.name = name), (this.price = price), (this.tax = 0.0);
    }
  
    applyTaxes() {
      this.tax = this.price * 0.03;
    }
  }
  
  //Implement a cart feature:
  // 1. Add items to the cart.
  
  function addToCart(cart, item) {
    cart.push(item);
    return cart;
  }
  
  function addToUserCart(user, item) {
    addToCart(user.cart, item);
  }
  
  const item1 = new Item('chicharrones grandes', 40.55);
  const item2 = new Item('sandalias granadinas', 250.0);
  const item3 = new Item('cochecito para bebe', 750.0);
  
  //Adding for Kim
  addToUserCart(user, item1);
  addToUserCart(user, item2);
  addToUserCart(user, item3);
  
  //Adding for Wendy
  addToUserCart(user2, item1);
  addToUserCart(user2, item3);
  
  // 2. Add 3% tax to the item in the cart
  item1.applyTaxes();
  item2.applyTaxes();
  item3.applyTaxes();
  
  // 3. Buy item: cart --> purchases
  
  function addToPurchases(cart, purchases) {
    let totalAmount = 0;
    for (let cartItem of cart) {
      purchases.push(cartItem);
      totalAmount += cartItem.price + cartItem.tax;
    }
    return {
      cart: [],
      totalAmount
    };
  }
  
  function fillUserPurchases(user, func) {
    if (user.cart.length === 0) {
      console.log('user ' + user.name + ' has cart empty');
      return false;
    }
    let result = func(user.cart, user.purchases);
    user.cart = result.cart;
    user.credit -= result.totalAmount;
  
    let recordId = makeRandomId();
    let date = new Date().toISOString();
  
    let record = {
      recordId,
      date: date.substring(0, 10),
      totalAmount: result.totalAmount,
      purchases: user.purchases
    };
    user.purchHistory.push(record);
  
    console.log(
      user.name +
      ' purchases:\n' +
      JSON.stringify(user.purchases) +
      '\n Current Credit: ' +
      user.credit.toFixed(2) +
      '\n'
    );
    // user.purchases = []
    return true;
  }
  
  fillUserPurchases(user, addToPurchases);
  fillUserPurchases(user2, addToPurchases);
  
  // 4. Empty cart
  fillUserPurchases(user3, addToPurchases);
  
  //Bonus:
  // accept refunds.
  function refundPurchase(purchases, item) {
    let amountToRefund = 0;
    for (let i = 0; i < purchases.length; i++) {
      if (purchases[i].name === item) {
        amountToRefund = parseFloat(purchases[i].price + purchases[i].tax);
        purchases.splice(i, 1);
        break;
      }
    }
    return amountToRefund;
  }
  
  function refundUserPurchase(user, item, func) {
    let refundAmount = func(user.purchases, item);
    user.credit += refundAmount;
    console.log(
      'refunded amount of: ' +
      parseFloat(refundAmount).toFixed(2) +
      ' to user: ' +
      user.name
    );
  }
  
  refundUserPurchase(user2, 'chicharrones grandes', refundPurchase);
  
  // Track user history.
  console.log(user.purchHistory)
  
  
  function makeRandomId(length = 9) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
  