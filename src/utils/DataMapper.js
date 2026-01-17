export const mapMediaItem = (item, type) => {
  switch (type) {
    case 'movie':
      return {
        id: `movie-${item.id}`, 
        originalId: item.id,
        title: item.title || item.name,
        image: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : null,
        type: 'movie',
        year: item.release_date?.split('-')[0]
      };
    case 'book':
      return {
        id: `book-${item.id}`,
        originalId: item.id,
        title: item.volumeInfo?.title,
        image: item.volumeInfo?.imageLinks?.thumbnail,
        type: 'book',
        year: item.volumeInfo?.publishedDate?.split('-')[0]
      };
    case 'game':
      return {
        id: `game-${item.id}`,
        originalId: item.id,
        title: item.name,
        image: item.background_image,
        type: 'game',
        year: item.released?.split('-')[0]
      };
    default:
      return item;
  }
};