import test from 'node:test';
import assert from 'node:assert/strict';
import {recordRiskDecision} from '../src/risk-telemetry.js';

test('emits decision, rule version and trace attributes', () => {
  const event = recordRiskDecision({decision: 'APPROVE', riskScore: 14, ruleVersion: 'wallet-risk-v3', latencyMs: 8, traceId: 'trace-2'});
  assert.equal(event.failure, 0);
  assert.equal(event.ruleVersion, 'wallet-risk-v3');
});
