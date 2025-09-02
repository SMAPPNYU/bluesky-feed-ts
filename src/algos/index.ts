import { AppContext } from '../config'
import {
  QueryParams,
  OutputSchema as AlgoOutput,
} from '../lexicon/types/app/bsky/feed/getFeedSkeleton'

import * as csmapFeed from './csmap-feed'
import * as debateFeed from './debate-feed'

type AlgoHandler = (ctx: AppContext, params: QueryParams) => Promise<AlgoOutput>

const algos: Record<string, AlgoHandler> = {
  [csmapFeed.shortname]: csmapFeed.handler,
  [debateFeed.shortname]: debateFeed.handler,
}

export default algos
