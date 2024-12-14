type Page = number;
type Rule = [Page, Page]; // [should go before second, should go after first]
type Pages = Page[]; // [22,66,48,10]

type InputData = {
  rules: Rule[];
  pages: Pages[];
};

const parseRule = (rule: string): Rule | undefined => {
  try {
    const parsed = rule.split('|').map(Number);
    if (parsed.length !== 2 || parsed.some(Number.isNaN)) {
      return undefined;
    }
    return parsed as Rule;
  } catch {
    return undefined;
  }
};

const parsePages = (pages: string): Pages => pages.split(',').map(Number);

export const parseInput = (input: string[]) => {
  let currentSection: keyof InputData = 'rules';

  return input.reduce<InputData>((res, line) => {
    if (line === '' || line === '\n') {
      currentSection = 'pages';
    } else if (currentSection === 'rules') {
      const rule = parseRule(line);
      if (rule !== undefined) {
        res.rules.push(rule);
      } else if (line.includes(',')) {
        currentSection = 'pages';
      }
    } else if (currentSection === 'pages') {
      res.pages.push(parsePages(line));
    }

    return res;
  }, {
    rules: [],
    pages: [],
  });
};

type PageIndex = number;
type PagesMap = Record<Page, PageIndex>;
const pagesMapCache = new Map<Pages, PagesMap>();
const getPagesMap = (pages: Pages) => {
  let pagesMap = pagesMapCache.get(pages);

  if (pagesMap === undefined) {
    pagesMap = pages.reduce<PagesMap>((res, page, index) => {
      res[page] = index;
      return res;
    }, Object.create(null));
    pagesMapCache.set(pages, pagesMap);
  }

  return pagesMap;
};

const isRuleApplied = (pagesMap: PagesMap, [before, after]: Rule) => {
  const beforeIndex = pagesMap[before];
  const afterIndex = pagesMap[after];
  return beforeIndex === undefined || afterIndex === undefined || beforeIndex < afterIndex;
};

export const isValidPagesOrder = (pages: Pages, rules: Rule[]) => {
  const pagesMap = getPagesMap(pages);
  return rules.every((rule) => isRuleApplied(pagesMap, rule));
};

const getRulesGraph = (pages: Pages, rules: Rule[]) => {
  // key must be printed before values
  const afterPagesByPage = new Map<Page, Pages>();
  // key - page number, value - number of pages that must come before the key
  const beforeCountByPage = new Map<Page, number>();

  const pagesMap = getPagesMap(pages);

  for (const [before, after] of rules) {
    if (pagesMap[before] === undefined || pagesMap[after] === undefined) continue;

    // list of page numbers that must come after the key
    let afterPages = afterPagesByPage.get(before);
    if (afterPages === undefined) {
      afterPages = [];
      afterPagesByPage.set(before, afterPages);
    }
    afterPages.push(after);

    const beforeCount = beforeCountByPage.get(after) ?? 0;
    beforeCountByPage.set(after, beforeCount + 1);
    if (beforeCountByPage.has(before) === false) beforeCountByPage.set(before, 0);
  }

  return { afterPagesByPage, beforeCountByPage } as const;
};

export const fixPagesOrder = (pages: Pages, rules: Rule[]) => {
  const { afterPagesByPage, beforeCountByPage } = getRulesGraph(pages, rules);

  const reorderedPages: Pages = [];

  const firstPages = pages.filter((page) => beforeCountByPage.get(page) === 0);
  while (firstPages.length > 0) {
    const current = firstPages.shift()!;
    reorderedPages.push(current);

    const nextPages = afterPagesByPage.get(current) ?? [];
    for (const nextPage of nextPages) {
      const beforeCount = beforeCountByPage.get(nextPage) ?? 0;
      if (beforeCount > 0) {
        const updatedBeforeCount = beforeCount - 1;
        if (updatedBeforeCount === 0) firstPages.push(nextPage);
        beforeCountByPage.set(nextPage, updatedBeforeCount);
      }
    }
  }

  return reorderedPages;
};

export const getMiddlePage = (pages: Pages) => pages[Math.floor(pages.length / 2)];
