import Joi, { Schema } from 'joi';
import { DB } from '../Database';
import { MessageHandler } from '../MessageHandler';

async function onMessage(msg: any): Promise<any> {
  let { query } = msg
  query = '%' + query + '%'
  const songs = await DB.runQuery('search_songs', query)

  console.log('search message')

  return { songs }
}

const schema = {
  query: Joi.string().allow('')
}

export const SearchSongsHandler = new MessageHandler(
  'search_songs',
  schema,
  onMessage,
);