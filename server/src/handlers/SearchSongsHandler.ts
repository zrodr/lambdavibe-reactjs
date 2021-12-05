import Joi, { Schema } from 'joi';
import { DB } from '../Database';
import { MessageHandler } from '../MessageHandler';

async function onMessage(msg: any): Promise<any> {
  //validate
  const { query } = msg
  console.log(typeof query)
  const songs = await DB.runQuery('search_songs', query)

  console.log('search message')

  return { songs }
}

const schema = {
  query: Joi.string().alphanum().allow('')
}

export const SearchSongsHandler = new MessageHandler(
  'search_songs',
  schema,
  onMessage,
);