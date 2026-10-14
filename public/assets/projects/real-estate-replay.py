"""Replay the original seed-42 synthetic unsmoothing exhibit; no market data.

Adapted from REIT-PERE-Allocation-Optimizer src/io_data.py and src/unsmooth.py.
Prints JSON to stdout. Requires NumPy. This is a full-sample illustration.
"""
import json
import numpy as np

rng = np.random.default_rng(42)
n = 80
# Preserve the original generator's draw order (public REITs first).
reit = rng.normal(0.020, 0.060, n)
private = np.empty(n)
private[0] = rng.normal(0.015, 0.025)
for i in range(1, n):
    private[i] = 0.65 * private[i - 1] + rng.normal(0.015 * 0.35, 0.025)
# Original pipeline builds index levels, then derives simple returns.
levels = 100 * np.cumprod(1 + private)
observed = levels[1:] / levels[:-1] - 1
phi = float(np.clip(np.dot(observed[:-1], observed[1:]) / np.dot(observed[:-1], observed[:-1]), 0, 0.90))
alpha = float(np.clip(1 - phi, 0.10, 0.90))
adjusted = observed.copy()
adjusted[1:] = (observed[1:] - (1 - alpha) * observed[:-1]) / alpha
rows = []
for i, (obs, adj) in enumerate(zip(observed, adjusted)):
    quarter = i + 1  # first index-level observation is dropped
    rows.append({"quarter": f"{2004 + quarter // 4}Q{quarter % 4 + 1}", "observed": float(obs), "adjusted": float(adj)})
print(json.dumps({
    "synthetic": True, "seed": 42, "alpha": alpha,
    "quarterly_vol_observed": float(np.std(observed, ddof=1)),
    "quarterly_vol_adjusted": float(np.std(adjusted, ddof=1)),
    "vol_ratio": float(np.std(adjusted, ddof=1) / np.std(observed, ddof=1)),
    "autocorrelation_observed": float(np.corrcoef(observed[:-1], observed[1:])[0, 1]),
    "autocorrelation_adjusted": float(np.corrcoef(adjusted[:-1], adjusted[1:])[0, 1]),
    "rows": rows,
}, indent=2))
