
let artworks = [];
let maxLength = 4; // Corrected variable name
let shortUrl = 'https://api.artic.edu/api/v1/artworks?fields=image_id,title,artist_display,place_of_origin,thumbnail.alt_text,short_description,date_display,id,category_titles,&page=1&limit=30'



class Artwork {
    constructor(imageId, imageLink, title, artistDisplay, placeOfOrigin, mediumDisplay, shortDesc, dateDisplay, id, categoryTitle) {
        this.imageId = imageId;
        this.imgLink = `https://www.artic.edu/iiif/2/${imageLink}/full/843,/0/default.jpg`
        this.title = title;
        this.artistDisplay = artistDisplay;
        this.placeOfOrigin = placeOfOrigin;
        this.mediumDisplay = mediumDisplay;
        this.shortDescription = shortDesc;
        this.dateDisplay = dateDisplay;
        this.id = id
        this.categoryTitle = categoryTitle
    }
}

async function getData(urll) {
    let response = await fetch(urll);
    let data = await response.json();

    data.data.forEach(artworkData => {
        const artistName = artworkData.artist_display.split('\n')[0].replace(/\s*\(.*?\)\s*/, '').trim();
        let cleanDate = artworkData.date_display.replace(/[^0-9]/gi, '');
        let cleanerDate = cleanDate.slice(0, maxLength); // Corrected variable name


        let artwork = new Artwork(
            artworkData.image_id,
            artworkData.image_id,
            artworkData.title,
            artistName,
            artworkData.place_of_origin,
            artworkData.alt_text,
            artworkData.short_description,
            cleanerDate, // Updated to use cleanerDate
            artworkData.id,
            artworkData.category_titles,
        );

        artworks.push(artwork);
    });
    console.log(artworks);
    htmlBuild()
}


function htmlBuild() {
    const container = document.getElementById('img-container');
    artworks.forEach(artwork => {
        const divArt = document.createElement('div');
        divArt.classList.add('artwork', 'px-5', 'mx-4', 'my-2', 'py-2', 'col-md-4', 'col-lg-3', 'col-12', 'img-fluid',);

        const divImg = document.createElement('div');
        divImg.classList.add('image-div', 'd-flex', 'justify-content-center', 'align-items-center')

        const imgElement = document.createElement('img');
        imgElement.src = artwork.imgLink;
        imgElement.alt = artwork.title;

        const divText = document.createElement('div');
        divText.classList.add('ArtText');

        const title = document.createElement('h1');
        title.textContent = artwork.title;

        const artist = document.createElement('p');
        artist.textContent = artwork.artistDisplay;

        const placeOfOrigin = document.createElement('p');
        if (artwork.placeOfOrigin != artwork.artistDisplay) {
            placeOfOrigin.textContent = `${artwork.placeOfOrigin}`;
        }

        const mediumdesc = document.createElement('p');
        mediumdesc.textContent = artwork.mediumDisplay;

        const date = document.createElement('p');

        date.textContent = artwork.dateDisplay;

        const cat = document.createElement('p');
        cat.textContent = artwork.categoryTitle
        cat.classList.add('desc')
        const desc = document.createElement('p')
        desc.textContent = artwork.shortDescription
        desc.classList.add('desc')

        divImg.appendChild(imgElement);
        divArt.append(divImg)
        container.appendChild(divArt);

        divText.appendChild(title);
        divText.appendChild(artist);
        divText.appendChild(placeOfOrigin);
        divText.appendChild(date);
        divText.appendChild(cat)
        divText.appendChild(mediumdesc)
        divText.appendChild(desc)

        divArt.appendChild(divText);
    });
}


// Call the function after artworks array is populated


getData(shortUrl)