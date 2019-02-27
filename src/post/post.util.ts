import { PostType } from './post.interface';
import { Filetype } from '../file/file.interface';

export const POST_TYPE_MAP_FILETYPE = {
  [PostType.markdown]: Filetype.markdown,
  [PostType.snippet]: Filetype.typescript,
};
