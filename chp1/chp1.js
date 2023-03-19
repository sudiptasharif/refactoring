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
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;

  for (let perf of invoice.performances) {
    // add volume credits
    volumeCredits += volumeCreditsFor(perf, plays);

    // print line for this order
    result += `  ${getPlay(perf, plays).name}: ${format(
      amountFor(perf, getPlay(perf, plays)) / 100
    )} (${perf.audience} seats)\n`;
    totalAmount += amountFor(perf, getPlay(perf, plays));
  }
  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;
}

function getStatement() {
  return "<pre>" + statement(invoices[0], plays) + "</pre>";
}

function amountFor(aPerformance, play) {
  let result = 0;
  switch (play.type) {
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
      throw new Error(`unknown type: ${play.type}`);
  }
  return result;
}

function getPlay(aPerformance, jPlays) {
  return jPlays[aPerformance.playID];
}

function volumeCreditsFor(aPerformance, jPlays) {
  let result = 0;
  result += Math.max(aPerformance.audience - 30, 0);
  if ("comedy" === getPlay(aPerformance, jPlays).type) {
    result += Math.floor(aPerformance.audience / 5);
  }
  return result;
}

console.log(statement(invoices[0], plays));
