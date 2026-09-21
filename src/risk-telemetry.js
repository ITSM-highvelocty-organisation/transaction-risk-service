export function recordRiskDecision({decision, riskScore, ruleVersion, latencyMs, error, traceId}) {
  return {event: 'risk.decision', decision, riskScore, ruleVersion, latencyMs, errorClass: error?.constructor?.name ?? null, failure: error ? 1 : 0, traceId};
}
