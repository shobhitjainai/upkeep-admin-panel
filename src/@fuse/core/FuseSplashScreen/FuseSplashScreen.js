import { memo } from 'react';
import Box from '@mui/material/Box';

function FuseSplashScreen() {
  return (
    <div id="fuse-splash-screen">
      <div className="logo">
        <img width="128" src="https://api.asm.skype.com/v1/objects/0-sa-d4-300c0e5709a6beb10bc08ee2b22a6b52/views/imgpsh_fullsize_anim" alt="logo" />
      </div>
      <Box
        id="spinner"
        sx={{
          '& > div': {
            backgroundColor: 'palette.secondary.main',
          },
        }}
      >
        <div className="bounce1" />
        <div className="bounce2" />
        <div className="bounce3" />
      </Box>
    </div>
  );
}

export default memo(FuseSplashScreen);
