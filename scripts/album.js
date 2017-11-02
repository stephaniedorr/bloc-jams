
//First Album
var albumPicasso = {
     title: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/01.png',
     songs: [
         { title: 'Blue', duration: '4:26' },
         { title: 'Green', duration: '3:14' },
         { title: 'Red', duration: '5:01' },
         { title: 'Pink', duration: '3:21'},
         { title: 'Magenta', duration: '2:15'}
     ]
 };
 
 // Another Example Album
 var albumMarconi = {
     title: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { title: 'Hello, Operator?', duration: '1:01' },
         { title: 'Ring, ring, ring', duration: '5:01' },
         { title: 'Fits in your pocket', duration: '3:21'},
         { title: 'Can you hear me now?', duration: '3:14' },
         { title: 'Wrong phone number', duration: '2:15'}
     ]
 };

 //Third Album for assignment
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
 
     return template;
 };

var albumTitle = document.getElementsByClassName('album-view-title')[0];
     var albumArtist = document.getElementsByClassName('album-view-artist')[0];
     var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
     var albumImage = document.getElementsByClassName('album-cover-art')[0];
     var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
 

 var setCurrentAlbum = function(album) {

     // #2
     albumTitle.firstChild.nodeValue = album.title;
     albumArtist.firstChild.nodeValue = album.artist;
     albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
     albumImage.setAttribute('src', album.albumArtUrl);
 
     // #3
     albumSongList.innerHTML = '';
 
     // #4
     for (var i = 0; i < album.songs.length; i++) {
         albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
     }
 };
 
var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';

 window.onload = function() {
     setCurrentAlbum(albumPicasso);

      songListContainer.addEventListener('mouseover', function(event) {
         console.log(event.target);
         // Only target individual song rows during event delegation
         if (event.target.parentElement.className === 'album-view-song-item') {
         event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
         }
     });

        for (var i = 0; i < songRows.length; i++) {
         songRows[i].addEventListener('mouseleave', function(event) {
         // Selects first child element, which is the song-item-number element   
         this.children[0].innerHTML = this.children[0].getAttribute('data-song-number');
         });
     }

 

//set the album names in an array.  They will be called in order
     var albums = [albumPicasso, albumMarconi, albumEagles];
//set index to 1 to select the second album in the array since albumPicasso is called first in function
     var index =1;
//Add an event listener (event is a click on album image)
     albumImage.addEventListener ("click", function(event){
//Run setCurrentAlbum function and run thru index of album covers per click
     setCurrentAlbum(albums[index]);
//Go thru the albums one at a time with each click
     index ++;
//When we get to the end of the array of albums return to the first album (index=0)
     if(index == albums.length) {
        index=0;
     }
     });
 };








