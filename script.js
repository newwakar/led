const newsUrl = 'https://safe-weasel-54.deno.dev:80/india-news'; // Replace with your actual server endpoint URL

const fetchNews = async () => {
  try {
    const response = await fetch(newsUrl);
    const data = await response.json();

    const newsContainer = document.getElementById('news');
    newsContainer.innerHTML = ""; // Clear previous content

    data.slice(0, 10).forEach(item => { // Limit to 10 news items
      const newsItem = document.createElement('div');
      newsItem.classList.add('news-item');

      const titleLink = document.createElement('a');
      titleLink.href = item.link;
      titleLink.textContent = item.title;

      const description = document.createElement('p'); // Optional: Display description
      description.textContent = item.description || "";

      newsItem.appendChild(titleLink);
      newsItem.appendChild(description);
      newsContainer.appendChild(newsItem);
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    const newsContainer = document.getElementById('news');
    newsContainer.innerHTML = '<p>An error occurred while fetching news.</p>';
  }
};

fetchNews(); // Call the function to fetch news on page load
