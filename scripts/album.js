// Album #1
var albumPicasso = {
   name: 'The Colors',
   artist: 'Pablo Picasso',
   label: 'Cubism',
   year: '1881',
   albumArtUrl: 'assets/images/album_covers/01.png',
   songs: [
       { name: 'Blue', length: '4:26' },
       { name: 'Green', length: '3:14' },
       { name: 'Red', length: '5:01' },
       { name: 'Pink', length: '3:21'},
       { name: 'Magenta', length: '2:15'}
   ]
};

// Album #2
var albumMarconi = {
   name: 'The Telephone',
   artist: 'Guglielmo Marconi',
   label: 'EM',
   year: '1909',
   albumArtUrl: 'assets/images/album_covers/20.png',
   songs: [
       { name: 'Hello, Operator?', length: '1:01' },
       { name: 'Ring, ring, ring', length: '5:01' },
       { name: 'Fits in your pocket', length: '3:21'},
       { name: 'Can you hear me now?', length: '3:14' },
       { name: 'Wrong phone number', length: '2:15'}
   ]
};

//Album #3
var albumEagles = {
     title: 'Hotel California',
     artist: 'The Eagles',
     label: 'Asylum',
     year: '1977',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { title: 'Hotel California', duration: '1:01' },
         { title: 'Life in the Fast Lane', duration: '5:01' },
         { title: 'Victim of Love', duration: '3:21'},
         { title: 'New Kid in Town?', duration: '3:14' },
         { title: 'Wasted Time', duration: '2:15'}
     ]
 };


var createSongRow = function(songNumber, songName, songLength) {

   var template =
      '<tr class="album-view-song-item">'
    + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
    + '  <td class="song-item-title">' + songName + '</td>'
    + '  <td class="song-item-duration">' + songLength + '</td>'
    + '</tr>'
    ;

   return $(template);

};

var setCurrentAlbum = function(album) {

   // #1
     var $albumTitle = $('.album-view-title');
     var $albumArtist = $('.album-view-artist');
     var $albumReleaseInfo = $('.album-view-release-info');
     var $albumImage = $('.album-cover-art');
     var $albumSongList = $('.album-view-song-list');

   // #2
     $albumTitle.text(album.title);
     $albumArtist.text(album.artist);
     $albumReleaseInfo.text(album.year + ' ' + album.label);
     $albumImage.attr('src', album.albumArtUrl);

   // #3
     $albumSongList.empty();

   // #4
     for (i = 0; i < album.songs.length; i++) {
       var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
         $albumSongList.append($newRow)
   }

};

var findParentByClassName = function(element, wantedClass){

  // Assign the element's parent that we're checking to a variable
  var currentParent = element.parentElement;

  // Check if the current parent exists
  if (currentParent) {

    // If the element's parent class that we're on isn't the same as the target class we want,
    // move to the next parent element up
    while( currentParent.className && currentParent.className != wantedClass ){
      currentParent = currentParent.parentElement;
    }

    // If class match is found return current parent
    if( currentParent.className === wantedClass ) {
      return currentParent;
    // if there is no class match return "No parent found w that class name"
    } else {
      alert("No parent found with that class name");
    }

  // If parent doesn't exist
  } else {
    alert("No Parent Found");
  }

};

var getSongItem = function(element) {

  switch (element.className) {
    case 'album-song-button':
    case 'ion-play':
    case 'ion-pause':
      return findParentByClassName(element, 'song-item-number');
      break;
    case 'album-view-song-item':
      return element.querySelector('.song-item-number');
      break;
    case 'song-item-title':
    case 'song-item-duration':
      return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
      break;
    case 'song-item-number':
      return element;
      break;
    default:
      return;
  }

};

var clickHandler = function(targetElement) {

   var songItem = getSongItem(targetElement);
/*//if current playing song is null..if TRUE set song's item content to a PAUSE button
and set currently playing song to the new song's number*/

   if (currentlyPlayingSong === null) {
       songItem.innerHTML = pauseButtonTemplate;
       currentlyPlayingSong = songItem.getAttribute('data-song-number');
   } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
       songItem.innerHTML = playButtonTemplate;
       currentlyPlayingSong = null;
   } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
       var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
       currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
       songItem.innerHTML = pauseButtonTemplate;
       currentlyPlayingSong = songItem.getAttribute('data-song-number');
   }

};

var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');

// Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

// Store state of playing songs
var currentlyPlayingSong = null;

window.onload = function() {

  setCurrentAlbum(albumPicasso);

  songListContainer.addEventListener('mouseover', function(event) {

     // Only target individual song rows during event delegation
    if (event.target.parentElement.className === 'album-view-song-item') {

      // Change the content from the number to the play button's HTML
      event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;

      // If it's the current song, keep the pause button active on hover
      var songItem = getSongItem(event.target);
      if ( songItem.getAttribute('data-song-number') === currentlyPlayingSong ){
        songItem.innerHTML = pauseButtonTemplate;
      }

    }

  });

  for (i = 0; i < songRows.length; i++) {
    songRows[i].addEventListener('mouseleave', function(event) {

      // #1
      var songItem = getSongItem(event.target);
      var songItemNumber = songItem.getAttribute('data-song-number');

      // #2
      if (songItemNumber !== currentlyPlayingSong) {
        songItem.innerHTML = songItemNumber;
      }

    });
    
    songRows[i].addEventListener('click', function(event) {
      clickHandler(event.target);
    });

  }

};







