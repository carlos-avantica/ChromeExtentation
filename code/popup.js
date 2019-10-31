
const callback = function (results) {
    const gallery = document.getElementById('gallery-div');
    for (var i in results[0]) {
        var img = document.createElement('img');
        img.src = results[0][i];
        gallery.appendChild(createImageGallery(img));
    }
};

const getImageInformation = (img) => {
  const url = 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAr5Ov1h4PIf4ZmXmo8_lXNcolN4A02F4c';
  const data = {
    "requests": [
      {
        "image": {
          "source": {
            "imageUri": img
          }
        },
        "features": [
          {
            "type": "SAFE_SEARCH_DETECTION"
          },
          {
            "maxResults": 10,
            "type": "OBJECT_LOCALIZATION"
          }
        ]
      }
    ]
  };

  fetch(url, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => console.log('Success:', response));
}

const createImageGallery = (image) => {

  const divGallery = document.createElement('div');
  divGallery.className = 'gallery';
  const anchor = document.createElement('a');
  anchor.appendChild(image);
  divGallery.appendChild(anchor);
  divGallery.onclick = function(e){
    getImageInformation(e.target.currentSrc);
  }
  return divGallery;
}
chrome.tabs.query({ // Get active tab
    active: true,
    currentWindow: true
}, function (tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
        code: 'Array.prototype.map.call(document.images, function (i) { return i.src; });'
    }, callback);
});
