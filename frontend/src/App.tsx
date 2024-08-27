import React, { useState, useEffect, useRef } from 'react';
import { Container, Typography, Button, Box, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import { backend } from 'declarations/backend';

const VideoContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '60vh',
  backgroundColor: theme.palette.secondary.main,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  overflow: 'hidden',
}));

const App: React.FC = () => {
  const [roomUrl, setRoomUrl] = useState<string>('');
  const [isJoined, setIsJoined] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const callFrameRef = useRef<any>(null);

  useEffect(() => {
    const fetchRoomUrl = async () => {
      try {
        const url = await backend.getRoomUrl();
        setRoomUrl(url);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching room URL:', err);
        setError('Failed to fetch room URL. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchRoomUrl();
  }, []);

  const handleJoin = () => {
    if (!window.DailyIframe) {
      setError('Daily.co library not loaded. Please refresh the page.');
      return;
    }

    callFrameRef.current = window.DailyIframe.createFrame({
      iframeStyle: {
        width: '100%',
        height: '100%',
        border: '0',
        backgroundColor: 'white',
      },
    });

    callFrameRef.current.join({ url: roomUrl });
    setIsJoined(true);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          ICLink
        </Typography>
        <VideoContainer>
          {isLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : isJoined ? (
            <div id="call-frame"></div>
          ) : (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <Typography>Click Join to start the video call</Typography>
            </Box>
          )}
        </VideoContainer>
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleJoin}
            disabled={isJoined || isLoading || !!error}
            sx={{ backgroundColor: '#34c759', '&:hover': { backgroundColor: '#2eb350' } }}
          >
            {isJoined ? 'Joined' : 'Join'}
          </Button>
        </Box>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Room URL: {roomUrl}
        </Typography>
      </Box>
    </Container>
  );
};

export default App;
