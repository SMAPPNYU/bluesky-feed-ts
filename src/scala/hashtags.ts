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
    scalalang.concat(typelevel,
        politics,
        media
    ).map(w => hashTag(w))
