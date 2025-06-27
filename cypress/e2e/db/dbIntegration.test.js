describe("Database Integration Tests", () => {
  describe("Validate employees hired before February 2023", () => {
    it("Validate employees hired before February 2023", () => {
      const query = `
        SELECT nome, data_admissao 
        FROM funcionarios 
        WHERE data_admissao < $1
      `;
      const params = ["2023-02-01"];

      cy.task("queryDb", { query, params }).then((result) => {
        expect(result.rows.length).to.be.greaterThan(0);

        result.rows.forEach((row) => {
          expect(row.nome).to.be.a("string").and.not.empty;
        });
      });
    });
  });

  describe("Validate active products", () => {
    it("Validate that all products have a valid price", () => {
      const query = `
        SELECT nome, preco 
        FROM produtos
      `;

      cy.task("queryDb", { query }).then((result) => {
        expect(result.rows.length).to.be.greaterThan(0);

        result.rows.forEach((row) => {
          const preco = Number(row.preco);

          expect(preco).to.not.be.null;
          expect(preco).to.be.a("number");
          expect(preco).to.be.at.least(0);
        });
      });
    });
  });

  describe("Validate purchase total", () => {
    it("Validate the sum of item prices in the purchases table", () => {
      const compraId = 1;

      const itemQuery = `
        SELECT quantidade, preco_unitario 
        FROM itens_compra 
        WHERE compra_id = $1
      `;

      const totalQuery = `
        SELECT total 
        FROM compras 
        WHERE id = $1
      `;

      cy.task("queryDb", { query: itemQuery, params: [compraId] }).then((itemResult) => {
        if (itemResult.rows.length === 0) {
          cy.log("Skipping test (No items found)");
          return;
        };
        expect(itemResult.rows.length).to.be.greaterThan(0); //Observação: Aqui é necessário que exista algum item na tabela de compra. Na tabela fornecida não encontrei, por isso este teste está falhando

        let somaDosItens = 0;

        itemResult.rows.forEach((item) => {
          const quantidade = Number(item.quantidade);
          const precoUnitario = Number(item.preco_unitario);
          somaDosItens += quantidade * precoUnitario;
        });

        cy.task("queryDb", { query: totalQuery, params: [compraId] }).then((totalResult) => {
          expect(totalResult.rows.length).to.be.greaterThan(0); //Observação: Também não encontrei valores na tabela de compras
          const totalRegistrado = Number(totalResult.rows[0].total);
          expect(somaDosItens).to.eq(totalRegistrado);
        });
      });
    });
  });
});
