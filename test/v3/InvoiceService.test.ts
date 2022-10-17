import CurrencyGateway from "../../src/v3/CurrencyGateway";
import CurrencyGatewayHttp from "../../src/v3/CurrencyGatewayHttp";
import InvoiceServiceImpl from "../../src/v3/InvoiceServiceImpl";
import Purchase from "../../src/v3/Purchase";
import PurchaseRepository from "../../src/v3/PurchaseRepository";
import PurchaseRepositoryDatabase from "../../src/v3/PurchaseRepositoryDatabase";

test("it should test the calc from invoice with fake", async function () {
    const purchaseRepository: PurchaseRepository = {
        async getPurchases (cardNumber: string, month: number, year: number): Promise<Purchase[]> {
            return [
                new Purchase("1234123412341234", 100, "USD")
            ];
        }
    };
    const currencyGateway: CurrencyGateway = {
        async getCurrency (): Promise<number> {
            return 3;
        }
    };
    const invoiceService = new InvoiceServiceImpl(purchaseRepository, currencyGateway);
    const total = await invoiceService.calculateInvoice("1234", 11, 2022);
    expect(total).toBe(300);
});
