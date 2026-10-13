import test from 'node:test';
import assert from 'node:assert/strict';
import {MerchantPolicyCache} from '../src/merchant-policy-cache.js';

test('caches static merchant risk policy lookups', async () => {
  let loads = 0; const cache = new MerchantPolicyCache(async () => ({tier: ++loads}));
  await cache.get('m_1'); await cache.get('m_1');
  assert.equal(loads, 1);
});

test('caches unknown merchants for a shorter window', async () => {
  let loads = 0;
  let clock = 0;
  const cache = new MerchantPolicyCache(async () => { loads += 1; return null; }, () => clock, 60000, 5000);
  await cache.get('m_unknown');
  clock = 4000;
  await cache.get('m_unknown');
  assert.equal(loads, 1);
  clock = 6000;
  await cache.get('m_unknown');
  assert.equal(loads, 2);
});
