fetch('http://localhost:3000//codingpage/languages')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // console.log(data);
    const imgList = data;
    let imgtemplate = '';
    let image = document.querySelector('.languageSelection');

    let currentdate = new Date();

    imgList.forEach(function (item) {
      console.log(item);
    
        imgtemplate +=
          `<figure>
      ${item.}
        </figure>`;

      
    });
    image.innerHTML = imgtemplate;
  });
