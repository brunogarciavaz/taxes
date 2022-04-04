const { expect } = require('@jest/globals');
const { processInput } = require('../index');


describe('Output is correct against test supplied data', () => {
  test('Input 1', () => {
    const products = [
      {
        name: "book",
        type: "book",
        price: 12.49,
        imported: false
      },
      {
        name: "music CD",
        type: "music",
        price: 14.99,
        imported: false
      },
      {
        name: "chocolate bar",
        type: "food",
        price: 0.85,
        imported: false
      },
    ]
    expect(processInput('2 book, 1 music CD, 1 chocolate bar', products)).toMatchObject(
      {
        listOfProducts: [
          {
            name: "book",
            price: 24.98
          },
          {
            name: "music CD",
            price: 16.49
          },
          {
            name: "chocolate bar",
            price: 0.85
          }
        ],
        totalPrice: 42.32,
        totalTax: 1.50
      }
    )
  })

  test('Input 2', () => {
    const products = [
      {
        name: "box of chocolates",
        type: "food",
        price: 10.00,
        imported: true
      },
      {
        name: "bottle of perfume",
        type: "cosmetic",
        price: 47.50,
        imported: true
      },
    ]
    expect(processInput('1 box of chocolates, 1 bottle of perfume', products)).toMatchObject(
      {
        listOfProducts: [
          {
            name: "box of chocolates",
            price: 10.50
          },
          {
            name: "bottle of perfume",
            price: 54.65
          },
        ],
        totalPrice: 65.15,
        totalTax: 7.65
      }
    )
  })

  test('Input 3', () => {
    const products = [
      {
        name: "imported bottle of perfume",
        type: "cosmetic",
        price: 27.99,
        imported: true
      },
      {
        name: "bottle of perfume",
        type: "cosmetic",
        price: 18.99,
        imported: false
      },
      {
        name: "packet of headache pills",
        type: "medical",
        price: 9.75,
        imported: false
      },
      {
        name: "imported box of chocolates",
        type: "food",
        price: 11.25,
        imported: true
      },
    ]
    expect(processInput('1 imported bottle of perfume, 1 bottle of perfume, 1 packet of headache pills, 3 imported box of chocolates', products)).toMatchObject(
      {
        listOfProducts: [
          {
            name: "imported bottle of perfume",
            price: 32.19
          },
          {
            name: "bottle of perfume",
            price: 20.89
          },
          {
            name: "packet of headache pills",
            price: 9.75
          },
          {
            name: "imported box of chocolates",
            price: 35.55,
          },
        ],
        totalPrice: 98.38,
        totalTax: 7.90
      }
    )
  })
}) 
