import { faker } from "@faker-js/faker";

function generateBookingBody() {
  const generateCheckin = faker.date.future();
  const generateCheckout = faker.date.future({ refDate: generateCheckin });

  const checkinDate = generateCheckin.toISOString().split('T')[0];
  const checkoutDate = generateCheckout.toISOString().split('T')[0];

  return {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    totalprice: faker.number.int({ min: 100, max: 1000 }),
    depositpaid: faker.datatype.boolean(),
    bookingdates: {
      checkin: checkinDate,
      checkout: checkoutDate
    },
    additionalneeds: faker.lorem.word(),
  };
};

function toMatchBooking(response, payload) {
  expect(response.firstname).to.eq(payload.firstname);
  expect(response.lastname).to.eq(payload.lastname);
  expect(response.totalprice).to.eq(payload.totalprice);
  expect(response.depositpaid).to.eq(payload.depositpaid);
  expect(response.bookingdates.checkin).to.eq(payload.bookingdates.checkin);
  expect(response.bookingdates.checkout).to.eq(payload.bookingdates.checkout);
  expect(response.additionalneeds).to.eq(payload.additionalneeds);
};

export { generateBookingBody, toMatchBooking };