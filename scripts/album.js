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

   var $row = $(template);

    var clickHandler = function() {
         var songNumber = $(this).attr('data-song-number');

    if (currentlyPlayingSong !== null) {
        // Revert to song number for currently playing song because user started playing new song.
        var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
        currentlyPlayingCell.html(currentlyPlayingSong);
    }
    if (currentlyPlayingSong !== songNumber) {
        // Switch from Play -> Pause button to indicate new song is playing.
        $(this).html(pauseButtonTemplate);
        currentlyPlayingSong = songNumber;
    } else if (currentlyPlayingSong === songNumber) {
        // Switch from Pause -> Play button to pause currently playing song.
        $(this).html(playButtonTemplate);
        currentlyPlayingSong = null;
    }
};
 

     var onHover = function(event) {
         var songNumberCell = $(this).find('.song-item-number');
         var songNumber = songNumberCell.attr('data-song-number');

         if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html(playButtonTemplate);
        }
     };

     var offHover = function(event) {
         var songNumberCell = $(this).find('.song-item-number');
         var songNumber = songNumberCell.attr('data-song-number');

         if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html(songNumber);
        }
     };
 
     $row.find('.song-item-number').click(clickHandler);
  
     $row.hover(onHover, offHover);

     return $row;

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




// Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

// Store state of playing songs
var currentlyPlayingSong = null;

$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
           
});







