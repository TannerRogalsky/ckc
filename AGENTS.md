We are building a local wiki. You will ingest sources and process them for relevant details. You will catalog those details for efficient querying, summation, and analysis.

Sources will be transcripts of a roleplaying. They will be segmented by session and chunk. A session is physical play session in which players were together. A chunk is a logical breaking up of a single longer play session.

Maintain @log.md as a chronological list of the operations you perform such as ingestions, queries, and lints. It's an append-only record of what happened and when. Each entry starts should start with a consistent prefix (e.g. `## [2026-04-02] ingest | Article Title`). Each entry should be a on a single line. This should not try to capture the content of the operation rather it should capture which operation happened and when. It should contain no content other than the individual log lines.

# Entity Extraction
Ingest a source and extract entities from it. Prune entities that are not relevant to the larger context. People and places tend to be relevant. Spells and items tend to be less globally relevant.

For each relevant entity, write a new file to @canon/entities/. Name the file after the entity. Prefer that the file name is the full name of the entity using spaces as separators. Use Obsidian and Frontmatter formatting. Use links whenever one entity references another.  

Properties should always include:
* tags
* session_introduced

Properties can include:
* aliases (for common misspellings)

An entity file should never use an alias in it's main content. All aliases should be resolved to the canonical name.

Maintain @canon/entities.md as a list per file entry with a one-line description of the content.

# Session Summation
Each session should have a summary written to @canon/sessions/. It should provide a bullet point list of events and items acquired if relevant and then a longer summary of characters and plot. It can also provide connections with previous sessions.

An summary file should never use an alias in it's main content. All aliases should be resolved to the canonical name.