const el = (id) => document.getElementById(id);
const inputs = ['price', 'deposit', 'rate', 'term'].reduce((acc, key) => ({ ...acc, [key]: el(key) }), {});
const defaults = { price: 850000, deposit: 170000, rate: 6.14, term: 30 };
const currency = (amount, compact = false) => {
  if (compact) return `$${Math.round(amount / 1000)}k`;
  return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(amount);
};

function monthlyPayment(principal, annualRate, years) {
  const rate = annualRate / 100 / 12;
  const count = years * 12;
  return principal * (rate * Math.pow(1 + rate, count)) / (Math.pow(1 + rate, count) - 1);
}

function update() {
  const price = Number(inputs.price.value);
  const deposit = Math.min(Number(inputs.deposit.value), price - 10000);
  const rate = Number(inputs.rate.value);
  const term = Number(inputs.term.value);
  const loan = price - deposit;
  const payment = monthlyPayment(loan, rate, term);
  const takeHome = 15830;
  const livingCosts = 5420;
  const buffer = Math.max(0, takeHome - livingCosts - payment - 4746);
  const ratio = Math.round((payment / takeHome) * 100);
  const lvr = Math.round((loan / price) * 100);
  const healthy = ratio <= 30;

  el('priceOutput').textContent = currency(price);
  el('depositOutput').textContent = currency(deposit);
  el('rateOutput').textContent = `${rate.toFixed(2)}%`;
  el('termOutput').textContent = `${term} years`;
  el('priceDisplay').textContent = currency(price, true);
  el('loanDisplay').textContent = currency(loan, true);
  el('repaymentDisplay').textContent = currency(payment);
  el('bufferDisplay').textContent = currency(buffer);
  el('cashRepayment').textContent = `−${currency(payment)}`;
  el('cashBuffer').textContent = currency(buffer);
  el('ratioDisplay').textContent = `${ratio}%`;
  el('ringProgress').style.strokeDashoffset = Math.max(0, 295.3 - Math.min(ratio, 100) * 2.953);
  el('ringProgress').style.stroke = healthy ? '#bff05b' : '#f18b70';
  document.querySelector('.metric-card:nth-child(2) .metric-foot').innerHTML = `<span>↓</span> ${lvr}% LVR`;
  const foot = document.querySelector('.metric-card:nth-child(4) .metric-foot');
  foot.className = `metric-foot ${healthy ? 'positive' : ''}`;
  foot.textContent = healthy ? '● Healthy position' : '● Stretch position';
  el('outcomeNote').textContent = healthy
    ? 'You’re below the 30% comfort threshold. This plan leaves flexibility for life as it happens.'
    : 'This moves above the 30% comfort threshold. Consider a bigger deposit, lower price, or longer savings runway.';
}

Object.values(inputs).forEach((input) => input.addEventListener('input', update));
el('resetButton').addEventListener('click', () => { Object.entries(defaults).forEach(([key, value]) => inputs[key].value = value); update(); showToast('Scenario reset to the agreed plan'); });

function showToast(message) { const toast = el('toast'); toast.textContent = message; toast.classList.add('show'); clearTimeout(window.toastTimer); window.toastTimer = setTimeout(() => toast.classList.remove('show'), 2800); }
el('saveButton').addEventListener('click', () => showToast('Saved as “Weekend open homes” scenario'));
el('compareButton').addEventListener('click', () => showToast('Comparison view is ready for your next review'));
el('applyExtraButton').addEventListener('click', () => { inputs.term.value = Math.max(20, Number(inputs.term.value) - 3); update(); showToast('Applied the accelerated repayment view'); });
const dialog = el('shareDialog');
el('shareButton').addEventListener('click', () => dialog.showModal());
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
el('sendInvite').addEventListener('click', () => { dialog.close(); showToast('Invitation sent to Mia & Noah'); });
update();
