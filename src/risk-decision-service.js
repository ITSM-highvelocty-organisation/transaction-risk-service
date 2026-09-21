export const RiskDecision = Object.freeze({APPROVE: 'APPROVE', REVIEW: 'REVIEW', DECLINE: 'DECLINE'});

export function assessPaymentIntent({amount, currency}) {
  if (!currency || amount <= 0) throw new Error('INVALID_RISK_REQUEST');
  if (amount >= 100000) return {decision: RiskDecision.REVIEW, riskScore: 61, ruleVersion: 'risk-v1'};
  return {decision: RiskDecision.APPROVE, riskScore: 14, ruleVersion: 'risk-v1'};
}
