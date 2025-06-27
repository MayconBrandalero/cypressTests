

class BookingAPI {
  postBooking(body) {
    const baseUrl = 'https://restful-booker.herokuapp.com';
    return cy.request({
      method: 'POST',
      url: `${baseUrl}/booking`,
      body,
      failOnStatusCode: false,
    });
  };

  getBooking(id) {
    const baseUrl = 'https://restful-booker.herokuapp.com';
    return cy.request({
      method: 'GET',
      url: `${baseUrl}/booking/${id}`,
      failOnStatusCode: false,
    });
  };

  putBooking(id, body, token) {
    const baseUrl = 'https://restful-booker.herokuapp.com';
    return cy.request({
      method: 'PUT',
      url: `${baseUrl}/booking/${id}`,
      headers: { Cookie: `token=${token}` },
      body,
      failOnStatusCode: false,
    });
  };

  deleteBooking(id, token) {
    const baseUrl = 'https://restful-booker.herokuapp.com';
    return cy.request({
      method: 'DELETE',
      url: `${baseUrl}/booking/${id}`,
      headers: { Cookie: `token=${token}` },
      failOnStatusCode: false,
    });
  };

  authenticate(username, password) {
    const baseUrl = 'https://restful-booker.herokuapp.com';
    return cy.request({
      method: 'POST',
      url: `${baseUrl}/auth`,
      body: { username, password },
      failOnStatusCode: false,
    });
  };
};

export default new BookingAPI();
