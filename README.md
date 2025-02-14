# Feed generator for Bluesky

This repository is a customized fork of https://github.com/bluesky-social/feed-generator

# Implementation details

## Content collection

The [FirehoseSubscription.ts](src/FirehoseSubscription.ts) is a class that collects selected messages in the database. It also removes them from the feed if they are removed upstream.

## Content filtering

The `isPolitical` function defined in [src/bridging/index.ts](src/bridging/index.ts) decides if content should be saved to database. 

## Feed generation algorithm

You can find the algorithm generating the feed in [src/algos/bridging-feed.ts](src/algos/bridging-feed.ts). It simply fetches all known records from database sorted by indexing time, there's no sophisticated logic involved.
