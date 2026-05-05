// tests/todo.spec.js
const { test, expect } = require('@playwright/test');
const { SauceDemo } = require('../pages/SauceDemo');
const user = "standard_user";
const password = "secret_sauce"


test('Añadir/eliminar varios productos', async ({ page }) => {
  const sauceDemo = new SauceDemo(page);

  await sauceDemo.goto();
  await sauceDemo.authentificate(user,password);
  
  await sauceDemo.addCart("Sauce Labs Bike Light");
  await sauceDemo.addCart("Sauce Labs Onesie");
  await sauceDemo.addCart("Test.allTheThings() T-Shirt (Red)");
  await sauceDemo.contadorBotonesRemove(3);

  await sauceDemo.removeCart("Sauce Labs Onesie");
  await sauceDemo.checkNoMainCartProduct("Sauce Labs Onesie");
  await sauceDemo.checkCartProduct("Test.allTheThings() T-Shirt (Red)");
  await sauceDemo.checkCartProduct("Sauce Labs Bike Light");
  
  await sauceDemo.goToCart();
  await sauceDemo.checkNoCartProduct("Sauce Labs Onesie");
  await sauceDemo.checkCartProduct("Test.allTheThings() T-Shirt (Red)");
  await sauceDemo.checkCartProduct("Sauce Labs Bike Light");

  await sauceDemo.removeCart("Sauce Labs Bike Light");
  await sauceDemo.checkNoCartProduct("Sauce Labs Bike Light");
});

test('Comprar producto', async ({ page }) => {
  const sauceDemo = new SauceDemo(page);

  await sauceDemo.goto();
  await sauceDemo.authentificate(user,password);
  
  await sauceDemo.addCart("Sauce Labs Bike Light");
  await sauceDemo.checkCartProduct("Sauce Labs Bike Light");
  
  await sauceDemo.goToCart();
  await sauceDemo.checkCartProduct("Sauce Labs Bike Light");

  await sauceDemo.clickCheckout();
  await sauceDemo.writeInfoPerson("Artem","Apellido","1111");

  await sauceDemo.clickContinue();

  await sauceDemo.checkCartProduct("Sauce Labs Bike Light");

  await sauceDemo.clickFinish();

  await sauceDemo.clickBackHome();

  await sauceDemo.checkNoMainCartProduct("Sauce Labs Backpack");
});

test('Comprar sin producto en carrito', async ({ page }) => {
  const sauceDemo = new SauceDemo(page);

  await sauceDemo.goto();
  await sauceDemo.authentificate(user,password);
  
  await sauceDemo.goToCart();
  await sauceDemo.clickCheckout();
  await sauceDemo.encontrarTexto("Your Cart");
});

test('Introducir texto largo en campos de datos', async ({ page }) => {
  const sauceDemo = new SauceDemo(page);

  await sauceDemo.goto();
  await sauceDemo.authentificate(user,password);

  await sauceDemo.addCart("Sauce Labs Bike Light");
  await sauceDemo.goToCart();
  await sauceDemo.clickCheckout();
  await sauceDemo.writeInfoPerson("1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111","1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111","1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111ñá");
  await sauceDemo.clickContinue();
  await sauceDemo.encontrarTexto("Checkout: Overview");
});

// Puede servir para verificar filtro
// await page.locator('[data-test="inventory-item"]').nth(1).click();
// await page.locator('[data-test="inventory-item"]').first().click();