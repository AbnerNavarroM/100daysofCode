// This code doesn't mutate the object user and keeps data immutable
// We apply the main and most important concepts of functional programming in javascript
// Amazon shopping
const user = {
    name: 'Kim',
    active: true,
    cart: [],
    purchases: [],
  };
  const amazonHistory = [];
  
  const compose = (f, g) => (...args) => f(g(...args));
  let usercomposed = purchaseItem(
    emptyCart,
    buyItem,
    applyTaxToItems,
    addItemToCart
  )(user, { name: 'laptop', price: 200 });
  
  function purchaseItem(...funcs) {
    return funcs.reduce(compose);
  }
  
  function addItemToCart(user, item) {
    const updatedCart = user.cart.concat(item);
    amazonHistory.push(user);
    return Object.assign({}, user, { cart: updatedCart })
  }
  
  function applyTaxToItems(user) {
    const { cart } = user;
    const taxRate = 1.3;
    const updatedCart = cart.map(item => {
      return {
        name: item.name,
        price: item.price * taxRate,
      }
    });
    amazonHistory.push(user);
    return Object.assign({}, user, { cart: updatedCart })
  }
  
  function buyItem(user) {
    amazonHistory.push(user);
    const {cart} = user;

    let recordId = makeRandomId();
    let date = new Date().toISOString();
  
    let record = {
      recordId,
      date: date.substring(0, 10),
      totalAmount: result.totalAmount,
      purchases: user.purchases
    };

    cart.push(record)
    return Object.assign({}, user, { purchases: user.cart })
  }
  
  function emptyCart(user) {
    amazonHistory.push(user);
    return Object.assign({}, user, { cart: [] })
  }

  function makeRandomId(length = 9) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }