// fetch bloomberg articles (tech rss feed)
async function fetchBloombergArticles() {
    const response = await fetch('https://feeds.bloomberg.com/technology/news.rss');
    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'application/xml');

    const articles = [];

    doc.querySelectorAll('item').forEach(item => {
        const title = item.querySelector('title').textContent;
        const link = item.querySelector('link').textContent;
        const image = item.querySelector('media\\:content')?.getAttribute('url') || '';

        articles.push({ title, image, link });
    });

    return articles;
}

// fetch ft articles (tech rss feed)
async function fetchFTArticles() {
    const response = await fetch('https://www.ft.com/technology-sector?format=rss');
    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'application/xml');

    const articles = [];

    doc.querySelectorAll('item').forEach(item => {
        const title = item.querySelector('title').textContent;
        const link = item.querySelector('link').textContent;
        const image = item.querySelector('media\\:content')?.getAttribute('url') || '';

        articles.push({ title, image, link });
    });

    return articles;
}

// fetch wsj articles (tech rss feed)
async function fetchWSJArticles() {
    const response = await fetch('https://feeds.a.dj.com/rss/RSSWSJD.xml');
    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'application/xml');

    const articles = [];

    doc.querySelectorAll('item').forEach(item => {
        const title = item.querySelector('title').textContent;
        const link = item.querySelector('link').textContent;
        const image = item.querySelector('media\\:thumbnail')?.getAttribute('url') || '';

        articles.push({ title, image, link });
    });

    return articles;
}

// fetch the information articles (scraping metadata)
async function fetchInformationArticles() {
    const response = await fetch('https://www.theinformation.com/');
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const articles = [];

    // attempt to scrape metadata from the public homepage
    doc.querySelectorAll('.article-class') // update with the correct class after inspecting
        .forEach(article => {
            const title = article.querySelector('meta[property="og:title"]').content;
            const image = article.querySelector('meta[property="og:image"]').content;
            const link = article.querySelector('meta[property="og:url"]').content;

            articles.push({ title, image, link });
        });

    return articles;
}

// fetch all articles from bloomberg, ft, wsj, and the information
async function fetchAllArticles() {
    const informationArticles = await fetchInformationArticles();
    const bloombergArticles = await fetchBloombergArticles();
    const ftArticles = await fetchFTArticles();
    const wsjArticles = await fetchWSJArticles();

    return {
        "information": informationArticles,
        "bloomberg": bloombergArticles,
        "ft": ftArticles,
        "wsj": wsjArticles
    };
}
