## Dependecy Inversion Principle

The Dependency Inversion principle states that higher-level modules (business logic) should rely on abstraction rather than relying directly on lower-level modules.

BAD:
```js
class DevelopmentDB {
  connect() {}
}

class App {
  constructor() {
    this.db = new DevelopmentDB();
  }

  start(){
    this.db.connect();
  }
}

const app = new App();
```

Here the App class concretely implements DevelopmentDB meaning that if we wanted to change the db at a later date, App class may need to be completely reworked.

GOOD:
```js
class DevelopmentDB {
  connect() {}
}

class ProductionDB {
  connect() {}
}

class App {
  constructor(env){
    this.db = env;
  }

  start() {
    this.db.connect();
  }
}

const app = new App(new ProductionDB())
```

Another example:

BAD:
```js
class MovieStore {
  getMovies() {
    const response = fetch('http://www.movieApi.com/movies')
    .then(res => res.json()).then(data => data.items);
    return response;
  }
}

const movieStore = new MovieStore();
const movies = await movieStore.getMovies();
```

GOOD:
```js
class MovieApiService {
  constructor() {
    this.url = 'http://www.movieApi.com/movies';
  }
  async fetchAll() {
    const res = await fetch(this.url);
    const data = await res.json();
    return data.items;
  }
}

class MovieStore {
  constructor(movieSource){
    this.movieSource = movieSource;
  }
  async getMovies() {
    return this.movieSource.fetchAll();
  }
}

const movieSource = new MovieApiService();
const movieStore = new MovieStore(movieSource);

const movies = await movieStore.getMovies();
```

This way, we can swap around our source of movies with a mock service or local database, without impacting MovieStore class.

In Typescript/Java/C#, we would make the abstraction explicit
```ts
interface MovieSource {
  fetchAll(): Promise<Movie[]>;
}

class MovieStore {
  constructor(private source: MovieSource) {}
}
```

Then any source that is passed into MovieStore would implement the MovieSource interface.

In the case where there is different behaviour between movie sources:

```js
class MovieStore {
  constructor(movieSource){
    this.movieSource = movieSource;
  }
  async getMovies() {
    return this.movieSource.fetchAll();
  }

  async getMovieData() {
    const movies = await this.getMovies();
    return movies.map(movie => ({
      title: movie.title,
      year: movie.year
      })
    );
    // here MovieStore expects a certain format
  }
}

class MovieApiServiceA {
  constructor() {
    this.url = 'http://www.movieApi.com/movies';
  }
  async fetchAll() {
    const res = await fetch(this.url);
    const data = await res.json();
    // returns {items: [{id: 1, title: 'Inception', year: 2023}]}

    return data.items;
  }
}

class MovieApiServiceB {
  constructor() {
    this.url = 'http://www.anotherMovieApi.com/movies';
  }
  async fetchAll() {
    const res = await fetch(this.url);
    const data = await res.json();
    // returns {movies: [{id: 1, name: 'Inception', release: 2023}]}

    return data.movies.map(movie => ({
      title: movie.name,
      year: movie.release,
    }));
  }
}
```

Now we handle any normalization in the appropriate MovieApiService and MovieStore can accept either MovieApiServiceA or MovieApiServiceB.