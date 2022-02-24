import * as React from 'react';

type HeartIconProps = {
  width: string;
  height: string;
  fill: string;
};

export const HeartIcon = ({ width, height, fill }: HeartIconProps) => {
  return (
    <svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width={width}
      height={height}
      viewBox="0 0 45.743 45.743"
    >
      <g>
        <path
          d="M34.199,3.83c-3.944,0-7.428,1.98-9.51,4.997c0,0-0.703,1.052-1.818,1.052c-1.114,0-1.817-1.052-1.817-1.052
		c-2.083-3.017-5.565-4.997-9.51-4.997C5.168,3.83,0,8.998,0,15.376c0,1.506,0.296,2.939,0.82,4.258
		c3.234,10.042,17.698,21.848,22.051,22.279c4.354-0.431,18.816-12.237,22.052-22.279c0.524-1.318,0.82-2.752,0.82-4.258
		C45.743,8.998,40.575,3.83,34.199,3.83z"
          fill={fill}
        />
      </g>
    </svg>
  );
};
