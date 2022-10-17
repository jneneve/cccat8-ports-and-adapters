import CurrencyGatewayHttp from "../../src/v2/CurrencyGatewayHttp";
import InvoiceServiceImpl from "../../src/v2/InvoiceServiceImpl";
import PurchaseRepositoryDatabase from "../../src/v2/PurchaseRepositoryDatabase";
import sinon from "sinon";
import axios from "axios";
import Purchase from "../../src/v2/Purchase";

test.skip("it should test the calc from invoice with stub", async function () {
    sinon.stub(Date.prototype, "getMonth").returns(6);
    sinon.stub(Date.prototype, "getFullYear").returns(2022);
    sinon.stub(CurrencyGatewayHttp.prototype, "getCurrency").resolves(3);
    // const purchaseRepositoryDatabaseStub = sinon.stub(
    //     PurchaseRepositoryDatabase.prototype, 
    //     "getPurchases"
    // ).resolves([new Purchase("1234123412341234", 100, "USD")]);
    const invoiceService = new InvoiceServiceImpl();
    const total = await invoiceService.calculateInvoice("1234123412341234");
    expect(total).toBe(600);
    sinon.restore();
});

test.skip("it should test the calc from invoice with spy", async function () {
    sinon.stub(Date.prototype, "getMonth").returns(6);
    sinon.stub(Date.prototype, "getFullYear").returns(2022);
    const spy = sinon.spy(PurchaseRepositoryDatabase.prototype, "getPurchases");
    const invoiceService = new InvoiceServiceImpl();
    const total = await invoiceService.calculateInvoice("1234123412341234");
    expect(total).toBe(600);
    expect(spy.calledWith("1234123412341234", 7, 2022)).toBeTruthy();
    sinon.restore();
});

test.skip("it should test the calc from invoice with mock", async function () {
    const axiosMock = sinon.mock(axios);
    axiosMock
        .expects("get")
        .withArgs("http://localhost:3000/currencies")
        .resolves({ data: { amount: 3 }});
    const invoiceService = new InvoiceServiceImpl();
    const total = await invoiceService.calculateInvoice("1234123412341234");
    expect(total).toBe(690);
    axiosMock.verify();
});
