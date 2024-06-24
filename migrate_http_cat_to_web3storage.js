const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Function to download a file from a URL
async function downloadFile(url, outputPath) {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    fs.writeFileSync(outputPath, response.data);
    console.log(`Downloaded ${url} to ${outputPath}`);
  } catch (error) {
    console.error(`Error downloading ${url}:`, error);
  }
}

// Function to download the front page HTML source
async function downloadFrontPage() {
  try {
    const url = 'https://http.cat';
    const response = await axios.get(url);

    // Save HTML content to a file
    fs.writeFileSync('index.html', response.data);
    console.log('HTML content downloaded and saved to index.html');

    // Parse the HTML and extract image and CSS URLs
    await parseHtmlAndDownloadFiles(response.data, url);

    // Adjust paths in the HTML
    adjustPathsInHtml();
  } catch (error) {
    console.error('Error downloading HTML:', error);
  }
}

// Function to parse HTML, extract image and CSS URLs, and download them
async function parseHtmlAndDownloadFiles(html, baseUrl) {
  const $ = cheerio.load(html);

  // Extract and download image files
  const imageUrls = [];
  $('img').each((i, img) => {
    const imgUrl = $(img).attr('src');
    if (imgUrl) {
      imageUrls.push(new URL(imgUrl, baseUrl).href);
    }
  });

  for (const imgUrl of imageUrls) {
    const imgPath = path.join(__dirname, path.basename(imgUrl));
    await downloadFile(imgUrl, imgPath);
  }

  // Extract and download CSS files
  const cssUrls = [];
  $('link[rel="stylesheet"]').each((i, link) => {
    const cssUrl = $(link).attr('href');
    if (cssUrl) {
      cssUrls.push(new URL(cssUrl, baseUrl).href);
    }
  });

  for (const cssUrl of cssUrls) {
    const cssPath = path.join(__dirname, path.basename(cssUrl));
    await downloadFile(cssUrl, cssPath);
  }

  // Log the extracted URLs
  console.log('Extracted and downloaded image URLs:', imageUrls);
  console.log('Extracted and downloaded CSS URLs:', cssUrls);
}

// Function to adjust paths in the HTML
function adjustPathsInHtml() {
  const html = fs.readFileSync('index.html', 'utf8');
  const $ = cheerio.load(html);

  $('img').each((i, img) => {
    const imgPath = path.basename($(img).attr('src'));
    $(img).attr('src', imgPath);
  });

  $('link[rel="stylesheet"]').each((i, link) => {
    const cssPath = path.basename($(link).attr('href'));
    $(link).attr('href', cssPath);
  });

  fs.writeFileSync('index.html', $.html());
  console.log('Paths in index.html adjusted');
}

// Function to get all files from the directory
async function getFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    if (fs.lstatSync(fullPath).isDirectory()) {
      files.push(...await getFiles(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

async function main() {
  // Step 1: Download the front page HTML and assets
  await downloadFrontPage();

  // Step 2: List all files in the current directory
  const dir = __dirname; // This assumes all files are in the current directory
  const filePaths = await getFiles(dir);
  console.log('Files downloaded:', filePaths);
}

// Run the function
main().catch(console.error);
