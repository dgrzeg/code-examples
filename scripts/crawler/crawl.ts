const puppeteer = require('puppeteer')

const normalizeUrl = (urlString: string) => {
  const urlObject = new URL(urlString)
  let url = `https://${urlObject.hostname}${urlObject.pathname}${urlObject.search}`
  url = url.replace('ref=breadcrumb', '')
  url = url.length > 0 && url.at(-1) === '?' ? url.slice(0, -1) : url
  url = url.length > 0 && url.at(-1) === '#' ? url.slice(0, -1) : url
  url = url.length > 0 && url.at(-1) === '/' ? url.slice(0, -1) : url

  return url
}

const getURLs = async (puppeteerPage: any, baseUrl: string, querySelector: string) => {
  const linksFromPage = await puppeteerPage.evaluate(
    (baseUrl: string, querySelector: string) => {
      const linksElements = Array.from(document.querySelectorAll(querySelector))

      const links: string[] = linksElements
        .map((el) => {
          const url = el.getAttribute('href') || ''
          return url.at(0) !== '/' ? url : `${baseUrl}${url}`
        })
        .filter((el) => {
          try {
            const testedURL = new URL(el)
            return testedURL.hostname === new URL(baseUrl).hostname
          } catch {
            return false
          }
        })

      return links
    },
    baseUrl,
    querySelector
  )
  return linksFromPage
}

const crawl = async (
  puppeteerPage: any,
  destUrls: string[],
  baseUrl: string,
  visitedPages: string[],
  networkidle: boolean = false,
  timeout: number = 60,
  querySelector: string = 'main a'
) => {
  for (let i = 0; i < destUrls.length; i++) {
    const destUrl = normalizeUrl(destUrls[i])

    try {
      if (visitedPages.includes(destUrl)) continue
      console.log(destUrl)

      const params = networkidle
        ? { waitUntil: 'networkidle0', timeout: timeout * 1000 }
        : { timeout: timeout * 1000 }

      await puppeteerPage.goto(destUrl, params)
      await puppeteerPage.waitForSelector('div[class^="loading_backdrop"]', { hidden: true })

      if (new URL(puppeteerPage.url()).host !== new URL(baseUrl).host) continue

      const links = await getURLs(puppeteerPage, baseUrl, querySelector)

      visitedPages.push(destUrl)
      await crawl(puppeteerPage, links, baseUrl, visitedPages)
    } catch {
      console.log(`error loading site:${destUrl}`)
    }
  }
}

const main = async () => {
  if (process.argv.length < 3) {
    console.log(`dodaj parametry w formacie:
    [adres:string] [timeout:number] [headless:'new'|false] [wait for iddle network:boolean]
    np. npm run crawl https:/........ 60 new false
    `)
    process.exit(1)
  }

  const url = process.argv[2]
  const timeout = +process.argv[3]
  const headless = process.argv[4] === 'new' ? process.argv[4] : false
  const networkidle = Boolean(process.argv[5])
  const visitedPages: string[] = []

  const browser = await puppeteer.launch({ headless })
  const puppeteerPage = await browser.newPage()
  await puppeteerPage.setDefaultNavigationTimeout(0)

  await crawl(puppeteerPage, Array.of(url), url, visitedPages, networkidle, timeout, 'a')

  console.log('KONIEC', visitedPages)

  await browser.close()
}

main()
