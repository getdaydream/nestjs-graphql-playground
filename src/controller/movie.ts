import got from 'got';
import _ from 'lodash';
import { MovieParser } from '../util/movie-parser';
import { getRepository, getManager } from 'typeorm';
import { Movie, MOVIE_SOURCE } from 'entity/movie';
import { Collection } from 'entity';

const MOVIE_KEYS = [
  'id',
  'title',
  'original_title',
  'year',
  'cover',
  'rating_value',
  'rating_count',
];

const doubanMovieBaseUrl = 'https://movie.douban.com/subject/';

export const movieController = {
  async create(ctx) {
    // const { doubanId } = ctx.request.body;
    // const movieRepo = getRepository(Movie);
    // if (await movieRepo.findOne({ id: doubanId })) {
    //   ctx.body = {
    //     error: 'duplicate id',
    //   };
    //   return;
    // }
    // try {
    //   const { body } = await got.get(`${doubanMovieBaseUrl}${doubanId}`);
    //   const doubanMovie = new MovieParser(body);
    //   const data = _.pick(doubanMovie, MOVIE_KEYS);
    //   const movie = movieRepo.create(data);
    //   await movieRepo.save(movie);
    //   ctx.body = movie;
    // } catch (e) {
    //   ctx.status = 500;
    //   ctx.body = e;
    // }
  },
  async findOne(ctx) {
    const { id } = ctx.params;
    const movie = await getRepository(Movie).findOne({ id });
    const a = _.mapKeys(_.pick(movie, MOVIE_KEYS), (v, k) => _.camelCase(k));
    ctx.body = a;
  },
  async search(ctx) {
    const { q } = ctx.request.query;
    const movies = await getManager().query(`
      select * from movie
        where title like '%${q}%'
        order by rating_count desc
        limit 10`);
    ctx.body = movies;
  },
  async collect(ctx) {
    const { id, status, comment } = ctx.params;
    const { id: user_id } = ctx.state.user;
    let collection: Collection;
    const collectionRepo = getRepository(Collection);
    // TODO 判断该电影是否存在
    collection = await collectionRepo.findOne({
      category: 'movie',
      target_id: id,
      user_id,
    });
    if (collection) {
      collection.status = status;
      collection.comment = comment;
    } else {
      collection = collectionRepo.create({
        category: 'movie',
        target_id: id,
        user_id,
        status,
        comment,
      });
    }
    await collectionRepo.save(collection);
    ctx.body = collection;
  },
};
