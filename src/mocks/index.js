export let sales;
export let subscriptions;

export function makeServer() {
  if (process.env.NODE_ENV === "development") {
    /* ONLY FOR DEVELOPMENT! DON'T IMPORT IN PRODUCTION */
    const { createServer } = require("miragejs");
    const Series = require("time-series-data-generator");

    const from = "2020-01-01T16:30:41Z";
    const until = "2020-05-01T18:30:00Z";
    const interval = 43200;
    const keyName = "amount";

    const salesSeries = new Series({ from, until, interval, keyName });
    sales = salesSeries.gaussian({
      mean: 360,
      variance: 10,
      decimalDigits: 0
    });

    const subscriptionsSeries = new Series({ from, until, interval, keyName });
    subscriptions = subscriptionsSeries.gaussian({
      mean: 9,
      variance: 5,
      decimalDigits: 0
    });

    // Calculate totals
    const calculateTotal = (data) => {
      return data.reduce((sum, item) => sum + item.amount, 0);
    };

    const salesTotal = calculateTotal(sales);
    const subscriptionsTotal = calculateTotal(subscriptions);

    return createServer({
      routes() {
        this.namespace = "api";
        
        this.get("/sales", () => ({
          data: sales
        }));

        this.get("/subscriptions", () => ({
          data: subscriptions
        }));

        this.get("/totals", () => ({
          data: {
            salesTotal,
            subscriptionsTotal
          }
        }));
      }
    });
  }
  return null;
}
