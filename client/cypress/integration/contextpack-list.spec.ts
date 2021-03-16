import { CpListPage } from '../support/contextpack-list.po';

const page = new CpListPage();

describe('Contextpack list', () => {

    before(() => {
        cy.task('seed:database');
    });

    beforeEach(() => {
        page.navigateTo();
    });

    it('Should have 3 context packs', () => {
        page.getCpCards().should('have.length', 3);
    });

    it('Should click "View Context Pack" on a context pack and lead to a valid URL', () => {
        page.getCpCards().first().then((card) => {
            const cpName = card.find('.cp-card-name').text();
            const cpEnabled = card.find('.cp-card-enabled').text();

            page.clickViewCp(page.getCpCards().first());

            cy.url().should('match', /\/wordlists\/[0-9a-fA-F]{24}/);

        });
    });

});
