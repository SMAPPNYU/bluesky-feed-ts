import { QueryParams } from '../lexicon/types/app/bsky/feed/getFeedSkeleton'
import { AppContext } from '../config'
import fs from 'fs'
import path from 'path'
import csvParse from 'csv-parse/sync'

// max 15 chars
export const shortname = 'debate-feed'

export const handler = async (ctx: AppContext, params: QueryParams) => {
  // Path to your CSV
  const csvPath = path.join(process.cwd(), 'data', 'Posts_with_Phi_8292025.csv')

  // Read and parse CSV
  const csvContent = fs.readFileSync(csvPath, 'utf-8')
  const records = csvParse.parse(csvContent, {
    columns: true,   // use headers
    skip_empty_lines: true,
  })

  // Extract URIs in the order they appear
  const uris = records.map((row: any) => row.uri).filter(Boolean)

  // Apply pagination (limit + cursor)
  let start = 0
  if (params.cursor) {
    const cursorIndex = uris.indexOf(params.cursor)
    if (cursorIndex >= 0) {
      start = cursorIndex + 1
    }
  }

  const slice = uris.slice(start, start + params.limit)

  // Construct feed response
  const feed = slice.map((uri) => ({ post: uri }))

  // New cursor is just the last URI we sent
  const cursor = slice.length > 0 ? slice[slice.length - 1] : undefined

  return {
    cursor,
    feed,
  }
}
