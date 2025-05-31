import React, {ReactNode} from 'react';
import RollingBarOriginal from 'react-native-rolling-bar';

type RollingBarProps = {
    interval: number;
    defaultStyle: boolean;
    children: ReactNode;
};

const RollingBar: React.FC<RollingBarProps> = ({interval, defaultStyle, children}) => (
    <RollingBarOriginal interval={interval} defaultStyle={defaultStyle}>
        {children}
    </RollingBarOriginal>
);

// export default RollingBar;
