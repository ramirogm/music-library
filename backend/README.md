# Music library API

This is a REST API that gives access to a music library. Tracks are grouped in libraries which belong to users.

The current version is very simple, for example it comes with no authentication or listener tracking, and the `user` object is just an id.

The API has the following operations:


## `/music-library/v1/users/:userId/library`

returns a user library, that just has the tracks' ids.

```json
  "ramirogm": {
    "library": {
      "name": "Ramiro's library",
      "tracks": [
        1,
        3
      ]    
    }
  }
```

## `/music-library/v1/tracks/:trackId`

returns the track info, including name, media, and basic info about the artist and album the track belongs to.

The library uses mbid for each track, artist and album, enabling the client app to use it to look up the track in some track library like last.fm, musicXmatch, Groove, etc. to get extra info.

It may return two kind of URLs:

* `localUrl`: an URL path, that the client app can use to get the audio file from the server
* `url`: a proper url, which can be used to fetch the audio from any server

```json
{
  "name": "Atomic",
  "mbid": "66083e09-9486-43f7-98c4-8253c9a5da58",
  "artist": {
    "name": "Blondie",
    "mbid": "4d2956d1-a3f7-44bb-9a41-67563e1a0c94"
  },
  "album": {
    "artist": "Blondie",
    "title": "The Best of Blondie",
    "mbid": "a75ada9c-0ca8-475e-82f2-255ec1704936"
  },
  "media": {
    "localUrl": "/static/Blondie_-_Atomic.ogg",
    "url": "https://upload.wikimedia.org/wikipedia/en/5/57/Blondie_-_Atomic.ogg"
  }
}
```   

## Future API extensions

The API can be extended to provide more info about the tracks, artists and albums, for example collecting info from several external services and packaging it in a single response, or as speficic items.

For example:

* `GET /music-library/v1/tracks/:trackId/lyrics`
* `GET /music-library/v1/albums/:albumId/images`

It can also be extended to record information about the tracks that are played by the users. For example the following function could be used to record that a user is playing a track:

`POST /music-library/v1/users/:userId/play?trackId=:trackId`





# Trying it

This is a node app, so if you have node on your system just run

```bash
npm install
npm start
```

If you want to run it in a container, the project comes with a Dockerfile so you can build the image and then run it

```bash
docker build -t music-library .
```

run it locally with

```bash
docker run --name music-library -p 3001:3001 music-library
```

# Examples

the project comes with a simple library ( see [data/master_library_data.json](data/master_library_data.json) )

So for example you can get a user's library with:

`curl -v http://localhost:3001/api/music-library/v1/users/ramirogm/library`

and then the tracks with:

`curl -v http://localhost:3001/api/music-library/v1/tracks/3`

and get the audio file with either of these urls:

[(http://localhost:3001/static/Blondie_-_Atomic.ogg)](http://localhost:3001/static/Blondie_-_Atomic.ogg)

[(https://upload.wikimedia.org/wikipedia/en/5/57/Blondie_-_Atomic.ogg)](https://upload.wikimedia.org/wikipedia/en/5/57/Blondie_-_Atomic.ogg)


