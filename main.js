
let img_list = [];
let imgUrl = [];
let index = 0


async function fetchData() {
    try {
        const response = await fetch('https://api.artic.edu/api/v1/artworks?fields=image_id,title,artist_display,place_of_origin,medium_display,short_description,date_display,department_title?page=1&limit=10');
        const artworks = response.data.data;
        artworks.forEach(artwork => {

            //make a class for each artwork!!

            img_list.push(artwork.image_id);
        });
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function getImage(imgID) {
    try {
        // Fetch image URL only
        const imageUrl = `https://www.artic.edu/iiif/2/${imgID}/full/843,/0/default.jpg`;
        imgUrl.push(imageUrl)
    } catch (error) {
        console.error(`Error fetching image ${imgID}:`, error.message);
        return null;
    }

}

async function run() {
    fetchData()
    getImage(img_list)
    console.log(img_list)
    console.log(imgUrl)



}

run()