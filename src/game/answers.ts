// Codle's answer pool: 5-letter computer-science words (ADR-0002).
//
// Curation policy (v1): vocabulary a CS student would recognize — data
// structures, language keywords, systems/networking/security/ML jargon.
// Excluded: proper nouns and product names (LINUX, REACT), pure acronyms
// (ASCII, HTTPS), and plurals. Kept alphabetical for easy review; the daily
// order is a seeded shuffle (see daily.ts).
//
// Editing this list reshuffles the daily order from that day on.
export const ANSWERS: readonly string[] = [
  'ABORT', 'ADDER', 'ADMIN', 'AGENT', 'AGILE', 'ALIAS', 'ALIGN', 'ALLOC',
  'APPLY', 'ARITY', 'ARRAY', 'ASYNC', 'AWAIT', 'BATCH', 'BLAME', 'BLOCK',
  'BLOOM', 'BOUND', 'BRACE', 'BREAK', 'BUILD', 'CACHE', 'CARRY', 'CATCH',
  'CHAIN', 'CHILD', 'CHUNK', 'CLASS', 'CLICK', 'CLOCK', 'CLONE', 'CLOUD',
  'CODEC', 'CONST', 'CRASH', 'CRAWL', 'CURRY', 'CYCLE', 'DATUM', 'DEBUG',
  'DEFER', 'DEPTH', 'DEQUE', 'DIGIT', 'ENTRY', 'EPOCH', 'ERRNO', 'ERROR',
  'EVENT', 'FALSE', 'FAULT', 'FETCH', 'FIBER', 'FIELD', 'FINAL', 'FLOAT',
  'FLOOR', 'FLUSH', 'FRAME', 'GLYPH', 'GRAPH', 'GUARD', 'HOIST', 'IMAGE',
  'INDEX', 'INFER', 'INFIX', 'INODE', 'INPUT', 'ISSUE', 'LABEL', 'LATCH',
  'LAYER', 'LEMMA', 'LEXER', 'LOCAL', 'LOGIC', 'LOGIN', 'MACRO', 'MATCH',
  'MAYBE', 'MERGE', 'MIXIN', 'MODEL', 'MODEM', 'MONAD', 'MOUSE', 'MUTEX',
  'NONCE', 'OCTAL', 'OCTET', 'PANIC', 'PARAM', 'PARSE', 'PATCH', 'PHISH',
  'PIVOT', 'PIXEL', 'PRIME', 'PRINT', 'PROBE', 'PROOF', 'PROXY', 'QUBIT',
  'QUERY', 'QUEUE', 'QUINE', 'QUOTA', 'RADIX', 'RANGE', 'REGEX', 'RESET',
  'RETRY', 'ROBOT', 'ROUTE', 'SCOPE', 'SCRUM', 'SETUP', 'SHARD', 'SHELL',
  'SHIFT', 'SHORT', 'SLEEP', 'SLICE', 'SPAWN', 'SPLAY', 'SPLIT', 'SPOOF',
  'STACK', 'STALL', 'STASH', 'STATE', 'STORE', 'SUITE', 'SUPER', 'SWEEP',
  'TABLE', 'THROW', 'THUNK', 'TIMER', 'TOKEN', 'TRACE', 'TRAIT', 'TRUNK',
  'TUPLE', 'UNARY', 'UNION', 'VALUE', 'VIRUS', 'VOXEL', 'WHILE', 'WIDTH',
  'WRITE', 'YIELD',
]
