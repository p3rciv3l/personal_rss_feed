document.addEventListener('DOMContentLoaded', async () => {
    // fetch the latest articles when the popup is opened
    const articles = await fetchAllArticles();
    displayArticles(articles);
});

// function to display the articles in the popup
function displayArticles(articles) {
    const newsContainer = document.querySelector('.news-container');

    for (let source in articles) {
        let section = document.createElement('div');
        section.classList.add('news-section');

        articles[source].forEach(article => {
            let articleBox = document.createElement('div');
            articleBox.classList.add('article-box');

            let img = document.createElement('img');
            img.src = article.image;
            img.alt = article.title;

            let title = document.createElement('h3');
            title.textContent = article.title;

            articleBox.appendChild(img);
            articleBox.appendChild(title);
            section.appendChild(articleBox);

            // make the article box clickable to open the article link
            articleBox.addEventListener('click', () => {
                chrome.tabs.create({ url: article.link });
            });
        });

        newsContainer.appendChild(section);
    }
}
