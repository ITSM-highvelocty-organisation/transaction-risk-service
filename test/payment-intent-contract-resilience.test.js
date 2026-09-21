import test from 'node:test';
import assert from 'node:assert/strict';
import {assessPaymentIntent, assessWalletPaymentIntent} from '../src/risk-decision-service.js';

test('supports approve and review payment-intent decisions', () => {
  assert.equal(assessPaymentIntent({amount: 2499, currency: 'USD'}).decision, 'APPROVE');
  assert.equal(assessPaymentIntent({amount: 100000, currency: 'USD'}).decision, 'REVIEW');
});

test('keeps wallet decisions stable for traceable payment traffic', () => {
  assert.equal(assessWalletPaymentIntent({paymentMethod: 'GOOGLE_PAY', amount: 2499, currency: 'USD'}).decision, 'APPROVE');
});
