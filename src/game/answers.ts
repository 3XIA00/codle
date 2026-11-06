// Codle's answer pool: 5-letter computer-science words (ADR-0002).
//
// Curation policy (ADR-0002): words a CS student would recognize, in two
// groups below. Excluded: plurals. Each group is alphabetical for easy
// review; the daily order is a seeded shuffle (see daily.ts).
//
// Editing this list reshuffles the daily order from that day on.

// Vocabulary: data structures, keywords, systems/networking/security/ML jargon.
const VOCABULARY = [
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

// Well-known names and acronyms: languages, tools, products, protocols
// (added at 3XIA00's request, 2026-11-05 — "popular and well known").
const NAMES_AND_ACRONYMS = [
  'ASCII', 'CMAKE', 'COBOL', 'EMACS', 'FLASK', 'HTTPS', 'JULIA', 'KAFKA',
  'KERAS', 'LINUX', 'MACOS', 'MYSQL', 'NGINX', 'NOSQL', 'NUMPY', 'OAUTH',
  'OCAML', 'POSIX', 'REACT', 'REDIS', 'SCALA', 'SPARK', 'SWIFT', 'XCODE',
]

export const ANSWERS: readonly string[] = [...VOCABULARY, ...NAMES_AND_ACRONYMS]
