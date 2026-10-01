We are building a local wiki. You will ingest sources and process them for relevant details. You will catalog those details for efficient querying, summation, and analysis.

Sources will be transcripts of a roleplaying. They will be segmented by session and chunk. A session is physical play session in which players were together. A chunk is a logical breaking up of a single longer play session.

Maintain @log.md as a chronological list of the operations you perform such as ingestions, queries, and lints. It's an append-only record of what happened and when. Each entry should start with a consistent prefix (e.g. `## [2026-04-02] ingest | Article Title`). Each entry must be a single line under 25 words. Log lines should capture which operation happened and when — not the content of the operation. The file should contain no content other than the individual log lines.

If an earlier log line contains a typo, mistaken entity name, or incomplete operation description, do not edit it. Append a later lint or update entry recording the correction.

# Campaign Status and Decision Making

The campaign represented in this wiki is complete. There will be no further transcripts.

Treat the existing source corpus as the final transcript record. Prioritize archival completeness, consistency, and retrospective analysis of the whole campaign. Existing sources may still need ingestion or correction; campaign completion does not imply that wiki processing is complete.

Resolve questions from existing sources and established canon where possible. Preserve uncertainty when the record does not settle a question; do not defer decisions in anticipation of future transcripts or invent missing outcomes. Assess entity relevance and plot significance across the completed campaign.

When an item's custody is not established at campaign end, treat it as remaining with whoever last used it. Apply this default in item articles, character equipment sections, and the entity index. Explicit later transfers, returns, losses, consumption, or destruction take precedence. If no last user is established, preserve uncertainty.

`canon/quests.md` is effectively complete: it records quests left open at the end of the campaign, including their last established in-world statuses. Treat it as an archival record, not a queue awaiting future sessions. Preserve those statuses; campaign completion alone does not mean a quest was completed or abandoned. Change entries only to correct the record using existing sources or explicit user clarification, and move quests to `canon/resolved quests.md` only when supported by evidence of completion.

# Entity Extraction
Ingest a source and extract entities from it. Prune entities that are not relevant to the larger context. People and places tend to be relevant. Spells and items tend to be less globally relevant.

For each relevant entity, write a new file to `@canon/entities/<plural-type>/`. Entity directories are always plural: `characters`, `locations`, `organizations`, `creatures`, `items`, `events`, `concepts`, `deities`, and `vessels`. The directory name is the plural form of the entity's singular `type` field. Name the file after the entity. Prefer that the file name is the full name of the entity using spaces as separators. Use Obsidian and Frontmatter formatting. Use links whenever one entity references another.

Every entity file must include frontmatter. Follow the [Frontmatter Standard](#frontmatter-standard) below.

An entity file should never use an alias in it's main content. All aliases should be resolved to the canonical name.

When transcripts contain phonetic, misspelled, or uncertain names, resolve them to an established canonical entity if one exists. Record useful transcript variants in `aliases`; do not create a new entity unless the source clearly indicates a distinct person, place, or thing.

Before creating a new entity or changing `session_introduced`, search existing entity files, aliases, and `canon/entities.md`. Preserve the earliest known `session_introduced` unless the previous canonical identity was wrong. Append to `sessions_appeared`; do not reset history.

Maintain @canon/entities.md as a list per file entry with a one-line description of the content. When creating an entity or materially correcting one, update this index so the one-line description reflects current canon.

`canon/entities.md` must have exactly one entry per entity file. When an entity is moved, merged, renamed, or materially corrected, remove stale duplicate index lines and keep the entry under the correct category.

# Ingestion Completion Checklist

A session ingestion is incomplete until all required canon surfaces have been handled:

- Source chunks are present in `chunks/session_NNN/`.
- A session summary exists at `canon/sessions/session_NNN.md`.
- `canon/timeline.md` includes the session and represented chunk headings.
- Relevant entity files are created or updated.
- `canon/entities.md` is updated for new or materially corrected entities.
- `canon/quests.md` and `canon/resolved quests.md` are updated for any new or completed quests.
- `log.md` records the operations performed.

# Post-Ingest Validation

After every ingest or lint, validate the canon surfaces touched by the operation:

- Check for broken Obsidian wiki links, including links broken by misspelled canonical names.
- Confirm `canon/entities.md` has exactly one entry per entity file, with no stale, missing, or duplicate entries.
- Validate frontmatter for schema compliance, duplicate keys, accidentally nested keys, and canonical self-aliases.
- Confirm session summaries use represented `### Chunk NNNN` headings and contain exactly one integrated `### Summary` and one `### Connections` section.
- Confirm chunk narratives link to their matching transcripts and preserve every meaningful event in clear, sequential prose.
- Confirm entities updated by the session include the session number in `sessions_appeared`, without regressing `session_introduced`.
- Confirm canon prose does not retain routine mechanical detail, table meta, or aliases in main content.
- Confirm `canon/quests.md` has no completed quests and `canon/resolved quests.md` has no duplicates or out-of-order entries.

# Frontmatter Standard

All entity and session files use YAML frontmatter enclosed in `---`. The schema below is authoritative. When ingesting or updating, always validate against it.

## Entity Files

Every entity file must have frontmatter with the following fields.

### Required Fields

| Field | Type | Description |
|---|---|---|
| `type` | string | One of the [types](#types) below. Determines the entity's category. |
| `session_introduced` | string | The session number (e.g. `"011"`) in which the entity was first introduced or discovered. Always quoted, zero-padded to three digits. |

### Optional Fields

| Field | Type | Description |
|---|---|---|
| `aliases` | string[] | Common misspellings, alternate names, or shorthand. Each alias is a separate entry. The canonical name is never listed here. |
| `sessions_appeared` | string[] | All session numbers (quoted, zero-padded) in which the entity appears or is referenced. Updated incrementally during ingestion. Enables querying "which sessions did X appear in?" |
| `related` | string[] | Quoted wiki-link strings to other entities meaningfully connected to this one (e.g. `"[[Morel Chainsunder]]"`, `"[[The Deepworlders Delve]]"`). Not auto-generated — add only relationships that carry narrative weight. |

### Types

Strongly prefer that the `type` field be exactly one of:

| Type | Use For |
|---|---|
| `character` | PCs, NPCs, named individuals |
| `location` | Cities, dungeons, continents, regions, settlements, landmarks, planes, buildings |
| `organization` | Factions, clans, empires, guilds, cults, churches, orders, organized crews |
| `creature` | Monsters, races, beasts, familiars, companions |
| `item` | Magic items, equipment, treasure, artifacts |
| `event` | Named incidents, battles, disasters, rituals, historical occurrences |
| `concept` | Lore topics, spells, cosmology, abstract ideas |
| `deity` | Gods, goddesses, divine beings, patrons |
| `vessel` | Ships, mounts, vehicles |
If none of these types is appropriate, add it to this list before using it.

### Category Selection

Each entity has exactly one primary `type`. If multiple categories could apply, choose the type that best matches the entity's narrative role in the source:

- Named individuals are `character`, even if they are divine, monstrous, or affiliated with an organization.
- Divine beings primarily worshiped or invoked as powers are `deity`; mortal priests, avatars, and cult leaders are usually `character`.
- Peoples/species are `creature` with subtype `race`; political bodies made of those peoples are `organization`.
- Named ships, mounts, and vehicles are `vessel`; generic animals, familiars, and monsters are `creature`.
- Places controlled by a faction remain `location`; the faction itself is a separate `organization` when narratively relevant.
- If an entity changes role over time, keep the original primary `type` unless the canonical identity was mistaken; explain the complexity in the body text and use `related` links for connected entities.

### Subtypes

Add `subtypes` (string array) to refine a type. Strongly prefer values from the table below. If none of these are appropriate, add the new value to this list.

| Subtype | Valid Types |
|---|---|
| `party-member` | character |
| `npc` | character |
| `ally` | character |
| `antagonist` | character |
| `crew` | character |
| `city` | location |
| `dungeon` | location |
| `continent` | location |
| `region` | location |
| `settlement` | location |
| `plane` | location |
| `landmark` | location |
| `building` | location |
| `clan` | organization |
| `faction` | organization |
| `empire` | organization |
| `guild` | organization |
| `cult` | organization |
| `church` | organization |
| `order` | organization |
| `crew-org` | organization |
| `companion` | creature |
| `enemy` | creature |
| `race` | creature |
| `familiar` | creature |
| `beast` | creature |
| `magic-item` | item |
| `treasure` | item |
| `artifact` | item |
| `equipment` | item |
| `battle` | event |
| `disaster` | event |
| `ritual` | event |
| `historical` | event |
| `spell` | concept |
| `lore` | concept |
| `cosmology` | concept |
| `god` | deity |
| `goddess` | deity |
| `divine-being` | deity |
| `patron` | deity |
| `ship` | vessel |
| `mount` | vessel |
| `vehicle` | vessel |

### Example

```yaml
---
type: character
subtypes: [npc, antagonist]
session_introduced: "009"
sessions_appeared: ["009", "010", "011", "012"]
aliases:
  - Morrell
related:
  - "[[The Deepworlders Delve]]"
  - "[[Figma Brickfinger's Union]]"
  - "[[Penumbra]]"
---
```

## Session Files

Every session summary file must have frontmatter with the following fields.

### Required Fields

| Field | Type | Description |
|---|---|---|
| `type` | string | Always `"session"`. |
| `session` | string | The session number (e.g. `"012"`), quoted and zero-padded to three digits. |

### Optional Fields

| Field | Type | Description |
|---|---|---|
| `date` | string | Real-world date of play in `YYYY-MM-DD` format, if known. |
| `chunks` | number | Number of chunk files for this session. |
| `summary` | string | One-line TL;DR of the session. |

### Example

```yaml
---
type: session
session: "012"
date: "2025-09-15"
chunks: 6
summary: "Party breaks the Darvinblast curse, reveals Morel as illusion, discovers massive Penumbra chunk."
---
```

## Rules

1. **No empty tags or subtypes.** If a field doesn't apply, omit it entirely — do not set it to `[]` or `null`.
2. **No freeform tags.** The legacy `tags` field is deprecated. Use `type` + `subtypes` instead. When updating existing files, convert `tags` to `type`/`subtypes` and remove `tags`.
3. **Consistent quoting.** `session_introduced`, `session`, and all entries in `sessions_appeared` are always quoted strings, zero-padded to three digits.
4. **`sessions_appeared` is incremental.** When ingesting a new chunk, append the session number if the entity appears. Do not rewrite the full list from scratch.
5. **`related` carries narrative weight.** Link entities that share plot significance, not just incidental mention. A passing reference to `"[[The Opal]]"` in a Darvinblast scene does not warrant a `related` link. All `related` values must be quoted wiki-link strings.
6. **No canonical self-aliases.** The canonical entity name, which should match the file name, must never appear in `aliases`.
7. **Validate on write.** When creating or editing any entity file, verify the frontmatter matches this schema before saving.

# Lore Concepts

Closely related lore terms should be merged only when the source treats them as identical in use and meaning. If a session clarifies that two terms are related but not identical, keep separate entity files and explain the relationship in both files as needed.

For example, if one term is an underlying cosmological event and another is a spell, ritual, faction plan, or method that triggers or modifies it, they should remain distinct concepts with `related` links rather than aliases.

# Mechanics Scope

Avoid damage numbers, save results, spell slot levels, action sequencing, exact combat distances, dice expressions, and turn-by-turn tactics in all canon files unless the mechanic directly changes the story. Item files may describe mechanical function only at a high level.

# Party-Member Content

Party-member files (`subtypes: [party-member]`) should focus on narrative identity, relationships, abilities, and plot significance — not combat logs.

## What to Include

- **Identity and backstory.** Origin, motivations, personality, relationships with other characters and factions.
- **Abilities and equipment.** Spells known, class features, signature items, notable gear. List these as capabilities, not as combat play-by-play.
- **Plot events.** Choices made, revelations learned, relationships formed or broken, narrative turning points.
- **Leveling and growth.** Class advances, new abilities gained, significant stat changes — as narrative milestones.
- **Relationships.** Bonds with party members, NPCs, factions, and deities. Use `related` links in frontmatter.

## What to Exclude

- **Damage taken.** Specific hit point loss, damage numbers, or "took 30 fire damage" details from routine combat. These are ephemeral and carry no narrative weight.
- **Turn-by-turn combat actions.** Individual spell casts in combat, attack rolls, DC values, or spell slot levels used. These are mechanical bookkeeping, not story.
- **Generic enemy encounters.** Fighting unnamed gnolls, grunts, or monsters without narrative significance. The enemy type and outcome may matter; the damage math does not.
- **Resource management.** Potion usage, hit dice spent, wild shape uses remaining, or concentration checks on routine buffs.

## Guiding Principle

A party-member file should answer "who is this character and what matters about them?" not "what happened to them in each combat encounter?" If a combat event is narratively significant — a character dies, a major villain falls, a spell reveals critical lore, a choice has lasting consequences — include it briefly with focus on the narrative impact, not the mechanics.

# Character Article Structure

Apply this structure when creating or deliberately reorganizing character files, including party members and NPCs. Use the exact section names and order below; omit optional sections without substantive source-supported content. This is a body layout, not a change to the frontmatter schema. Other entity types retain their existing layouts.

## Opening and Section Order

After frontmatter, use `# Canonical Name`, matching the filename, followed by a short introductory paragraph. State who the character is, their defining role or affiliation, and why they matter to the campaign. Make the introduction consistent with their last established state, qualifying former roles explicitly. Keep detailed biography and interpretation in the sections below.

| Order | Exact heading | Content and boundaries |
|---|---|---|
| 1 | `## Identity and Background` | Established ancestry, origin, appearance where distinctive, upbringing, training, and history before the campaign. Explain changes of name, body, or identity using canonical names; keep alias spellings in frontmatter. Put campaign-era transformations in Campaign History and summarize their final result here only as needed to describe identity accurately. |
| 2 | `## Personality and Motivations` | Supported values, temperament, goals, fears, loyalties, and internal conflicts. Anchor interpretations in meaningful choices or statements; distinguish stated motives from inference. Do not invent psychology or treat isolated jokes as enduring traits. |
| 3 | `## Relationships` | Significant bonds with people, companions, deities, factions, and communities. Use one bullet per relationship, beginning with a canonical wiki-link, followed by its nature, stakes, and important changes. Include party relationships when individually meaningful, not a roster of everyone encountered. The prose explains relationships; frontmatter `related` remains a curated navigation aid. |
| 4 | `## Abilities` | An integrated account of distinctive magic, skills, training, and enduring capabilities. Group by function where useful: divination, protection, survival, leadership, crafting, and so on. Preserve established signature spells and meaningful growth, without combat logs, exhaustive repeated cast lists, or numerical mechanics. Mark abilities that were lost, temporary, item-dependent, or limited to an earlier form. |
| 5 | `## Equipment and Resources` | Signature items, important possessions, vessels under command, bases, and other narratively significant resources. Use linked bullets with a brief purpose and ownership or custody where known. Distinguish acquired, borrowed, transferred, consumed, lost, and former possessions; an acquisition is not proof of possession at campaign end. Link item articles for fuller descriptions. Companions belong primarily in Relationships. |
| 6 | `## Campaign History` | A chronological synthesis of the character's own arc: consequential decisions, discoveries, achievements, failures, transformations, and changes in allegiance or responsibility. Explain what changed and why it mattered to this character. Use compact paragraphs or milestone bullets; group substantial histories under descriptive `###` arc headings. Do not reproduce the party's full itinerary or every session appearance. |
| 7 | `## Final Status` | The last established condition, role, whereabouts, relationships, and commitments, including any epilogue. Distinguish completed outcomes from intentions, predictions, and unresolved possibilities. If the character disappears before the ending, give the last attested state and its session; do not imply that it persisted unchanged through the finale. State meaningful uncertainty here rather than inventing closure. |

## Scaling the Layout

- **Player characters and substantial recurring NPCs:** Use every section for which meaningful information exists. Campaign History and Final Status are required for these substantial articles. The five primary party members have enough material to support the full layout, but no heading is a license to invent content.
- **Moderately documented NPCs:** Use the same heading names and relative order, selecting only sections that improve retrieval. A short background can stay in the introduction; a single meaningful relationship can stay in its relevant narrative paragraph if a separate Relationships section would merely duplicate it.
- **Brief NPCs:** An introduction alone, or an introduction with a few of the standard sections, is sufficient. Do not create empty headings, placeholders, or repeated statements to imitate a player-character page. Include an established fate in the introduction when Final Status would contain only the same sentence.
- Use optional `###` subdivisions within a standard section when its size warrants them. Prefer descriptive headings for character-specific subjects; do not introduce competing top-level headings such as Motivations, Plot Events, Session NNN, or Miscellaneous.

## Chronology, Evidence, and Duplication

Campaign History owns the detailed account of how a character changed. The other sections synthesize identity, motivations, relationships, capabilities, possessions, and final condition. A brief cross-reference or consequence may appear in both places, but do not repeat whole scenes or explanations. Separate Abilities from Equipment and Resources: describe inherent or learned capabilities in the former and an item's contribution in the latter.

Order history by established in-world chronology, using session and chunk order when chronology is uncertain. Put pre-campaign flashbacks in Identity and Background. Do not organize new character material as appended `## Session NNN` sections. Integrate it into the appropriate profile sections and chronological arc instead. A brief history does not need arc subheadings.

Use existing session files and chunk anchors only after verifying that they exist. Locate the supporting session or source chunk for older undated material; never guess provenance. Preserve unresolved provenance uncertainty if the corpus does not settle it. Session summaries and transcripts retain the fuller event record.

Existing character prose is a starting point, not authority for resolving contradictions. Consult relevant session summaries and source chunks when a claim is ambiguous, internally inconsistent, or consequential to identity or fate. Attribute character claims, suspicions, prophecies, and visions rather than silently presenting them as established outcomes. Do not infer abilities from class rules or fill gaps from external game lore.

Use canonical names throughout prose and link labels. Preserve meaningful name changes narratively without using an alias as the article's ordinary name. Keep historical relationships and prior forms distinguishable from final ones. Do not use a generic Unknown entry for every absent biographical fact; record uncertainty only when it matters to understanding the character.

## Application Examples from This Campaign

These examples guide placement; verify the underlying sources when rewriting rather than copying this section as canon.

- **Ceril:** Separate pre-Cataclysm background, ties to Aeris and former companions, druidic capabilities, and important gifts. Campaign History connects care for Aeris with the growth around Gaokerena. Final Status distinguishes the restoration work and retirement to his star from his still-open choice about a later world.
- **Domyx:** Distinguish ancestry and sky-touching from his campaign rejection of Clan Akathia. Explain family relationships and self-determination separately from his rescue and confrontation milestones. Preserve the earlier designation as The Opal's successor without confusing it with Kerben's eventual captaincy.
- **Red Caesar:** Keep the philosophy of choice in Personality and Motivations, the changing bond with Vizier Jade in Relationships, and arcane research in Abilities. Campaign History traces Antumbra, Obvolvo Caelum, and the decision to erase the Demi-Spell; Final Status records the established Broy settlement without turning proposed offices into confirmed appointments.
- **Kerben:** Give scouting, navigation, and poison craft a coherent Abilities section; place companions in Relationships and signature gear and ship command in Equipment and Resources. Trace his connections to Jack Harvey and Farraday, the Carrot Cake discoveries, and progression to permanent captain in Campaign History.
- **Vokenar:** Distinguish origin, reincarnated body, retained aasimar nature, and final return to Arkadia. Place divine mentorship in Relationships and changing powers in Abilities. Preserve the sacrifice and return as separate milestones, including uncertainty about the manner and interval of his return.
- **Recurring NPCs:** Obould and Lady Jacinthe need relationship and leadership histories; Vizier Jade needs distinctions between former powers, changing allegiance, and accountability; Keys Caeradel needs family ties, the Demi-Spell decision, and an uncertain later direction. A character such as Courteous Cam can use a much shorter selection of the same sections.

## Reorganization and Maintenance Checks

Before restructuring, inventory the article's distinct narrative facts, relationships, capabilities, possessions, and unresolved claims. Map each to its destination section. Preserve substantive information and source references while merging duplication and removing routine mechanics or table meta under the existing content rules. Do not silently discard a meaningful fact because it fits the new layout awkwardly.

After restructuring:

- Confirm the canonical title, exact standard headings, their relative order, and the absence of empty or duplicate sections and leftover session appendices.
- Check that every substantive fact from the inventory survives in an appropriate section, or was corrected from evidence; meaningful uncertainties must survive too.
- Confirm that history is chronological, milestones have verified provenance, and summaries of identity, relationships, abilities, resources, and final status agree with the ending of that history.
- Distinguish historical states from final states, including custody changes, transformations, departures, deaths, returns, and projected futures.
- Preserve frontmatter identity and session history; reorganization alone does not establish a new appearance or introduction session. Validate frontmatter and links under the existing rules.
- Check index coverage and update the one-line entity description when the article's canonical characterization is materially corrected. A layout-only change does not require rewriting an accurate index description.
- Perform the applicable Post-Ingest Validation checks for touched canon surfaces and append the operations to log.md. Do not change quest status merely because a character article was reorganized.

# Session Summation

Session documents at `canon/sessions/session_NNN.md` are robust narrative accounts of the campaign's physical play sessions. A reader should be able to follow the campaign by reading them in sequence without consulting the transcripts for missing meaningful events. The transcripts remain the primary evidence and must be directly accessible from each chunk summary.

Apply the structure below when creating or deliberately reorganizing any session document. Preserve meaningful information while removing routine mechanics, table meta, repetition, and unsupported claims. The timeline provides a shorter event index; a session document needs enough detail to explain the story.

## Session Article Structure

Use the existing Session Files frontmatter schema. Preserve the quoted, zero-padded `session` value. Set `chunks`, when included, to the actual number of source chunk files. Include a real-world `date` only when established and a factual, one-line `summary`. Do not add entity frontmatter fields to sessions.

After frontmatter, use the following exact heading pattern and order:

| Order | Heading | Content |
|---|---|---|
| 1 | `# Session NNN` | The session title, with its three-digit number. |
| 2 | `### Chunk NNNN` | One section per source chunk, in numeric order, using the source's four-digit number. Give a verified transcript link followed by a substantial narrative account of that chunk. |
| 3 | `### Summary` | Exactly one integrated section: a concise bullet list of key events and meaningful acquisitions, followed by a longer synthesis of character developments, plot consequences, and the session's closing situation. |
| 4 | `### Connections` | Exactly one section containing supported connections to other sessions, established lore, relationships, or continuing objectives. |

Do not keep competing top-level Events, Items Acquired, or Characters & Plot Summary sections, append separate summaries after individual chunks, or scatter multiple Connections sections through the document. Meaningful acquisitions belong in their chunk narratives and the integrated Summary bullets.

## Chunk Narratives and Source References

- Inventory every source chunk and read each in full before drafting. Use the original chunk numbers; do not renumber them or create a chunk that has no transcript.
- Begin each chunk section with a link to its matching source, for example `[[chunks/session_011/chunk_0000|Source transcript]]`. Verify that the exact path exists. This link identifies the evidence for the entire chunk narrative.
- Write connected paragraphs in a clear narrative tone, normally in past tense. Identify who acted, what they did or learned, and what changed. Use transitions to make arrivals, decisions, confrontations, and aftermaths easy to follow.
- Follow the sequence represented by the transcript. Clearly identify flashbacks, dreams, visions, and simultaneous scenes; distinguish their in-world timing from the session in which they were presented. Do not relocate a flashback to a different chunk to impose chronological order.
- If a scene crosses a chunk boundary, continue it under the next chunk with enough context to orient the reader. Keep each event under the chunk that establishes it rather than retelling the full scene in both sections.
- Optional `####` scene headings may divide a long chunk into distinct narrative scenes. Keep the exact `### Chunk NNNN` heading intact.
- Let narrative substance determine length. Do not impose a fixed word count, paragraph count, or equal length across chunks. A chunk containing several meaningful scenes needs room for all of them; a combat-heavy chunk may need less prose once bookkeeping is removed.

## Meaningful Event Coverage

Before writing, build an inventory of each chunk's meaningful scenes, discoveries, decisions, claims, relationships, acquisitions, outcomes, and unresolved questions. Map every entry to its chunk narrative. The existing summary is a starting point, not a complete inventory or an authority over the source.

Preserve events that establish or change:

- **Characters and relationships:** introductions, identity or backstory revelations, significant motives and commitments, private conversations, promises, threats, disagreements, trust, allegiances, recruitment, departures, transformations, and established fates.
- **Knowledge and lore:** discoveries, meaningful testimony, warnings, divine guidance, clues, maps, unfamiliar magic, historical information, and explanations that change the party's understanding. Attribute disputed or unverified accounts.
- **Choices and consequences:** accepted or rejected proposals, moral disagreements, bargains, decisions about captives or civilians, changes of plan, failed attempts with lasting consequences, and what those choices achieved or left unresolved.
- **Places and circumstances:** significant arrivals and departures, environmental hazards that shape the story, discoveries about a location, obstacles that alter the route, refuge or hospitality, and the situation at the end of a scene.
- **Conflicts and aftermaths:** the reason for a significant confrontation, the participants who matter, its broad course when needed to understand the outcome, mercy or surrender, casualties with narrative weight, rescue, liberation, and changes in control or public opinion.
- **Items and resources:** meaningful treasure, gifts, thefts, maps, documents, artifacts, vessels, bases, and changes in possession. Preserve who acquired, received, used, transferred, or lost them when established.
- **Abilities and growth:** newly established or changed capabilities and signature magic when they reveal character, explain an outcome, or mark meaningful development. Describe their narrative function without mechanical bookkeeping.
- **Unresolved matters:** questions, threats, intentions, and objectives that remained unsettled when the session ended. State their last established condition without supplying invented closure.

An event need not create a new entity or affect the whole campaign to deserve inclusion. A local disagreement, prisoner exchange, or act of care can meaningfully explain character or the next scene. Summarize incidental actions only when they provide necessary context.

Compress repeated actions and dialogue, not distinct meaningful events. Summarize the substance of an important conversation, including an offer, objection, answer, or resulting decision, rather than reducing it to "they talked." Summarize combat through its narrative progression and outcome rather than turns, damage, rolls, distances, saves, or spell resources. Retain a particular spell or tactic only when its function materially explains an event or revelation.

## Integrated Summary and Connections

The Summary's opening bullets provide quick retrieval of the session's key events and acquisitions. Include meaningful transfers and losses as well as gains when relevant. Then synthesize how the session developed the characters and plot, what its major choices meant, and where matters stood at its close.

The chunk narratives own the detailed event record. The integrated prose should connect those events rather than repeat every scene. Do not use the Summary as the only location for a meaningful event omitted from its chunk.

Connections should explain specific relationships to prior events, lore, character arcs, or objectives, using verified canonical links and session or chunk anchors where useful. Because the campaign is complete, a verified later development may be identified here as a retrospective connection. Keep later knowledge out of the earlier chunk's account unless clearly attributed as information already established at that point. Avoid generic predictions about "future sessions" or treating intentions as completed outcomes.

## Canonical Names, Evidence, and Uncertainty

Use canonical entity names throughout prose and link labels. Resolve transcript spellings against existing entity files, aliases, and `canon/entities.md`; do not propagate an alias or invent a separate identity. Link meaningful entity references without making every sentence a link list.

Distinguish established events from character claims, suspicions, interpretations, prophecies, and plans. A threat does not establish that it was carried out; a proposal does not establish acceptance; a vision does not establish its predicted outcome. When the record does not settle a meaningful question, preserve that uncertainty.

Correct contradictions or consequential ambiguities by consulting the source chunks and established canon. Preserve the perspective available during the session: later revelations can be connected explicitly without silently rewriting what the party knew earlier. Do not infer missing outcomes from external game lore or the fact that the campaign has ended.

Exclude player jokes, scheduling, production notes, table commentary, routine resource management, and other out-of-world material. Operational notes belong only in `log.md`.

## Application Examples from Session 011

These examples illustrate coverage and placement; verify the underlying transcripts when applying them rather than copying this section as canon.

- **Private and historical scenes:** Preserve Vizier Jade's secret approach to Red Caesar, her offer and threats, and his promise of secrecy. Give Vokenar's divine training its own clear flashback context, including his missing memories and the goddesses' stated purpose.
- **Separate discoveries:** Ceril's observation of the imperial scout, discovery of concealed terrain, and tracking of a fleeing dwarf are distinct events. Do not conflate the illusion's still-unknown contents with the underground city.
- **Mercy and testimony:** The captured spy's attempted suicide, the effort to question him, his accusations against Figma Brickfinger, and the decision to leave him guarded carry information and consequences beyond the battle's damage.
- **Allies and liberation:** Explain how Gammix and Tammix joined the party and how Red Caesar's dispelling affected their clan. Preserve the later confirmation from the Steelfend Clan matron, rather than reducing liberation to a generic combat victory.
- **Disagreement and rescue:** The market theft and Vokenar's objection reveal a difference in values. The boiling-oil attack on the party and its new allies, followed by Tammix's rescue, explains the danger of their defection and continued local hostility.
- **Growth and aftermath:** Red Caesar's new protective magic can retain its connection to Heaven's Bulb without a spell-level account. The matron's gift, Far Helm Clan map, refuge, and Gammix and Tammix's choice to remain with their family all belong in the closing narrative.

## Session Reorganization and Validation

Before rewriting, inventory the current article's substantive information as well as every source chunk's meaningful events. Account for each fact in the resulting narrative or correct it from evidence. Do not assume that preserving the current article alone preserves the session.

After writing:

- Confirm schema-compliant frontmatter, the session title, every represented chunk heading in source order, and exactly one `### Summary` and one `### Connections`.
- Verify every transcript link, entity link, and referenced session or chunk anchor.
- Compare the finished chunk narratives with the event inventory and sources. Confirm that no meaningful scene, decision, discovery, acquisition, consequence, or uncertainty was lost.
- Read the session sequentially for clear transitions, consistent names, understandable chronology, and coherent treatment of scenes crossing chunk boundaries.
- Confirm that the integrated Summary agrees with the chunk narratives, describes the session's closing state accurately, and introduces no unsupported facts.
- Check that claims, historical scenes, temporary states, and later retrospective connections remain distinguishable from established outcomes.
- Remove routine mechanics, table meta, duplicated scene accounts, empty sections, and leftover competing summary sections.
- Apply the relevant Post-Ingest Validation checks to canon surfaces touched by the work and append the operations to `log.md`. A session reorganization alone does not establish new entity appearances or change quest status.

# Timeline
Maintain @canon/timeline.md as a chronological list of high-level plot events. Use session headers and chunk subheaders to denote provenance because session and chunk numbers increment monotonically.

Timeline entries should capture outcomes and state changes that matter to the ongoing story: discoveries, arrivals and departures, alliances formed or broken, quests accepted or completed, major battles resolved, deaths, revelations, rituals, disasters, and other lasting consequences.

Do not include turn-by-turn combat logs, damage numbers, tactical movement, dice results, spell slot bookkeeping, or full discussion transcripts. Summarize the result of combat rather than each combat action, and summarize the result of character discussions rather than the conversation content.

Use one heading per session and one subheading per chunk represented in the timeline. Place timeline entries under the relevant chunk subheading. Do not repeat the session or chunk number in each entry unless needed for clarity.

Each entry should use canonical entity names with Obsidian links where helpful. Keep entries concise, factual, and ordered by in-world chronology. If the exact in-world order is unclear, use session and chunk order as the fallback.

Timeline entries should never use aliases in main content. All aliases should be resolved to the canonical name.

# Quest Tracking
Maintain `canon/quests.md` as the final record of quests still open at campaign end and `canon/resolved quests.md` as a chronological list of completed quests. Apply the rules below when correcting or processing existing sources; no future transcripts are expected.

## Adding New Quests
When ingesting a session that introduces a new quest, add an entry to `canon/quests.md`. Each quest entry should include:
- A `##` heading with a concise quest title.
- `**Given by:**` — the NPC or source of the quest, using wiki-links where possible.
- `**Status:**` — the current state (e.g. "In progress", "In progress (1 of 4 lamps lit)").
- `**Details:**` — a brief description of the quest objective and any known progress, using wiki-links for entities.

Only track quests that carry narrative weight. Routine fetch quests, one-off combats, or incidental objectives do not need entries.

## Completing Quests
When a quest is resolved during ingestion, move its entry from `canon/quests.md` to `canon/resolved quests.md`. The resolved entry should include:
- A `##` heading with the same quest title.
- `**Given by:**` — same as the original entry.
- `**Resolved:**` — the session number in which the quest was completed.
- `**Details:**` — a brief description of how the quest was resolved, focusing on narrative outcomes.

Resolved quests in `canon/resolved quests.md` should be ordered chronologically by resolution session.

## Abandoned Quests
Quests that were given but never revisited remain in `canon/quests.md` with `**Status:** Abandoned / unresolved` rather than being moved to resolved.

# Review and Lint Checklist

When reviewing a recent ingestion, check for:

- Missing session summary.
- Missing chunk transcript links or meaningful events omitted from session narratives.
- Missing session or chunk headings in `canon/timeline.md`.
- Broken, stale, or duplicate entries in `canon/entities.md`.
- New entities that should be aliases of existing entities.
- Regressed or overwritten `session_introduced` values.
- Missing session numbers in `sessions_appeared`.
- Noncanonical names or aliases in canon prose.
- Mechanical combat detail that does not affect story state.
- Out-of-world or table meta commentary in canon prose.
- Incidental `related` links that do not carry narrative weight.
