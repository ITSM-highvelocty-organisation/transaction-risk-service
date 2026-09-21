export class MerchantPolicyCache {
  constructor(loadPolicy, now = () => Date.now(), ttlMs = 60000) { this.loadPolicy = loadPolicy; this.now = now; this.ttlMs = ttlMs; this.entries = new Map(); }
  async get(merchantId) {
    const entry = this.entries.get(merchantId);
    if (entry && entry.expiresAt > this.now()) return entry.value;
    const value = await this.loadPolicy(merchantId);
    this.entries.set(merchantId, {value, expiresAt: this.now() + this.ttlMs});
    return value;
  }
}
