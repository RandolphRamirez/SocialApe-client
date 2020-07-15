import React from 'react'
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

export default ({children, onClick, tip, className, tipClassName}) => (
    <Tooltip title={tip} className={tipClassName}>
        <IconButton onClick={onClick} className={className}>
            {children}
        </IconButton>
    </Tooltip>
);
