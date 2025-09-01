import { AppContext } from '../config'
import {
  QueryParams,
  OutputSchema as AlgoOutput,
} from '../lexicon/types/app/bsky/feed/getFeedSkeleton'

// Existing feed
import * as csmapFeed from './csmap-feed'

// New debate feed
import debateFeed, { shortname as debateShortname } from './debate-feed'

type AlgoHandler = (ctx: AppContext, params: QueryParams) => Promise<AlgoOutput>

const algos: Record<string, AlgoHandler> = {
  [csmapFeed.shortname]: csmapFeed.handler,
  [debateShortname]: debateFeed,   // 👈 add your new one
}

export default algos
