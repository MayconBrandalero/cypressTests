const { defineConfig } = require("cypress");
const { queryDatabase } = require("./cypress/support/dbUtils");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://opensource-demo.orangehrmlive.com',
    specPattern: 'cypress/e2e/**/*.test.js',
    setupNodeEvents(on) {
      on("task", {
        queryDb({ query, params }) {
          return queryDatabase(query, params);
        }
      });
    }
  }
});
