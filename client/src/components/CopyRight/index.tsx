import React from 'react';
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const CopyRight = (props: any) => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/prElyor/">
                Github
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
};

export {CopyRight};