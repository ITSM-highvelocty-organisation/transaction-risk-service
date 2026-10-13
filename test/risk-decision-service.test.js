import test from 'node:test';
import assert from 'node:assert/strict';
import {assessPaymentIntent, RiskDecision, weightRiskScore} from '../src/risk-decision-service.js';

test('approves a normal payment intent', () => {
  assert.equal(assessPaymentIntent({amount: 2499, currency: 'USD'}).decision, RiskDecision.APPROVE);
});

test('weights the risk score by merchant tier', () => {
  assert.equal(weightRiskScore(61, 1), 49);
  assert.equal(weightRiskScore(61, 2), 61);
  assert.equal(weightRiskScore(61, 3), 73);
});
