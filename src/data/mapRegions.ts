import type { RegionKey } from './regions'

export type MapRegionShape = {
  path: string
  labelX: number
  labelY: number
  viewBox: string
}

export const mapRegionShapes: Record<RegionKey, MapRegionShape> = {
  hokkaido: {
    path:
      'M580 74 L628 74 L716 146 L756 146 L756 212 L706 212 L670 236 L636 216 L616 216 L616 236 L568 236 L568 204 L602 174 Z',
    labelX: 656,
    labelY: 168,
    viewBox: '548 54 228 202',
  },
  tohoku: {
    path:
      'M568 258 L608 258 L608 270 L632 270 L632 246 L656 246 L656 268 L684 288 L684 342 L674 354 L674 398 L684 410 L684 488 L646 488 L646 454 L624 454 L624 488 L568 488 L568 452 L548 452 L548 398 L568 378 Z',
    labelX: 620,
    labelY: 366,
    viewBox: '528 226 176 282',
  },
  'kanto-koshinetsu': {
    path:
      'M486 428 L548 428 L548 488 L570 488 L570 530 L624 530 L624 568 L596 568 L596 554 L570 554 L542 570 L492 570 L492 534 L464 534 L464 488 L486 488 Z',
    labelX: 536,
    labelY: 520,
    viewBox: '444 408 200 182',
  },
  hokuriku: {
    path: 'M432 426 L486 426 L486 488 L462 488 L462 510 L388 510 L388 478 L432 478 Z',
    labelX: 438,
    labelY: 468,
    viewBox: '368 406 138 124',
  },
  chubu: {
    path:
      'M316 494 L388 494 L388 510 L462 510 L462 554 L450 554 L450 608 L422 608 L422 586 L392 586 L392 608 L368 608 L368 568 L338 568 L338 538 L316 538 Z',
    labelX: 398,
    labelY: 552,
    viewBox: '296 474 186 154',
  },
  'kansai-chugoku': {
    path:
      'M196 518 L316 518 L316 538 L368 538 L368 568 L392 568 L392 608 L338 608 L338 586 L274 586 L274 606 L196 606 L196 580 L158 580 L158 518 Z',
    labelX: 276,
    labelY: 562,
    viewBox: '138 498 274 130',
  },
  kyushu: {
    path:
      'M82 542 L188 542 L188 582 L176 582 L176 646 L146 666 L146 646 L118 646 L118 666 L88 666 L88 596 L102 596 L102 584 L82 584 Z M52 634 L70 634 L70 676 L52 676 Z',
    labelX: 132,
    labelY: 608,
    viewBox: '32 522 176 174',
  },
}
