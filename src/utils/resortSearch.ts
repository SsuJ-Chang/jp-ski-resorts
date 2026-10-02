export type SearchField = 'name' | 'skiArea' | 'prefecture' | 'region'

// 每個欄位會放多個可搜尋文字，例如中文名、日文名、英文名與 key。
export type SearchFields = Record<SearchField, string[]>

type FieldWeight = {
  exact: number
  startsWith: number
  includes: number
}

export const SEARCH_FIELDS: SearchField[] = ['name', 'skiArea', 'prefecture', 'region']

// 名稱比區域更能代表使用者想找的雪場，因此給名稱較高分。
// exact > startsWith > includes，讓越精準的結果越容易排在前面。
const SEARCH_FIELD_WEIGHTS: Record<SearchField, FieldWeight> = {
  name: { exact: 120, startsWith: 100, includes: 80 },
  skiArea: { exact: 70, startsWith: 60, includes: 50 },
  prefecture: { exact: 40, startsWith: 35, includes: 30 },
  region: { exact: 25, startsWith: 22, includes: 20 },
}

// 搜尋前先統一全形/半形與英文大小寫，並移除空白、標點與特殊符號。
// 中文即使沒有空白，後續仍會透過 includes 做包含比對。
export const splitSearchTokens = (value: string) =>
  value
    .normalize('NFKC')
    .toLocaleLowerCase()
    .split(/[\s\p{P}\p{S}]+/gu)
    .filter(Boolean)

const getTokenMatchScore = (textToken: string, queryToken: string, weight: FieldWeight) => {
  if (textToken === queryToken) return weight.exact
  if (textToken.startsWith(queryToken)) return weight.startsWith
  if (textToken.includes(queryToken)) return weight.includes

  return 0
}

// 一個查詢 token 在同一個欄位可能對應多個文字，取其中最高分，
// 避免同一欄位因為有多個語言版本而重複灌分。
const getQueryTokenFieldScore = (
  queryToken: string,
  fieldTokens: string[],
  weight: FieldWeight,
) =>
  fieldTokens.reduce(
    (bestScore, textToken) =>
      Math.max(bestScore, getTokenMatchScore(textToken, queryToken, weight)),
    0,
  )

export function scoreSearchFields(fields: SearchFields, queryTokens: string[]) {
  if (queryTokens.length === 0) return 0

  let totalScore = 0

  for (const queryToken of queryTokens) {
    const tokenScore = SEARCH_FIELDS.reduce(
      (fieldScore, field) =>
        fieldScore +
        getQueryTokenFieldScore(queryToken, fields[field], SEARCH_FIELD_WEIGHTS[field]),
      0,
    )

    // 多字查詢必須每一個 token 都找到，否則視為不符合。
    if (tokenScore === 0) return 0

    totalScore += tokenScore
  }

  return totalScore
}
