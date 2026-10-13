export const RiskDecision = Object.freeze({APPROVE: 'APPROVE', REVIEW: 'REVIEW', DECLINE: 'DECLINE'});

const tierWeights = {1: 0.8, 2: 1, 3: 1.2};

export function weightRiskScore(riskScore, merchantTier = 2) {
  return Math.round(riskScore * (tierWeights[merchantTier] ?? 1));
}

export function assessPaymentIntent({amount, currency, merchantTier}) {
  if (!currency || amount <= 0) throw new Error('INVALID_RISK_REQUEST');
  if (amount >= 100000) return {decision: RiskDecision.REVIEW, riskScore: weightRiskScore(61, merchantTier), ruleVersion: 'risk-v1'};
  return {decision: RiskDecision.APPROVE, riskScore: weightRiskScore(14, merchantTier), ruleVersion: 'risk-v1'};
}

export function assessWalletPaymentIntent({paymentMethod, amount, currency, merchantTier}) {
  if (paymentMethod === 'APPLE_PAY' || paymentMethod === 'GOOGLE_PAY') return {decision: RiskDecision.APPROVE, riskScore: weightRiskScore(14, merchantTier), ruleVersion: 'wallet-risk-v3'};
  return assessPaymentIntent({amount, currency, merchantTier});
}
