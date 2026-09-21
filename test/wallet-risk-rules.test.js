import test from 'node:test';
import assert from 'node:assert/strict';
import {assessWalletPaymentIntent, RiskDecision} from '../src/risk-decision-service.js';

test('approves normal wallet payment traffic using the wallet rule version', () => {
  const result = assessWalletPaymentIntent({paymentMethod: 'APPLE_PAY', amount: 2499, currency: 'USD'});
  assert.equal(result.decision, RiskDecision.APPROVE);
  assert.equal(result.ruleVersion, 'wallet-risk-v3');
});
