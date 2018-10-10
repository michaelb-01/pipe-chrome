// send the page title as a chrome message
//chrome.runtime.sendMessage(document.title);
// chrome.runtime.sendMessage(document.getElementsByTagName('img'));

console.log('running payload');

function getVimeoThumb(id){    
  $.get( 'https://vimeo.com/api/v2/video/' + id + '.json', function( data ) {
    var src = data[0].thumbnail_large;

    chrome.runtime.sendMessage(src);
  });
}

function getYouTubeThumb(url) {
  var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = url.match(regExp);

  if (match && match[2].length == 11) {
    return match[2];
  } else {
    //error
    console.log('could not find youtube video id');
  }
}

$(function() {
  var href = document.location.href;

  if (href.includes("vimeo.com")) {
    var path = document.location.pathname.split('/');

    if (path.length == 0) {
      console.log('could not find vimeo id');
      return;
    }

    getVimeoThumb(path[1]);
  }
  else if (href.includes("youtube.com")) {
    console.log('FOUND YOUTUBE URL');
    
    var id = getYouTubeThumb(href);

    var src = 'http://img.youtube.com/vi/' + id + '/mqdefault.jpg';

    chrome.runtime.sendMessage(src);
  }
});