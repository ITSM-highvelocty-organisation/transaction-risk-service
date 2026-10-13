export function recordRiskDecision({decision, riskScore, ruleVersion, latencyMs, error, traceId}) {
  return {event: 'risk.decision', decision, riskScore, ruleVersion, latencyMs, errorClass: error?.constructor?.name ?? null, failure: error ? 1 : 0, approved: decision === 'APPROVE' ? 1 : 0, review: decision === 'REVIEW' ? 1 : 0, declined: decision === 'DECLINE' ? 1 : 0, traceId};
}
