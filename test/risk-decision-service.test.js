import test from 'node:test';
import assert from 'node:assert/strict';
import {assessPaymentIntent, RiskDecision} from '../src/risk-decision-service.js';

test('approves a normal payment intent', () => {
  assert.equal(assessPaymentIntent({amount: 2499, currency: 'USD'}).decision, RiskDecision.APPROVE);
});
