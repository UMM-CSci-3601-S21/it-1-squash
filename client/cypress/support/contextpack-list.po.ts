export class CpListPage {

  navigateTo() {
      return cy.visit('/wordlists');
  }

  getCpCards() {
      return cy.get('.context-pack-display app-contextpack-card');
  }

  clickViewCp(pack: Cypress.Chainable<JQuery<HTMLElement>>) {
      return pack.find<HTMLButtonElement>('[data-test=viewContextPackButton]').click();
  }

}
