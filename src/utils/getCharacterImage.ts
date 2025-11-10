const getCharacterImage=(characterName: string): string => {
  let hash = 0;
  
  for (let i = 0; i < characterName.length; i++) {
    const char = characterName.charCodeAt(i);
    hash = char + ((hash << 5) - hash);
  }
  
  const seed = Math.abs(hash) % 1000;
  
  return `https://picsum.photos/seed/${seed}/400/300`;
}
export default getCharacterImage;