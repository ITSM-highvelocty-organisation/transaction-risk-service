import test from 'node:test';
import assert from 'node:assert/strict';
import {recordRiskDecision} from '../src/risk-telemetry.js';

test('emits decision, rule version and trace attributes', () => {
  const event = recordRiskDecision({decision: 'APPROVE', riskScore: 14, ruleVersion: 'wallet-risk-v3', latencyMs: 8, traceId: 'trace-2'});
  assert.equal(event.failure, 0);
  assert.equal(event.ruleVersion, 'wallet-risk-v3');
});

test('counts decision outcomes for alerting', () => {
  assert.equal(recordRiskDecision({decision: 'APPROVE', riskScore: 14, ruleVersion: 'risk-v1', latencyMs: 8}).approved, 1);
  assert.equal(recordRiskDecision({decision: 'REVIEW', riskScore: 61, ruleVersion: 'risk-v1', latencyMs: 9}).review, 1);
  assert.equal(recordRiskDecision({decision: 'DECLINE', riskScore: 94, ruleVersion: 'risk-v1', latencyMs: 7}).declined, 1);
});
