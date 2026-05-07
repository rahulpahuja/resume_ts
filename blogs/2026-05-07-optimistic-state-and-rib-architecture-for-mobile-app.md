title: Optimistic State and RIB Architecture for Mobile App
tag: Blog
description: 

We propose a reactive, coroutine-native embedded database runtime for mobile (Android/iOS) that unifies storage, sync, event streams, analytics, vector search, and security in one lightweight engine. It builds on proven ideas (e.g. MVCC snapshots, actor-based concurrency, CRDT sync) and modern mobile platforms (Kotlin Multiplatform + Swift). Unlike plain SQLite/Room, this runtime offers built‑in RBAC/row-level security, a push-button sync queue, immutable event streaming, vector search for AI, and a user-friendly DSL for DDL/DML. Phased development (V1–V4) gradually layers features: starting with a coroutine/Flow-first ORM on SQLite, then adding sync, security and analytics, then vector/AI support, and finally optionally a custom storage engine. Key trade-offs include using SQLite (ubiquitous, small) vs. a new MVCC/LSM engine (high performance, complexity). We outline architecture diagrams, data models, concurrency and transaction semantics, and pipelines for sync and analytics. We compare against Room/SQLite, Realm, ObjectBox, SQLDelight, etc. This design addresses modern needs (offline-first, edge-AI, privacy) while minimizing boilerplate.

Goals and Scope
Edge-First & Offline-First: A local SQL/NoSQL store that works with intermittent connectivity. Data sync to a cloud or peers is optional but built-in. (Similar to Couchbase Mobile
.)
Reactive & Coroutine-Native: All reads/writes are coroutine- and Flow-friendly (or Combine/AsyncSequence on Swift). Reactive queries push updates to the UI automatically (no manual invalidation). This avoids the “dispatcher hopping” and Invalidator overhead of Room
.
High Concurrency: Support many concurrent readers and writers using MVCC/snapshot isolation so readers never block writers (as in Realm
) and writers serialize optimistically. Actor-based schedulers coordinate database operations to avoid manual locks.
Secure by Default: Built-in authentication, role-based access control (RBAC) and row-level policies (like PostgreSQL RLS). Data at rest is AES-encrypted. Each table or column can declare access rules, e.g. only allow SELECT if user_id = auth.userId. (Couchbase Mobile already embeds RBAC and AES-256 encryption
.)
Feature-Rich Stack: Beyond CRUD, integrate these cross-cutting features in one runtime:
Sync Queue: All network calls are queued/stored locally, retried with backoff, batched and de-duplicated (versus ad-hoc code). Enables offline queuing and recoverable sync.
Event Stream: Every local mutation (insert/update/delete) is recorded as an immutable event. Apps can subscribe to streams (analytics, UI updates, triggers). (Couchbase Lite even “raises events when data changes”
.)
Analytics Pipeline: Local aggregation and batching of user events or metrics. Instead of immediate network calls, generate a compact event log and upload in bulk (see mobile analytics patterns
).
Vector Store & AI: Support on-device semantic search and AI “memory” via embeddings. Tables can hold float vectors with HNSW indexes for k-NN queries. Models like Google’s EmbeddingGemma enable on-device embeddings
. (ObjectBox and Couchbase already offer on-device vector DB support
.)
Developer Ergonomics: A Kotlin/Swift DSL for defining schema and queries (no raw SQL strings). Use code generation (KSP or Swift macros) for type-safe models. E.g. users.insert { name = "Alice" } or table<User>("users") { column("email").unique() }.
Target Platforms & Stack
Kotlin Multiplatform (Android + iOS + Web/WASM): The runtime core is written in Kotlin Multiplatform or Rust, with idiomatic Kotlin APIs for Android and Swift (via Kotlin/Native interop or generated Swift code) for iOS. A WebAssembly build enables usage in JS contexts.
Concurrency: Core library in Rust or Kotlin Native for safety. Rust gives low footprint, no GC, strong concurrency (see projects like Stoolap
); Kotlin Native is easier KMP but uses GC (which may be a battery/pause concern). Either core exposes coroutines (Kotlin) or Swift async interfaces.
Storage Engine Options:
Option A: SQLite-backed. Easiest start. Use standard SQLite (with WAL mode) as on-disk store, with custom JNI/NDK bindings. Build atop it a multi-connection, async scheduler, reactive layer, RBAC layer, etc. Many teams improve on SQLite via custom wrappers (like SQLDelight or greenDAO). SQLite’s advantages: tiny, battle-tested, ubiquitous
. Disadvantages: single writer (WAL mode allows one writer + many readers), no built-in MVC, no auth, no vector index.
Option B: Custom Engine. Long-term high-performance route. Build an MVCC storage engine (e.g. using an LSM-tree or append-only log) in Rust/Cpp. Provide snapshot isolation, lock-free reads (as in Realm
), and built-in vector indexes (HNSW). Can draw from open-source like DuckDB (column-store), RocksDB (LSM), or SurrealKV (Rust LSM) as inspiration. Very high effort (months of core DB work), so likely Phase 4.
Architecture Overview
CoreDB

App

CRUD / Query

Calls

Sync data

UI Components

Business Logic / Repositories

Reactive Local Runtime

Storage Engine

Actor Scheduler

Reactive Query Engine

Sync Queue Module

Event Stream Bus

Auth & Policies

Vector/AI Engine

Analytics Engine

Cloud/Peers



Show code
Figure: Component breakdown. The LocalRuntime (ORM/SDK layer) invokes the StorageEngine (SQLite or custom) via an actor-based scheduler for thread safety. A ReactiveEngine tracks dependencies to update Flows. A SyncModule handles queued network sync. An EventBus logs every change. A SecurityLayer enforces RBAC policies. A VectorIndex sits atop storage for similarity search. An AnalyticsPipeline consumes events (for aggregation/upload).

Storage Engine Options
SQLite (Phase 1): Use SQLite (WAL mode) as disk backend. This yields a tiny footprint (<1 MB) and cross-platform support
. We would shard the single-file DB if needed. On writes, a dispatcher routes queries through a single shared connection (Room’s model
). The downside: at most one writer at a time; heavy concurrent writes will queue (Room/SQLite have known scaling issues
). Indices (B-tree) for exact lookups, plus using SQLite FTS5 or RTree for some queries. We can add “vector” columns using JSON/BLOB + custom UDFs or rely on an external index (see Stoolap’s EMBED/HNSW
).

Custom Engine (Phase 4): Build a new KV/SQL engine in Rust or C++. Key features:

MVCC + Snapshot Isolation: Each write creates a new version; readers always see a consistent snapshot
. This means no locks on reads and writes only serialize with each other. (Exact copy of Realm’s approach
.)
Append-Only Log: All updates append to a log or LSM-tree (like RocksDB). This simplifies sync (change-logs) and enables time-travel queries (as Stoolap does via AS OF
).
Parallel Execution: Query planner splits scans/joins across threads/cores (stoolap uses Rayon to parallelize filters and joins
).
Vector Support: Native VECTOR type with built-in HNSW index for k-NN (as Stoolap
). Possibly an EMBED() function to create embeddings on the fly.
Memory/Storage: Memory-mapped files or custom allocator for efficiency on low-RAM devices. Snapshots stored compactly.
Trade-offs: SQLite path is lower risk (mature, tiny). Custom engine is high-risk/time but best performance for heavy workloads (concurrent writes, complex analytics, vector search).

Concurrency Model
Actor Model: All database commands (reads/writes) are sent as messages to actors representing tables or partitions. For example, each table may have its own coroutine actor:

kotlin
Copy
actor<DBCommand> { for (cmd in channel) { process(cmd) } }
This avoids manual locks and leverages Kotlin’s structured concurrency. Actors can batch commands or serialize execution on table shards.

MVCC Snapshots: Every read transaction captures a snapshot. Writers create new versions (copy-on-write). So readers never block (they see the old version), and concurrent writers detect conflicts optimistically. This is exactly Realm’s model: “reads never block and writes only block other writes”
.

Optimistic Transactions: By default use optimistic concurrency: attempt commit and check for conflicts. If conflict, transaction fails and is retried. For critical sections, a suspendable WAL lock ensures durability.

Kotlin Coroutines: Expose APIs with suspend and Flow. All blocking I/O runs on a dedicated dispatcher (IO or custom native IO thread pool). Room is already “main-safe” for suspend queries
; we extend that to even more operations so users don’t accidentally switch threads.

Swift Concurrency: On iOS, similar: use Swift async/await and Combine or AsyncSequence. For example, a query returns AsyncStream<[User]> that emits on data changes.

Reactive Query Model
Flow-First Queries: Tables expose a .observe() API that returns a Flow<List<T>>. Internally, we use a dependency tracker (like LiveData/Compose) to re-run queries on relevant commits. Room’s InvalidationTracker
 is one approach, but we can do smarter diffing: only emit updated rows or use change feeds.

Incremental Updates: Rather than re-running full query on every change, keep track of affected rows. E.g. if one row in users changes, update only that part of the Flow (like a StateFlow of a rowlist). For large result sets, use dirty checking or observable lists that patch the UI (similar to Jetpack Compose’s collection diffing).

Offline-First Streams: Combining local events and remote events into a unified stream. E.g. chat messages are a Flow that merges local DB inserts with pushed updates from the network.

Example Usage:

kotlin
Copy
// Kotlin: define a reactive query with DSL
val adultsFlow: Flow<List<User>> = db.query {
    SELECT * FROM Users WHERE age > 18 ORDER BY name
}.toFlow()
adultsFlow.collect { list ->
    // update UI with latest list of adult users
}
In Swift:

swift
Copy
let adultsPublisher: AsyncStream<[User]> = db.query("Users")
    .filter("age", .greaterThan(18))
    .sorted(by: "name")
    .asPublisher()
Task { for await list in adultsPublisher { /* update UI */ } }
Sync Queue Design
Local Queue Table: All mutating actions that need server sync are first recorded in a persistent sync_queue table:

pgsql
Copy
sync_queue(
  id UUID PK,
  action TEXT,        -- e.g. "InsertUser"
  payload BLOB,       -- JSON or protobuf of the data
  status TEXT,        -- "pending", "synced", "failed"
  priority INT,
  retries INT,
  last_attempt DATETIME
)
Producer/Consumer: DAO methods suspend transactions that insert or update both the target table and an entry in sync_queue. A background worker coroutine reads from sync_queue, batches entries, and sends them to the server (e.g. via REST or gRPC).

Retry & Backoff: On failure, the worker backs off (exponential) and increments retries. Entries can expire or be moved to a dead-letter queue after too many tries.

Batching: Accumulate multiple queue rows into one HTTP call or transaction. Optionally compress payloads.

Conflict Resolution: On push, the server responds with a success/failure. If there’s a conflict (e.g. LWW violation), the client may merge or override based on policy. Alternatively, using CRDTs (append-only events) means merging is automatic (no real conflict). For idempotence, actions should carry client-generated UUIDs
.

CRDT/OT Option: The sync system can adopt a CRDT/event-log approach. Instead of syncing full state, send “mutations” (intent) to central or peers. Since CRDT logs are commutative, no last-write-wins anomalies
. Example: each DB table is treated as an RGA (replicated grow-only array) or LWW-register with tombstones
. Vector clocks track causal order
.

INSERT into queue

Batch Send

ACK/Conflict

Update status

DB_Modification

DB_SyncQueue

Sync Worker Coroutine

Central/Cloud API



Show code
Figure: Sync queue pipeline. Application writes go to both the local table and sync_queue. A background worker processes the queue, communicates with the server, and updates statuses. Retries/backoff are handled in the worker.

Event Stream Model
Immutable Events: Every write (insert/update/delete) appends an event to a system table or log: e.g. events(id, table, operation, row_id, data, timestamp). Events are never deleted (or only tombstoned), enabling a replayable log.

Subscriptions: Apps subscribe to events of interest. For example, an analytics service listens to all events, while a UI layer might only care about INSERT/UPDATE on messages for a given conversation ID. Subscriptions can be filtered by event type or content.

Retention: The system retains recent events (configurable TTL or maximum rows). Old events can be archived or pruned if not needed. Local-first apps may want to keep at least the last session of events for crash recovery.

Use Cases:

UI State: If a user edits their profile, an event USER_UPDATED triggers a UI refresh via Flow.
Triggers: Define serverless triggers: e.g. on ORDER_PLACED, run a Python analysis or send a push.
Synchronization: CRDT approach (Append-Only Log) uses the event log as the source of truth to merge remote changes
.
Event Bus

DB Write (Table X)

UI (Flow)

Local Analytics Collector

SyncModule



Show code
Figure: Event bus. Each local DB mutation emits an event. Various subscribers (UI, analytics, sync, etc.) consume the immutable event stream.

Analytics Ingestion Pipeline
Client-Side Logging: User actions (clicks, page views, custom events) are logged to a local analytics_events table (like the sync queue). Each event has a timestamp, type, and optional payload.

Local Aggregation & Compression: A background worker periodically batches these events. It can aggregate (e.g. count events by type), compress (e.g. gzip), and upload them to analytics servers. This matches mobile analytics best practices
.

Batched Upload: Use thresholds (time interval or count) to decide when to send. Retries on failure. The uploaded payload might be JSON or Protobuf. After success, clear the local entries or mark them.

Privacy / Opt-in: Since data stays local until upload, the app can allow users to review or anonymize data. All events remain on-device until explicit flush.

Example: If user taps “purchase”, log { event: "purchase", amount: 9.99, timestamp: 12345678 }. Later, the pipeline sends daily or hourly batches to the cloud analytics endpoint, greatly reducing network calls and improving battery life.

Vector Store and Embeddings
Vector Columns: Allow tables to declare a column of type VECTOR<float> (e.g. dimension 128 or 384). For example:

kotlin
Copy
@Entity data class Doc(
    @Id val id: Long = 0,
    val content: String,
    @VectorIndex(dimensions = 384) val embedding: FloatArray
)
Under the hood, the embedding is stored as a BLOB or custom binary, and indexed with an HNSW graph.

On-Device Embedding Models: Integrate lightweight embedding models (e.g. Google EmbeddingGemma
, Gecko) via TensorFlow Lite or proprietary on-device AI. Provide an API like val vector = embed(text).

Similarity Search: Expose SQL or DSL queries like FIND nearest(doc.embedding, embed("query text"), k=5). Use HNSW (like ObjectBox 4.0
 or Stoolap
).

Storage Format: Option A: store raw vectors in table columns and maintain an index (as stoolap shows
). Option B: use an external vector store (like ObjectBox’s VectorDB), but embedding into one engine is simpler. Stoolap’s built-in EMBED function is an example of fully integrated solution
.

Example:

kotlin
Copy
// After storing document embeddings:
val results = db.query {
    SELECT * FROM Documents ORDER BY 
    VEC_DISTANCE(embedding, vector) ASC LIMIT 3
}.execute()
This returns the 3 most semantically similar docs.

Security: RBAC and Encryption
Roles & Policies: Built-in support for user authentication and roles. The developer can declare roles and permissions in code:

kotlin
Copy
role("admin") {
    canRead(usersTable)
    canWrite(ordersTable)
}
role("guest") {
    canRead(usersTable.filter { it.status == "public" })
}
Row-level security: attach policies to tables (like PostgreSQL RLS):

kotlin
Copy
policy(usersTable) { currentUser.id == it.createdBy }
These policies are checked inside the DB layer, so no illicit data leak through the API. Couchbase Mobile shows this pattern with RBAC and fine-grained controls
.

Field-Level Permissions: Columns can be marked sensitive. E.g.

kotlin
Copy
table<Payroll>("payroll") {
    column(Payroll::salary).onlyRole("manager", "hr")
}
Attempting to read the salary field without those roles throws an auth error.

Encryption: All on-disk data is encrypted by default (e.g. using SQLCipher or a Rust AES layer). Keys are derived from user credentials or device key store. Couchbase Mobile uses 256-bit AES encryption out of the box
. Optionally support per-table or per-field encryption.

Transport Security: The sync module uses TLS for server comms. Every network request must be authenticated (token/session).

Schema Migrations
Versioned Migrations: Use DSL to define schema versions. Each schema change increments a version and provides a migration function. Ideally, these are auto-generated or diffed by a KSP plugin. E.g.:
kotlin
Copy
database.migration(1, 2) { db ->
    db.addColumn("users", "lastLogin", type = "INTEGER")
}
Validation: On startup, validate that the live schema matches the expected. Provide rollback or no-op migration if possible.
Declarative Definitions: If using a pure DSL, the schema generator can produce SQL and migration plan (like Room’s auto-migrations, but fully in-code).
Performance, Memory and Battery
Memory Footprint: Keep in-memory caches small. Allow memory-mapped file IO for large tables. Provide tunable page size and cache size.
Battery: Long-running writes should be deferred until idle/charging if possible. Batching network = fewer radio wakeups.
Indexes: Developers must add indexes on columns used in WHERE/JOINs (as with SQLite). Expose best-practice tooling (EXPLAIN).
Background Threads: Use dedicated thread pool for DB I/O. Avoid spinning CPU at idle.
Benchmarks: Provide microbenchmark suite (insert speed, query latency, multi-thread throughput) on common devices. Compare WAL vs custom engine, etc.
Developer Ergonomics (DSL & APIs)
Kotlin DSL & Codegen: Use Kotlin type-safe builders and KSP to minimize boilerplate. E.g. entity/table definitions:
kotlin
Copy
table<User>("users") {
    column(User::id).primaryKey()
    column(User::email).unique()
    column(User::age)
    encryptedColumn(User::salary)  // field-level encryption
}
Queries via a fluent DSL or annotations:
kotlin
Copy
val seniorAdmins: Flow<List<User>> = db.query {
    SELECT * FROM users
    WHERE role == "admin" AND age > 50
    ORDER BY lastLogin DESC
}.toFlow()
Swift DSL: On iOS, a Swift-friendly API:
swift
Copy
let schema = Schema {
    Table<User>("users") {
        Column(\.id).primaryKey()
        Column(\.name).unique()
    }
    Table<Message>("messages") {
        Column(\.id).primaryKey()
        Column(\.text)
        Column(\.conversationId)
    }
}
Built-in ORM/DAO Patterns: Provide annotations (like @Entity, @Query) or DAO interfaces (like Room), but emphasize DSL over SQL strings.
Reactive Extensions: Offer extensions like .flow() or Combine .publisher() so that even raw SQL queries become reactive. E.g. SELECT * FROM chat returns a Flow<List<Message>>.
Migration Codegen: A KSP plugin can emit migration stubs or even automatic diffs between schemas (similar to how SQLDelight generates schema schemas
).
Phased Roadmap (V1–V4)
Phase 1 (6–9 months, 3–4 engineers): Core ORM + Reactive Queries on SQLite.

Build KMP runtime on SQLite with coroutine/Flow APIs.
Reactive query engine (like Room’s Flow but internal).
Sync queue basic table + background worker.
Event bus (log mutations).
Basic DSL for schema and queries.
Testing harness, initial benchmarks.
Phase 2 (6 months): Security + Analytics + Stability.

RBAC/Row-Level Security layer and encryption support.
Offline analytics pipeline (local event queue + batch upload).
Refine schema migration tooling.
Swift integration (if starting with Kotlin, then iOS binding).
Expanded benchmark and profiling (optimize hot paths).
Phase 3 (6 months): AI/Vector + Advanced Sync.

Vector store: integrate HNSW library (Rust/wrapper) and embedding model interface.
Real-time sync: implement CRDT support and peer sync (optional P2P).
UI updates: ensure seamless reactive updates (optimize change tracking).
Additional features: TTL, full-text search (optional).
Phase 4 (6+ months): Custom Engine (optional / long-term).

Begin replacement or supplementary engine development (Rust).
Re-implement core on new engine, maintaining compatibility layer.
Advanced query optimizer, parallel execution (inspired by stoolap).
Finally, productize and document the full stack.
Prioritized Feature List
Reactive Queries & Coroutines (core requirement)
Sync Queue & Offline Sync (enables offline-first)
RBAC/Encryption (security-by-default)
Event Streams & Analytics (data-driven features)
DSL for Schema/Queries (developer UX)
Vector Search/AI (forward-looking edge AI)
Multiplatform Bindings (KMP, Swift)
Custom Engine (MVCC) (long-term high perf)
Risk Analysis
Complexity Overload: Combining DB, sync, CRDT, security, AI is ambitious. We mitigate by iterative phases.
Performance Tuning: New features (HNSW, CRDT) may slow down writes. Need careful indexing and pooling.
Battery/Memory: Heavy background tasks (AI models, event logging) could drain resources. Must batch operations and allow tuning.
Security Errors: Misconfiguring RBAC/crypto can expose data. Use proven libraries (SQLCipher, OAuth).
Migration Bugs: Complex schema evolution across KMP/Swift adds risk. Extensive tests needed.
Third-Party Dependencies: Relying on SQLite, TF-Lite, HNSW library. Keep them updated and consider fallback modes.
Effort Estimates & Team Roles
Phase 1 (6–9 mo): 3–4 devs (Kotlin devs, a backend/database expert, 1 QA).
Phase 2 (6 mo): 2–3 devs (add a security engineer, 1 dev on analytics).
Phase 3 (6 mo): 3–4 devs (expert in Rust or ML for embeddings, 1 ops).
Phase 4 (6–12 mo): Larger effort (5+ devs including DB engine specialists).
Roles: Mobile Engineers (Kotlin/Swift), Database Architect (MVCC, indexing), Security Engineer (crypto/RBAC), DevOps/Test (benchmarks), AI Specialist (embeddings).

Comparison vs Room/SQLite/Realm/ObjectBox/SQLDelight
Feature / Tool	Room/SQLite	Realm (Mongo)	ObjectBox	SQLDelight	Proposed DB Runtime
Model	SQL-relational	Object DB	Object (NoSQL)	SQL with Kotlin codegen	SQL/NoSQL hybrid with DSL
Transactions	ACID, single-thread write
MVCC (copy-on-write)
ACID, MVCC-like	ACID (wrapper)	MVCC + Actor model (snapshots)
Concurrency	1 writer, many readers (WAL)
Readers non-blocking; writes block writers
Multi-thread safe	Single DB instance (native SQLite)	Multi-writer, snapshot isolation
Reactive Queries	Flow with InvalidationTracker
Live objects (notifications)	LiveData equivalents	Manual (no built-in)	Native Flow/Combine, reactive engine
Offline Sync	DIY only	Sync service (deprecated)	DataSync product (paid)	None	Built-in sync queue + optional cloud
Vector Search	None	None	Yes (HNSW in 4.0)	None	Yes, built-in HNSW and embed models
RBAC / RLS	None	No (deprecated)	No	None	Yes, built-in roles & row policies
Encryption	Optional (SQLCipher)	Built-in encryption	Transport encryption; at-rest on request	None	Yes (AES-256 at-rest by default)
Schema via DSL	Room annotations (strings)	Realm Object schema	Object entities / Sync annotations	Kotlin interfaces & .sq files	Fluent Kotlin/Swift DSL, codegen
Multiplatform	Android (Java/Kotlin) only	Android, iOS	Android, iOS, Flutter	Android, iOS (via multiplatform support)	True KMP + Swift + WASM (planned)
Size (footprint)	<1MB (SQLite engine)	~8MB (library)	~1–3MB	<1MB (JNI)	<5MB (SQLite) or ~X MB (custom)
Vendor lock-in	None (open)	Proprietary (BSL/Apache), being phased out	Open core, enterprise	Open source	Open source / permissive

Sources: Official docs and benchmarks show Room/SQLite are robust but boilerplate-heavy
. Realm’s Mongo Sync was sunset; ObjectBox recently added vectors
. Couchbase Mobile (not in table) offers many features (RBAC, vector)
.

Recommended Sources for Further Reading
SQLite Documentation – Core engine features (e.g. WAL mode, concurrency)
.
Android Jetpack Docs (Room) – Reactive queries and SQLite wrapper.
Couchbase Mobile Docs – Example of RBAC, sync, edge AI (Couchbase Lite, Sync Gateway)
.
ObjectBox Blog & Docs – On-device vector DB, sync, benchmarks
.
Realm Docs – MVCC architecture, zero-copy, multi-version strategy
.
Stoolap.io (Rust DB) – Modern embedded SQL DB features (MVCC, parallel, HNSW, WASM)
.
Kotlin Coroutines & Flow Guides – For asynchronous/reactive APIs.
JetBrains Exposed – Kotlin SQL DSL inspiration.
Kotlin Multiplatform – Strategies for sharing DB code on iOS/Android.
Apple SwiftData / GRDB – For insights on data layers on iOS.
“Designing Data-Intensive Applications” (Kleppmann) – Concepts of replication, MVCC, CRDTs.
Research on CRDTs/Event Sourcing – e.g. Engin Bolat’s article on offline-first CRDTs
, or scientific papers.