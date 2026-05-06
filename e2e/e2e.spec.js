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

test('Comprobar filtros', async ({ page }) => {
  const sauceDemo = new SauceDemo(page);

  await sauceDemo.goto();
  await sauceDemo.authentificate(user,password);

  await sauceDemo.elegirFiltro("az");
  await sauceDemo.comprobarPrimerProducto("Sauce Labs Backpack");

  await sauceDemo.elegirFiltro("za");
  await sauceDemo.comprobarPrimerProducto("Test.allTheThings() T-Shirt (Red)");

  await sauceDemo.elegirFiltro("lohi");
  await sauceDemo.comprobarPrimerProducto("Sauce Labs Onesie");

  await sauceDemo.elegirFiltro("hilo");
  await sauceDemo.comprobarPrimerProducto("Sauce Labs Fleece Jacket");

});

test('Comprar todos productos', async ({ page }) => {
  const sauceDemo = new SauceDemo(page);

  await sauceDemo.goto();
  await sauceDemo.authentificate(user,password);

  await sauceDemo.agregarTodosProductos();

  await sauceDemo.goToCart();

  await sauceDemo.clickCheckout();
  await sauceDemo.writeInfoPerson("Artem","Apellido","1111");

  await sauceDemo.clickContinue();

  await sauceDemo.clickFinish();

  await sauceDemo.clickBackHome();

  await sauceDemo.encontrarTexto("Products");
});

test('Uso de Burger Menú', async ({ page }) => {
  const sauceDemo = new SauceDemo(page);

  await sauceDemo.goto();
  await sauceDemo.authentificate(user,password);

  await sauceDemo.goToCart();
  await sauceDemo.clickBurgerMenu();
  await sauceDemo.clickTexto("All Items");
  await sauceDemo.encontrarTexto("Products");

  await sauceDemo.clickBurgerMenu();
  await sauceDemo.clickTexto("About");
  await sauceDemo.tieneURL("https://saucelabs.com/");

  await sauceDemo.goto();
  await sauceDemo.authentificate(user,password);
  await sauceDemo.clickBurgerMenu();
  await sauceDemo.clickTexto("Logout");
  await sauceDemo.tieneURL("https://www.saucedemo.com/");
  
  await sauceDemo.authentificate(user,password);
  await sauceDemo.addCart("Sauce Labs Backpack");
  await sauceDemo.addCart("Test.allTheThings() T-Shirt (Red)");
  await sauceDemo.clickBurgerMenu();
  await sauceDemo.clickTexto("Reset App State");
  await sauceDemo.contadorBotonesRemove(0);
  await sauceDemo.goToCart();
  await sauceDemo.checkNoCartProduct("Sauce Labs Backpack");
  await sauceDemo.checkNoCartProduct("Test.allTheThings() T-Shirt (Red)");
  
  await sauceDemo.clickBurgerMenu();
  await sauceDemo.clickTexto("Close Menu");
  await expect(page.getByText("Logout")).toBeHidden();

});

test('Footer', async ({ page }) => {
  const sauceDemo = new SauceDemo(page);

  await sauceDemo.goto();
  await sauceDemo.authentificate(user,password);
  await sauceDemo.checkURL(".social_twitter a","https://twitter.com/saucelabs");
  await sauceDemo.checkURL(".social_facebook a","https://www.facebook.com/saucelabs");
  await sauceDemo.checkURL(".social_linkedin a","https://www.linkedin.com/company/sauce-labs/");


});