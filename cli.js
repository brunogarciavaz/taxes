const { processInput } = require('./index');
const products = require('./products.json');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

console.log('\x1b[94m \n List of avaiable products: \n \x1b[0m');
products.forEach((product) => {
  console.log(`\x1b[93m ${product.name} at $${product.price} \n \x1b[0m`);
})

readline.question(' Please write the quantity of a product followed by its name. Seperate products by comma (e.g. 1 book, 3 imported chocolate) \n \n', orderStr => {
  const output = processInput(orderStr, products)
  console.log(
    ` 
        \nOrder receipt: \n
        \n${output.listOfProducts.map((p) => `\x1b[93m${p.quantity} ${p.name}: $${p.price}\x1b[0m`).join('\n')}
        \nSalex Tax: ${output.totalTax} \n
        \nTotal: ${output.totalPrice.toFixed(2)} \n
      `
  )
  readline.close()
})