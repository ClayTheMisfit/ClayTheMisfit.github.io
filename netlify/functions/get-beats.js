export default async (req, res) => {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const playlistId = 'PLOH_Zd3NnXGczRhbjmioYPRcbLoLKTRTC';
  const endpoint = 'https://www.googleapis.com/youtube/v3/playlistItems';

  const params = new URLSearchParams({
    part: 'contentDetails',
    maxResults: '50',
    playlistId,
    key: apiKey
  });

  const url = `${endpoint}?${params.toString()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.statusText}`);
    }

    const data = await response.json();

    const links = data.items.map(item => 
      `https://www.youtube.com/watch?v=${item.contentDetails.videoId}`
    );

    res.status(200).json({ links });
  } catch (error) {
    console.error('Error fetching YouTube playlist:', error);
    res.status(500).json({ error: 'Failed to fetch beat links' });
  }
};
