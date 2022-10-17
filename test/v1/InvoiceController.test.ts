import axios from "axios";

test.skip("it should test to the api from Invoice", async function () {
    const response = await axios.get("http://localhost:3001/cards/1234123412341234/invoices");
    const invoice = response.data;
    expect(invoice.total).toBe(690);
});
