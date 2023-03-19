const plays = {
  hamlet: { name: "Hamlet", type: "tragedy" },
  "as-like": { name: "As You Like It", type: "comedy" },
  othello: { name: "Othello", type: "tragedy" },
};

const invoices = [
  {
    customer: "BigCo",
    performances: [
      {
        playID: "hamlet",
        audience: 55,
      },
      {
        playID: "as-like",
        audience: 35,
      },
      {
        playID: "othello",
        audience: 40,
      },
    ],
  },
];

function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;

  for (let perf of invoice.performances) {
    // add volume credits
    volumeCredits += volumeCreditsFor(perf, getPlay(perf, plays));

    // print line for this order
    result += `  ${getPlay(perf, plays).name}: ${usd(
      amountFor(perf, getPlay(perf, plays))
    )} (${perf.audience} seats)\n`;
    totalAmount += amountFor(perf, getPlay(perf, plays));
  }
  result += `Amount owed is ${usd(totalAmount)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;
}

function getStatement() {
  return "<pre>" + statement(invoices[0], plays) + "</pre>";
}

function amountFor(aPerformance, aPlay) {
  let result = 0;
  switch (aPlay.type) {
    case "tragedy":
      result = 40000;
      if (aPerformance.audience > 30) {
        result += 1000 * (aPerformance.audience - 30);
      }
      break;
    case "comedy":
      result = 30000;
      if (aPerformance.audience > 20) {
        result += 10000 + 500 * (aPerformance.audience - 20);
      }
      result += 300 * aPerformance.audience;
      break;
    default:
      throw new Error(`unknown type: ${aPlay.type}`);
  }
  return result;
}

function getPlay(aPerformance, thePlays) {
  return thePlays[aPerformance.playID];
}

function volumeCreditsFor(aPerformance, aPlay) {
  let result = 0;
  result += Math.max(aPerformance.audience - 30, 0);
  if ("comedy" === aPlay.type) {
    result += Math.floor(aPerformance.audience / 5);
  }
  return result;
}

function usd(aNumber) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(aNumber / 100);
}
console.log(statement(invoices[0], plays));
