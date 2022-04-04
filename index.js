const pipe = (...functions) => (x) => functions.reduce((v, f) => f(v), x)
const round = (n) => Number((Math.ceil(n * 20) / 20).toFixed(2))

const applyTax = (product, exemption, percent) => {
  if (exemption) return product
  return {...product, tax: (product.tax || 0) + round((percent * product.price / 100))}
}

const applyImportTax = (product) => applyTax(product, !product.imported, 5)
const applyBasicSalesTax = (product) => applyTax(product, (['book', 'food', 'medical'].includes(product.type)), 10)

const generateOrder = (products) => {
  // Pipes products through taxes transformations
  return products.map((product) => pipe(applyBasicSalesTax, applyImportTax)(product))
}

const generateReceipt = (order) => {
    const listOfProducts = order.map((p) => {
      return {...p, price: (Math.round((p.price + (p.tax || 0)) * 100) / 100) * p.quantity } 
    })
    const totalPrice = listOfProducts.reduce((acc, p) => acc + p.price, 0)
    const totalTax = round(order.reduce((acc, p) => acc + (p.tax || 0) * p.quantity, 0))
    return {listOfProducts, totalPrice, totalTax}
}

const processInput = (input, products) => {
  const orderArr = input.split(',').map((str) => str.trim().split(/ (.*)/s)) // => [[quantity, product], [quantity, product]...]
  const selectedProducts = orderArr.map((item) => {
    const selectedProduct = products.find((product) => product.name === item[1])
    if (!selectedProduct) throw new Error(`${item[1]} does not exist!`)
    return {...selectedProduct, quantity: item[0]}
  })
  return pipe(generateOrder, generateReceipt)(selectedProducts)
}

module.exports = {
  processInput
};