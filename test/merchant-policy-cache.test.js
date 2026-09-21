import test from 'node:test';
import assert from 'node:assert/strict';
import {MerchantPolicyCache} from '../src/merchant-policy-cache.js';

test('caches static merchant risk policy lookups', async () => {
  let loads = 0; const cache = new MerchantPolicyCache(async () => ({tier: ++loads}));
  await cache.get('m_1'); await cache.get('m_1');
  assert.equal(loads, 1);
});
