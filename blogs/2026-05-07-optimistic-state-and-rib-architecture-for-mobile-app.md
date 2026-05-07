title: Optimistic State and RIB Architecture for Mobile App
tag: Blog
description: 

# Optimistic State in Mobile Apps — The Secret Behind “Instant” UX

Modern apps feel fast not because APIs are fast.

They feel fast because the UI lies intelligently.

That technique is called:

```text id="c4c8u7"
Optimistic State Management
```

Apps like:

* Instagram
* WhatsApp
* X
* LinkedIn
* YouTube

all heavily rely on it.

---

# What is Optimistic State?

Optimistic state means:

```text id="p4a9pa"
Update UI BEFORE server confirmation
```

Instead of:

```text id="6r3m0d"
User Action -> API -> Success -> Update UI
```

we do:

```text id="j4f8e7"
User Action -> Update UI immediately -> Sync server in background
```

---

# Real Example — Instagram Like Button

## Traditional Flow

```text id="rdhjj7"
Tap Like
↓
API Call
↓
Wait 600ms
↓
Heart turns red
```

Feels slow.

---

## Optimistic Flow

```text id="f2ljlwm"
Tap Like
↓
Heart turns red instantly
↓
API sync happens in background
↓
Rollback only if failed
```

Feels instant.

---

# Why Optimistic UI Matters

Human perception threshold:

| Delay      | User Feeling |
| ---------- | ------------ |
| <100ms     | Instant      |
| 100-300ms  | Smooth       |
| 300-1000ms | Noticeable   |
| >1s        | Slow         |

Optimistic state eliminates perceived latency.

---

# Basic Example

## Without Optimistic State

```kotlin id="9fw7z7"
suspend fun likePost(id: String) {

    val response = api.like(id)

    if(response.isSuccessful) {
        state.isLiked = true
    }

}
```

UI waits.

---

# With Optimistic State

```kotlin id="wgb55w"
suspend fun likePost(id: String) {

    // optimistic update
    state.isLiked = true

    try {

        api.like(id)

    } catch(e: Exception) {

        // rollback
        state.isLiked = false

    }

}
```

Instant UX.

---

# Core Concepts

| Concept              | Meaning                     |
| -------------------- | --------------------------- |
| Optimistic Update    | Assume success              |
| Rollback             | Revert if failed            |
| Temporary State      | Fake local state            |
| Conflict Resolution  | Handle mismatches           |
| Eventual Consistency | Server becomes source later |

---

# Common Use Cases

| Feature          | Optimistic? |
| ---------------- | ----------- |
| Like Button      | Yes         |
| Chat Messages    | Yes         |
| Comments         | Yes         |
| Reactions        | Yes         |
| Cart Updates     | Yes         |
| Follow/Subscribe | Yes         |
| Banking Transfer | NO          |

---

# When NOT To Use It

Never use optimistic state where:

* money involved
* irreversible actions
* legal/compliance issues
* inventory precision critical

Examples:

* bank transfers
* stock trades
* crypto transactions

---

# Rollback Strategy

## Problem

User sees:

```text id="owrm0v"
Liked ❤️
```

But server fails.

Now what?

---

# Strategies

## 1. Silent Rollback

```text id="r4m2ph"
Heart returns to gray
```

Good for small actions.

---

## 2. Snackbar Retry

```text id="mjlwm0"
Failed to like post
Retry?
```

---

## 3. Offline Queue

Store request locally.

Sync later.

Used by:

* WhatsApp
* Notion
* Google Docs

---

# Optimistic State + MVI

MVI works beautifully with optimistic updates.

---

## Example Flow

```text id="t0ldmb"
Intent -> Reducer -> Optimistic State
                 -> Effect(API)
                 -> Success/Failure
```

---

## Reducer Example

```kotlin id="1c3n4u"
when(action) {

   is LikeClicked -> {
      state.copy(isLiked = true)
   }

   is LikeFailed -> {
      state.copy(isLiked = false)
   }

}
```

Predictable.

---

# Optimistic State Problems

---

# 1. Race Conditions

User taps quickly:

```text id="6hl4jlwm"
Like
Unlike
Like
Unlike
```

API responses may arrive out of order.

---

# Solution

Use:

* request IDs
* timestamps
* state versioning

---

# 2. Duplicate Updates

Server pushes websocket update too.

Now:

```text id="pdyzbt"
Liked count becomes wrong
```

Need reconciliation.

---

# 3. Rollback Complexity

Complex UI trees:

* pagination
* nested comments
* shared feeds

make rollback hard.

---

# Enterprise Strategy

Large apps usually use:

```text id="es0b9w"
Optimistic Local Cache
+
Background Sync
+
Conflict Resolver
```

---

# Architecture Patterns Supporting Optimistic State

| Architecture | Support   |
| ------------ | --------- |
| MVC          | Weak      |
| MVP          | Medium    |
| MVVM         | Good      |
| MVI          | Excellent |
| TCA          | Excellent |
| Redux        | Excellent |

---

# Best Technologies for Optimistic State

## Android

* StateFlow
* Compose
* Room
* Paging3

---

## iOS

* SwiftUI
* Combine
* TCA

---

## Cross Platform

* Redux
* Bloc
* Zustand
* Riverpod

---

# Real World Architecture Example

```text id="g00j1s"
UI
↓
ViewModel
↓
Reducer
↓
Optimistic Cache Update
↓
Repository
↓
API
↓
Rollback if failure
```

---

# Senior Engineering Advice

Optimistic state is not:

```text id="fnyyq0"
a UI trick
```

It is:

```text id="a5r50x"
a distributed systems problem disguised as UI
```

Because eventually:

* synchronization
* ordering
* consistency
* conflict resolution

become hard problems.

---

# Final Rule

Use optimistic updates for:

```text id="jlwmkk"
High-frequency reversible interactions
```

Avoid for:

```text id="yx7ru9"
Critical transactional systems
```

---

# RIB Architecture — Uber’s Hyper-Scalable Mobile Architecture

RIB stands for:

```text id="i1mbny"
Router
Interactor
Builder
```

Created by:
[Uber Engineering](https://www.uber.com/en-IN/blog/introducing-ribs-for-android/?utm_source=chatgpt.com)

Designed for:

```text id="zt2eh9"
Massive scale mobile apps
```

Used heavily at Uber.

---

# Why Uber Created RIBs

Traditional architectures failed at Uber scale.

Problems:

* giant view controllers
* feature coupling
* difficult ownership
* dependency chaos
* navigation complexity

They needed:

* modularity
* isolation
* scalability
* team independence

RIB solved that.

---

# Core Philosophy

```text id="9k4xl1"
Business logic drives the app
NOT views
```

---

# RIB Components

| Component  | Responsibility      |
| ---------- | ------------------- |
| Router     | Navigation          |
| Interactor | Business Logic      |
| Builder    | Dependency Creation |
| View       | Rendering           |
| Component  | Dependency Graph    |

---

# High-Level Flow

```text id="9ytb3v"
Builder
   ↓
Router
   ↓
Interactor
   ↓
View
```

---

# 1. Router

Handles:

* navigation
* child attachment
* feature lifecycle

---

## Example

```kotlin id="2q0crv"
class HomeRouter : ViewableRouter<HomeView>() {

   fun attachProfile() {
      attachChild(profileRouter)
   }

}
```

---

# 2. Interactor

The brain of the feature.

Handles:

* business logic
* API coordination
* state
* analytics

---

## Example

```kotlin id="2l9kqa"
class HomeInteractor : Interactor<HomePresenter>() {

   override fun didBecomeActive() {
      loadFeed()
   }

}
```

---

# 3. Builder

Creates dependencies.

Like factory + DI container.

---

## Example

```kotlin id="4qlvbx"
class HomeBuilder {

   fun build(): HomeRouter {
      return HomeRouter(...)
   }

}
```

---

# 4. Component

Dependency scope management.

Prevents:

* memory leaks
* dependency chaos

---

# RIB Tree Structure

Huge apps become tree hierarchies.

```text id="e3z7wp"
RootRIB
 ├── HomeRIB
 │    ├── FeedRIB
 │    ├── StoryRIB
 │    └── ChatRIB
 │
 ├── PaymentRIB
 └── ProfileRIB
```

Very scalable.

---

# Why RIB is Powerful

---

# 1. True Feature Isolation

Each feature:

* owns logic
* owns navigation
* owns dependencies

Teams can work independently.

---

# 2. Explicit Lifecycles

RIBs know:

```text id="pspsuz"
when they become active/inactive
```

Huge for:

* streaming
* GPS
* sockets
* analytics

---

# 3. Better Memory Management

Unused RIBs detach.

Very useful for super apps.

---

# 4. Massive Team Scalability

50+ engineers can work independently.

---

# RIB vs MVVM

| Factor            | MVVM   | RIB       |
| ----------------- | ------ | --------- |
| Simplicity        | Easier | Hard      |
| Scalability       | Good   | Excellent |
| Navigation        | Weak   | Strong    |
| Feature Isolation | Medium | Excellent |
| Team Scaling      | Medium | Excellent |
| Learning Curve    | Medium | Very High |

---

# RIB vs VIPER

| Factor                | VIPER  | RIB         |
| --------------------- | ------ | ----------- |
| Modularity            | High   | Very High   |
| Navigation            | Router | Router Tree |
| Dependency Management | Medium | Excellent   |
| Lifecycle Awareness   | Medium | Excellent   |
| Scalability           | High   | Extreme     |

---

# Security Advantages

RIB naturally improves security because:

| Benefit             | Reason                 |
| ------------------- | ---------------------- |
| Feature Isolation   | Reduced attack surface |
| Scoped Dependencies | Better access control  |
| Explicit Ownership  | Easier audits          |
| Lifecycle Awareness | Better session cleanup |

---

# Drawbacks of RIB

---

# 1. Massive Complexity

Overkill for:

* startups
* small apps
* CRUD apps

---

# 2. Boilerplate Explosion

Simple screen may require:

```text id="gjy87d"
Builder
Router
Interactor
Component
View
```

Many files.

---

# 3. Very Steep Learning Curve

Junior developers struggle initially.

---

# 4. Slower Development

Architecture discipline costs speed.

---

# Best Use Cases

| Use Case     | RIB Fit   |
| ------------ | --------- |
| Super Apps   | Excellent |
| Ride Sharing | Excellent |
| Banking      | Excellent |
| Streaming    | Excellent |
| Startups     | Poor      |
| Simple Apps  | Poor      |

---

# Where RIB Excels

RIB shines when:

* app has 100+ screens
* multiple teams
* independent modules
* heavy navigation
* complex feature ownership

---

# Real Industry Pattern

Modern enterprise systems often become:

```text id="fsgkdl"
RIB
+
MVI
+
Clean Architecture
+
GraphQL
+
Reactive Streams
```

---

# Final Thought

RIB is not optimized for:

```text id="5m2h6l"
developer convenience
```

It is optimized for:

```text id="4jlwmz"
organizational scalability
```

That is why companies like Uber invest in it.