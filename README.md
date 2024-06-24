# HTTP Cat to Web3.Storage

This project demonstrates how to migrate the front page of the [HTTPS Status Cats](https://http.cat) website to [Web3.Storage](https://web3.storage/). The script downloads the HTML source, images, and CSS from the website, adjusts the paths, and prepares the files for manual upload to Web3.Storage.

## Table of Contents

- [HTTP Cat to Web3.Storage](#http-cat-to-web3storage)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
  - [Usage](#usage)
  - [Manual Upload to Web3.Storage](#manual-upload-to-web3storage)
  - [Considerations](#considerations)

## Overview

This project involves the following steps:
1. Download the front page HTML, images, and CSS from the HTTPS Status Cats website.
2. Adjust the paths in the HTML to ensure that images and CSS are correctly referenced.
3. Prepare the files for manual upload to Web3.Storage.
4. Manually upload the files to Web3.Storage.

## Prerequisites

- Node.js and npm installed on your machine. You can download and install them from [Node.js official website](https://nodejs.org/).
- Access to the Web3.Storage console and an existing space where you can upload files.

## Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/hakierka/http-cat-to-web3storage.git
   cd http-cat-to-web3storage
2. Install the required dependencies:
   ```sh
   npm install axios cheerio
We use axios to download HTML content and cheerio to parse the HTML and extract image and CSS links.

## Usage 

1. Run the script to download HTML and assets:
   ```sh
   node migrate_http_cat_to_web3storage.js
2. The script will:

- Download the HTML content of the HTTPS Status Cats website.
- Parse the HTML to find and download image and CSS files.
- Adjust the paths in the index.html file to ensure all assets are correctly referenced.
- Save the files locally.

## Manual Upload to Web3.Storage
- Sign and log in to the [Web3.Storage console](https://console.web3.storage/).
- Create and Navigate to your space.
- Use the "Upload" feature to manually upload the index.html, image files, and CSS files you downloaded.
- Follow the prompts to complete the upload process.

### Access Your Uploaded Content
You can access the uploaded content via the following URL:
https://bafybeica2wh4dx3jo6o2xzu5tm5jqweo6svki4jlzqhaiw3yvj5kmqueqm.ipfs.w3s.link/

## Considerations
### Single Upload vs Separate Uploads:
- Single Upload as a Directory: Easier management, consistent structure, and single URL for all assets, but larger uploads can be slower and more prone to failure.
- Separate Uploads for Each File: More granular control, easier to retry individual uploads if they fail, but more complex management with each file having its own URL.
