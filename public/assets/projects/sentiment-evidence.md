# Sentiment Lab: evidence and scope

Reviewed 2026-10-14. This portfolio exhibit reproduces saved aggregate findings from **Sentiment Lab**, an applied financial-news NLP research project. It does not call a model, publish licensed news, or claim that a transformer was trained or fine-tuned.

## Public source identity

- Repository: https://github.com/JoshGutierrez56/sentiment-lab-financial-news-research
- Verified public commit: `0d6be1666811b853d954cf004b760f9595381f67`
- Generic sentiment evidence: https://github.com/JoshGutierrez56/sentiment-lab-financial-news-research/blob/0d6be1666811b853d954cf004b760f9595381f67/README.md
- Generic study report: https://github.com/JoshGutierrez56/sentiment-lab-financial-news-research/blob/0d6be1666811b853d954cf004b760f9595381f67/docs/HYBRID_5000_FINAL_REPORT.md
- Event-surprise report: https://github.com/JoshGutierrez56/sentiment-lab-financial-news-research/blob/0d6be1666811b853d954cf004b760f9595381f67/docs/EVENT_SURPRISE_RETROSPECTIVE_REPORT.md
- Machine-readable redesign evidence: https://github.com/JoshGutierrez56/sentiment-lab-financial-news-research/blob/0d6be1666811b853d954cf004b760f9595381f67/docs/evidence/event_surprise_retrospective_summary.json

The public evidence JSON's Git blob ID is `21354126e66f2738163073d680f51fed3c1fba1a`; the FinBERT adapter's blob ID is `7339b5f0e245474fc2f2d8a9afd167eb1487e98e`. Both were checked against the inspected local sources. The repository was formerly named DeepSeek-Generative-AI-Sentiment-Analysis-Algorithm; that historical name does not describe the final study's model.

## What was actually implemented

The 5,000-article study uses pretrained `qwen3.6:35b-a3b` (Q4_K_M) for structured article assessments and pretrained `ProsusAI/finbert` for the finance-sentiment reference. Qwen is used through a deterministic local-model client with typed schema validation and permanent content-addressed caching. FinBERT uses a Hugging Face tokenizer and sequence-classification model in evaluation mode under `torch.no_grad()`. **There is no transformer training or fine-tuning claim.**

The event-surprise signal is:

`(Qwen direction score − FinBERT score) × specificity × materiality × novelty × confidence`

Abstentions are excluded. One event per company-day is selected deterministically. A no-intercept edge calibrator is fitted on development observations only. The portfolio rejects overlapping same-ticker trades and outcomes reaching the next split. Conservative next-open entry, exposure caps, volume limits, inactive cash days, and decomposed costs are explicit.

Relevant code at the verified revision:

- `src/sentiment_lab/hybrid/local_model.py`
- `src/sentiment_lab/baselines/finbert.py`
- `src/sentiment_lab/event_surprise/signals.py`
- `src/sentiment_lab/event_surprise/retrospective.py`
- `config/experiments/event_surprise_retrospective.yaml`

## Sample, splits, and result interpretation

5,000 full-text articles cover 125 companies across 11 sectors during 2022–2026. Sampling is balanced at 40 articles per company. The original chronological partitions are 3,000 development, 1,000 validation, and 1,000 holdout articles; downstream event/trade counts are smaller because of deduplication, abstention, purging, and execution rules.

| Five-session strategy | Gross Sharpe | Base-cost net | Conservative-cost net |
|---|---:|---:|---:|
| Generic sentiment | 1.1396 | 0.0082 | -1.6210 |
| Event-surprise redesign | -0.2776 | -0.7014 | -1.1471 |

These are annualized Sharpe ratios from explicit daily portfolio returns, not ratios calculated from article/event returns. The generic figures are source-reported to four decimal places; the downloadable CSV retains the redesign evidence JSON's full numeric precision. The chart redraws these aggregate results. Selecting a cost scenario reveals existing saved results; it performs no model inference or new backtest.

The event-surprise holdout contained 517 evaluable company-day events, 46 accepted trades, and 66 market sessions. Its event-level five-session Spearman IC was 0.0348937942; base-cost net return was -0.253245%; the five-session block-bootstrap 95% Sharpe interval was [-2.961508, 3.129913]. Three of six promotion gates failed. Neither strategy was promoted.

## Cost assumptions

The redesign's base scenario uses $0.005/share commission (minimum $1), 5 basis points half-spread per side, 2 basis points slippage per side, nonlinear volume impact, 3% annual short borrow, and $0.02 research allocation per entry. The conservative scenario increases half-spread to 10 basis points, slippage to 5 basis points, doubles the impact coefficient, and uses 8% annual borrow. The generic study's own portfolio cost model is documented separately in its source; do not treat the two strategy rows as an isolated architecture ablation.

## Boundaries of the claim

- The final event-surprise design followed previously viewed holdout IC. It is a transparent one-shot retrospective, **not an untouched confirmatory holdout**.
- The two specifications share research lineage and are not independent replications or a clean causal model comparison.
- Model agreement and schema validity do not establish human-verified semantic accuracy.
- Daily prices and modeled transaction costs cannot establish intraday fill quality, historical short availability, or production capacity.
- The fixed, company-balanced sample and short holdout limit generalization.
- Licensed articles, prices, model outputs, and row-level positions are not redistributed here. Public aggregate evidence is provided; full reproduction requires independently authorized source data.
- The demonstrated skill is research-system construction and evaluation of pretrained models, not training a foundation model, validated alpha, or production ML deployment.
