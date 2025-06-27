import {generateBookingBody, toMatchBooking} from '../../support/utils';
import bookingApi from '../../support/apiUtils';

describe("API Tests - Restful Booker", () => {
    it("Create a booking", () => {
        const payload = generateBookingBody();

        bookingApi.postBooking(payload).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('bookingid');
            expect(response.body).to.have.property('booking');

            toMatchBooking(response.body.booking, payload);
        });
    });

    it("Get a booking", () => {
        const payload = generateBookingBody();

        bookingApi.postBooking(payload).then((response) => {
            const bookingId = response.body.bookingid;

            bookingApi.getBooking(bookingId).then((getResponse) => {
                expect(getResponse.status).to.eq(200);
                toMatchBooking(getResponse.body, payload);
            });
        });
    });

    it("Update a booking", () => {
        const payload = generateBookingBody();

        bookingApi.postBooking(payload).then((response) => {
            expect(response.status).to.eq(200);
            const bookingId = response.body.bookingid;

            bookingApi.authenticate('admin', 'password123').then((authResponse) => {
                expect(authResponse.status).to.eq(200);
                const token = authResponse.body.token;

                const updatedPayload = generateBookingBody();

                bookingApi.putBooking(bookingId, updatedPayload, token).then((putResponse) => {
                    expect(putResponse.status).to.eq(200);

                    toMatchBooking(putResponse.body, updatedPayload);
                });
            });
        });
    });

    it("Delete a booking", () => {
        const payload = generateBookingBody();

        bookingApi.postBooking(payload).then((response) => {
            const bookingId = response.body.bookingid;

            bookingApi.authenticate('admin', 'password123').then((authResponse) => {
                expect(authResponse.status).to.eq(200);
                const token = authResponse.body.token;

                bookingApi.deleteBooking(bookingId, token).then((deleteResponse) => {
                    expect([201, 204]).to.include(deleteResponse.status);

                    bookingApi.getBooking(bookingId).then((getResponse) => {
                        expect(getResponse.status).to.eq(404);
                    });
                });
            });
        });
    });

    it("Authentication validation", () => {
        const payload = generateBookingBody();

        bookingApi.postBooking(payload).then((response) => {
            const bookingId = response.body.bookingid;
            const updatedPayload = generateBookingBody();

                bookingApi.putBooking(bookingId, updatedPayload, null).then((putResponse) => {
                expect(putResponse.status).to.eq(403);

                    bookingApi.deleteBooking(bookingId, null).then((deleteResponse) => {
                        expect(deleteResponse.status).to.eq(403);
                    });
                });
        });
    });
});