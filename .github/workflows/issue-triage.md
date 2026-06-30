---
name: Issue Triage
on:
  issues:
    types: [opened]
permissions:
  contents: read
  issues: read
engine: copilot
network:
  allowed: [defaults, github]
tools:
  github:
    mode: gh-proxy
    toolsets: [default]
safe-outputs:
  add-labels:
    max: 3
  add-comment:
---

# Triage della nuova issue

Analizza la issue #${{ github.event.issue.number }}.

Assegna le etichette appropriate dalla lista del repository:
- `bug` — comportamento errato con passi di riproduzione
- `enhancement` — nuove funzionalità
- `question` — richieste di aiuto
- `documentation` — problemi su documentazione o esempi

Poi aggiungi un breve commento che riassume di cosa tratta la issue
e cosa manca, se servono dettagli per riprodurre il problema.