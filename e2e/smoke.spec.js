// tests/todo.spec.js
const { test, expect } = require('@playwright/test');
const { SauceDemo } = require('../pages/SauceDemo');

test('Autentificación', async ({ page }) => {
  const sauceDemo = new SauceDemo(page);

  await sauceDemo.goto();
  await sauceDemo.authentificate("standard_user","secret_sauce");
});

test('Añadir al carrito', async ({ page }) => {
  const sauceDemo = new SauceDemo(page);

  await sauceDemo.goto();
  await sauceDemo.authentificate("standard_user","secret_sauce");
  await sauceDemo.addCart("Sauce Labs Backpack");
  await sauceDemo.goToCart();
  await sauceDemo.checkCartProduct("Sauce Labs Backpack");

});

test('Realizar pedido', async ({ page }) => {
  const sauceDemo = new SauceDemo(page);

  await sauceDemo.goto();
  await sauceDemo.authentificate("standard_user","secret_sauce");
  await sauceDemo.addCart("Sauce Labs Backpack");
  await sauceDemo.goToCart();
  await sauceDemo.checkCartProduct("Sauce Labs Backpack");
  await sauceDemo.clickCheckout();
  await sauceDemo.writeInfoPerson("Name","Apellido","1111")
  await sauceDemo.clickContinue();
  await sauceDemo.checkCartProduct();
  await sauceDemo.clickFinish();    
  await sauceDemo.clickBackHome();

});