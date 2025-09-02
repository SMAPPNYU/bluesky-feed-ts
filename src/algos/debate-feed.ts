import { QueryParams } from '../lexicon/types/app/bsky/feed/getFeedSkeleton'
import { AppContext } from '../config'
import fs from 'fs'
import path from 'path'
import { parse } from 'csv-parse/sync'

// max 15 chars
export const shortname = 'debate-feed'

export const handler = async (ctx: AppContext, params: QueryParams) => {
  const csvPath = path.join(process.cwd(), 'data', 'Posts_with_Phi_8292025.csv')

  const csvContent = fs.readFileSync(csvPath, 'utf-8')
  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
  })

  const uris = records.map((row: any) => row.uri).filter(Boolean)

  let start = 0
  if (params.cursor) {
    const cursorIndex = uris.indexOf(params.cursor)
    if (cursorIndex >= 0) {
      start = cursorIndex + 1
    }
  }

  const slice = uris.slice(start, start + params.limit)
  const feed = slice.map((uri) => ({ post: uri }))
  const cursor = slice.length > 0 ? slice[slice.length - 1] : undefined

  return {
    cursor,
    feed,
  }
}
