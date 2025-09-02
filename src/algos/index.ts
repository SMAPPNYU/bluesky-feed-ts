import { AppContext } from '../config'
import {
  QueryParams,
  OutputSchema as AlgoOutput,
} from '../lexicon/types/app/bsky/feed/getFeedSkeleton'

// Existing feed
import * as csmapFeed from './csmap-feed'
import * as debateFeed from './debate-feed'   // <-- this is enough

type AlgoHandler = (ctx: AppContext, params: QueryParams) => Promise<AlgoOutput>

const algos: Record<string, AlgoHandler> = {
  [csmapFeed.shortname]: csmapFeed.handler,
  [debateFeed.shortname]: debateFeed.handler,   // <-- consistent with csmap
}

export default algos
