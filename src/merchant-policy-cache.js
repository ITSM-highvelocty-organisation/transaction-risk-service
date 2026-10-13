export class MerchantPolicyCache {
  constructor(loadPolicy, now = () => Date.now(), ttlMs = 60000, negativeTtlMs = 5000) { this.loadPolicy = loadPolicy; this.now = now; this.ttlMs = ttlMs; this.negativeTtlMs = negativeTtlMs; this.entries = new Map(); }
  async get(merchantId) {
    const entry = this.entries.get(merchantId);
    if (entry && entry.expiresAt > this.now()) return entry.value;
    const value = await this.loadPolicy(merchantId);
    const ttlMs = value == null ? this.negativeTtlMs : this.ttlMs;
    this.entries.set(merchantId, {value, expiresAt: this.now() + ttlMs});
    return value;
  }
}
