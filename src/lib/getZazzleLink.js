import request from './request';

let imageUrl = 'https://edi6jgnosf.execute-api.us-west-2.amazonaws.com/Stage/put_image'

const productKinds = {
  mug: '168739066664861503'
};

function getZazzleLink(kind, imageUrl) {
  const productCode = productKinds[kind];
  if (!productCode) {
    throw new Error('Unknown product kind: ' + kind);
  }

  const imageEncoded = encodeURIComponent(imageUrl);
  return `https://www.zazzle.com/api/create/at-238058511445368984?rf=238058511445368984&ax=Linkover&pd=${productCode}&ed=true&tc=&ic=&t_map_iid=${imageEncoded}`;
}

export default function generateZazzleLink(canvas) {

  if (window.collectedHeights == null) {
    return new Promise(() => {throw new Error('Draw a peak map first.');});
  }

  var makeTextFile = function (text) {
    var data = new Blob([text], {type: 'application/octet-stream'});

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (window.textFile !== null) {
      window.URL.revokeObjectURL(window.textFile);
    }

    window.textFile = window.URL.createObjectURL(data);

    // returns a URL you can use as a href
    return textFile;
  };

  var url = makeTextFile(JSON.stringify(window.collectedHeights));
  // var imageContent = canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, '');
  // const form = new FormData();
  // form.append('image', imageContent);

  console.log(url);
  return new Promise((done) => {console.log("promise " + url);done(url);});

  // return request(imageUrl, {
  //   method: 'POST',
  //   responseType: 'json',
  //   progress,
  //   body: form,
  // }, 'POST').then(x => {
  //   if (!x.success) throw new Error('Failed to upload image');
  //   let link = x.data.link; 
  //   return getZazzleLink('mug', link);
  // }).catch(e => {
  //   console.log('error', e);
  //   throw e;
  // });

  function progress() {}
}