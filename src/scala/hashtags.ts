const politics = [
    "political", "politics", "politicians"
]

const media = [
    "news","breaking"
]


function hashTag(word: String) {
    return `#${word}`
}

export const allHashTags =
    politics.concat(media
    ).map(w => hashTag(w))
