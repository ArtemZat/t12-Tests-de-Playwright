const { expect } = require('@playwright/test');

// models/TodoPage.js
class SauceDemo {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // Определяем локаторы
    this.productList = page.locator('.inventory_list')
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async authentificate(user,password) {
    await this.page.locator('#user-name').click();
    await this.page.locator('#user-name').fill(user);
    await this.page.locator('#password').click();
    await this.page.locator('#password').fill(password);
    await this.page.locator('#login-button').click();
    await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
  }

  async addCart(product){
    const productCard = this.page.locator('.inventory_item').filter({ hasText: product });
    await productCard.getByRole('button', { name: /add to cart/i }).click();
  }

  async removeCart(product){
    const productCard = this.page.locator('[data-test="inventory-item"]').filter({hasText: product});
    await productCard.getByRole('button', { name: /remove/i}).click();
  }

  async goToCart(){
    await this.page.locator('.shopping_cart_link').click();
  }

  async checkCartProduct(product){
    const productCard = this.page.locator('[data-test="inventory-item"]').filter({hasText: product});
    await expect(productCard).toBeVisible(product);
  }

  async checkNoCartProduct(product){
    const productCard = this.page.locator('[data-test="inventory-item"]').filter({hasText: product});
    await expect(productCard).toBeHidden(product);
  }

  async checkNoMainCartProduct(product){
    const productCard = this.page.locator('[data-test="inventory-item"]').filter({ hasText: product }).getByRole('button');
    await expect(productCard).toHaveText(/add to cart/i);
  }

  async clickCheckout(){
    await this.page.locator('#checkout').click();
  }

  async clickContinue(){
    await this.page.locator('#continue').click();
  }

  async clickFinish(){
    await this.page.locator('#finish').click();
  }

  async clickBackHome(){
    await this.page.locator('#back-to-products').click();
  }

  async writeInfoPerson(nombre,apellido,postal){
    await this.page.locator('#first-name').click();
    await this.page.locator('#first-name').fill(nombre);
    await this.page.locator('#last-name').click();
    await this.page.locator('#last-name').fill(apellido);
    await this.page.locator('#postal-code').click();
    await this.page.locator('#postal-code').fill(postal);
  }
  
  async contadorBotonesRemove(count){
    const removeButtons = this.page.getByRole('button', { name: /remove/i });
    await expect(removeButtons).toHaveCount(count);
  }

  async encontrarTexto(text){
    await expect(this.page.locator('body')).toContainText(text);
  }

}

module.exports = { SauceDemo };